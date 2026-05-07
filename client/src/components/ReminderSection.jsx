import { useState, useEffect } from "react";
import { Bell, Clock, Plus, Trash2, Volume2 } from "lucide-react";

const REMINDER_STORAGE_KEY = "patient_reminders";
const browserReminderTimers = new Map();
let activeAlarmAudio = null;

const canUseNotifications = () =>
  typeof window !== "undefined" && "Notification" in window;

const canUseServiceWorker = () =>
  typeof navigator !== "undefined" && "serviceWorker" in navigator;

const stopAlarmSound = () => {
  if (!activeAlarmAudio) return;

  activeAlarmAudio.timers.forEach((timerId) => window.clearTimeout(timerId));
  activeAlarmAudio.oscillators.forEach((oscillator) => {
    try {
      oscillator.stop();
    } catch {
      // Oscillator may already be stopped.
    }
  });
  activeAlarmAudio.audioContext.close().catch(() => {});
  activeAlarmAudio = null;
};

const playAlarmSound = () => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  stopAlarmSound();

  const audioContext = new AudioContext();
  const alarmState = {
    audioContext,
    oscillators: [],
    timers: [],
  };
  activeAlarmAudio = alarmState;

  const beep = () => {
    if (activeAlarmAudio !== alarmState) return;

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const startAt = audioContext.currentTime;

    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(880, startAt);
    oscillator.frequency.setValueAtTime(660, startAt + 0.18);
    gain.gain.setValueAtTime(0.001, startAt);
    gain.gain.exponentialRampToValueAtTime(0.28, startAt + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, startAt + 0.42);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(startAt);
    oscillator.stop(startAt + 0.45);
    alarmState.oscillators.push(oscillator);
  };

  for (let index = 0; index < 20; index += 1) {
    alarmState.timers.push(window.setTimeout(beep, index * 850));
  }

  alarmState.timers.push(window.setTimeout(stopAlarmSound, 18000));
};

const showReminderNotification = async (reminder) => {
  const title = "Physiotherapy Reminder";
  const options = {
    body: reminder.label,
    icon: "/favicon.svg",
    badge: "/favicon.svg",
    tag: reminder.reminderId,
    requireInteraction: true,
  };

  if (canUseServiceWorker()) {
    const registration = await navigator.serviceWorker.ready;
    await registration.showNotification(title, options);
    return;
  }

  new Notification(title, options);
};

const waitForServiceWorkerRegistration = () =>
  Promise.race([
    navigator.serviceWorker.ready,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Reminder service is not ready yet")), 4000);
    }),
  ]);

const postReminderToServiceWorker = async (reminder) => {
  if (!canUseServiceWorker()) {
    throw new Error("Service workers are not supported in this browser");
  }

  const registration = await waitForServiceWorkerRegistration();
  const worker =
    registration.active ||
    registration.waiting ||
    registration.installing ||
    navigator.serviceWorker.controller;

  if (!worker) {
    throw new Error("Reminder service worker is not active yet");
  }

  worker.postMessage({
    type: "SCHEDULE_REMINDER",
    label: reminder.label,
    triggerTime: reminder.triggerTime,
    reminderId: reminder.reminderId,
    repeat: reminder.repeat,
  });
};

const scheduleBrowserReminder = (reminder, onTrigger) => {
  if (!canUseNotifications()) {
    return;
  }

  const delay = reminder.triggerTime - Date.now();
  if (delay <= 0) {
    return;
  }

  const timerId = window.setTimeout(() => {
    playAlarmSound();
    if ("vibrate" in navigator) {
      navigator.vibrate([300, 120, 300]);
    }
    showReminderNotification(reminder).catch((error) => {
      console.warn("Unable to show reminder notification:", error.message);
    });
    browserReminderTimers.delete(reminder.reminderId);
    onTrigger?.(reminder);
  }, delay);

  browserReminderTimers.set(reminder.reminderId, timerId);
};

