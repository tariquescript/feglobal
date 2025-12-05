// public/js/main.js

document.addEventListener('DOMContentLoaded', () => {
  // set footer years
  const year = new Date().getFullYear();
  ['year','year2','year3'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = year;
  });

  // mobile menu toggle
  const mobileBtn = document.getElementById('mobileBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Load programs on index & programs page
if (typeof programsData !== "undefined") {

  const idxGrid = document.getElementById("programsGrid");

  if (idxGrid) {
    // Home page → show only first 3
    populatePrograms(programsData.slice(0, 3));
  } else {
    // Programs page → show all
    populatePrograms(programsData);
  }
}

  // contact form submit
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const statusEl = document.getElementById('contactStatus');
      statusEl.textContent = 'Sending...';

      const payload = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        message: document.getElementById('message').value.trim()
      };

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const body = await res.json();

        if (res.ok) {
          statusEl.textContent = 'Thanks — we will contact you soon.';
          form.reset();
        } else {
          statusEl.textContent = body.error || 'There was an error. Please try again.';
        }
      } catch (err) {
        statusEl.textContent = 'Network error. Please try later.';
      }
    });
  }
});

// Populate programs
function populatePrograms(programs) {
  // index page grid
  const idxGrid = document.getElementById('programsGrid');
  if (idxGrid) {
    idxGrid.innerHTML = programs.length
      ? programs.map(p => programCardHtml(p)).join('')
      : '<div class="col-span-full text-slate-500">No programs found.</div>';
  }

  // programs page list
  const list = document.getElementById('programsList');
  if (list) {
    list.innerHTML = programs.length
      ? programs.map(p => programListItemHtml(p)).join('')
      : '<div class="col-span-full text-slate-500">No programs found.</div>';
  }
}

// program card
function programCardHtml(p) {
  return `
  <article class="bg-white rounded shadow-sm overflow-hidden hover:shadow-md transition">
    
    <img src="${p.img}" class="h-40 w-full object-cover" alt="${escapeHtml(p.title)}">

    <div class="p-4">
      <h3 class="font-semibold text-lg">${escapeHtml(p.title)}</h3>
      <p class="text-sm text-slate-500 mt-2">${escapeHtml(p.desc)}</p>

      <div class="mt-3 flex items-center justify-between text-sm">
        <span class="px-2 py-1 border rounded text-slate-600">${escapeHtml(p.category)}</span>
      </div>
    </div>

  </article>`;
}


// escape HTML
function escapeHtml(unsafe) {
  if (!unsafe && unsafe !== 0) return '';
  return String(unsafe)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
