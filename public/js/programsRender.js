const programsContainer = document.getElementById("programsList");

function renderPrograms() {
  programsData.forEach(program => {
    programsContainer.innerHTML += `
    <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition p-4 flex flex-col">

  <img src="${program.img}" class="w-full h-40 object-cover rounded-lg" />

  <h3 class="text-xl font-semibold mt-3">${program.title}</h3>

  <p class="text-sm text-gray-600 mt-1 flex-grow">
    ${program.desc}
  </p>

  <span class="mt-3 text-xs px-3 py-1 bg-sky-100 text-sky-600 rounded-full self-start">
    ${program.category}
  </span>

  <a href="./programform.html"
     class="mt-4 w-full text-center bg-[#770325] text-white py-2 rounded-lg hover:bg-gray-800 transition block">
    Book Free Masterclass
  </a>

</div>




    `;
  });
}


renderPrograms();
