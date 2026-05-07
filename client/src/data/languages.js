export const languageOptions = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'Hindi' },
    { code: 'ta', label: 'Tamil' },
    { code: 'te', label: 'Telugu' },
    { code: 'kn', label: 'Kannada' },
    { code: 'es', label: 'Spanish' }
];

export const getStoredLanguage = () => localStorage.getItem('physiopath-language') || 'en';

export const storeLanguage = (language) => {
    localStorage.setItem('physiopath-language', language);
};

const languageKey = {
    en: 'english',
    hi: 'hindi',
    ta: 'tamil',
    te: 'telugu',
    kn: 'kannada',
    es: 'spanish'
};

export const exerciseDetailText = {
    en: { pageTitle: 'Exercise details', sets: 'Sets', reps: 'Reps', rest: 'Rest', tipsTitle: 'Avoid these mistakes', voiceTitle: 'Voice guidance', playExplanation: 'Play detailed exercise explanation', speaking: 'Speaking...', imageLoading: 'Loading exercise image...', imageFallback: 'Showing offline exercise image.', practice: 'Practice this exercise', unsupportedVoice: 'Voice guidance is not supported in this browser.', step: 'Step' },
    hi: { pageTitle: 'व्यायाम विवरण', sets: 'सेट', reps: 'रेप', rest: 'आराम', tipsTitle: 'इन गलतियों से बचें', voiceTitle: 'आवाज़ मार्गदर्शन', playExplanation: 'विस्तृत व्यायाम समझाइए', speaking: 'बोला जा रहा है...', imageLoading: 'व्यायाम चित्र लोड हो रहा है...', imageFallback: 'ऑफलाइन व्यायाम चित्र दिखाया जा रहा है।', practice: 'यह व्यायाम अभ्यास करें', unsupportedVoice: 'इस ब्राउज़र में आवाज़ मार्गदर्शन उपलब्ध नहीं है।', step: 'चरण' },
    ta: { pageTitle: 'உடற்பயிற்சி விவரம்', sets: 'செட்', reps: 'முறை', rest: 'ஓய்வு', tipsTitle: 'இந்த தவறுகளை தவிர்க்கவும்', voiceTitle: 'குரல் வழிகாட்டல்', playExplanation: 'விரிவான உடற்பயிற்சி விளக்கத்தை கேட்கவும்', speaking: 'பேசுகிறது...', imageLoading: 'உடற்பயிற்சி படம் ஏற்றப்படுகிறது...', imageFallback: 'ஆஃப்லைன் உடற்பயிற்சி படம் காட்டப்படுகிறது.', practice: 'இந்த உடற்பயிற்சியை பயிற்சி செய்யவும்', unsupportedVoice: 'இந்த உலாவியில் குரல் வழிகாட்டல் ஆதரிக்கப்படவில்லை.', step: 'படி' },
    te: { pageTitle: 'వ్యాయామ వివరాలు', sets: 'సెట్లు', reps: 'రెప్స్', rest: 'విశ్రాంతి', tipsTitle: 'ఈ తప్పులను నివారించండి', voiceTitle: 'వాయిస్ మార్గదర్శనం', playExplanation: 'వివరణాత్మక వ్యాయామ వివరణ వినండి', speaking: 'మాట్లాడుతోంది...', imageLoading: 'వ్యాయామ చిత్రం లోడ్ అవుతోంది...', imageFallback: 'ఆఫ్‌లైన్ వ్యాయామ చిత్రం చూపబడుతోంది.', practice: 'ఈ వ్యాయామాన్ని అభ్యాసం చేయండి', unsupportedVoice: 'ఈ బ్రౌజర్‌లో వాయిస్ మార్గదర్శనం అందుబాటులో లేదు.', step: 'దశ' },
    kn: { pageTitle: 'ವ್ಯಾಯಾಮ ವಿವರ', sets: 'ಸೆಟ್', reps: 'ರೆಪ್', rest: 'ವಿಶ್ರಾಂತಿ', tipsTitle: 'ಈ ತಪ್ಪುಗಳನ್ನು ತಪ್ಪಿಸಿ', voiceTitle: 'ಧ್ವನಿ ಮಾರ್ಗದರ್ಶನ', playExplanation: 'ವಿವರವಾದ ವ್ಯಾಯಾಮ ವಿವರಣೆ ಕೇಳಿ', speaking: 'ಮಾತನಾಡುತ್ತಿದೆ...', imageLoading: 'ವ್ಯಾಯಾಮ ಚಿತ್ರ ಲೋಡ್ ಆಗುತ್ತಿದೆ...', imageFallback: 'ಆಫ್‌ಲೈನ್ ವ್ಯಾಯಾಮ ಚಿತ್ರ ತೋರಿಸಲಾಗುತ್ತಿದೆ.', practice: 'ಈ ವ್ಯಾಯಾಮವನ್ನು ಅಭ್ಯಾಸ ಮಾಡಿ', unsupportedVoice: 'ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಮಾರ್ಗದರ್ಶನ ಬೆಂಬಲಿಸಲಾಗುವುದಿಲ್ಲ.', step: 'ಹಂತ' },
    es: { pageTitle: 'Detalles del ejercicio', sets: 'Series', reps: 'Reps', rest: 'Descanso', tipsTitle: 'Evita estos errores', voiceTitle: 'Guía por voz', playExplanation: 'Reproducir explicación detallada', speaking: 'Hablando...', imageLoading: 'Cargando imagen del ejercicio...', imageFallback: 'Mostrando imagen offline del ejercicio.', practice: 'Practicar este ejercicio', unsupportedVoice: 'La guía por voz no es compatible con este navegador.', step: 'Paso' }
};

