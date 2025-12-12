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
    <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition flex flex-col">

      <!-- Image -->
      <img src="${p.img}" class="w-full h-40 object-cover" />

      <!-- Content -->
      <div class="p-4 flex flex-col flex-grow">
        
        <h3 class="text-xl font-semibold">${escapeHtml(p.title)}</h3>

        <p class="text-sm text-gray-600 mt-1 flex-grow">
          ${escapeHtml(p.desc)}
        </p>

        <span class="inline-block mt-2 mb-2 text-xs px-3 py-1 bg-sky-100 text-sky-600 rounded-full w-fit">
          ${escapeHtml(p.category)}
        </span>

        <!-- Button aligned to bottom -->
        <a 
          href="./programform.html"
          class=" block text-center bg-[#770325] text-white py-2 rounded-lg text-sm hover:bg-[#5e021d] transition">
          Book Free Masterclass
        </a>

      </div>

    </div>
  `;
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