const formatReminderTime = (triggerTime) =>
  new Date(triggerTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

const ReminderSection = () => {
  const [reminderLabel, setReminderLabel] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [repeat, setRepeat] = useState("One-time");
  const [reminders, setReminders] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [alarmActive, setAlarmActive] = useState(false);

  useEffect(() => {
    if (canUseNotifications() && Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        if (permission !== "granted") {
          console.warn("Notification permission not granted");
        }
      });
    }

    const savedReminders = JSON.parse(
      localStorage.getItem(REMINDER_STORAGE_KEY) || "[]",
    );
    setReminders(savedReminders);

    savedReminders
      .filter((reminder) => reminder.triggerTime > Date.now())
      .forEach((reminder) => {
        postReminderToServiceWorker(reminder).catch((err) => {
          console.warn("Unable to reschedule reminder:", err.message);
        });
        scheduleBrowserReminder(reminder, (triggeredReminder) => {
          setAlarmActive(true);
          setStatusMessage(`Reminder due now: ${triggeredReminder.label}`);
        });
      });
  }, []);

  const scheduleReminder = async () => {
    setStatusMessage("");

    if (!canUseNotifications()) {
      setStatusMessage("Reminders are not supported in this browser.");
      return;
    }

    let permission = Notification.permission;
    if (permission === "default") {
      permission = await Notification.requestPermission();
    }

    if (permission !== "granted") {
      setStatusMessage("Notification permission is required for reminders.");
      return;
    }

    if (!reminderLabel.trim() || !selectedTime) {
      setStatusMessage("Please enter a reminder label and time.");
      return;
    }

    const now = new Date();
    const [hours, minutes] = selectedTime.split(":");
    const triggerTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes,
    ).getTime();

    let finalTriggerTime = triggerTime;
    if (finalTriggerTime <= Date.now()) {
      finalTriggerTime += 86400000; // Next day
    }

    const reminderId = "reminder_" + Date.now();
    const newReminder = {
      label: reminderLabel.trim(),
      triggerTime: finalTriggerTime,
      reminderId,
      repeat,
      time: selectedTime,
    };

    try {
      await postReminderToServiceWorker(newReminder);
    } catch (err) {
      console.warn("Using browser reminder fallback:", err.message);
    }
    scheduleBrowserReminder(newReminder, (triggeredReminder) => {
      setAlarmActive(true);
      setStatusMessage(`Reminder due now: ${triggeredReminder.label}`);
    });

    const updatedReminders = [...reminders, newReminder];
    setReminders(updatedReminders);
    localStorage.setItem(REMINDER_STORAGE_KEY, JSON.stringify(updatedReminders));

    setReminderLabel("");
    setSelectedTime("");
    setStatusMessage(
      `Reminder set successfully for ${new Date(finalTriggerTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}. Keep this tab open for alarm sound.`,
    );
  };

  const dismissAlarm = () => {
    stopAlarmSound();
    if ("vibrate" in navigator) {
      navigator.vibrate(0);
    }
    setAlarmActive(false);
    setStatusMessage("Alarm stopped.");
  };

  const cancelReminder = (reminderId) => {
    const browserTimer = browserReminderTimers.get(reminderId);
    if (browserTimer) {
      window.clearTimeout(browserTimer);
      browserReminderTimers.delete(reminderId);
    }

    const updatedReminders = reminders.filter(
      (r) => r.reminderId !== reminderId,
    );
    setReminders(updatedReminders);
    localStorage.setItem(REMINDER_STORAGE_KEY, JSON.stringify(updatedReminders));
  };

  return (
    <section className="reminder-card">
      <div className="reminder-card-header">
        <div>
          <span className="eyebrow">Alarms</span>
          <h2>Set a Reminder</h2>
        </div>
        <div className="reminder-icon" aria-hidden="true">
          <Bell size={22} />
        </div>
      </div>

      <div className="reminder-form">
        <label className="reminder-field">
          <span>Time</span>
          <div className="reminder-input-wrap">
            <Clock size={17} />
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            />
          </div>
        </label>

        <label className="reminder-field reminder-label-field">
          <span>Reminder</span>
          <input
            type="text"
            placeholder="Medication, exercise, check-in"
            value={reminderLabel}
            onChange={(e) => setReminderLabel(e.target.value)}
          />
        </label>

        <label className="reminder-field">
          <span>Repeat</span>
          <select value={repeat} onChange={(e) => setRepeat(e.target.value)}>
            <option value="One-time">One-time</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
          </select>
        </label>

        <button className="reminder-submit" type="button" onClick={scheduleReminder}>
          <Plus size={18} />
          Set
        </button>
      </div>

      {statusMessage && (
        <p className="reminder-status" role="status">
          <Volume2 size={17} />
          <span>{statusMessage}</span>
        </p>
      )}

      {alarmActive && (
        <button className="reminder-stop" type="button" onClick={dismissAlarm}>
          Stop alarm
        </button>
      )}

      <div className="reminder-list">
        {reminders.length > 0 ? (
          reminders.map((reminder) => (
            <article className="reminder-item" key={reminder.reminderId}>
              <div>
                <strong>{reminder.label}</strong>
                <span>
                  {formatReminderTime(reminder.triggerTime)} · {reminder.repeat}
                </span>
              </div>
              <button
                type="button"
                className="reminder-cancel"
                onClick={() => cancelReminder(reminder.reminderId)}
                aria-label={`Cancel ${reminder.label}`}
              >
                <Trash2 size={17} />
              </button>
            </article>
          ))
        ) : (
          <p className="reminder-empty">No reminders set yet</p>
        )}
      </div>
    </section>
  );
};

export default ReminderSection;
