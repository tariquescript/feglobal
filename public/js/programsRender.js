document.addEventListener("DOMContentLoaded", () => {
  const container =
    document.getElementById("programsList") ||
    document.getElementById("programsGrid");

  if (!container || typeof programsData === "undefined") return;

  // On home page, show only 3
  const isHome = container.id === "programsGrid";
  const list = isHome ? programsData.slice(0, 3) : programsData;

  list.forEach(p => {
    const card = document.createElement("div");
    card.className =
      "bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col";

    card.innerHTML = `
      <img src="${p.img}" class="h-44 w-full object-cover rounded-t-xl" />
      <div class="p-5 flex flex-col flex-grow">
        <span class="text-xs font-semibold uppercase tracking-wide
          text-[#770325] bg-[#770325]/10 px-3 py-1 rounded-full w-max">
          ${p.category}
        </span>

        <h3 class="mt-3 text-lg font-bold text-slate-800">${p.title}</h3>

        <p class="mt-3 text-sm text-slate-600 line-clamp-4">
          ${p.desc}
        </p>

        <a href="./programform.html"
           class="mt-5 border border-[#770325] text-[#770325]
                  py-2 rounded-lg text-sm font-medium text-center
                  hover:bg-[#770325] hover:text-white transition">
          Book Free Masterclass
        </a>
      </div>
    `;

    container.appendChild(card);
  });
});
