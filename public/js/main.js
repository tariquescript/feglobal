const API_URL = "https://api.feglobaleducation.com";

document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const year = new Date().getFullYear();
  ["year", "year2", "year3"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = year;
  });

  // Mobile menu
  const mobileBtn = document.getElementById("mobileBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  if (mobileBtn && mobileMenu) mobileBtn.addEventListener("click", () => mobileMenu.classList.toggle("hidden"));

  // Programs display
  if (typeof programsData !== "undefined") {
    const idxGrid = document.getElementById("programsGrid");
    if (idxGrid) populatePrograms(programsData.slice(0, 3));
    else populatePrograms(programsData);
  }

  // Setup forms
  setupForm("contactForm", "contactStatus", `${API_URL}/api/contact`);
  setupForm("programForm", "programStatus", `${API_URL}/api/program-form`);
  setupForm("studyForm", "studyStatus", `${API_URL}/api/study-form`);
});

function setupForm(formId, statusId, endpoint) {
  const form = document.getElementById(formId);
  const statusEl = document.getElementById(statusId);
  if (!form || !statusEl) return;

  form.addEventListener("submit", async e => {
    e.preventDefault();
    statusEl.textContent = "Sending...";

    const payload = {};
    for (const el of form.elements) {
      if (el.name) payload[el.name] = el.value.trim();
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json();
      statusEl.textContent = res.ok && body.success ? "Thanks! We will contact you soon." : (body.error || "Error submitting form");
      if (res.ok && body.success) form.reset();
    } catch (err) {
      console.error(err);
      statusEl.textContent = "Network error. Please try again.";
    }
  });
}

// Programs display helpers
function populatePrograms(programs) {
  const idxGrid = document.getElementById("programsGrid");
  if (idxGrid) idxGrid.innerHTML = programs.length ? programs.map(p => programCardHtml(p)).join("") : '<div class="col-span-full text-slate-500">No programs found.</div>';

  const list = document.getElementById("programsList");
  if (list) list.innerHTML = programs.length ? programs.map(p => programListItemHtml(p)).join("") : '<div class="col-span-full text-slate-500">No programs found.</div>';
}

function programCardHtml(p) {
  const shortDesc = p.desc.replace(/\n+/g, " ").replace(/\s+/g, " ").slice(0, 120) + "…";
  return `
    <div class="bg-white flex flex-col rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition">
      <img src="${p.img}" alt="${p.title}" class="h-40 w-full object-cover" />
      <div class="p-4 flex flex-col flex-grow">
        <span class="text-xs font-semibold uppercase tracking-wide text-[#770325] bg-[#770325]/10 px-3 py-1 rounded-full w-max">${p.category}</span>
        <h3 class="mt-3 text-lg font-semibold text-slate-800 leading-snug">${p.title}</h3>
        <p class="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">${shortDesc}</p>
        <a href="./programform.html" class="mt-2 block text-center bg-[#770325] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#5e021d] transition">Book Free Masterclass</a>
      </div>
    </div>
  `;
}

function programListItemHtml(p) {
  return `<li class="mb-3">${escapeHtml(p.title)}</li>`;
}

function escapeHtml(unsafe) {
  if (!unsafe && unsafe !== 0) return "";
  return String(unsafe).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}
