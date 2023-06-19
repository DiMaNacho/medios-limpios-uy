if (typeof limpiarObservador !== "function")
  var limpiarObservador = () => {
    console.log("limpiarObservador");

    const borrarElementos = (elementos) =>
      elementos.forEach(($el) => $el !== null && $el.remove());

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
  };

if (typeof limpiarObservador === "function") limpiarObservador();
