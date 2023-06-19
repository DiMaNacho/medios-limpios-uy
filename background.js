const webs = [
  { nombre: "elobservador", url: "elobservador.com.uy" },
  { nombre: "elpais", url: "elpais.com.uy" },
];

const processSite = async ({ tabId, url, web }) => {
  if (url.hostname.includes(web.url)) {
    await chrome.scripting.executeScript({
      target: { tabId },
      files: [`./js/${web.nombre}.js`],
    });
    await chrome.scripting.insertCSS({
      target: { tabId },
      files: [`./styles/${web.nombre}.css`],
    });
  }
};

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  const url = new URL(tab.url);
  for (const web of webs) processSite({ tabId, url, web });
});
