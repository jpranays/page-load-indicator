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
		overlay.style.height = "4px";
		overlay.style.backgroundColor = "transparent";
		overlay.style.zIndex = "999999";

		const progressBar = document.createElement("div");
		progressBar.id = "__page_loader_bar__";
		progressBar.style.width = "0%";
		progressBar.style.height = "100%";
		progressBar.style.backgroundColor = "#3498db";
		progressBar.style.transition = "width 1.5s ease-out";

		overlay.appendChild(progressBar);
		document.documentElement.appendChild(overlay);

		// Start animating to 90%
		requestAnimationFrame(() => {
			progressBar.style.width = "90%";
		});
	}

	function hideLoader() {
		const overlay = document.getElementById(OVERLAY_ID);
		const progressBar = document.getElementById("__page_loader_bar__");

		if (progressBar) {
			progressBar.style.transition = "width 0.2s ease-in";
			progressBar.style.width = "100%";
			progressBar.addEventListener("transitionend", () => {
				if (overlay) {
					overlay.remove();
				}
			});
		}

		// Wait for animation to finish before removing
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

	// ✅ Avoid showing loader if loaded from BFCache
	window.addEventListener("pageshow", (event) => {
		if (event.persisted) {
			hideLoader(); // page restored from BFCache, no load needed
		}
	});

})();
