//imports
import { apiKey } from "./search.js";
import { photosCn } from "./search.js";

const urls = 'https://api.pexels.com/v1/search?query='
    //apikey

//response
async function getImg() {
    let url = urls + 'random' + '&per_page=50&page=1'
    const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': apiKey

            }
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            //let gottenPhotoes = getPhotos(data.photos);
            console.log(data.photos);
            getPhotos(data.photos);
            //getting single array properties with the for loop
            //createDiv(data)

            // return gottenPhotoes;
        }).catch((err) => {
            console.log('Error At ' + err.message);
        })
}
//photos
getImg();

function getPhotos(photos) {
    photos.map(photo => {
        const divs = document.createElement('div')
        divs.classList = 'divs-flex'
        const img = document.createElement('img');
        img.src = photo.src.small
        divs.appendChild(img)
        photosCn.appendChild(divs)

        //div
        const d = document.createElement('div');
        d.classList = 'download-inner';
        const i = document.createElement('i');
        i.classList = 'fa-solid fa-download'
        i.type = 'button';
        i.dataset.download = photo.id;
        d.appendChild(i);
        divs.appendChild(d)

        i.addEventListener('click', () => {

            downloadImage(img.src, photo.photographer)
        })
        console.log(d)
    })
}

//icon function turned onclick function to download
async function downloadImage(imageSrc, photoName) {
    const image = await fetch(imageSrc)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)

    const link = document.createElement('a')
    link.href = imageURL
    link.download = photoName;
    console.log(link.download)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    //consoles
    console.log(imageSrc)
    console.log(link.href)
}



//btn active colored black function
const btnCen = document.querySelector('.btn-center')
const btnEl = document.querySelectorAll('button');

btnCen.addEventListener('click', (event) => {
    const id = event.target.id;
    console.log(btnCen)
    console.log(id)
    if (id) {
        btnEl.forEach((btn) => {
            btn.classList.remove("active");
        })
        event.target.classList.add("active");
    }

})

//export
import { searchEl } from "./search.js";
import { formEl } from "./search.js";
import { getImgs } from "./search.js";
formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.preventDefault();

    const searchResponse = searchEl.value;
    localStorage.setItem('Search-Name', searchResponse)
        //window.location.href = 'search-area.html'
    getImgs()
    photosCn.innerHTML = ''
})