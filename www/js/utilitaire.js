if(localStorage.getItem("onlineApiUrl")==null)
    updateOnlineApiUrl("http://192.168.0.178:9001/api.online.hubstream.com")


const onlineApiUrl=getOnlineApiUrl()
//gestion online api

function getOnlineApiUrl(){
    return localStorage.getItem("onlineApiUrl")
}

function updateOnlineApiUrl(newUrl){
    localStorage.setItem("onlineApiUrl",newUrl)
}

//end gestion online api

const baseUrl="http://192.168.0.178:9002/api.hubstream.com"



function getFromServer(url){
    return new Promise((resolve,reject)=>{
        
        let xhr = new XMLHttpRequest();
        xhr.open("GET",url,true);
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.onload=()=>{
            xhr.status === 200 ? resolve(JSON.parse(xhr.responseText)) :
            reject(new Error("une erreur inconnue est survenu"));
        }
         xhr.send();
      
  })
}

function postToServer(url,item){
    return new Promise((resolve,reject)=>{
        let xhr = new XMLHttpRequest();

        xhr.open("POST",url,true);
        xhr.setRequestHeader('Content-Type','application/json')
        xhr.onload = function (){
           xhr.status === 200 ? resolve(JSON.parse(xhr.responseText)):
           reject(new Error("une erreur inconnue est survenue"));
        }
        xhr.send(JSON.stringify(item));
    })
}

let pageFilm =0,
pageSerie = 0,
pageAnime = 0,
nomsContenus = []



const anneeFilmValue = document.querySelector("#anneeFilmValue")
const tempsFilmValue = document.querySelector("#tempsFilmValue")
const genreFilmValue = document.querySelector("#genreFilmValue")
const realisateurFilmValue = document.querySelector("#realisateurFilmValue")
const castFilmValue = document.querySelector("#castFilmValue")
const paysFilmValue = document.querySelector("#paysFilmValue")
const descriptionFilmValue = document.querySelector("#descriptionFilmValue")
const firstTitleFilmValue = document.querySelector("#firstTitleFilmValue")
const secondTitleFilmValue = document.querySelector("#secondTitleFilmValue")
const imageCoverFilmValue = document.querySelector("#imageCoverFilmValue")

const baliseFilmVideo = document.querySelector("#baliseFilmVideo")

const serieContent = document.querySelector("#serieContent")
const serieSeContent = document.querySelector("#serieSeContent")
const serieEpisodeContent = document.querySelector("#serieEpisodeContent")
const saisonsItemContainer = document.querySelector("#saisonsItemContainer")
const episodesItemContainer = document.querySelector("#episodesItemContainer")

const animeContent = document.querySelector("#animeContent")
const animeSeContent = document.querySelector("#animeSeContent")
const animeEpisodeContent = document.querySelector("#animeEpisodeContent")
const animeSaisonsItemContainer = document.querySelector("#animeSaisonsItemContainer")
const animeEpisodesItemContainer = document.querySelector("#animeEpisodesItemContainer")


const baliseSerieVideo = document.querySelector("#baliseSerieVideo")
const selectSerieSaisons =  document.querySelector("#selectSerieSaisons")
const selectSerieEpisodes =  document.querySelector("#selectSerieEpisodes")


const baliseAnimeVideo = document.querySelector("#baliseAnimeVideo")
const selectAnimeSaisons =  document.querySelector("#selectAnimeSaisons")
const selectAnimeEpisodes =  document.querySelector("#selectAnimeEpisodes")

let isOnline = true
// let observedObject = {
//     isOnline: false
// }

// const handler = {
//     set(target, key, value){
//         if(key === "isOnline"){
//             if(value){

//             }else{

//             }
//         }

//         target[key] = value

//         return true
//     }
// }

// const observedObjectProxy = new Proxy(observedObject,handler)





const serieBtnEpisodePrecedent = document.querySelector("#serieBtnEpisodePrecedent")
const serieBtnEpisodeSuivant = document.querySelector("#serieBtnEpisodeSuivant")

const animeBtnEpisodePrecedent = document.querySelector("#animeBtnEpisodePrecedent")
const animeBtnEpisodeSuivant = document.querySelector("#animeBtnEpisodeSuivant")

const navInputContainer = document.querySelector("#navInputContainer")

const sideNav = document.querySelector("#sideNav")


const baseWatchUrl = "http://192.168.0.178:8080/vid"
const watchFilmUrl = `${baseWatchUrl}/film`
const watchSerieUrl = `${baseWatchUrl}/serie`
const watchAnimeUrl = `${baseWatchUrl}/anime`

let currentAnimeGlobal = {}
let currentAnimeSaisonGlobal = {}
let currentAnimeEpisodeGlobal = {}
let currentSerieGlobal = {}
let currentSerieSaisonGlobal = {}
let currentSerieEpisodeGlobal = {}
let currentFilmGlobal = {}

