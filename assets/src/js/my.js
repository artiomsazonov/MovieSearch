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
let cas=[]
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
    console.log(id[0].textContent)
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
    let div = document.querySelectorAll('.thumbnail')
    for (let j = 0; j < div.length; j++) {
        div[j].remove();
    }
}

// 
function getWord(n) {
    removeCards()
    for (let i = 0; i < cards[n].length; i++) {
        let cardWord = document.createElement('div')
        cardWord.className = "thumbnail ";
        let divWord = document.createElement('div')
        divWord.className = cards[n][i].word;
        let rotate = document.createElement('div')
        rotate.className = 'two'
        divWord.innerHTML = "<div class='flip-container'><div class='front'><div class='box1'><img src=" + cards[n][i].image + "><div class='caption'><h3>" + cards[n][i].word + "</h3></div></div></div><div class='back'><div class='box2'><img src=" + cards[n][i].image + "><div class='caption'><h3>" + cards[n][i].translation + "</h3></div></div></div></div></div>"
        divWord.setAttribute('onclick', "new Audio(src='img/" + cards[n][i].audioSrc + "').play()");
        rotate.innerHTML = "<img src='img/rotate.jpg'>"
        containetPage.appendChild(cardWord)
        cardWord.appendChild(divWord)
        cardWord.appendChild(rotate)
    }
    let buttonStartGame = document.createElement('div')
    buttonStartGame.className = "btn_start none";
    buttonStartGame.setAttribute("onclick", 'startGame()');
    buttonStartGame.innerHTML = '<span>Start Game</span>'
    containetPage.appendChild(buttonStartGame)
}
let action = document.querySelectorAll(".Action")
action[0].onclick = function () { getWord(1); rotate(); open(); modeCheck() }
action[1].onclick = function () { getWord(2); rotate(); open(); modeCheck() }

let animal = document.querySelectorAll(".Animal")
animal[0].onclick = function () { getWord(3); rotate(); open(); modeCheck() }
animal[1].onclick = function () { getWord(4); rotate(); open(); modeCheck() }

let clothes = document.querySelector(".Clothes")
clothes.onclick = function () { getWord(5); rotate(); open(); modeCheck() }

let emotions = document.querySelector(".Emotions")
emotions.onclick = function () { getWord(6); rotate(); open(); modeCheck() }

let adjective = document.querySelector(".Adjective")
adjective.onclick = function () { getWord(7); rotate(); open(); modeCheck() }

let technics = document.querySelector(".Fruit")
technics.onclick = function () { getWord(8); rotate(); open(); modeCheck() }

let navli = document.querySelectorAll('.navli')
navli[0].onclick = function () { location.reload() }
navli[1].onclick = function () { getWord(1); rotate(); open(); modeCheck() }
navli[2].onclick = function () { getWord(2); rotate(); open(); modeCheck() }
navli[3].onclick = function () { getWord(3); rotate(); open(); modeCheck() }
navli[4].onclick = function () { getWord(4); rotate(); open(); modeCheck() }
navli[5].onclick = function () { getWord(5); rotate(); open(); modeCheck() }
navli[6].onclick = function () { getWord(6); rotate(); open(); modeCheck() }
navli[7].onclick = function () { getWord(7); rotate(); open(); modeCheck() }
navli[8].onclick = function () { getWord(8); rotate(); open(); modeCheck() }

// rotate
function rotate() {
    let two = document.querySelectorAll('.two')
    for (let i = 0; i < two.length; i++)
        two[i].onclick = function toggle() {
            let prevDiv = this.previousSibling
            let flipContainer = prevDiv.childNodes[0]
            let flipper = flipContainer.childNodes[0];
            flipper.classList.toggle('rotate');
        }
    let flipConta = document.querySelectorAll('.thumbnail');
    for (let j = 0; j < flipConta.length; j++)
        flipConta[j].onmouseleave = function () {
            let nextDiv = this.childNodes[0]
            let flipContainer = nextDiv.childNodes[0]
            let flipper = flipContainer.childNodes[0]
            flipper.classList.remove('rotate');
        }
};
// action navli
function cleaningNavli() {
    for (let i = 0; i < navli.length; i++) {
        navli[i].style.color = 'white';
    }
}
function open() {
    let caption = document.querySelector('.caption')
    switch (caption.textContent) {
        case 'Action (set A)':
            navli[0].style.color = 'red';
            break;
        case 'cry':
            cleaningNavli()
            navli[1].style.color = 'red';
            break;
        case 'open':
            cleaningNavli()
            navli[2].style.color = 'red';
            break;
        case 'cat':
            cleaningNavli()
            navli[3].style.color = 'red';
            break;
        case 'bird':
            cleaningNavli()
            navli[4].style.color = 'red';
            break;
        case 'skirt':
            cleaningNavli()
            navli[5].style.color = 'red';
            break;
        case 'sad':
            cleaningNavli()
            navli[6].style.color = 'red';
            break;
        case 'small':
            cleaningNavli()
            navli[7].style.color = 'red';
            break;
        case 'watermelon':
            cleaningNavli()
            navli[8].style.color = 'red';
            break;
    }
}
open();

