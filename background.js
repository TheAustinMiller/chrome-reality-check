chrome.runtime.onInstalled.addListener(() => {
  console.log("Time-On-Page Reality Check installed!");
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "requestTimer") {
    // Start sending tick messages every second
    let seconds = 0;
    const interval = setInterval(() => {
      seconds++;
      chrome.tabs.sendMessage(sender.tab.id, {
        action: "tick",
        seconds
      });
    }, 1000);

    // Stop interval if tab is closed or navigated
    chrome.tabs.onRemoved.addListener(tabId => {
      if (tabId === sender.tab.id) clearInterval(interval);
    });
  }
});
