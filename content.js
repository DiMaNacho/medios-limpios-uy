const version = "v1.0.31";

const borrarElementos = (elementos) =>
  elementos.forEach(($el) => $el !== null && $el.remove());

const limpiarObservador = (sendResponse) => {
  console.log("limpiarObservador", version);

  const $body = document.body;
  const observer = new MutationObserver((mutations) =>
    mutations.forEach(({ type }) => {
      if (type === "childList") {
        const elementos = [
          ...document.querySelectorAll(".auspicios"),
          ...document.querySelectorAll(".contenedor__publicidad"),
          ...document.querySelectorAll(".mensaje_paywall"),
          ...document.querySelectorAll(".mensaje_paywall2"),
          ...document.querySelectorAll(".publicidad"),
          ...document.querySelectorAll("#modalLogin"),
          ...document.querySelectorAll("#suscripcion_btn"),
        ];

        if (elementos.length > 0) borrarElementos(elementos);
        else observer.disconnect();
      }
    })
  );
  observer.observe($body, { childList: true, subtree: true });

  const $cuerpo = document.querySelector(".cuerpo.intro_");

  if ($cuerpo !== null) {
    const $content = document.querySelector("#cuerpo_piano");
    const contenidoOriginal = $content.innerHTML;
    const observerContenido = new MutationObserver((mutations) =>
      mutations.forEach(({ type }) => {
        if (type === "childList" && $content.innerHTML === "") {
          $cuerpo.innerHTML = contenidoOriginal;
          observerContenido.disconnect();
        }
        if ($cuerpo.classList.contains("fade"))
          $cuerpo.classList.remove("fade");
      })
    );
    observerContenido.observe($cuerpo, { childList: true, subtree: true });
  }

  sendResponse({ content: "ok" });
};

const limpiarElPais = (sendResponse) => {
  console.log("limpiarElPais", version);

  const $body = document.body;
  const observer = new MutationObserver((mutations) =>
    mutations.forEach(({ type }) => {
      if (type === "childList") {
        const elementos = [
          ...document.querySelectorAll(".floatingContainer"),
          ...document.querySelectorAll(".Page-above.loaded"),
          ...document.querySelectorAll("#popupLogin"),
        ];

        if (elementos.length > 0) borrarElementos(elementos);
        else observer.disconnect();
      }
    })
  );
  observer.observe($body, { childList: true, subtree: true });

  $body.style = "overflow: initial;";

  console.log("body", $body);

  sendResponse({ content: "ok" });
};

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) =>
    ({
      observador: limpiarObservador(sendResponse),
      elpais: limpiarElPais(sendResponse),
    }[request.action])
);