export const patientUiText = {
    en: { greeting: 'Hello', offline: 'Offline ready', guideLanguage: 'Guide language', today: 'Today', complete: 'complete', currentStreak: 'Current streak', days: 'days', day: 'Day', of: 'of', recoveryPlan: 'Recovery plan', guidedRoutine: 'Guided routine', todaysExercises: "Today's exercises", progress: 'Progress', sets: 'sets', reps: 'reps', coachNote: "Move slowly, stop if pain increases, and follow your therapist's prescribed reps.", startWorkout: 'Start guided workout', offlineNote: 'No camera required. Your plan and logs stay available after first sync.', todayNav: 'Today' },
    hi: { greeting: 'नमस्ते', offline: 'ऑफलाइन तैयार', guideLanguage: 'गाइड भाषा', today: 'आज', complete: 'पूरा', currentStreak: 'वर्तमान स्ट्रीक', days: 'दिन', day: 'दिन', of: 'में से', recoveryPlan: 'रिकवरी योजना', guidedRoutine: 'मार्गदर्शित रूटीन', todaysExercises: 'आज के व्यायाम', progress: 'प्रगति', sets: 'सेट', reps: 'रेप', coachNote: 'धीरे चलें, दर्द बढ़े तो रुकें, और अपने फिजियोथेरेपिस्ट के बताए रेप्स ही करें।', startWorkout: 'मार्गदर्शित व्यायाम शुरू करें', offlineNote: 'कैमरा जरूरी नहीं। पहली सिंक के बाद आपकी योजना और लॉग ऑफलाइन उपलब्ध रहेंगे।', todayNav: 'आज' },
    ta: { greeting: 'வணக்கம்', offline: 'ஆஃப்லைன் தயாராக உள்ளது', guideLanguage: 'வழிகாட்டி மொழி', today: 'இன்று', complete: 'முடிந்தது', currentStreak: 'தற்போதைய தொடர்ச்சி', days: 'நாட்கள்', day: 'நாள்', of: 'இல்', recoveryPlan: 'மீட்பு திட்டம்', guidedRoutine: 'வழிகாட்டப்பட்ட பயிற்சி', todaysExercises: 'இன்றைய உடற்பயிற்சிகள்', progress: 'முன்னேற்றம்', sets: 'செட்', reps: 'முறை', coachNote: 'மெதுவாக செய்யுங்கள், வலி அதிகரித்தால் நிறுத்துங்கள், தெரபிஸ்ட் கூறிய எண்ணிக்கையைப் பின்பற்றுங்கள்.', startWorkout: 'வழிகாட்டப்பட்ட பயிற்சியை தொடங்கு', offlineNote: 'கேமரா தேவையில்லை. முதல் sync பிறகு உங்கள் திட்டமும் பதிவுகளும் ஆஃப்லைனில் இருக்கும்.', todayNav: 'இன்று' },
    te: { greeting: 'నమస్కారం', offline: 'ఆఫ్‌లైన్ సిద్ధం', guideLanguage: 'మార్గదర్శక భాష', today: 'ఈరోజు', complete: 'పూర్తి', currentStreak: 'ప్రస్తుత వరుస', days: 'రోజులు', day: 'రోజు', of: 'లో', recoveryPlan: 'రికవరీ ప్రణాళిక', guidedRoutine: 'మార్గదర్శిత రూటీన్', todaysExercises: 'ఈరోజు వ్యాయామాలు', progress: 'ప్రగతి', sets: 'సెట్లు', reps: 'రెప్స్', coachNote: 'నెమ్మదిగా చేయండి, నొప్పి పెరిగితే ఆపండి, మీ థెరపిస్ట్ సూచించిన రెప్స్ మాత్రమే చేయండి.', startWorkout: 'మార్గదర్శిత వ్యాయామం ప్రారంభించండి', offlineNote: 'కెమెరా అవసరం లేదు. మొదటి sync తర్వాత మీ ప్రణాళిక మరియు లాగ్స్ ఆఫ్‌లైన్‌లో ఉంటాయి.', todayNav: 'ఈరోజు' },
    kn: { greeting: 'ನಮಸ್ಕಾರ', offline: 'ಆಫ್‌ಲೈನ್ ಸಿದ್ಧ', guideLanguage: 'ಮಾರ್ಗದರ್ಶಿ ಭಾಷೆ', today: 'ಇಂದು', complete: 'ಪೂರ್ಣ', currentStreak: 'ಪ್ರಸ್ತುತ ಸರಣಿ', days: 'ದಿನಗಳು', day: 'ದಿನ', of: 'ರಲ್ಲಿ', recoveryPlan: 'ಚೇತರಿಕೆ ಯೋಜನೆ', guidedRoutine: 'ಮಾರ್ಗದರ್ಶಿತ ರೂಟಿನ್', todaysExercises: 'ಇಂದಿನ ವ್ಯಾಯಾಮಗಳು', progress: 'ಪ್ರಗತಿ', sets: 'ಸೆಟ್', reps: 'ರೆಪ್', coachNote: 'ನಿಧಾನವಾಗಿ ಮಾಡಿ, ನೋವು ಹೆಚ್ಚಾದರೆ ನಿಲ್ಲಿಸಿ, ನಿಮ್ಮ ಥೆರಪಿಸ್ಟ್ ಸೂಚಿಸಿದ ರೆಪ್‌ಗಳನ್ನು ಮಾತ್ರ ಅನುಸರಿಸಿ.', startWorkout: 'ಮಾರ್ಗದರ್ಶಿತ ವ್ಯಾಯಾಮ ಆರಂಭಿಸಿ', offlineNote: 'ಕ್ಯಾಮೆರಾ ಅಗತ್ಯವಿಲ್ಲ. ಮೊದಲ sync ನಂತರ ನಿಮ್ಮ ಯೋಜನೆ ಮತ್ತು ದಾಖಲೆಗಳು ಆಫ್‌ಲೈನ್‌ನಲ್ಲೂ ಲಭ್ಯ.', todayNav: 'ಇಂದು' },
    es: { greeting: 'Hola', offline: 'Listo sin conexión', guideLanguage: 'Idioma de guía', today: 'Hoy', complete: 'completo', currentStreak: 'Racha actual', days: 'días', day: 'Día', of: 'de', recoveryPlan: 'Plan de recuperación', guidedRoutine: 'Rutina guiada', todaysExercises: 'Ejercicios de hoy', progress: 'Progreso', sets: 'series', reps: 'reps', coachNote: 'Muévete despacio, detente si aumenta el dolor y sigue las repeticiones indicadas.', startWorkout: 'Iniciar rutina guiada', offlineNote: 'No se requiere cámara. Tu plan y registros quedan disponibles después de la primera sincronización.', todayNav: 'Hoy' }
};

