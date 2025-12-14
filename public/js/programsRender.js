const programsList = document.getElementById("programsList");

programsData.forEach((p) => {
  const card = document.createElement("div");
  card.className =
    "bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col";

  card.innerHTML = `
    <img src="${p.img}" alt="${p.title}"
         class="h-44 w-full object-cover rounded-t-xl" />

    <div class="p-5 flex flex-col flex-grow">

      <span class="text-xs font-semibold uppercase tracking-wide
                   text-[#770325] bg-[#770325]/10
                   px-3 py-1 rounded-full w-max">
        ${p.category}
      </span>

      <h3 class="mt-3 text-lg font-bold text-slate-800">
        ${p.title}
      </h3>

      <div class="mt-3 text-sm text-slate-600 leading-relaxed
                  whitespace-pre-line max-h-64 overflow-y-auto pr-2">
        ${p.desc}
      </div>

      <a href="./programform.html"
         class="mt-5 border border-[#770325] text-[#770325]
                py-2 rounded-lg text-sm font-medium text-center
                hover:bg-[#770325] hover:text-white transition">
        Book Free Masterclass
      </a>
    </div>
  `;

  programsList.appendChild(card);
});
