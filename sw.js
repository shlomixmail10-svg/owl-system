const WEBHOOK = "https://webhook.site/1361d3b1-f231-4039-b4c7-5f2e7677f0b3";

self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));

// פעימת לב עצמאית - פועלת בנפרד מהדף הראשי
setInterval(async () => {
    try {
        await fetch(WEBHOOK, {
            method: 'POST',
            mode: 'no-cors',
            cache: 'no-store',
            body: JSON.stringify({
                event: "CORE_AGENT_PULSE",
                status: "SOVEREIGN_ALIVE",
                ts: new Date().toISOString()
            })
        });
    } catch(e) {}
}, 30000); // שידור בכל 30 שניות בדיוק
