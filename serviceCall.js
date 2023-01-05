if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(function(registration) {
            console.log('Service worker registered:', registration);
        })
        .catch(function(error) {
            console.log('Service worker registration failed:', error);
        });
}

function updateOnlineStatus(event) {
    if (navigator.onLine) {
        document.getElementById('status').textContent = 'En ligne';
    } else {
        document.getElementById('status').textContent = 'Hors-ligne';
    }
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);