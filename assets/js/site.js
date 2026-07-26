/* ═══════════════════════════════════════════════════════════
   José A. Mendoza — shared behavior
   Theme toggle · scroll reveal · active nav · contact form
   ═══════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  var root = document.documentElement;

  /* ── Theme toggle (initial theme set by inline pre-paint script) ── */
  var btn = document.getElementById("themeToggle");
  if (btn) {
    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      btn.setAttribute("aria-pressed", next === "dark" ? "true" : "false");
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  /* ── Footer year (progressive; safe if element absent) ── */
  var y = document.getElementById("year");
  if (y) {
    var d = new Date();
    y.textContent = d.getFullYear();
  }

  /* ── Reveal on scroll ── */
  var els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && els.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.05 });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add("in"); });
  }

  /* ── Active nav highlight while scrolling (aria-current) ── */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-menu a[href^='#']"));
  if (navLinks.length && "IntersectionObserver" in window) {
    var map = {};
    navLinks.forEach(function (a) {
      var id = a.getAttribute("href").slice(1);
      var sec = document.getElementById(id);
      if (sec) map[id] = a;
    });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          navLinks.forEach(function (a) { a.removeAttribute("aria-current"); });
          if (map[e.target.id]) map[e.target.id].setAttribute("aria-current", "page");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    Object.keys(map).forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) spy.observe(sec);
    });
  }

  /* ── Contact form (Web3Forms AJAX; graceful fallback to normal POST) ── */
  var form = document.getElementById("contactForm");
  if (form) {
    var status = document.getElementById("formStatus");
    var key = form.getAttribute("data-access-key") || "";
    form.addEventListener("submit", function (ev) {
      // If the placeholder key wasn't replaced, let the browser POST normally.
      if (!key || key.indexOf("YOUR_") === 0) return;
      ev.preventDefault();
      if (status) { status.className = "form-status"; status.textContent = "Sending…"; }
      var data = new FormData(form);
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      })
        .then(function (r) { return r.json(); })
        .then(function (json) {
          if (json.success) {
            form.reset();
            if (status) { status.className = "form-status ok"; status.textContent = "Thanks — your message is on its way. I'll reply soon."; }
          } else {
            if (status) { status.className = "form-status err"; status.textContent = "Something went wrong. Please email me directly."; }
          }
        })
        .catch(function () {
          if (status) { status.className = "form-status err"; status.textContent = "Network error. Please email me directly."; }
        });
    });
  }
})();
