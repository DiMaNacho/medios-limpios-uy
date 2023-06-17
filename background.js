chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const isComplete = changeInfo.status === "complete";
  const isWeb = tab.url.startsWith("http");

  if (isComplete && isWeb && tab.url.includes("elobservador.com.uy"))
    chrome.tabs.sendMessage(tabId, { action: "observador" });

  if (isWeb && tab.url.includes("elpais.com.uy"))
    chrome.tabs.sendMessage(tabId, { action: "elpais" });
});
