function renderTestimonials(targetId, limit = null) {
  const container = document.getElementById(targetId);
  if (!container) {
    console.error("Container not found:", targetId);
    return;
  }

  const data = limit
    ? testimonialsData.slice(0, limit)
    : testimonialsData;

  container.innerHTML = data.map(t => `
    <div class="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col">

      <!-- IMAGE (TRUST BUILDER) -->
      <div class="relative">
        <img 
          src="${t.image}" 
          alt="${t.name} Visa Success"
          class="w-full h-56 object-contain object-center transition-transform duration-300 hover:scale-105"
"
        />

        <!-- VISA APPROVED BADGE -->
        <span class="absolute top-3 left-3 bg-green-600 text-white
                     text-xs font-semibold px-3 py-1 rounded-full">
          Visa Approved
        </span>
      </div>

      <!-- CONTENT -->
      <div class="p-5 flex flex-col flex-grow">

        <!-- NAME -->
        <h3 class="text-lg font-bold text-slate-800">
          ${t.name}
        </h3>

        <!-- LOCATION -->
        <p class="text-sm text-slate-500">
          ${t.location}
        </p>

        <!-- PROGRAM -->
        <span class="mt-2 inline-block w-max
                     text-xs font-medium
                     text-[#770325] bg-[#770325]/10
                     px-3 py-1 rounded-full">
          ${t.program}
        </span>

        <!-- STARS -->
        <div class="flex gap-1 mt-3 text-yellow-400 text-sm">
          ★★★★★
        </div>

        <!-- REVIEW -->
        <p class="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-4">
          “${t.review}”
        </p>

      </div>
    </div>
  `).join("");
}
