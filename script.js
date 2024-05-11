function openYoutube() {
    chrome.storage.local.set({ youtubeVisitAllowed: true }, () => {
        return window.location.href = 'https://www.youtube.com';
    });
}

document.getElementById('openYoutube').addEventListener('click', openYoutube);

function closeTab() {
    return window.close();
}

document.getElementById('closeTab').addEventListener('click', closeTab);