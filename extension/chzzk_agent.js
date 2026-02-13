// This script runs INSIDE the Chzzk iframe
// It listens for commands from the Background script

// 0. Force Desktop Viewport (Prevent Mobile Layout on small iframes)
function forceDesktop() {
    let meta = document.querySelector('meta[name="viewport"]');
    if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'viewport';
        document.head.appendChild(meta);
    }
    // Setting width to a desktop resolution forces the responsive design to use desktop layout
    // initial-scale can be adjusted if text is too small, but usually 1920 width handles it
    meta.content = 'width=1280, initial-scale=0.8, user-scalable=yes'; 
}
// Attempt to run immediately
forceDesktop();
// And ensure it sticks after load
window.addEventListener('DOMContentLoaded', forceDesktop);
window.addEventListener('load', () => {
    forceDesktop();
    setTimeout(autoSetupPlayer, 1500); // Wait for player to init
});

// 1. Auto Setup Player (Wide Mode & Close Chat)
function autoSetupPlayer() {
    let attempts = 0;
    // Periodically check for "Wide Mode" button
    const interval = setInterval(() => {
        attempts++;
        if (attempts > 20) clearInterval(interval); // Stop after 10s

        // A. Wide Mode: Click first to reveal chat
        const theaterBtn = document.querySelector('button[aria-label="넓은 화면"]');
        if (theaterBtn) {
            theaterBtn.click();
            console.log("[ChzzkAgent] Enabled Wide Mode");
            clearInterval(interval); // Stop this loop once found and clicked

            // B. Close Chat: Wait for UI transition (0.5s) then click close button
            setTimeout(() => {
                // Selector based on class name pattern (ignoring hash)
                const chatCloseBtn = document.querySelector('button[class*="chatting_close_button"]');
                if (chatCloseBtn) {
                    chatCloseBtn.click();
                    console.log("[ChzzkAgent] Closed Chat");
                } else {
                     // Retry a few times for chat button specifically
                     let chatAttempts = 0;
                     const chatInterval = setInterval(() => {
                         chatAttempts++;
                         if (chatAttempts > 5) clearInterval(chatInterval);
                         const retryBtn = document.querySelector('button[class*="chatting_close_button"]');
                         if (retryBtn) {
                             retryBtn.click();
                             console.log("[ChzzkAgent] Closed Chat (Retry)");
                             clearInterval(chatInterval);
                         }
                     }, 500);
                }
            }, 500);
        }
    }, 500);
}

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
