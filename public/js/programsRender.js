const programsContainer = document.getElementById("programsList");

function renderPrograms() {
  programsData.forEach(program => {
    programsContainer.innerHTML += `
      <div class="bg-white  rounded-xl shadow-md overflow-hidden hover:shadow-lg transition p-4">
        <img src="${program.img}" class="w-full h-40 object-cover rounded-lg" />

        <h3 class="text-xl font-semibold mt-3">${program.title}</h3>
        <p class="text-sm text-gray-600 mt-1">${program.desc}</p>

        <span class="inline-block  mt-2 text-xs px-3 py-1 bg-sky-100 text-sky-600 rounded-full">
          ${program.category}
        </span>
       
      </div>
    `;
  });
}


renderPrograms();
