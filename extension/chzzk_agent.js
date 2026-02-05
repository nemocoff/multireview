// This script runs INSIDE the Chzzk iframe
// It listens for commands from the Background script

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // 1. Target Filter: If targetUrl is provided, only execute if it matches current URL
    if (message.targetUrl) {
         // Determine if this frame location matches the target
         // Simple check: does href include the video ID or url snippet?
         if (!window.location.href.includes(message.targetUrl)) {
             return; // Ignore command intended for another frame
         }
    }

    const video = document.querySelector('video');
    if (!video) return;

    if (message.action === 'PLAY') {
        video.play().catch(e => console.log('Play error:', e));
    } else if (message.action === 'PAUSE') {
        video.pause();
    } else if (message.action === 'MUTE') {
        video.muted = true;
    } else if (message.action === 'UNMUTE') {
        video.muted = false;
    } else if (message.action === 'SEEK') {
        // Seek relative (e.g., +10, -5)
        if (message.value) {
            video.currentTime += message.value;
        }
    }
});
