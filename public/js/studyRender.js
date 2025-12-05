function renderStudyCards(data, targetId) {
  const container = document.getElementById(targetId);

  if (!container) return;

  if (data.length === 0) {
    container.innerHTML = '<div class="text-slate-500">No study abroad options.</div>';
    return;
  }

  container.innerHTML = data.map(item => `
    <a href="./study-${item.slug}.html" 
       class="block bg-white rounded shadow-sm overflow-hidden hover:shadow-lg transition">
      
      <img src="${item.img}" class="h-40 w-full object-cover" />
      
      <div class="p-4">
        <h3 class="text-lg font-semibold">${item.title}</h3>
        <p class="text-sm text-slate-500 mt-1">${item.desc}</p>
      </div>
    </a>
  `).join('');
}
