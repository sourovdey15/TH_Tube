// Remove ALl Active Class
function removeActiveCls() {
    const allAcative = document.getElementsByClassName('active');
    for (let activeBtn of allAcative) {
        activeBtn.classList.remove('active')
    }
}
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
            `<button id="btn-${dynamicBtn.category_id}" onclick="filterByCat(${dynamicBtn.category_id})" class="btn btn-sm hover:bg-red-500 hover:text-white catBtn">${dynamicBtn.category}</button>`;
        dynamicBtns.appendChild(newDiv);
    })
}
// Filter By Categories
function filterByCat(catId) {
    const newUrl = `https://openapi.programming-hero.com/api/phero-tube/category/${catId}`
    fetch(newUrl)
        .then(res => res.json())
        .then(data => {
            removeActiveCls()
            const clickBtn = document.getElementById(`btn-${catId}`);
            clickBtn.classList.add('active');
            showVides(data.category)
        })
}
// Load functions on screen on
loadCat();
loadVideos();
// Get Videos 
function loadVideos() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then(res => res.json())
        .then(data => {
            removeActiveCls()
            const btnAll = document.getElementById('btn_all');
            btnAll.classList.add('active');
            showVides(data.videos)
        });
}
function showVides(vData) {
    const videoContainer = document.getElementById('videoContainer')
    // Reset THe Video Container
    videoContainer.innerHTML = " ";

    if (vData.length == 0) {
        const videoContainer = document.getElementById('videoContainer');
        videoContainer.innerHTML = `
        <div class="col-span-4">
        <div class="noContent flex flex-col justify-center items-center mt-5">
            <img src="assest/Icon.png" alt="No Video">
            <h2 class="font-bold text-3xl text-center">Oopps..!! Sorry There is no Content</h2>
        </div>
        </div>
        `
        return
    }
    vData.forEach((vid) => {
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
    });
};
// Search Input


const searchBox = document.getElementById('searchBox').addEventListener('keyup', function (e) {

    console.log(e.target.value);
});