export const workoutUiText = {
    en: { exercise: 'Exercise', of: 'of', guidedMode: 'Guided workout mode', getReady: 'Get ready', startNow: 'Start now', activeWorkout: 'Active workout', set: 'Set', tapAfterRep: 'Tap after each rep', pause: 'Pause', resume: 'Resume', resetReps: 'Reset reps', restPeriod: 'Rest period', restCopy: 'Relax your shoulders and breathe slowly before the next set.', skipRest: 'Skip rest', complete: 'Workout complete', wellDone: 'Well done', completeCopy: 'Your prescribed routine is logged for today and will appear in progress.', viewProgress: 'View progress', begin: 'Begin.', nextSet: 'Start the next set.', setComplete: 'Set complete. Rest for', seconds: 'seconds.', workoutDone: 'Workout complete. Great effort today.' },
    hi: { exercise: 'व्यायाम', of: 'में से', guidedMode: 'मार्गदर्शित व्यायाम मोड', getReady: 'तैयार हो जाएं', startNow: 'अभी शुरू करें', activeWorkout: 'सक्रिय व्यायाम', set: 'सेट', tapAfterRep: 'हर रेप के बाद टैप करें', pause: 'रोकें', resume: 'जारी रखें', resetReps: 'रेप रीसेट करें', restPeriod: 'आराम का समय', restCopy: 'कंधों को आराम दें और अगले सेट से पहले धीरे सांस लें।', skipRest: 'आराम छोड़ें', complete: 'व्यायाम पूरा', wellDone: 'बहुत अच्छा', completeCopy: 'आज की आपकी निर्धारित रूटीन लॉग हो गई है और प्रगति में दिखेगी।', viewProgress: 'प्रगति देखें', begin: 'शुरू करें।', nextSet: 'अगला सेट शुरू करें।', setComplete: 'सेट पूरा हुआ। आराम करें', seconds: 'सेकंड।', workoutDone: 'व्यायाम पूरा हुआ। आज बहुत अच्छा प्रयास।' },
    ta: { exercise: 'உடற்பயிற்சி', of: 'இல்', guidedMode: 'வழிகாட்டப்பட்ட பயிற்சி முறை', getReady: 'தயாராகுங்கள்', startNow: 'இப்போது தொடங்கு', activeWorkout: 'செயலில் உள்ள பயிற்சி', set: 'செட்', tapAfterRep: 'ஒவ்வொரு முறைக்கும் பிறகு தட்டவும்', pause: 'நிறுத்து', resume: 'தொடரவும்', resetReps: 'முறைகளை மீட்டமை', restPeriod: 'ஓய்வு நேரம்', restCopy: 'தோள்களை தளர்த்தி, அடுத்த செட்டுக்கு முன் மெதுவாக மூச்செடுங்கள்.', skipRest: 'ஓய்வை தவிர்', complete: 'பயிற்சி முடிந்தது', wellDone: 'நன்றாக செய்தீர்கள்', completeCopy: 'இன்றைய உங்கள் பயிற்சி பதிவு செய்யப்பட்டது; அது முன்னேற்றத்தில் தெரியும்.', viewProgress: 'முன்னேற்றம் பார்க்க', begin: 'தொடங்குங்கள்.', nextSet: 'அடுத்த செட்டை தொடங்குங்கள்.', setComplete: 'செட் முடிந்தது. ஓய்வு எடுங்கள்', seconds: 'விநாடிகள்.', workoutDone: 'பயிற்சி முடிந்தது. இன்று அருமையான முயற்சி.' },
    te: { exercise: 'వ్యాయామం', of: 'లో', guidedMode: 'మార్గదర్శిత వ్యాయామ మోడ్', getReady: 'సిద్ధం అవ్వండి', startNow: 'ఇప్పుడే ప్రారంభించండి', activeWorkout: 'సక్రియ వ్యాయామం', set: 'సెట్', tapAfterRep: 'ప్రతి రెప్ తర్వాత ట్యాప్ చేయండి', pause: 'విరామం', resume: 'కొనసాగించు', resetReps: 'రెప్స్ రీసెట్ చేయండి', restPeriod: 'విశ్రాంతి సమయం', restCopy: 'భుజాలను రిలాక్స్ చేసి, తర్వాతి సెట్ ముందు నెమ్మదిగా శ్వాసించండి.', skipRest: 'విశ్రాంతి దాటవేయండి', complete: 'వ్యాయామం పూర్తయింది', wellDone: 'బాగా చేశారు', completeCopy: 'ఈరోజు మీ రూటీన్ నమోదు అయింది మరియు ప్రగతిలో కనిపిస్తుంది.', viewProgress: 'ప్రగతి చూడండి', begin: 'ప్రారంభించండి.', nextSet: 'తర్వాతి సెట్ ప్రారంభించండి.', setComplete: 'సెట్ పూర్తయింది. విశ్రాంతి తీసుకోండి', seconds: 'సెకన్లు.', workoutDone: 'వ్యాయామం పూర్తయింది. ఈరోజు మంచి ప్రయత్నం.' },
    kn: { exercise: 'ವ್ಯಾಯಾಮ', of: 'ರಲ್ಲಿ', guidedMode: 'ಮಾರ್ಗದರ್ಶಿತ ವ್ಯಾಯಾಮ ಮೋಡ್', getReady: 'ಸಿದ್ಧರಾಗಿ', startNow: 'ಈಗ ಆರಂಭಿಸಿ', activeWorkout: 'ಸಕ್ರಿಯ ವ್ಯಾಯಾಮ', set: 'ಸೆಟ್', tapAfterRep: 'ಪ್ರತಿ ರೆಪ್ ನಂತರ ಟ್ಯಾಪ್ ಮಾಡಿ', pause: 'ವಿರಾಮ', resume: 'ಮುಂದುವರಿಸಿ', resetReps: 'ರೆಪ್‌ಗಳನ್ನು ಮರುಹೊಂದಿಸಿ', restPeriod: 'ವಿಶ್ರಾಂತಿ ಸಮಯ', restCopy: 'ಭುಜಗಳನ್ನು ಸಡಿಲಗೊಳಿಸಿ ಮತ್ತು ಮುಂದಿನ ಸೆಟ್‌ಗಿಂತ ಮೊದಲು ನಿಧಾನವಾಗಿ ಉಸಿರಾಡಿ.', skipRest: 'ವಿಶ್ರಾಂತಿ ಬಿಟ್ಟುಬಿಡಿ', complete: 'ವ್ಯಾಯಾಮ ಪೂರ್ಣ', wellDone: 'ಚೆನ್ನಾಗಿದೆ', completeCopy: 'ಇಂದಿನ ನಿಮ್ಮ ನಿಗದಿತ ರೂಟಿನ್ ದಾಖಲಾಗಿದೆ ಮತ್ತು ಪ್ರಗತಿಯಲ್ಲಿ ಕಾಣಿಸುತ್ತದೆ.', viewProgress: 'ಪ್ರಗತಿ ನೋಡಿ', begin: 'ಆರಂಭಿಸಿ.', nextSet: 'ಮುಂದಿನ ಸೆಟ್ ಆರಂಭಿಸಿ.', setComplete: 'ಸೆಟ್ ಪೂರ್ಣಗೊಂಡಿದೆ. ವಿಶ್ರಾಂತಿ ಮಾಡಿ', seconds: 'ಸೆಕೆಂಡುಗಳು.', workoutDone: 'ವ್ಯಾಯಾಮ ಪೂರ್ಣಗೊಂಡಿದೆ. ಇಂದಿನ ಪ್ರಯತ್ನ ಉತ್ತಮವಾಗಿದೆ.' },
    es: { exercise: 'Ejercicio', of: 'de', guidedMode: 'Modo de rutina guiada', getReady: 'Prepárate', startNow: 'Empezar ahora', activeWorkout: 'Rutina activa', set: 'Serie', tapAfterRep: 'Toca después de cada repetición', pause: 'Pausa', resume: 'Continuar', resetReps: 'Reiniciar reps', restPeriod: 'Descanso', restCopy: 'Relaja los hombros y respira lento antes de la siguiente serie.', skipRest: 'Saltar descanso', complete: 'Rutina completa', wellDone: 'Muy bien', completeCopy: 'Tu rutina prescrita quedó registrada para hoy y aparecerá en progreso.', viewProgress: 'Ver progreso', begin: 'Comienza.', nextSet: 'Comienza la siguiente serie.', setComplete: 'Serie completa. Descansa por', seconds: 'segundos.', workoutDone: 'Rutina completa. Gran esfuerzo hoy.' }
};

