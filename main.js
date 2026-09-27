(function () {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const mobileNav = document.querySelector("#mobile-nav");
  const backdrop = document.querySelector(".nav-backdrop");
  const tabs = document.querySelectorAll(".menu-tab");
  const panels = document.querySelectorAll(".menu-panel");

  function closeNav() {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Открыть меню");
    mobileNav.classList.remove("is-open");
    backdrop.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    mobileNav.setAttribute("aria-hidden", "true");
  }

  function openNav() {
    mobileNav.hidden = false;
    backdrop.hidden = false;
    mobileNav.setAttribute("aria-hidden", "false");
    requestAnimationFrame(function () {
      mobileNav.classList.add("is-open");
      backdrop.classList.add("is-open");
    });
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Закрыть меню");
    document.body.classList.add("nav-open");
  }

  toggle.addEventListener("click", function () {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    if (expanded) {
      closeNav();
    } else {
      openNav();
    }
  });

  backdrop.addEventListener("click", closeNav);

  mobileNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeNav();
    }
  });

  window.addEventListener(
    "scroll",
    function () {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    },
    { passive: true }
  );

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      const target = tab.getAttribute("data-tab");

      tabs.forEach(function (item) {
        const active = item === tab;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-selected", String(active));
      });

      panels.forEach(function (panel) {
        const match = panel.id === "panel-" + target;
        panel.classList.toggle("is-active", match);
        panel.hidden = !match;
      });
    });
  });
})();
