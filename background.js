chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (
    changeInfo.status === "complete" &&
    tab.url.includes("elobservador.com.uy") &&
    tab.url.startsWith("http")
  )
    chrome.tabs.sendMessage(tabId, { action: "observador" });

  if (
    changeInfo.status === "complete" &&
    tab.url.includes("elpais.com.uy") &&
    tab.url.startsWith("http")
  )
    chrome.tabs.sendMessage(tabId, { action: "elpais" });
});
