const tokenInput = document.getElementById('token-input');
const statusMessage = document.getElementById('statusMessage');

chrome.storage.sync.get('githubToken').then((data) => {
    if (data.githubToken) {
        tokenInput.value = data.githubToken;
        statusMessage.textContent = 'Token saved (optional fallback)';
    }
});

tokenInput.addEventListener('focus', async () => {
    await browser.permissions.request({
        origins: ["https://github.com/*"],
    });
});

tokenInput.addEventListener('input', () => {
    const token = tokenInput.value.trim();
    if (token) {
        chrome.storage.sync.set({ githubToken: token });
        statusMessage.textContent = 'Token saved (optional fallback)';
    } else {
        chrome.storage.sync.remove("githubToken");
        statusMessage.textContent = 'Token removed';
    }
});
