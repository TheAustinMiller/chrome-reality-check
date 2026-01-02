document.getElementById("save").onclick = () => {
  const value = parseInt(document.getElementById("threshold").value);
  chrome.storage.sync.set({ threshold: value }, () => {
    alert(`Threshold set to ${value} seconds`);
  });
};
