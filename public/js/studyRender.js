function renderStudyCards(data, targetId) {
  const container = document.getElementById(targetId);

  if (!container) return;

  if (data.length === 0) {
    container.innerHTML = '<div class="text-slate-500">No study abroad options.</div>';
    return;
  }

  container.innerHTML = data.map(item => `
    <div class="bg-white flex flex-col rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition">

      <!-- Clickable area -->
      <a href="./study-${item.slug}.html">
        <img src="${item.img}" class="h-40 w-full object-cover" />

        <div class="p-4">
          <h3 class="text-lg font-semibold">${item.title}</h3>
          <p class="text-sm text-slate-500 mt-1">${item.desc}</p>
        </div>
      </a>

      <!-- Button fixed at bottom -->
      <div class="px-4 pb-4 mt-auto">
        <a 
          href="./studyform.html"
          class="block text-center bg-[#770325] text-white py-2 rounded-lg text-sm hover:bg-[#5e021d] transition">
          Free Counselling
        </a>
      </div>

    </div>
  `).join('');
}
