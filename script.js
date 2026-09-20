const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const header = document.querySelector(".site-header");

menuToggle?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll("#mainNav a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("scroll", () => {
  header?.classList.toggle("scrolled", window.scrollY > 14);
}, { passive: true });

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const programmeData = {
  bsc: {
    meta: [["Duration", "4 Years"], ["Medium of Instruction", "English"], ["Affiliation", "JNRC (Jharkhand Nurses Registration Council), Ranchi"]],
    eligibility: [
      "10+2 passed with Physics, Chemistry, Biology and English",
      "Candidate must appear in the combined entrance exam conducted by the Jharkhand Government for admission",
      "Minimum 40% aggregate marks in 10+2 from a recognised board",
      "5% marks relaxation for SC/ST candidates"
    ]
  },
  gnm: {
    meta: [["Duration", "3 Years"], ["Medium of Instruction", "Hindi / English"], ["Affiliation", "JNRC (Jharkhand Nurses Registration Council), Ranchi"]],
    eligibility: [
      "10+2 passed in any stream with English",
      "Candidate must appear in the combined entrance exam conducted by the Jharkhand Government for admission",
      "Minimum 40% aggregate marks in 10+2 from a recognised board",
      "5% marks relaxation for SC/ST candidates"
    ]
  },
  anm: {
    meta: [["Duration", "2 Years"], ["Medium of Instruction", "Hindi / English"], ["Affiliation", "JNRC (Jharkhand Nurses Registration Council), Ranchi"]],
    eligibility: [
      "10+2 passed in any stream",
      "Candidate must appear in the combined entrance exam conducted by the Jharkhand Government for admission",
      "Minimum 40% aggregate marks in 10+2 from a recognised board",
      "5% marks relaxation for SC/ST candidates"
    ]
  }
};

document.querySelectorAll(".programme-open").forEach((button) => {
  const programme = programmeData[button.dataset.programme];
  const card = button.closest(".programme-card");
  if (!programme || !card) return;

  const details = document.createElement("div");
  details.className = "programme-dropdown";
  details.setAttribute("aria-hidden", "true");
  details.innerHTML = `
    <div class="programme-dropdown-inner">
      <div class="dropdown-meta">
        ${programme.meta.map(([label, value]) => `<div class="dropdown-meta-item"><span>${label}</span><strong>${value}</strong></div>`).join("")}
      </div>
      <div class="dropdown-eligibility">
        <h4>Eligibility Criteria</h4>
        <ul class="programme-list">${programme.eligibility.map((item) => `<li>${item}</li>`).join("")}</ul>
      </div>
      <div class="dropdown-guidance">Please speak with the Admissions Team before applying to confirm the latest eligibility criteria, affiliation details and admission process.</div>
      <a href="#contact" class="text-link dropdown-contact">Contact Admissions →</a>
    </div>`;

  button.insertAdjacentElement("afterend", details);
  button.setAttribute("aria-expanded", "false");

  button.addEventListener("click", () => {
    const opening = !card.classList.contains("programme-expanded");

    document.querySelectorAll(".programme-card.programme-expanded").forEach((openCard) => {
      if (openCard !== card) {
        openCard.classList.remove("programme-expanded");
        openCard.querySelector(".programme-open")?.setAttribute("aria-expanded", "false");
        openCard.querySelector(".programme-dropdown")?.setAttribute("aria-hidden", "true");
      }
    });

    card.classList.toggle("programme-expanded", opening);
    button.setAttribute("aria-expanded", String(opening));
    details.setAttribute("aria-hidden", String(!opening));
  });
});

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -45px 0px" });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".main-nav a[href^='#']")];
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    });
  }, { rootMargin: "-38% 0px -52% 0px", threshold: 0 });
  sections.forEach((section) => sectionObserver.observe(section));
}
