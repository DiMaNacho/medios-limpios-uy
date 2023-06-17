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
          ...document.querySelectorAll("#suscripcion_btn"),
          ...document.querySelectorAll(".mensaje_paywall"),
          ...document.querySelectorAll(".mensaje_paywall2"),
          ...document.querySelectorAll(".publicidad"),
          ...document.querySelectorAll(".contenedor__publicidad"),
          ...document.querySelectorAll("#modalLogin"),
          ...document.querySelectorAll(".auspicios"),
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

  borrarElementos([
    document.querySelector("#popupLogin"),
    document.querySelector("#floatingContainer"),
    document.querySelector(".Page-above.loaded"),
  ]);

  const $body = document.body;

  $body.style = "overflow: initial;";

  console.log("body", $body);

  sendResponse({ content: "ok" });
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "observador") limpiarObservador(sendResponse);
  if (request.action === "elpais") limpiarElPais(sendResponse);
});
