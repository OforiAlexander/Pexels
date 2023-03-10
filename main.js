const photosCn = document.getElementById('photos-main-container-random');

const apiKey = 'jcZGeGMCLey8jUuI08tKEL3XPTb2RGDd4HxFsxc8tmSs7FBvgDKNFBWN';
//apikey

//response
async function getImg() {
    let url = 'https://api.pexels.com/v1/search?query=random'
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
            console.log('Error Occured At:' + err.message);
        })
}
//photos
getImg();

function getPhotos(photos) {
    photos.map(photo => {
        const divs = document.createElement('div')
        divs.classList = 'divs-flex'
        const img = document.createElement('img');
        img.src = photo.src.original
        divs.appendChild(img)
        photosCn.appendChild(divs)

        //div
        const d = document.createElement('div');
        d.classList = 'download-inner';
        d.innerHTML = `<i class="fa-solid fa-download"></i>`;
        divs.appendChild(d)
        console.log(d)
    })
}




//btn active function
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