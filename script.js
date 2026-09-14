gsap.registerPlugin(ScrollTrigger);

// Cursor
const cursor = document.querySelector(".cursor");
let mx = 0,
  my = 0,
  cx = 0,
  cy = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
});
(function animateCursor() {
  cx += (mx - cx) * 0.2;
  cy += (my - cy) * 0.2;
  cursor.style.left = cx + "px";
  cursor.style.top = cy + "px";
  requestAnimationFrame(animateCursor);
})();
document
  .querySelectorAll("a, button, .title, .theme-toggle-btn")
  .forEach((el) => {
    el.addEventListener("mouseenter", () =>
      gsap.to(cursor, { width: 36, height: 36, duration: 0.3 }),
    );
    el.addEventListener("mouseleave", () =>
      gsap.to(cursor, { width: 12, height: 12, duration: 0.3 }),
    );
  });

//   Dark light theme controller
const themeToggle = document.getElementById("themeToggle");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "dark") {
  document.body.classList.add("dark-mode");
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  let theme = "light";
  if (document.body.classList.contains("dark-mode")) {
    theme = "dark";
  }
  localStorage.setItem("theme", theme);
});

// Hamburger menu
const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileNavOverlay = document.getElementById("mobileNavOverlay");
const mobileNavClose = document.getElementById("mobileNavClose");

function closeMobileNav() {
  mobileNavOverlay.classList.remove("open");
  mobileNavOverlay.classList.remove("open");
  document.body.style.overflow = "";
}

if (hamburgerBtn && mobileNavOverlay) {
  hamburgerBtn.addEventListener("click", () => {
    const isOpen = hamburgerBtn.classList.toggle("open");
    mobileNavOverlay.classList.toggle("open", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  // Close button inside overlay
  if (mobileNavClose) {
    mobileNavClose.addEventListener("click", closeMobileNav);
  }

  // Close on nav link click
  mobileNavOverlay.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileNav);
  });
}

// Svg line lengths
document.querySelectorAll(".constellation-lines path").forEach((path) => {
  const length = path.getTotalLength();
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;
});

// Page load
const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

tl.to(".site-header", { opacity: 1, duration: 0.8 }, 0)
  .to(
    ".title-inner",
    { y: 0, duration: 1.1, stagger: 0.08, ease: "power4.out" },
    0.2,
  )
  .to(".hero-desc", { opacity: 1, duration: 0.8 }, 0.9)
  .from(".hero-desc", { y: 20, duration: 0.8 }, 0.9)
  .to(".cta-btn", { opacity: 1, duration: 0.7 }, 1.0)
  .from(".cta-btn", { y: 20, duration: 0.7 }, 1.0)
  .to(
    ".tile",
    {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      stagger: { each: 0.07, from: "center" },
      ease: "elastic.out(1, 0.6)",
    },
    0.5,
  )
  .from(
    ".tile",
    {
      scale: 0,
      duration: 1.2,
      stagger: { each: 0.07, from: "center" },
      ease: "elastic.out(1, 0.6)",
    },
    0.5,
  )
  .to(
    ".constellation-lines path",
    { strokeDashoffset: 0, duration: 1.5, stagger: 0.06, ease: "power2.inOut" },
    0.8,
  )
  .to("workspace", { opacity: 1, duration: 0.8 }, 1.6)
  .from(".fpill", { y: 3 });
