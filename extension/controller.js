// This script runs on the MultiReview Main Page
// It bridges the gap between the Web Page (App.jsx) and the Extension Background

// Listen for window messages from App.jsx
window.addEventListener("message", (event) => {
    // Only accept messages from the same page
    if (event.source !== window) return;

    if (event.data.type === "EXTENSION_COMMAND") {
        // Relay to Background Script
        chrome.runtime.sendMessage({
            target: "background",
            command: event.data.payload
        });
    }
});

// Notify the web page that the extension is installed
// We can set a hidden element or post a message back
setTimeout(() => {
    window.postMessage({ type: "EXTENSION_LOADED" }, "*");
}, 500);
