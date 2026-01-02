const style = document.createElement('style');
style.textContent = `
.time-check-banner {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(255, 99, 71, 0.95);
  color: white;
  padding: 12px 18px;
  border-radius: 8px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  z-index: 100000;
  animation: fadeIn 0.5s ease-out;
}
@keyframes fadeIn {
  from {opacity: 0; transform: translateY(10px);}
  to {opacity: 1; transform: translateY(0);}
}
`;
document.head.appendChild(style);

let bannerShown = false;
const thresholdSeconds = 120;

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "tick") {
    if (msg.seconds >= thresholdSeconds && !bannerShown) {
      showBanner(msg.seconds);
      bannerShown = true;
    }
  }
});

chrome.runtime.sendMessage({ action: "requestTimer" });

function showBanner(seconds) {
  if (document.getElementById("time-check-banner")) return;

  const banner = document.createElement("div");
  banner.id = "time-check-banner";
  banner.textContent = `⏱ You've been on this page for ${seconds} seconds. Still reading?`;
  banner.className = "time-check-banner";

  document.body.appendChild(banner);

  setTimeout(() => banner.remove(), 10000);
}
