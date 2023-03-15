const apiKey = 'jcZGeGMCLey8jUuI08tKEL3XPTb2RGDd4HxFsxc8tmSs7FBvgDKNFBWN';
//apikey
//localStoragecall


const formEl = document.getElementById('form');
const searchEl = document.getElementById('search');
let div = document.getElementById('photos-main-container-random');

//response
async function getImg() {
    let url = 'https://api.pexels.com/v1/search?query=' + searchEl.value + '&per_page=50&page=1'
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

            //getting single array properties with the for loop
            createDiv(data)

            // return gottenPhotoes;
        }).catch((err) => {
            console.log('Error Occured At:' + err.message);
        })
}

//?create a new function to map and download images

function createDiv(data) {
    for (let i = 0; i < data.photos.length; i++) {
        const n = data.photos[i];

        let mr = document.createElement('div');
        mr.id = n.id;
        mr.classList = 'divs-flex';
        let ig = document.createElement('img');
        ig.src = n.src.small;
        ig.id = n.id;
        const d = document.createElement('div');
        d.classList = 'download-inner';
        let btn = document.createElement('i');
        btn.type = 'button';
        btn.classList = "fa-solid fa-download"
        btn.dataset.download = n.id;
        d.appendChild(btn)
        console.log(d)

        //download btn eventlistener

        btn.addEventListener('click', () => {

            downloadImage(ig.src, n.photographer)
        })


        mr.appendChild(ig)
        mr.append(d);

        div.append(mr)
        console.log(mr)
    }

}

//download function
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


//event handler
formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.preventDefault();

    let currentSearchEl = localStorage.getItem('Search-Name');
    if (searchEl == undefined) {
        searchEl.value = currentSearchEl
    } else {
        getImg()
        div.innerHTML = ''

    }
})

//console.log(searchImage)
//console.log(searchImage)