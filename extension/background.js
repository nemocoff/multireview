// Listen for messages from content scripts (controller.js)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.target === "background") {
        // Broadcast the command to all tabs (or specifically the sender tab's frames)
        if (sender.tab) {
            // Send to all frames in the same tab, ignoring errors if frames aren't ready
            chrome.tabs.sendMessage(sender.tab.id, request.command).catch(() => {
                // Suppress "Receiving end does not exist" error
            });
        }
    }
});
