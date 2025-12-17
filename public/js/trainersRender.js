function renderTrainers(targetId) {
  const container = document.getElementById(targetId);
  if (!container) return;

  container.innerHTML = trainersData.map(t => `
    <div class="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">

      <!-- Image -->
      <img
        src="${t.image}"
        alt="${t.name}"
        class="w-full h-64 object-contain object-top"
      />

      <!-- Content -->
      <div class="p-6">

        <h3 class="text-xl font-bold text-slate-800">
          ${t.name}
        </h3>

        <p class="mt-1 text-sm font-medium text-[#770325]">
          ${t.role}
        </p>

        <p class="mt-4 text-sm text-slate-600 leading-relaxed">
          ${t.description}
        </p>

        <!-- Expertise -->
        <div class="mt-5 flex flex-wrap gap-2">
          ${t.expertise.map(skill => `
            <span class="text-xs px-3 py-1 rounded-full
                         bg-[#770325]/10 text-[#770325]">
              ${skill}
            </span>
          `).join("")}
        </div>

      </div>
    </div>
  `).join("");
}
