import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";

// Precache all assets
precacheAndRoute(self.__WB_MANIFEST);

// Cache images with CacheFirst strategy
registerRoute(
  /^https:\/\/.*\.(png|jpg|jpeg|svg|gif|webp)$/,
  new CacheFirst({
    cacheName: "images-cache",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      }),
    ],
  }),
);

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SCHEDULE_REMINDER") {
    const { label, triggerTime, reminderId, repeat } = event.data;
    const delay = triggerTime - Date.now();
    if (delay > 0) {
      setTimeout(() => {
        self.registration.showNotification("Physiotherapy Reminder", {
          body: label,
          icon: "/favicon.svg",
          badge: "/favicon.svg",
          tag: reminderId,
          requireInteraction: true,
          actions: [
            { action: "dismiss", title: "Dismiss" },
            { action: "snooze", title: "Snooze 10 min" },
          ],
          data: { repeat, label, reminderId },
        });

        if (repeat === "Daily") {
          setTimeout(() => {
            self.registration.showNotification("Physiotherapy Reminder", {
              body: label,
              icon: "/favicon.svg",
              tag: reminderId,
              requireInteraction: true,
              data: { repeat, label, reminderId },
            });
          }, 86400000);
        }

        if (repeat === "Weekly") {
          setTimeout(() => {
            self.registration.showNotification("Physiotherapy Reminder", {
              body: label,
              icon: "/favicon.svg",
              tag: reminderId,
              requireInteraction: true,
              data: { repeat, label, reminderId },
            });
          }, 604800000);
        }
      }, delay);
    }
  }
});

self.addEventListener("notificationclick", (event) => {
  if (event.action === "snooze") {
    setTimeout(
      () => {
        self.registration.showNotification("Physiotherapy Reminder (Snoozed)", {
          body: event.notification.body,
          icon: "/favicon.svg",
          tag: event.notification.tag,
          requireInteraction: true,
        });
      },
      10 * 60 * 1000,
    );
  }
  event.notification.close();
});
