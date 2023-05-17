chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "getContent") {
    const $content = document.querySelector("#cuerpo_piano");

    if ($content !== null) {
      const contenidoOriginal = $content.innerHTML;

      // Crear una instancia del observador de mutación
      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          // Verificar si el contenido de la etiqueta ha cambiado y está vacío
          if (mutation.type === "childList" && $content.innerHTML === "") {
            // Inyectar el contenido de la variable "content"
            $content.innerHTML = contenidoOriginal;

            const $fade = document.querySelector(".cuerpo.fade");
            if ($fade !== null) $fade.classList.remove("fade");

            const $registro = document.querySelector(".mensaje_paywall2");
            if ($registro !== null) $registro.remove();
          }
        });
      });

      // Configurar y comenzar a observar la etiqueta HTML
      var observerConfig = { childList: true, subtree: true };
      observer.observe($content, observerConfig);
    }

    const $fade = document.querySelector(".cuerpo.fade");
    if ($fade !== null) $fade.classList.remove("fade");

    const $banners = document.querySelectorAll(".publicidad");
    if ($banners !== null) $banners.forEach(($banner) => $banner.remove());

    sendResponse({ content: "ok" });
  }
});
