/* ================================
   Global Config
================================ */
const API_URL = "https://api.feglobaleducation.com";

/* ================================
   DOM Ready
================================ */
document.addEventListener("DOMContentLoaded", () => {
  setFooterYear();
  setupMobileMenu();
  initForms();
});

/* ================================
   Footer Year
================================ */
function setFooterYear() {
  const year = new Date().getFullYear();
  ["year", "year2", "year3"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = year;
  });
}

/* ================================
   Mobile Menu Toggle
================================ */
function setupMobileMenu() {
  const mobileBtn = document.getElementById("mobileBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (!mobileBtn || !mobileMenu) return;

  mobileBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

/* ================================
   Forms Initialization
================================ */
function initForms() {
  setupForm("contactForm", "contactStatus", `${API_URL}/api/contact`);
  setupForm("programForm", "programStatus", `${API_URL}/api/program-form`);
  setupForm("studyForm", "studyStatus", `${API_URL}/api/study-form`);
}

/* ================================
   Generic Form Handler
================================ */
function setupForm(formId, statusId, endpoint) {
  const form = document.getElementById(formId);
  const statusEl = document.getElementById(statusId);

  if (!form || !statusEl) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    statusEl.textContent = "Sending...";
    statusEl.className = "text-sm text-slate-500 mt-2";

    const payload = {};
    Array.from(form.elements).forEach(el => {
      if (el.name) payload[el.name] = el.value.trim();
    });

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        statusEl.textContent = "✅ Submitted successfully. We will contact you soon.";
        statusEl.className = "text-sm text-green-600 mt-2";
        form.reset();
      } else {
        statusEl.textContent = data.error || "Something went wrong.";
        statusEl.className = "text-sm text-red-600 mt-2";
      }

    } catch (err) {
      console.error(err);
      statusEl.textContent = "Network error. Please try again.";
      statusEl.className = "text-sm text-red-600 mt-2";
    }
  });
}

/* ================================
   Lucide Icons
================================ */
document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    lucide.createIcons();
  }
});
