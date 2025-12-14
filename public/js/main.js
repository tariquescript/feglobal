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
  const shortDesc = p.desc
    .replace(/\n+/g, " ")        // remove new lines
    .replace(/\s+/g, " ")        // normalize spaces
    .slice(0, 120) + "…";        // limit length

  return `
    <div class="bg-white flex flex-col rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition">

      <!-- Image -->
      <img 
        src="${p.img}" 
        alt="${p.title}" 
        class="h-40 w-full object-cover"
      />

      <!-- Content -->
      <div class="p-4 flex flex-col flex-grow">

        <!-- Category -->
        <span class="text-xs font-semibold uppercase tracking-wide
                     text-[#770325] bg-[#770325]/10
                     px-3 py-1 rounded-full w-max">
          ${p.category}
        </span>

        <!-- Title -->
        <h3 class="mt-3 text-lg font-semibold text-slate-800 leading-snug">
          ${p.title}
        </h3>

        <!-- Short Description -->
        <p class="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">
          ${shortDesc}
        </p>

        <!-- CTA -->
        <a
          href="./programform.html"
          class="mt-auto block text-center bg-[#770325] text-white
                 py-2 rounded-lg text-sm font-medium
                 hover:bg-[#5e021d] transition">
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




// POPUP

function showPopup() {
  const popup = document.getElementById("successPopup");
  const box = document.getElementById("popupBox");

  popup.classList.remove("hidden");
  popup.classList.add("flex");

  setTimeout(() => {
    box.classList.remove("scale-95", "opacity-0");
    box.classList.add("scale-100", "opacity-100");
  }, 50);
  setTimeout(() => {
  closePopup();
}, 3000);
}

function closePopup() {
  const popup = document.getElementById("successPopup");
  const box = document.getElementById("popupBox");

  box.classList.remove("scale-100", "opacity-100");
  box.classList.add("scale-95", "opacity-0");

  setTimeout(() => {
    popup.classList.add("hidden");
    popup.classList.remove("flex");
  }, 300);
}
