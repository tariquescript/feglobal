function renderProgramCards(data, targetId, limit = null) {
  const container = document.getElementById(targetId);
  if (!container) return;

  const programs = limit ? data.slice(0, limit) : data;

  if (!programs || programs.length === 0) {
    container.innerHTML =
      '<p class="text-slate-500">No programs available.</p>';
    return;
  }

  container.innerHTML = programs.map(p => `
    <div class="bg-white flex flex-col rounded-xl border shadow-sm
                hover:shadow-lg transition overflow-hidden">

      <!-- Image + Content -->
      <a href="./programform.html" class="block group">
        <img 
          src="${p.img}"
          alt="${p.title}"
          loading="lazy"
          onerror="this.src='./assets/placeholder.jpg'"
          class="h-40 w-full object-cover
                 group-hover:scale-105 transition-transform"
        />

        <div class="p-4">
          <!-- Category -->
          <span class="inline-block text-xs font-semibold
                       text-[#770325] bg-[#770325]/10
                       px-2 py-0.5 rounded-full mb-2">
            ${p.category}
          </span>

          <h3 class="text-lg font-semibold text-slate-800">
            ${p.title}
          </h3>

          <!-- Short description -->
          <p class="text-sm text-slate-500 mt-1 line-clamp-3">
            ${p.desc}
          </p>
        </div>
      </a>

      <!-- CTA -->
      <div class="px-4 pb-4 mt-auto">
        <a
          href="./programform.html"
          aria-label="Enquire about ${p.title}"
          class="block text-center border border-[#770325]
                 text-[#770325] py-2 rounded-lg text-sm font-medium
                 hover:bg-[#770325] hover:text-white transition">
          Enquire Now
        </a>
      </div>

    </div>
  `).join('');
}
