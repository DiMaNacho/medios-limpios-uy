chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete" && tab.url.startsWith("http")) {
    chrome.tabs.sendMessage(tabId, { action: "getContent" });
  }
});
