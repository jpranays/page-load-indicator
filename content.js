(function () {
  const OVERLAY_ID = "__page_loader_overlay__";

  function showLoader() {
    if (document.getElementById(OVERLAY_ID)) return;

    const overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = "999999";

    const spinner = document.createElement("div");
    spinner.style.width = "60px";
    spinner.style.height = "60px";
    spinner.style.border = "8px solid #f3f3f3";
    spinner.style.borderTop = "8px solid #3498db";
    spinner.style.borderRadius = "50%";
    spinner.style.animation = "spin 1s linear infinite";
    spinner.style.transition = "all 0.3s ease-in-out";  

    overlay.appendChild(spinner);
    document.documentElement.appendChild(overlay);

    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;

    const head = document.head || document.getElementsByTagName("head")[0];
    (head || document.documentElement).appendChild(style);
  }

  function hideLoader() {
    const overlay = document.getElementById(OVERLAY_ID);
    if (overlay) overlay.remove();
  }

  // ✅ Trigger on unload (but NOT for back/forward BFCache restores)
  window.addEventListener("beforeunload", () => {
    showLoader();
  });

  // ✅ Handle fresh load
  if (document.readyState !== "complete") {
    // showLoader();
  } else {
    hideLoader();
  }

  document.addEventListener("readystatechange", () => {
    if (document.readyState === "complete") {
      hideLoader();
    }
  });

//   window.addEventListener("load", hideLoader);

  // ✅ Avoid showing loader if loaded from BFCache
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      hideLoader(); // page restored from BFCache, no load needed
    }
  });
})();
