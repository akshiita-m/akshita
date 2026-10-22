const menuButton = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

function closeMenu() {
  siteNav?.classList.remove("is-open");
  menuButton?.setAttribute("aria-expanded", "false");
  menuButton?.setAttribute("aria-label", "Open navigation");
}

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  siteNav?.classList.toggle("is-open", isOpen);
});

siteNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

const lightbox = document.querySelector(".lightbox");

document.querySelectorAll("[data-lightbox]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    if (!lightbox) return;
    const image = lightbox.querySelector("img");
    image.src = trigger.dataset.lightbox;
    image.alt = trigger.querySelector("img")?.alt || trigger.dataset.caption || "";
    lightbox.querySelector("p").textContent = trigger.dataset.caption || "";
    lightbox.showModal();
  });
});

lightbox?.querySelector(".lightbox-close")?.addEventListener("click", () => lightbox.close());
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const revealTargets = document.querySelectorAll(
  ".about, .tinkerminds-section, .creative, .engineering, .community, .questions, .notes, .work-access, .experience-section, .experience-contact",
);
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !reduceMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08 },
  );

  revealTargets.forEach((element) => {
    element.classList.add("reveal");
    observer.observe(element);
  });
} else {
  revealTargets.forEach((element) => element.classList.add("is-visible"));
}
