// Dynamic Buttons 
function loadCat() {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => dynamicCats(data.categories));
}

function dynamicCats(cat) {
    // Get the Dynamic Button Texts
    cat.map(dynamicBtn => {
        const dynamicBtns = document.getElementById('dynamicBtns');
        const newDiv = document.createElement("div");
        newDiv.innerHTML =
            `<button onclick="filterByCat(${dynamicBtn.category_id})" class="btn btn-sm hover:bg-red-500 hover:text-white">${dynamicBtn.category}</button>`;
        dynamicBtns.appendChild(newDiv);
    })
}

// Filter By Categories
function filterByCat(catId) {
    const newUrl = `https://openapi.programming-hero.com/api/phero-tube/category/${catId}`
    fetch(newUrl)
        .then(res => res.json())
        .then(data => showVides(data.category))
}

// Load functions on screen on
loadCat();

// Get Videos 
function loadVideos() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then(res => res.json())
        .then(data => showVides(data.videos));
}

function showVides(vData) {
    // Reset THe Video Container
    videoContainer.innerHTML = " ";

    vData.forEach((vid) => {
        const videoContainer = document.getElementById('videoContainer')
        const newVideo = document.createElement('div');
        newVideo.innerHTML =
            `<div class="">
            <div class="relative ">
                <img src="${vid.thumbnail}" alt="logo" class="w-86 h-[160px] object-cover rounded-sm">
                <span class="absolute bottom-2 right-2 bg-gray-900 text-white rounded-sm px-2 text-sm">3hrs 30min ago</span>
            </div>

            <div class="flex gap-2 mt-3">
                <div class="">
                    <div class="avatar">
                        <div class=" w-8 rounded-full ">
                            <img src="${vid.authors[0].profile_picture}" />
                        </div>
                    </div>
                </div>

                <div class="">
                    <h3 class="font-semibold ">${vid.title}</h3>
                    <h4 class="text-gray-600 flex gap-2 justify-center items-center">
                        ${vid.authors[0].profile_name}
                        <span class="font-bold">
                            <img src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" class="w-4"/>
                        </span>
                    </h4>
                    <h5 class="font-">${vid.others.views}</h5>
                </div>
            </div>
        </div>`;

        videoContainer.appendChild(newVideo);
        console.log(newVideo)
    });
};
