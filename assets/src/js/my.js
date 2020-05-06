const containetPage = document.getElementById("pageContainer")
// fetch
let url = 'https://www.omdbapi.com/?s=man&apikey=4a3b711b'

getData()

function getData() {
    fetch(url)
        .then(response => response.json())
        .then(function (json) {
            pushInner(json.Search);
        })
}

function getRating(id) {
    fetch(`https://www.omdbapi.com/?i=${id}&apikey=d3f916db`)
        .then(response => response.json())
        .then(function (json) {
            let x = document.querySelector('.' + id)
            x.textContent = json.imdbRating
        })
}

function pushRaiting() {
    let id = document.querySelectorAll('.id')
    for (let i = 0; i < id.length; i++) {
        getRating(id[i].textContent)
    }
}
function pushInner(news) {
    removeCards()
    let corusel = document.createElement('div')
    corusel.className = "owl-carousel owl-theme"
    containetPage.appendChild(corusel)
    for (let i = 0; i < news.length; i++) {
        let div2 = document.createElement('div')
        div2.className = "movie item";
        let title = news[i].Title;
        let img = news[i].Poster;
        let year = news[i].Year
        let id = news[i].imdbID
        div2.innerHTML = "<div class='caption'><h3>" + title + "</h3></div><img src=" + img + "><div class='caption'><p>" + year + "</p><p class='" + id + " id'>" + id + "</p></div>"
        corusel.appendChild(div2)
    }
    pushRaiting()
    setTimeout(owlCorusel, 300)
};

// remove
function removeCards() {
    let div = document.querySelectorAll('.movie')
    for (let j = 0; j < div.length; j++) {
        div[j].remove();
    }
    let x = document.querySelectorAll(".owl-carousel");
    for (let i = 0; i < x.length; i++) {
        x[i].remove();
    }
}

// search

let search = document.querySelector(".loading");
let searchIcon = document.querySelector(".search-btn");
let input = document.querySelector('input');
search.onclick = function () { getMovie() }
searchIcon.onclick = function () { getMovie(); }
input.addEventListener("keydown", function (event) {
    if (event.which == 13 || event.keyCode == 13) {
        getMovie()
        return false;
    }
    return true;
});
let error = document.querySelector('.error')
function getMovie() {
    event.preventDefault()
    let searchValue = document.querySelector('input').value
    error.innerHTML='No results for "'+searchValue+'"'
    getSearchMovie(searchValue)
    clearInputs();
};
function getSearchMovie(name) {
    fetch(`https://www.omdbapi.com/?s=${name}&apikey=d3f916db`)
        .then(response => response.json())
        .then(function (json) { 
            if(json.Search){ 
                error.classList.add('none');          
            pushInner(json.Search);
            }
            else{                
                error.classList.remove('none');
            }
        })
}

function clearInputs() {
    input.value = "";
}
let cross = document.querySelector(".cross")
cross.addEventListener('click', function () {
    event.preventDefault()
    clearInputs()
})

// Corusel
function owlCorusel() {
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 2,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            495: {
                items: 2
            },
            750: {
                items: 3
            },
            1000: {
                items: 4
            }
        }
    })
}

//