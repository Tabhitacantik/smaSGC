// ===== 1. Menu hamburger =====
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", isOpen);
});

// Tutup menu setelah link diklik (mobile)
navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

// ===== 2. Slider hero =====
const slides = document.querySelectorAll(".slide");
const dotsBox = document.getElementById("dots");
const hero = document.getElementById("beranda");
let current = 0;
let timer;

// Buat dots otomatis sesuai jumlah slide
slides.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.setAttribute("aria-label", `Slide ${i + 1}`);
  dot.addEventListener("click", () => { goTo(i); restart(); });
  dotsBox.appendChild(dot);
});
const dots = dotsBox.querySelectorAll("button");

function goTo(index) {
  slides[current].classList.remove("active");
  dots[current].classList.remove("active");
  current = (index + slides.length) % slides.length;
  slides[current].classList.add("active");
  dots[current].classList.add("active");
}

function start() { timer = setInterval(() => goTo(current + 1), 5000); }
function restart() { clearInterval(timer); start(); }

document.getElementById("next").addEventListener("click", () => { goTo(current + 1); restart(); });
document.getElementById("prev").addEventListener("click", () => { goTo(current - 1); restart(); });
hero.addEventListener("mouseenter", () => clearInterval(timer));
hero.addEventListener("mouseleave", start);

goTo(0);
start();

// ===== 3. Scroll: bayangan header & tombol back-to-top =====
const header = document.getElementById("header");
const toTop = document.getElementById("to-top");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 10);
  toTop.classList.toggle("show", window.scrollY > 400);
});

toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// ===== 4. Menu aktif sesuai section yang terlihat =====
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);
sections.forEach((s) => sectionObserver.observe(s));

// ===== 5. Animasi muncul saat di-scroll =====
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ===== 6. Tahun otomatis di footer =====
document.getElementById("year").textContent = new Date().getFullYear();