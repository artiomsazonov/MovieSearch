const containetPage = document.getElementById("pageContainer")
// fetch
let url = 'https://www.omdbapi.com/?s=man&apikey=4a3b711b'

getData()

function getData() {
    fetch(url)
        .then(response => response.json())
        .then(function (json) {
            pushInner(json);
        })      
}

function getRating(id) {
      fetch(`https://www.omdbapi.com/?i=${id}&apikey=d3f916db`)
      .then(response => response.json())
      .then(function (json) {
        let x = document.querySelector('.'+id)
        x.textContent= json.imdbRating           
    })   
}

function pushRaiting(){
    let id = document.querySelectorAll('.id')
    for(let i=0; i<id.length;i++){
        getRating(id[i].textContent) 
    }
}
function pushInner(news) {
   removeCards()
    for (let i = 0; i < news.Search.length; i++) {
        let div = document.createElement('div')        
        div.className = "movie";        
        let title = news.Search[i].Title;
        let img = news.Search[i].Poster;
        let year = news.Search[i].Year 
        let id = news.Search[i].imdbID 
        div.innerHTML = "<div class='caption'><h3>" + title + "</h3></div><img src=" + img + "><div class='caption'><p>" + year + "</p><p class='"+id+" id'>" + id + "</p></div>"
        containetPage.appendChild(div)
    }
   pushRaiting()
};

// remove
function removeCards() {
    let div = document.querySelectorAll('.movie')
    for (let j = 0; j < div.length; j++) {
        div[j].remove();
    }
}

// search

let search = document.querySelector(".loading")
search.onclick = function () { getMovie() }
function getMovie() {
    event.preventDefault()
    let searchValue = document.querySelector('input').value
    getSearchMovie(searchValue)
};
function getSearchMovie(name) {
    
    fetch(`https://www.omdbapi.com/?s=${name}&apikey=d3f916db`)
        .then(response => response.json())
        .then(function (json) {
            pushInner(json);
        })      
}