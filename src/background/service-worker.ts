chrome.runtime.onInstalled.addListener(({ reason }) => {
    if (reason === 'install') {
        chrome.storage.local.set({
            enabled: true,
        })
    }
    if (reason === 'update') {
        chrome.storage.local.get('enabled').then(({ enabled }) => {
            console.log('enabled', enabled)
            if (enabled === undefined) {
                chrome.storage.local.set({
                    enabled: true,
                })
            }
        })
    }
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === 'getStatus') {
        chrome.storage.local.get('enabled').then(({ enabled }) => {
            sendResponse({ status: enabled })
        })
        return true
    }
})