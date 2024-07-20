function openYoutube() {
    chrome.storage.local.set({ youtubeVisitAllowed: true }, () => {
        return (window.location.href = "https://www.youtube.com");
    });
}

function openInsta() {
    chrome.storage.local.set({ instaVisitAllowed: true }, () => {
        return (window.location.href = "https://www.instagram.com");
    });
}

if (document?.getElementById("openYoutube")) {
    document
        .getElementById("openYoutube")
        .addEventListener("click", openYoutube);
}

if (document?.getElementById("openInsta")) {
    document.getElementById("openInsta").addEventListener("click", openInsta);
}

function closeTab() {
    return window.close();
}

document.getElementById("closeTab").addEventListener("click", closeTab);