export const historyUiText = {
    en: { today: 'Today', progressDashboard: 'Progress dashboard', recovery: 'recovery', days: 'days', streak: 'Streak', consistency: 'Consistency', totalLogged: 'Total reps logged', last28: 'Last 28 days', activeDays: 'active days', less: 'Less', more: 'More', recentActivity: 'Recent activity', noActivity: 'No activity logged yet.', exercisesCompleted: 'exercises completed', progress: 'Progress' },
    hi: { today: 'आज', progressDashboard: 'प्रगति डैशबोर्ड', recovery: 'रिकवरी', days: 'दिन', streak: 'स्ट्रीक', consistency: 'नियमितता', totalLogged: 'कुल रेप दर्ज', last28: 'पिछले 28 दिन', activeDays: 'सक्रिय दिन', less: 'कम', more: 'अधिक', recentActivity: 'हाल की गतिविधि', noActivity: 'अभी कोई गतिविधि दर्ज नहीं है।', exercisesCompleted: 'व्यायाम पूरे', progress: 'प्रगति' },
    ta: { today: 'இன்று', progressDashboard: 'முன்னேற்ற பலகை', recovery: 'மீட்பு', days: 'நாட்கள்', streak: 'தொடர்ச்சி', consistency: 'நிலைத்தன்மை', totalLogged: 'மொத்த பதிவுகள்', last28: 'கடைசி 28 நாட்கள்', activeDays: 'செயலில் இருந்த நாட்கள்', less: 'குறைவு', more: 'அதிகம்', recentActivity: 'சமீபத்திய செயல்பாடு', noActivity: 'இன்னும் செயல்பாடு பதிவு செய்யப்படவில்லை.', exercisesCompleted: 'உடற்பயிற்சிகள் முடிந்தது', progress: 'முன்னேற்றம்' },
    te: { today: 'ఈరోజు', progressDashboard: 'ప్రగతి డ్యాష్‌బోర్డ్', recovery: 'రికవరీ', days: 'రోజులు', streak: 'వరుస', consistency: 'నియమితత్వం', totalLogged: 'మొత్తం నమోదైన రెప్స్', last28: 'గత 28 రోజులు', activeDays: 'సక్రియ రోజులు', less: 'తక్కువ', more: 'ఎక్కువ', recentActivity: 'ఇటీవలి కార్యకలాపం', noActivity: 'ఇంకా కార్యాచరణ నమోదు కాలేదు.', exercisesCompleted: 'వ్యాయామాలు పూర్తయ్యాయి', progress: 'ప్రగతి' },
    kn: { today: 'ಇಂದು', progressDashboard: 'ಪ್ರಗತಿ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', recovery: 'ಚೇತರಿಕೆ', days: 'ದಿನಗಳು', streak: 'ಸರಣಿ', consistency: 'ನಿಯಮಿತತೆ', totalLogged: 'ಒಟ್ಟು ದಾಖಲಾದ ರೆಪ್‌ಗಳು', last28: 'ಕಳೆದ 28 ದಿನಗಳು', activeDays: 'ಸಕ್ರಿಯ ದಿನಗಳು', less: 'ಕಡಿಮೆ', more: 'ಹೆಚ್ಚು', recentActivity: 'ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆ', noActivity: 'ಇನ್ನೂ ಯಾವುದೇ ಚಟುವಟಿಕೆ ದಾಖಲಾಗಿಲ್ಲ.', exercisesCompleted: 'ವ್ಯಾಯಾಮಗಳು ಪೂರ್ಣಗೊಂಡಿವೆ', progress: 'ಪ್ರಗತಿ' },
    es: { today: 'Hoy', progressDashboard: 'Panel de progreso', recovery: 'recuperación', days: 'días', streak: 'Racha', consistency: 'Consistencia', totalLogged: 'Reps registradas', last28: 'Últimos 28 días', activeDays: 'días activos', less: 'Menos', more: 'Más', recentActivity: 'Actividad reciente', noActivity: 'Aún no hay actividad registrada.', exercisesCompleted: 'ejercicios completados', progress: 'Progreso' }
};

const localizedExerciseNames = {
    en: {
        'Quad Sets': 'Quad Sets',
        'Glute Bridges': 'Glute Bridges',
        'Wall Slides': 'Wall Slides',
        'Ankle Pumps': 'Ankle Pumps',
        'Heel Slides': 'Heel Slides',
        'Straight Leg Raise': 'Straight Leg Raise',
        'Clamshells': 'Clamshells',
        'Seated Knee Extension': 'Seated Knee Extension'
    },
    hi: {
        'Quad Sets': 'क्वाड सेट्स',
        'Glute Bridges': 'ग्लूट ब्रिज',
        'Wall Slides': 'वॉल स्लाइड्स',
        'Ankle Pumps': 'एंकल पंप्स',
        'Heel Slides': 'हील स्लाइड्स',
        'Straight Leg Raise': 'स्ट्रेट लेग रेज',
        'Clamshells': 'क्लैमशेल्स',
        'Seated Knee Extension': 'बैठकर घुटना सीधा करना'
    },
    ta: {
        'Quad Sets': 'க்வாட் செட்ஸ்',
        'Glute Bridges': 'குளூட் பிரிட்ஜ்',
        'Wall Slides': 'சுவர் ஸ்லைடுகள்',
        'Ankle Pumps': 'கணுக்கால் பம்புகள்',
        'Heel Slides': 'குதிகால் ஸ்லைடுகள்',
        'Straight Leg Raise': 'நேராக கால் உயர்த்துதல்',
        'Clamshells': 'கிளாம்ஷெல்ஸ்',
        'Seated Knee Extension': 'உட்கார்ந்த முழங்கால் நீட்டிப்பு'
    },
    te: {
        'Quad Sets': 'క్వాడ్ సెట్స్',
        'Glute Bridges': 'గ్లూట్ బ్రిడ్జ్',
        'Wall Slides': 'వాల్ స్లైడ్స్',
        'Ankle Pumps': 'ఆంకిల్ పంప్స్',
        'Heel Slides': 'హీల్ స్లైడ్స్',
        'Straight Leg Raise': 'స్ట్రెయిట్ లెగ్ రైజ్',
        'Clamshells': 'క్లామ్‌షెల్స్',
        'Seated Knee Extension': 'కూర్చుని మోకాలి ఎక్స్‌టెన్షన్'
    },
    kn: {
        'Quad Sets': 'ಕ್ವಾಡ್ ಸೆಟ್ಸ್',
        'Glute Bridges': 'ಗ್ಲೂಟ್ ಬ್ರಿಡ್ಜ್',
        'Wall Slides': 'ವಾಲ್ ಸ್ಲೈಡ್ಸ್',
        'Ankle Pumps': 'ಗಿಡ್ಡಲು ಪಂಪ್ಸ್',
        'Heel Slides': 'ಹಿಮ್ಮಡಿ ಸ್ಲೈಡ್ಸ್',
        'Straight Leg Raise': 'ನೇರ ಕಾಲು ಎತ್ತುವುದು',
        'Clamshells': 'ಕ್ಲಾಮ್‌ಶೆಲ್ಸ್',
        'Seated Knee Extension': 'ಕುಳಿತ ಮೊಣಕಾಲು ವಿಸ್ತರಣೆ'
    },
    es: {
        'Quad Sets': 'Contracciones de Cuádriceps',
        'Glute Bridges': 'Puente de Glúteos',
        'Wall Slides': 'Deslizamientos en Pared',
        'Ankle Pumps': 'Bombeos de Tobillo',
        'Heel Slides': 'Deslizamientos de Talón',
        'Straight Leg Raise': 'Elevación de Pierna Recta',
        'Clamshells': 'Clamshells',
        'Seated Knee Extension': 'Extensión de Rodilla Sentado'
    }
};

