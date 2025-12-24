function renderProgramCards(data, targetId) {
  const container = document.getElementById(targetId);
  if (!container) return;

  container.innerHTML = data.map(p => `
    <div class="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col">
      <img src="${p.img}" class="h-40 w-full object-cover" />

      <div class="p-4 flex flex-col flex-grow">
        <span class="text-xs text-[#770325] font-semibold uppercase">
          ${p.category}
        </span>

        <h3 class="mt-2 font-bold text-lg">${p.title}</h3>

        <p class="mt-2 text-sm text-slate-600 line-clamp-3">
          ${p.desc}
        </p>

        <a href="./programform.html"
           class="mt-auto text-center border border-[#770325]
                  text-[#770325] py-2 rounded-lg text-sm
                  hover:bg-[#770325] hover:text-white transition">
          Enquire Now
        </a>
      </div>
    </div>
  `).join("");
}
