// Navegación móvil, animaciones de entrada y apertura de espacios embebibles.
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

document.querySelectorAll(".embed-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".resource-card");
    const embedArea = card?.querySelector(".card-embed");

    if (!embedArea) return;

    const willOpen = embedArea.hidden;
    embedArea.hidden = !willOpen;
    button.textContent = willOpen ? "Ocultar contenido" : "Ver contenido";
  });
});
