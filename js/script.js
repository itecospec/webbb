document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector(".menu-btn");
  const navigation = document.querySelector(".nav");
  const dropdownButtons = document.querySelectorAll(".drop-btn");
  const mobileBreakpoint = 1050;

  function isMobile() {
    return window.innerWidth <= mobileBreakpoint;
  }

  function closeDropdowns() {
    dropdownButtons.forEach(function (button) {
      const item = button.closest(".nav-item");

      if (item) {
        item.classList.remove("open");
      }

      button.setAttribute("aria-expanded", "false");
    });
  }

  function closeNavigation() {
    if (!menuButton || !navigation) return;

    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
    closeDropdowns();
  }

  if (menuButton && navigation) {
    menuButton.setAttribute("aria-expanded", "false");

    menuButton.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      const shouldOpen = !navigation.classList.contains("open");

      navigation.classList.toggle("open", shouldOpen);
      menuButton.setAttribute("aria-expanded", String(shouldOpen));
      document.body.classList.toggle("nav-open", shouldOpen);

      if (!shouldOpen) {
        closeDropdowns();
      }
    });

    navigation.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNavigation);
    });
  }

  dropdownButtons.forEach(function (button) {
    button.setAttribute("aria-expanded", "false");

    button.addEventListener("click", function (event) {
      if (!isMobile()) return;

      event.preventDefault();
      event.stopPropagation();

      const item = button.closest(".nav-item");
      if (!item) return;

      const shouldOpen = !item.classList.contains("open");

      dropdownButtons.forEach(function (otherButton) {
        const otherItem = otherButton.closest(".nav-item");

        if (otherItem && otherItem !== item) {
          otherItem.classList.remove("open");
          otherButton.setAttribute("aria-expanded", "false");
        }
      });

      item.classList.toggle("open", shouldOpen);
      button.setAttribute("aria-expanded", String(shouldOpen));
    });
  });

  document.addEventListener("click", function (event) {
    if (!isMobile()) return;

    if (!event.target.closest(".header")) {
      closeNavigation();
    }
  });

  window.addEventListener("resize", function () {
    if (!isMobile()) {
      closeNavigation();
    }
  });

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const serviceToggle = document.getElementById("servicesToggle");
  const serviceGrid = document.getElementById("homeServiceGrid");

  if (serviceToggle && serviceGrid) {
    serviceToggle.addEventListener("click", function () {
      const isOpen = serviceGrid.classList.toggle("show-all-services");
      serviceToggle.setAttribute("aria-expanded", String(isOpen));

      const label = serviceToggle.querySelector(".services-toggle-label");
      const icon = serviceToggle.querySelector(".services-toggle-icon");

      if (label) {
        label.textContent = isOpen
          ? "Show fewer services"
          : "See all services";
      }

      if (icon) {
        icon.textContent = isOpen ? "↑" : "↓";
      }
    });
  }
});