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
});
