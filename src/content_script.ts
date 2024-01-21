(async () => {
    const { status } = await chrome.runtime.sendMessage('getStatus') as { status: boolean }
    console.log('status', status)
    if (status) {
        const btnEl = document.getElementById('btn')
        console.log('btnEl', btnEl)
        if (btnEl)
            btnEl.textContent = status ? 'Disable' : 'Enable'
    }
})()