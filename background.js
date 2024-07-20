chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        youtubeVisitAllowed: false,
        instaVisitAllowed: false,
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab && tab.url) {
        // YouTube
        chrome.storage.local.get("youtubeVisitAllowed", (result) => {
            if (
                !tab.url.includes("youtube.com") &&
                !tab.url.includes("youtu.be")
            )
                return;

            const youtubeVisitAllowed = result.youtubeVisitAllowed || false;

            if (!youtubeVisitAllowed) {
                chrome.tabs.update(tabId, {
                    url: chrome.runtime.getURL("warning_youtube.html"),
                });
            }
        });

        // Instagram
        chrome.storage.local.get("instaVisitAllowed", (result) => {
            if (!tab.url.includes("instagram.com")) return;

            const instaVisitAllowed = result.instaVisitAllowed || false;

            if (!instaVisitAllowed) {
                chrome.tabs.update(tabId, {
                    url: chrome.runtime.getURL("warning_insta.html"),
                });
            }
        });
    }
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
    // YouTube
    chrome.tabs.query({ url: "*://*.youtube.com/*" }, (tabs) => {
        if (tabs.length === 0) {
            chrome.storage.local.set({ youtubeVisitAllowed: false });
        }
    });

    // Instagram
    chrome.tabs.query({ url: "*://*.instagram.com/*" }, (tabs) => {
        if (tabs.length === 0) {
            chrome.storage.local.set({ instaVisitAllowed: false });
        }
    });
});
