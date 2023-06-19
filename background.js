const webs = [
  { nombre: "elobservador", url: "elobservador.com.uy" },
  { nombre: "elpais", url: "elpais.com.uy" },
];

const processSite = ({ tabId, url, web }) => {
  if (url.hostname.includes(web.url)) {
    chrome.scripting.executeScript({
      target: { tabId },
      files: [`./js/${web.nombre}.js`],
    });
    chrome.scripting.insertCSS({
      target: { tabId },
      files: [`./styles/${web.nombre}.css`],
    });
  }
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const url = new URL(tab.url);
  for (const web of webs) processSite({ tabId, url, web });
});
