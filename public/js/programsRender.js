function renderProgramCards(data, targetId) {
  const container = document.getElementById(targetId);
  if (!container) return;

  container.innerHTML = data.map(p => `
    <div class="bg-white flex flex-col rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition">

      <!-- Image -->
      <img src="${p.img}" alt="${p.title}"
           class="h-44 w-full object-cover" />

      <!-- Content -->
      <div class="p-5 flex flex-col flex-grow">

        <!-- Category -->
        <span class="text-xs font-semibold uppercase tracking-wide
                     text-[#770325] bg-[#770325]/10
                     px-3 py-1 rounded-full w-max">
          ${p.category}
        </span>

        <!-- Title -->
        <h3 class="mt-3 text-lg font-bold text-slate-800 leading-snug">
          ${p.title}
        </h3>

        <!-- Scrollable Description -->
        <div
          class="mt-3 text-sm text-slate-600 leading-relaxed
                 whitespace-pre-line
                 max-h-56 overflow-y-auto pr-2
                 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
          ${p.desc}
        </div>

        <!-- CTA -->
        <a href="./programform.html"
           class="mt-5 block text-center border border-[#770325]
                  text-[#770325] py-2 rounded-lg text-sm font-medium
                  hover:bg-[#770325] hover:text-white transition">
          Enquire Now
        </a>

      </div>
    </div>
  `).join("");
}