const exerciseContent = [
    {
        id: 'ex1',
        exercise: 'Quad Sets',
        targetMuscles: 'Quadriceps',
        imageUrl: '/quadsets.jpeg',
        instructions: {
            english: [
                'Sit or lie down with your leg straight.',
                'Tighten the muscles on the front of your thigh.',
                'Push the back of your knee gently toward the floor.',
                'Hold the contraction for 5 seconds.',
                'Relax slowly and breathe normally.',
                'Repeat for the recommended repetitions.'
            ],
            hindi: [
                'पैर को सीधा रखकर बैठें या लेटें।',
                'जांघ के सामने वाले मांसपेशियों को कसें।',
                'घुटने के पीछे के हिस्से को धीरे से फर्श की ओर दबाएं।',
                'इस संकुचन को 5 सेकंड तक रखें।',
                'धीरे-धीरे आराम दें और सामान्य रूप से सांस लें।',
                'बताई गई संख्या तक दोहराएं।'
            ],
            tamil: [
                'காலை நேராக வைத்து உட்காரவும் அல்லது படுக்கவும்.',
                'தொண்டையின் முன்பகுதி தசைகளை இறுக்கவும்.',
                'முழங்காலின் பின்பகுதியை தரையில் மெதுவாக அழுத்தவும்.',
                '5 விநாடிகள் அந்த நிலையை வைத்திருக்கவும்.',
                'மெதுவாக தளர்த்தி சாதாரணமாக சுவாசிக்கவும்.',
                'தேவையான எண்ணிக்கைக்கு மீண்டும் செய்யவும்.'
            ],
            telugu: [
                'కాలను నేరుగా ఉంచి కూర్చోండి లేదా పడుకోండి.',
                'తొడ ముందు భాగంలోని కండరాలను బిగించండి.',
                'మోకాలి వెనుక భాగాన్ని నేల వైపు మెల్లగా నొక్కండి.',
                '5 సెకన్లు అలాగే ఉంచండి.',
                'మెల్లగా రిలాక్స్ అవుతూ సాధారణంగా శ్వాసించండి.',
                'సూచించిన సంఖ్యలో మళ్లీ చేయండి.'
            ],
            kannada: [
                'ಕಾಲನ್ನು ನೇರವಾಗಿ ಇಟ್ಟು ಕುಳಿತುಕೊಳ್ಳಿ ಅಥವಾ ಮಲಗಿ.',
                'ತೊಡೆಯ ಮುಂಭಾಗದ ಸ್ನಾಯುಗಳನ್ನು ಬಿಗಿಗೊಳಿಸಿ.',
                'ಮಂಡಿಯ ಹಿಂಭಾಗವನ್ನು ನೆಲದ ಕಡೆ ನಿಧಾನವಾಗಿ ಒತ್ತಿರಿ.',
                '5 ಸೆಕೆಂಡುಗಳ ಕಾಲ ಹಿಡಿದುಕೊಳ್ಳಿ.',
                'ನಿಧಾನವಾಗಿ ಸಡಿಲಿಸಿ ಮತ್ತು ಸಾಮಾನ್ಯವಾಗಿ ಉಸಿರಾಡಿ.',
                'ಅಗತ್ಯ ಸಂಖ್ಯೆಯ ಬಾರಿ ಪುನರಾವರ್ತಿಸಿ.'
            ],
            spanish: [
                'Siéntese o acuéstese con la pierna recta.',
                'Apriete los músculos de la parte frontal del muslo.',
                'Empuje suavemente la parte posterior de la rodilla hacia el suelo.',
                'Mantenga la contracción durante 5 segundos.',
                'Relájese lentamente y respire normalmente.',
                'Repita las veces recomendadas.'
            ]
        }
    },
    {
        id: 'ex2',
        exercise: 'Glute Bridges',
        targetMuscles: 'Glutes / Hamstrings',
        imageUrl: '/glutebridges.jpeg',
        instructions: {
            english: [
                'Lie on your back with knees bent.',
                'Keep your feet flat on the floor hip-width apart.',
                'Tighten your core and glute muscles.',
                'Lift your hips upward slowly.',
                'Hold for a few seconds at the top.',
                'Lower your hips back down slowly.'
            ],
            hindi: [
                'घुटनों को मोड़कर पीठ के बल लेटें।',
                'पैरों को कूल्हों की चौड़ाई पर फर्श पर सपाट रखें।',
                'कोर और ग्लूट मांसपेशियों को कसें।',
                'कूल्हों को धीरे-धीरे ऊपर उठाएं।',
                'ऊपर कुछ सेकंड तक रुकें।',
                'कूल्हों को धीरे-धीरे वापस नीचे लाएं।'
            ],
            tamil: [
                'முழங்கால்களை மடக்கி முதுகில் படுக்கவும்.',
                'கால்களை தோளளவு அகலத்தில் தரையில் வைக்கவும்.',
                'வயிற்று மற்றும் இடுப்பு தசைகளை இறுக்கவும்.',
                'இடுப்பைப் மெதுவாக மேலே தூக்கவும்.',
                'மேலே சில விநாடிகள் நிலையை வைத்திருக்கவும்.',
                'மெதுவாக கீழே இறக்கவும்.'
            ],
            telugu: [
                'మోకాళ్లు వంచి వెన్నుపై పడుకోండి.',
                'పాదాలను నేలపై భుజాల వెడల్పుతో ఉంచండి.',
                'కోర్ మరియు గ్లూట్ కండరాలను బిగించండి.',
                'నడుమును మెల్లగా పైకి ఎత్తండి.',
                'పైభాగంలో కొన్ని సెకన్లు ఉండండి.',
                'మెల్లగా కిందకు దించండి.'
            ],
            kannada: [
                'ಮಂಡಿಗಳನ್ನು ಮಡಚಿ ಬೆನ್ನಿನ ಮೇಲೆ ಮಲಗಿ.',
                'ಪಾದಗಳನ್ನು ಭುಜ ಅಗಲದಲ್ಲಿ ನೆಲದ ಮೇಲೆ ಇಡಿ.',
                'ಕೋರ್ ಮತ್ತು ಹಿಪ್ ಸ್ನಾಯುಗಳನ್ನು ಬಿಗಿಗೊಳಿಸಿ.',
                'ನಿತಂಬವನ್ನು ನಿಧಾನವಾಗಿ ಮೇಲಕ್ಕೆತ್ತಿ.',
                'ಮೇಲ್ಭಾಗದಲ್ಲಿ ಕೆಲವು ಕ್ಷಣ ಹಿಡಿದುಕೊಳ್ಳಿ.',
                'ನಿಧಾನವಾಗಿ ಮತ್ತೆ ಕೆಳಗೆ ಇಳಿಸಿ.'
            ],
            spanish: [
                'Acuéstese boca arriba con las rodillas dobladas.',
                'Mantenga los pies apoyados en el suelo al ancho de las caderas.',
                'Apriete el abdomen y los glúteos.',
                'Levante las caderas lentamente.',
                'Mantenga la posición unos segundos arriba.',
                'Baje las caderas lentamente.'
            ]
        }
    },
    {
        id: 'ex3',
        exercise: 'Wall Slides',
        targetMuscles: 'Shoulders / Scapula',
        imageUrl: '/wallslides.jpeg',
        instructions: {
            english: ['Stand with your back against a wall.', 'Keep your arms bent at 90 degrees.', 'Press your arms gently against the wall.', 'Slide your arms upward slowly.', 'Move only as far as comfortable.', 'Return slowly to the starting position.'],
            hindi: ['पीठ को दीवार से लगाकर खड़े हों।', 'बाहों को 90 डिग्री पर मोड़कर रखें।', 'बाहों को दीवार पर धीरे से दबाएं।', 'बाहों को धीरे-धीरे ऊपर सरकाएं।', 'केवल उतना ही जाएं जितना आरामदायक हो।', 'धीरे-धीरे शुरुआती स्थिति में लौटें।'],
            tamil: ['சுவரில் முதுகை சாய்த்து நிற்கவும்.', 'கைகளை 90 டிகிரியில் மடக்கவும்.', 'கைகளை சுவரில் மெதுவாக அழுத்தவும்.', 'கைகளை மெதுவாக மேலே நகர்த்தவும்.', 'வசதியாக இருக்கும் அளவுக்கு மட்டுமே நகர்த்தவும்.', 'மெதுவாக ஆரம்ப நிலைக்கு திரும்பவும்.'],
            telugu: ['గోడకు వెన్నను ఆనించి నిలబడండి.', 'చేతులను 90 డిగ్రీలలో వంచండి.', 'చేతులను గోడకు మెల్లగా ఒత్తండి.', 'చేతులను నెమ్మదిగా పైకి జరపండి.', 'సౌకర్యంగా ఉన్నంతవరకు మాత్రమే కదలండి.', 'మళ్లీ నెమ్మదిగా ప్రారంభ స్థితికి రండి.'],
            kannada: ['ಗೋಡೆಯಿಗೆ ಬೆನ್ನು ತಾಗಿ ನಿಲ್ಲಿ.', 'ಕೈಗಳನ್ನು 90 ಡಿಗ್ರಿಯಲ್ಲಿ ಮಡಚಿ ಇಡಿ.', 'ಕೈಗಳನ್ನು ಗೋಡೆಯ ಮೇಲೆ ನಿಧಾನವಾಗಿ ಒತ್ತಿರಿ.', 'ಕೈಗಳನ್ನು ನಿಧಾನವಾಗಿ ಮೇಲಕ್ಕೆ ಸರಿಸಿ.', 'ಆರಾಮವಾಗಿರುವ ಮಟ್ಟಿಗೆ ಮಾತ್ರ ಚಲಿಸಿ.', 'ಮತ್ತೆ ನಿಧಾನವಾಗಿ ಆರಂಭಿಕ ಸ್ಥಿತಿಗೆ ಬನ್ನಿ.'],
            spanish: ['Párese con la espalda contra la pared.', 'Mantenga los brazos doblados a 90 grados.', 'Presione suavemente los brazos contra la pared.', 'Deslice los brazos lentamente hacia arriba.', 'Muévase solo hasta donde sea cómodo.', 'Regrese lentamente a la posición inicial.']
        }
    },
    {
        id: 'ex4',
        exercise: 'Ankle Pumps',
        targetMuscles: 'Calves / Circulation',
        imageUrl: '/anklepumps.jpeg',
        instructions: {
            english: ['Sit or lie comfortably with legs extended.', 'Point your toes away from your body.', 'Then pull your toes back toward you.', 'Move your ankles slowly and smoothly.', 'Keep your legs relaxed during the exercise.', 'Repeat continuously for the recommended duration.'],
            hindi: ['पैरों को फैलाकर आराम से बैठें या लेटें।', 'पैर की उंगलियों को शरीर से दूर की ओर करें।', 'फिर उंगलियों को अपनी ओर खींचें।', 'टखनों को धीरे और सहज रूप से हिलाएं।', 'व्यायाम के दौरान पैरों को आराम में रखें।', 'बताई गई अवधि तक लगातार दोहराएं।'],
            tamil: ['கால்களை நீட்டி வசதியாக உட்காரவும் அல்லது படுக்கவும்.', 'கால்விரல்களை உடலிலிருந்து வெளியே நோக்கி நகர்த்தவும்.', 'பின்னர் கால்விரல்களை உங்களிடம் நோக்கி இழுக்கவும்.', 'கணுக்கால்களை மெதுவாக நகர்த்தவும்.', 'பயிற்சியின் போது கால்களை தளர்வாக வைத்திருக்கவும்.', 'தேவையான நேரத்திற்கு தொடர்ந்து செய்யவும்.'],
            telugu: ['కాళ్లను చాపి సౌకర్యంగా కూర్చోండి లేదా పడుకోండి.', 'పాద వేళ్లను బయటికి చూపించండి.', 'తర్వాత వేళ్లను మీవైపు లాగండి.', 'మడమలను నెమ్మదిగా కదపండి.', 'వ్యాయామ సమయంలో కాళ్లను రిలాక్స్‌గా ఉంచండి.', 'సూచించిన సమయం వరకు కొనసాగించండి.'],
            kannada: ['ಕಾಲುಗಳನ್ನು ಚಾಚಿ ಆರಾಮವಾಗಿ ಕುಳಿತುಕೊಳ್ಳಿ ಅಥವಾ ಮಲಗಿ.', 'ಪಾದದ ಬೆರಳುಗಳನ್ನು ಹೊರಗೆ ತೋರಿಸಿ.', 'ನಂತರ ಅವನ್ನು ನಿಮ್ಮ ಕಡೆಗೆ ಎಳೆಯಿರಿ.', 'ಗಿಡ್ಡಲುಗಳನ್ನು ನಿಧಾನವಾಗಿ ಚಲಿಸಿ.', 'ವ್ಯಾಯಾಮದ ಸಮಯದಲ್ಲಿ ಕಾಲುಗಳನ್ನು ಸಡಿಲವಾಗಿಡಿ.', 'ಅಗತ್ಯ ಸಮಯದವರೆಗೆ ಪುನರಾವರ್ತಿಸಿ.'],
            spanish: ['Siéntese o acuéstese cómodamente con las piernas extendidas.', 'Apunte los dedos de los pies hacia afuera.', 'Luego tire de los dedos hacia usted.', 'Mueva los tobillos lenta y suavemente.', 'Mantenga las piernas relajadas durante el ejercicio.', 'Repita continuamente el tiempo recomendado.']
        }
    },
    {
        id: 'ex5',
        exercise: 'Heel Slides',
        targetMuscles: 'Knee Mobility',
        imageUrl: '/legraises.jpeg',
        instructions: {
            english: ['Lie on your back with legs straight.', 'Slowly slide one heel toward your hips.', 'Bend your knee as much as comfortable.', 'Keep your heel touching the floor.', 'Slide the leg back to the starting position.', 'Repeat with controlled movements.'],
            hindi: ['पैरों को सीधा रखकर पीठ के बल लेटें।', 'एक एड़ी को धीरे-धीरे कूल्हों की ओर सरकाएं।', 'घुटने को आरामदायक सीमा तक मोड़ें।', 'एड़ी को फर्श से छूते रहने दें।', 'पैर को वापस शुरुआती स्थिति में सरकाएं।', 'नियंत्रित गति से दोहराएं।'],
            tamil: ['கால்களை நேராக வைத்து முதுகில் படுக்கவும்.', 'ஒரு குதிகாலையை மெதுவாக இடுப்பை நோக்கி இழுக்கவும்.', 'வசதியாக இருக்கும் வரை முழங்காலை மடக்கவும்.', 'குதிகாலை தரையில் வைத்திருக்கவும்.', 'மீண்டும் ஆரம்ப நிலைக்கு நகர்த்தவும்.', 'கட்டுப்பாட்டுடன் மீண்டும் செய்யவும்.'],
            telugu: ['కాళ్లు నేరుగా ఉంచి వెన్నుపై పడుకోండి.', 'ఒక మడమను నెమ్మదిగా నడుము వైపు జార్చండి.', 'సౌకర్యంగా ఉన్నంతవరకు మోకాలి వంచండి.', 'మడమ నేలపై ఉండేలా చూడండి.', 'మళ్లీ ప్రారంభ స్థితికి తీసుకురండి.', 'నియంత్రణతో పునరావృతం చేయండి.'],
            kannada: ['ಕಾಲುಗಳನ್ನು ನೇರವಾಗಿ ಇಟ್ಟು ಬೆನ್ನಿನ ಮೇಲೆ ಮಲಗಿ.', 'ಒಂದು ಹಿಮ್ಮಡಿಯನ್ನು ನಿಧಾನವಾಗಿ ನಿತಂಬದ ಕಡೆಗೆ ಸರಿಸಿ.', 'ಆರಾಮವಾಗುವ ಮಟ್ಟಿಗೆ ಮಂಡಿಯನ್ನು ಮಡಚಿ.', 'ಹಿಮ್ಮಡಿ ನೆಲಕ್ಕೆ ತಾಗಿರಲಿ.', 'ಮತ್ತೆ ಆರಂಭಿಕ ಸ್ಥಿತಿಗೆ ತರುವುದು.', 'ನಿಯಂತ್ರಿತ ಚಲನೆಯೊಂದಿಗೆ ಪುನರಾವರ್ತಿಸಿ.'],
            spanish: ['Acuéstese boca arriba con las piernas rectas.', 'Deslice lentamente un talón hacia las caderas.', 'Doble la rodilla lo más cómodo posible.', 'Mantenga el talón en contacto con el suelo.', 'Deslice la pierna de regreso a la posición inicial.', 'Repita con movimientos controlados.']
        }
    },
    {
        id: 'ex6',
        exercise: 'Straight Leg Raise',
        targetMuscles: 'Quadriceps / Hip Flexors',
        imageUrl: '/straightlegraises.jpeg',
        instructions: {
            english: ['Lie on your back with one knee bent and one leg straight.', 'Tighten the thigh muscle of the straight leg.', 'Keep the knee straight and toes pointing upward.', 'Lift the straight leg slowly to the height of the bent knee.', 'Hold briefly without swinging.', 'Lower the leg slowly with control.'],
            hindi: ['एक घुटना मोड़कर और एक पैर सीधा रखकर पीठ के बल लेटें।', 'सीधे पैर की जांघ की मांसपेशी कसें।', 'घुटने को सीधा और उंगलियों को ऊपर रखें।', 'सीधे पैर को धीरे-धीरे मुड़े घुटने की ऊंचाई तक उठाएं।', 'बिना झटके थोड़ी देर रोकें।', 'पैर को नियंत्रण से धीरे नीचे लाएं।'],
            tamil: ['ஒரு முழங்காலை மடக்கி, மற்றொரு காலை நேராக வைத்து முதுகில் படுக்கவும்.', 'நேரான காலின் தொடை தசையை இறுக்கவும்.', 'முழங்காலை நேராகவும் விரல்களை மேலே நோக்கியும் வைத்திருக்கவும்.', 'நேரான காலை மடக்கிய முழங்காலின் உயரம் வரை மெதுவாக தூக்கவும்.', 'அசைக்காமல் சிறிது நேரம் வைத்திருக்கவும்.', 'காலை கட்டுப்பாட்டுடன் மெதுவாக இறக்கவும்.'],
            telugu: ['ఒక మోకాలి వంచి, మరో కాలును నేరుగా ఉంచి వెన్నుపై పడుకోండి.', 'నేరుగా ఉన్న కాలి తొడ కండరాన్ని బిగించండి.', 'మోకాలి నేరుగా ఉంచి వేళ్లను పైకి చూపించండి.', 'నేరుగా ఉన్న కాలును వంచిన మోకాలి ఎత్తు వరకు నెమ్మదిగా ఎత్తండి.', 'ఊపకుండా కొద్దిసేపు ఉంచండి.', 'నియంత్రణతో కాలును నెమ్మదిగా దించండి.'],
            kannada: ['ಒಂದು ಮಂಡಿಯನ್ನು ಮಡಚಿ, ಮತ್ತೊಂದು ಕಾಲನ್ನು ನೇರವಾಗಿ ಇಟ್ಟು ಬೆನ್ನಿನ ಮೇಲೆ ಮಲಗಿ.', 'ನೇರ ಕಾಲಿನ ತೊಡೆಯ ಸ್ನಾಯುವನ್ನು ಬಿಗಿಗೊಳಿಸಿ.', 'ಮಂಡಿಯನ್ನು ನೇರವಾಗಿ ಮತ್ತು ಬೆರಳುಗಳನ್ನು ಮೇಲಕ್ಕೆ ಇಡಿ.', 'ನೇರ ಕಾಲನ್ನು ಮಡಚಿದ ಮಂಡಿಯ ಎತ್ತರಕ್ಕೆ ನಿಧಾನವಾಗಿ ಎತ್ತಿ.', 'ಊಗಿಸದೆ ಸ್ವಲ್ಪ ಹಿಡಿದುಕೊಳ್ಳಿ.', 'ನಿಯಂತ್ರಣದಿಂದ ಕಾಲನ್ನು ನಿಧಾನವಾಗಿ ಇಳಿಸಿ.'],
            spanish: ['Acuéstese boca arriba con una rodilla doblada y una pierna recta.', 'Apriete el músculo del muslo de la pierna recta.', 'Mantenga la rodilla recta y los dedos apuntando hacia arriba.', 'Levante lentamente la pierna recta hasta la altura de la rodilla doblada.', 'Mantenga brevemente sin balancear.', 'Baje la pierna lentamente con control.']
        }
    },
    {
        id: 'ex7',
        exercise: 'Clamshells',
        targetMuscles: 'Hip Stabilizers',
        imageUrl: '/clamshells.jpeg',
        instructions: {
            english: ['Lie on your side with knees bent and feet together.', 'Keep your hips stacked and your core gently active.', 'Keep your feet touching.', 'Lift the top knee slowly like opening a shell.', 'Do not roll your hips backward.', 'Lower the knee slowly and repeat.'],
            hindi: ['घुटनों को मोड़कर और पैरों को साथ रखकर करवट में लेटें।', 'कूल्हों को एक-दूसरे के ऊपर रखें और कोर को हल्का सक्रिय रखें।', 'पैरों को छूते रहने दें।', 'ऊपरी घुटने को धीरे-धीरे खोलें जैसे खोल खुल रहा हो।', 'कूल्हों को पीछे न घुमाएं।', 'घुटने को धीरे नीचे लाएं और दोहराएं।'],
            tamil: ['முழங்கால்களை மடக்கி, பாதங்களை ஒன்றாக வைத்து பக்கமாக படுக்கவும்.', 'இடுப்புகளை ஒன்றின் மேல் ஒன்று வைத்துக் கொண்டு வயிற்றை மெதுவாக செயல்படுத்தவும்.', 'பாதங்கள் ஒன்றோடொன்று தொட வேண்டும்.', 'மேல் முழங்காலை சிப்பி திறப்பது போல மெதுவாக உயர்த்தவும்.', 'இடுப்பை பின்னால் சுழற்ற வேண்டாம்.', 'முழங்காலை மெதுவாக கீழே இறக்கி மீண்டும் செய்யவும்.'],
            telugu: ['మోకాళ్లు వంచి, పాదాలు కలిపి పక్కగా పడుకోండి.', 'నడుమును ఒకదానిపై ఒకటి ఉంచి కోర్‌ను స్వల్పంగా బిగించండి.', 'పాదాలు కలిసేలా ఉంచండి.', 'పై మోకాలని షెల్ తెరిచినట్లు నెమ్మదిగా పైకి ఎత్తండి.', 'నడుమును వెనక్కి తిప్పవద్దు.', 'మోకాలని నెమ్మదిగా దించి మళ్లీ చేయండి.'],
            kannada: ['ಮಂಡಿಗಳನ್ನು ಮಡಚಿ, ಪಾದಗಳನ್ನು ಸೇರಿಸಿ ಬದಿಯಾಗಿ ಮಲಗಿ.', 'ನಿತಂಬಗಳನ್ನು ಒಂದರ ಮೇಲೆ ಒಂದು ಇಟ್ಟು ಕೋರ್ ಅನ್ನು ಸೌಮ್ಯವಾಗಿ ಚುರುಕುಗೊಳಿಸಿ.', 'ಪಾದಗಳು ಒಂದಕ್ಕೊಂದು ತಾಗಿರಲಿ.', 'ಮೇಲಿನ ಮಂಡಿಯನ್ನು ಶೆಲ್ ತೆರೆಯುವಂತೆ ನಿಧಾನವಾಗಿ ಎತ್ತಿ.', 'ನಿತಂಬಗಳನ್ನು ಹಿಂದೆ ತಿರುಗಿಸಬೇಡಿ.', 'ಮಂಡಿಯನ್ನು ನಿಧಾನವಾಗಿ ಇಳಿಸಿ ಪುನರಾವರ್ತಿಸಿ.'],
            spanish: ['Acuéstese de lado con las rodillas dobladas y los pies juntos.', 'Mantenga las caderas alineadas y el abdomen ligeramente activo.', 'Mantenga los pies tocándose.', 'Levante lentamente la rodilla superior como abriendo una concha.', 'No gire las caderas hacia atrás.', 'Baje la rodilla lentamente y repita.']
        }
    },
    {
        id: 'ex8',
        exercise: 'Seated Knee Extension',
        targetMuscles: 'Quadriceps',
        imageUrl: '/seatedkneeExtension.jpeg',
        instructions: {
            english: ['Sit tall on a chair with both feet flat.', 'Keep your back supported and shoulders relaxed.', 'Slowly straighten one knee forward.', 'Tighten the thigh muscle at the top.', 'Hold briefly without locking the knee hard.', 'Lower the foot slowly back to the floor.'],
            hindi: ['कुर्सी पर सीधे बैठें और दोनों पैर फर्श पर सपाट रखें।', 'पीठ को सहारा दें और कंधों को आराम में रखें।', 'एक घुटने को धीरे-धीरे आगे सीधा करें।', 'ऊपर जांघ की मांसपेशी कसें।', 'घुटने को जोर से लॉक किए बिना थोड़ी देर रोकें।', 'पैर को धीरे से वापस फर्श पर लाएं।'],
            tamil: ['நாற்காலியில் நேராக உட்கார்ந்து இரு பாதங்களையும் தரையில் வைக்கவும்.', 'முதுகுக்கு ஆதரவு கொடுத்து தோள்களை தளர்த்தவும்.', 'ஒரு முழங்காலை மெதுவாக முன்புறம் நேராக்கவும்.', 'மேலே தொடை தசையை இறுக்கவும்.', 'முழங்காலை அதிகமாக பூட்டாமல் சிறிது நேரம் வைத்திருக்கவும்.', 'பாதத்தை மெதுவாக தரைக்கு இறக்கவும்.'],
            telugu: ['కుర్చీలో నిటారుగా కూర్చొని రెండు పాదాలను నేలపై ఉంచండి.', 'వెన్నుకు సపోర్ట్ ఇచ్చి భుజాలను రిలాక్స్ చేయండి.', 'ఒక మోకాలని నెమ్మదిగా ముందుకు నేరుగా చేయండి.', 'పైభాగంలో తొడ కండరాన్ని బిగించండి.', 'మోకాలని బలంగా లాక్ చేయకుండా కొద్దిసేపు ఉంచండి.', 'పాదాన్ని నెమ్మదిగా నేలపైకి దించండి.'],
            kannada: ['ಕುರ್ಚಿಯಲ್ಲಿ ನೇರವಾಗಿ ಕುಳಿತು ಎರಡೂ ಪಾದಗಳನ್ನು ನೆಲದ ಮೇಲೆ ಇಡಿ.', 'ಬೆನ್ನಿಗೆ ಬೆಂಬಲ ನೀಡಿ ಭುಜಗಳನ್ನು ಸಡಿಲಗೊಳಿಸಿ.', 'ಒಂದು ಮಂಡಿಯನ್ನು ನಿಧಾನವಾಗಿ ಮುಂದೆ ನೇರಗೊಳಿಸಿ.', 'ಮೇಲ್ಭಾಗದಲ್ಲಿ ತೊಡೆಯ ಸ್ನಾಯುವನ್ನು ಬಿಗಿಗೊಳಿಸಿ.', 'ಮಂಡಿಯನ್ನು ಕಠಿಣವಾಗಿ ಲಾಕ್ ಮಾಡದೆ ಸ್ವಲ್ಪ ಹಿಡಿದುಕೊಳ್ಳಿ.', 'ಪಾದವನ್ನು ನಿಧಾನವಾಗಿ ನೆಲಕ್ಕೆ ಇಳಿಸಿ.'],
            spanish: ['Siéntese erguido en una silla con ambos pies apoyados.', 'Mantenga la espalda apoyada y los hombros relajados.', 'Estire lentamente una rodilla hacia adelante.', 'Apriete el músculo del muslo arriba.', 'Mantenga brevemente sin bloquear fuerte la rodilla.', 'Baje el pie lentamente al suelo.']
        }
    }
];

export const getExerciseGuide = (exerciseNameOrId, language) => {
    const item = exerciseContent.find((exercise) => (
        exercise.id === exerciseNameOrId ||
        exercise.exercise.toLowerCase() === String(exerciseNameOrId).toLowerCase()
    ));
    if (!item) return null;

    const key = languageKey[language] || 'english';
    const instructions = item.instructions[key] || item.instructions.english;
    const translatedName = localizedExerciseNames[language]?.[item.exercise] || item.exercise;

    return {
        id: item.id,
        name: translatedName,
        difficulty: 'Beginner',
        total_reps: '3 sets x 10-12 reps',
        primary_benefit: item.targetMuscles,
        imageUrl: item.imageUrl,
        voice_intro: `${translatedName}. ${instructions[0]}`,
        steps: instructions.map((instruction, index) => ({
            heading: `Step ${index + 1}`,
            instruction,
            voice_guidance: instruction
        })),
        pro_tips: instructions.slice(-2),
        completion_message: instructions[instructions.length - 1]
    };
};
