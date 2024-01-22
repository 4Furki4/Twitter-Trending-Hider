(async () => {
    const { hidden } = await chrome.runtime.sendMessage('getStatus')
    console.log('content script', hidden)
})()