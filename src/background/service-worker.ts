
chrome.runtime.onInstalled.addListener(({ reason }) => {
    if (reason === 'install') {
        chrome.storage.local.set({
            hidden: false,
        })
    }
    if (reason === 'update') {
        chrome.storage.local.get('hidden').then(({ hidden }) => {
            console.log('hidden', hidden)
            if (hidden === undefined) {
                chrome.storage.local.set({
                    hidden: false,
                })
            }
        })
    }
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === 'getStatus') {
        chrome.storage.local.get('hidden').then(({ hidden }) => {
            handleScripting(hidden)
            sendResponse({ response: hidden })
        })
        return true
    }
    if (typeof message === 'object' && message.action === 'toggle') {
        chrome.storage.local.set({
            hidden: message.hidden
        }).then(() => {
            sendResponse({ response: message.hidden })
        })
        handleScripting(message.hidden)
        return true
    }
})


function handleScripting(hidden: boolean) {
    chrome.tabs.query({ url: 'https://twitter.com/*' }, (tabs) => {
        tabs.forEach(async (tab) => {
            if (hidden) {
                await chrome.scripting.insertCSS({
                    target: { tabId: tab.id! },
                    css: 'div[data-testid="sidebarColumn"] section[aria-labelledby*="accessible-list-"] { display: none !important; }'
                })
                return
            }
            await chrome.scripting.insertCSS({
                target: { tabId: tab.id! },
                css: 'div[data-testid="sidebarColumn"] section[aria-labelledby*="accessible-list-"] { display: block !important; }'
            })
        })
    })
}