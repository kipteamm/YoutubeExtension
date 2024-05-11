chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ youtubeVisitAllowed: false });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab && tab.url) {
        chrome.storage.local.get('youtubeVisitAllowed', (result) => {
            if (!tab.url.includes('youtube.com') && !tab.url.includes('youtu.be')) return;

            const youtubeVisitAllowed = result.youtubeVisitAllowed || false;

            if (!youtubeVisitAllowed) {
                chrome.tabs.update(tabId, { url: chrome.runtime.getURL('warning.html') });
            }
        });
    }
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
    chrome.tabs.query({ url: '*://*.youtube.com/*' }, (tabs) => {
        if (tabs.length === 0) {
            chrome.storage.local.set({ youtubeVisitAllowed: false });
        }
    });
});