const filmCardPlanContainer = document.querySelector("#filmCardPlanContainer")
const serieCardPlanContainer = document.querySelector("#serieCardPlanContainer")
const animeCardPlanContainer = document.querySelector("#animeCardPlanContainer")
const allCardPlanContainer = document.querySelector("#allCardPlanContainer")

const filmsDownloadContainer = document.querySelector("#filmsDownloadContainer")
let idPlan=0;

function getContenuWithType(type,contenus){
    contenus.forEach(contenu=>{
        contenu.type=type
    })
return contenus;
}

function getEpisodeByNumero(saison,numero){
    let episodes =  saison.episodes
    let episodeFound = {}
    
    episodes.forEach(episode=>{
        if(numero===episode.numero)
            episodeFound = episode
    })

    return episodeFound
}

function showDetailFilmPage(film){
    openOneInnerContent("filmContent")
    afficherDetailFilm(film)
}

function showDetailSeriePage(serie){
    openOneInnerContent("serieContent")
    afficherDetailSerie(serie)
}

function showDetailSerieSePage(serie,saison){
    openOneInnerContent("serieSeContent")
    afficherDetailSerieSaison(serie,saison)
}

function showDetailSerieSaisonEpisodePage(serie,saison,episode){
    openOneInnerContent("serieEpisodeContent")
    afficherDetailSerieSaisonEpisode(serie,saison,episode)
}


function showDetailAnimePage(anime){
    openOneInnerContent("animeContent")
    afficherDetailAnime(anime)
}

function showDetailAnimeSePage(anime,saison){
    openOneInnerContent("animeSeContent")
    afficherDetailAnimeSaison(anime,saison)
}

function showDetailAnimeSaisonEpisodePage(anime,saison,episode){
    openOneInnerContent("animeEpisodeContent")
    afficherDetailAnimeSaisonEpisode(anime,saison,episode)
}

function closeSideNav(){
    sideNav.style="transform: translateX(-100%)"
}

serieBtnEpisodePrecedent.addEventListener("click",()=>{
    let numeroEpisode = currentSerieEpisodeGlobal.numero
    serieBtnEpisodeSuivant.style.opacity=1;
    if(numeroEpisode>1){
        let episodePrecedent = getEpisodeByNumero(currentSerieSaisonGlobal,--numeroEpisode)
        showDetailSerieSaisonEpisodePage(currentSerieGlobal,currentSerieSaisonGlobal,episodePrecedent)
    }else
        serieBtnEpisodePrecedent.style.opacity=0.4;
})

serieBtnEpisodeSuivant.addEventListener("click",()=>{
    let numeroEpisode = currentSerieEpisodeGlobal.numero
    serieBtnEpisodePrecedent.style.opacity=1;
    if(numeroEpisode<currentSerieSaisonGlobal.episodes.length){
        let episodeSuivant = getEpisodeByNumero(currentSerieSaisonGlobal,++numeroEpisode)
        showDetailSerieSaisonEpisodePage(currentSerieGlobal,currentSerieSaisonGlobal,episodeSuivant)
    }else
        serieBtnEpisodeSuivant.style.opacity=0.4;
})

animeBtnEpisodePrecedent.addEventListener("click",()=>{
    let numeroEpisode = currentAnimeEpisodeGlobal.numero
    animeBtnEpisodeSuivant.style.opacity=1;
    if(numeroEpisode>1){
        let episodePrecedent = getEpisodeByNumero(currentAnimeSaisonGlobal,--numeroEpisode)
        showDetailAnimeSaisonEpisodePage(currentAnimeGlobal,currentAnimeSaisonGlobal,episodePrecedent)
    }else
        animeBtnEpisodePrecedent.style.opacity=0.4;
})

animeBtnEpisodeSuivant.addEventListener("click",()=>{
    let numeroEpisode = currentAnimeEpisodeGlobal.numero
    animeBtnEpisodePrecedent.style.opacity=1;

    if(numeroEpisode<currentAnimeSaisonGlobal.episodes.length){
        let episodeSuivant = getEpisodeByNumero(currentAnimeSaisonGlobal,++numeroEpisode)
        showDetailAnimeSaisonEpisodePage(currentAnimeGlobal,currentAnimeSaisonGlobal,episodeSuivant)
    }else
        animeBtnEpisodeSuivant.style.opacity=0.4;
})

async function hashString(string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(string);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedString = hashArray.map(byte => ('00' + byte.toString(16)).slice(-2)).join('');
    return hashedString;
}

function genererChaineAleatoire() {
    var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var longueur = 8;
    var chaineAleatoire = '';

    for (var i = 0; i < longueur; i++) {
        var indiceAleatoire = Math.floor(Math.random() * caracteres.length);
        chaineAleatoire += caracteres.charAt(indiceAleatoire);
    }

    return chaineAleatoire;
}