if (typeof limpiarElPais !== "function")
  var limpiarElPais = () => {
    console.log("limpiarElPais file");

    const borrarElementos = (elementos) =>
      elementos.forEach(($el) => $el !== null && $el.remove());

    const switchTheme = (e) => {
      if (e.target.checked) {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
      }
    };

    const darkMode = () => {
      const toggleClass = "toggle-darkmode";
      if (document.querySelector(`.${toggleClass}`) === null) {
        const $switch = document.createElement("div");
        const $posicion = document.querySelector(".Page-header-authentication");

        $switch.innerHTML = `
          <label class="theme-switch" for="checkbox">
            <input type="checkbox" id="checkbox" />
            <div class="slider round"></div>
          </label>
        `;
        $switch.classList.add("toggle-darkmode");

        $posicion.prepend($switch);
      }

      const $toggleSwitch = document.querySelector(
        '.theme-switch input[type="checkbox"]'
      );
      const currentTheme = localStorage.getItem("theme");

      if (currentTheme) {
        document.documentElement.setAttribute("data-theme", currentTheme);

        if (currentTheme === "dark") {
          $toggleSwitch.checked = true;
        }
      }

      $toggleSwitch.addEventListener("change", switchTheme, false);
    };

    darkMode();

    const $body = document.body;
    const observer = new MutationObserver((mutations) =>
      mutations.forEach(({ type }) => {
        if (type === "childList") {
          const elementos = [
            ...document.querySelectorAll(".adsbygoogle"),
            ...document.querySelectorAll(".floatingContainer"),
            ...document.querySelectorAll(".GoogleDfpAd-Content"),
            ...document.querySelectorAll(".iframeSync"),
            ...document.querySelectorAll(".modal-backdrop"),
            ...document.querySelectorAll(".modal"),
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
