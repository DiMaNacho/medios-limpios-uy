if (typeof limpiarElPais !== "function")
  var limpiarElPais = () => {
    console.log("limpiarElPais file");

    const borrarElementos = (elementos) =>
      elementos.forEach(($el) => $el !== null && $el.remove());

    const $body = document.body;
    $body.style = "overflow: initial;";

    const observer = new MutationObserver((mutations) =>
      mutations.forEach(({ type }) => {
        if (type === "childList") {
          const elementos = [
            ...document.querySelectorAll(".adsbygoogle"),
            ...document.querySelectorAll(".floatingContainer"),
            ...document.querySelectorAll(".GoogleDfpAd-Content"),
            ...document.querySelectorAll(".Page-above.loaded"),
            ...document.querySelectorAll(".Page-header-subscribe"),
            ...document.querySelectorAll("#ad-home-inter"),
            ...document.querySelectorAll("#floatingContainer"),
            ...document.querySelectorAll("#google_esf"),
            ...document.querySelectorAll("#popupLogin"),
            ...document.querySelectorAll("ins"),
            ...document.querySelectorAll(
              `img[src*="securepubads.g.doubleclick.net"]`
            ),
            ...document.querySelectorAll(`script[src*="brightspotcdn"]`),
            ...document.querySelectorAll(`script[src*="ev-widgets"]`),
            ...document.querySelectorAll(`script[src*="epd_tools"]`),
            ...document.querySelectorAll(`script[src*="ev-em"]`),
            ...document.querySelectorAll(`script[src*="pubads_impl"]`),
            ...document.querySelectorAll(`div[style*="2147483647"]`),
            ...document.querySelectorAll(`div[style*="6000010"]`),
            ...document.querySelectorAll(`div[style*="2000000"]`),
          ];

          // ArticlePage-lede-content

          if (elementos.length > 0) borrarElementos(elementos);
        }
      })
    );
    observer.observe($body, { childList: true, subtree: true });
  };

if (typeof limpiarElPais === "function") limpiarElPais();