// Play

let play = false;
let switcher = document.querySelector('.switcher');
function regimeChange() {
    switch (play) {
        case true:
            endPlay();
            return play = false;
        case false:
            startPlay();
            return play = true;
    }
}
function modeCheck() {
    switch (play) {
        case true:
            startPlay();
            break;
        case false:
            endPlay();
            break;
    }
}

let burger = document.querySelector(".burger-menu__nav");
function startPlay() {
    let thumbnail = document.querySelectorAll(".thumbnail")
    for (let i = 0; i < thumbnail.length; i++) {
        thumbnail[i].style.background = "linear-gradient(180deg,#fd6a63,#feb46b 40%,#fff 0,#fff)";
    }
    burger.style.background = "linear-gradient(40deg,#ffd86f,#fc6262)";

    let caption = document.querySelectorAll(".flip-container .caption")
    for (let j = 0; j < caption.length; j++) {
        caption[j].style.display = 'none';
    }
    let two = document.querySelectorAll('.two')
    for (let j = 0; j < two.length; j++) {
        two[j].style.display = 'none';
    }
    let img = document.querySelectorAll('.flip-container img')
    for (let j = 0; j < img.length; j++) {
        img[j].style.borderRadius = "0";
    }
    let flipContainer = document.querySelectorAll('.flip-container')
    for (let j = 0; j < flipContainer.length; j++) {
        flipContainer[j].parentNode.parentNode.style.height = '200px'
        flipContainer[j].parentNode.style.pointerEvents = "none";
    }
        if(document.querySelector('.caption').textContent!="Action (set A)"){
    removeNoneButton()
    }
}

function endPlay() {
    let thumbnail = document.querySelectorAll(".thumbnail")
    for (let i = 0; i < thumbnail.length; i++) {
        thumbnail[i].style.background = "linear-gradient(180deg,#0099ae,#00bf82 40%,#fff 0,#fff)";
    }
    burger.style.background = "linear-gradient(40deg,#00bf82,#0099ae)";

    let caption = document.querySelectorAll(".flip-container .caption")
    for (let j = 0; j < caption.length; j++) {
        caption[j].style.display = 'block';
    }
    let two = document.querySelectorAll('.two')
    for (let j = 0; j < two.length; j++) {
        two[j].style.display = 'block';
    }
    let img = document.querySelectorAll('.flip-container img')
    for (let j = 0; j < img.length; j++) {
        img[j].style.borderRadius = "50%";
    }
    let flipContainer = document.querySelectorAll('.flip-container')
    for (let j = 0; j < flipContainer.length; j++) {
        flipContainer[j].parentNode.parentNode.style.height = '280px'
        flipContainer[j].parentNode.style.pointerEvents = "auto";
    }
    addNoneButton()
}

// start game
let audioArr = []
let cardArr = []

function getArrAudioCard(n) {
    audioArr.length = 0;
    cardArr.length = 0;
    for (let i = 0; i < cards[n].length; i++) {
        audioArr.push(cards[n][i].audioSrc)
    }
    for (let j = 0; j < cards[n].length; j++) {
        cardArr.push(cards[n][j].word)
    }
}
function getCard() {
    let caption = document.querySelector('.caption')
    switch (caption.textContent) {
        case 'cry':
            getArrAudioCard(1)
            break;
        case 'open':
            getArrAudioCard(2)
            break;
        case 'cat':
            getArrAudioCard(3)
            break;
        case 'bird':
            getArrAudioCard(4)
            break;
        case 'skirt':
            getArrAudioCard(5)
            break;
        case 'sad':
            getArrAudioCard(6)
            break;
        case 'small':
            getArrAudioCard(7)
            break;
        case 'watermelon':
            getArrAudioCard(8)
            break;
    }
}
 function startGame() {
        getCard()
        pl(audioArr)
    }
function removeNoneButton(){
    let btnStart = document.querySelector(".btn_start")
    btnStart.classList.remove('none')
}
function addNoneButton(){
    let btnStart = document.querySelector(".btn_start")
    btnStart.classList.add('none')
}

function pl(list) {
    let audioElements = []
    for (let i = 0; i < list.length; i++) {
        var audio = new Audio("../img/"+list[i])
        audioElements.push(audio)}
          audioElements[getRandomInt(8)].play()       
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }