

const filmsChildContent = document.querySelector("#filmsChildContent"),
searchFilmsChildContent = document.querySelector("#searchFilmsChildContent"),
inputFilmsContentSearch = document.querySelector("#inputFilmsContentSearch")


const seriesChildContent = document.querySelector("#seriesChildContent"),
searchSeriesChildContent = document.querySelector("#searchSeriesChildContent"),
inputSeriesContentSearch = document.querySelector("#inputSeriesContentSearch")


const animesChildContent = document.querySelector("#animesChildContent"),
searchAnimesChildContent = document.querySelector("#searchAnimesChildContent"),
inputAnimesContentSearch = document.querySelector("#inputAnimesContentSearch")

let filmsForSearch = null
let seriesForSearch = null
let animesForSearch = null



async function filterDataSeries(e){

    if(filmsForSearch === null || seriesForSearch === null || animesForSearch === null)
          await  loadContenusFromServer()
    else{
        const motRechercher = e.target.value.toLowerCase(),
    filteredSeries = filterContenus(seriesForSearch,motRechercher);
   
    
    if(motRechercher!= ""){
        
        seriesChildContent.style.display="none"

        searchSeriesChildContent.style.display="grid"
        
        if(filteredSeries.length == 0){
            // hubFilmsList.classList.add('message');
            // hubFilmsList.classList.remove("support-body-section-contenus");
            // hubFilmsList.innerHTML =  `
            // <p class="default-message ">aucun film n'a ete trouver pour ce mot cle</p>
            // `
           searchSeriesChildContent.classList.remove("child-content")

           searchSeriesChildContent.innerHTML=`
           <p  style="color:#f00">aucune serie n'a ete trouver pour ce mot cle</p>
           `
        }else{
            searchSeriesChildContent.innerHTML=""
            searchSeriesChildContent.classList.add("child-content")
            generatedContenus(searchSeriesChildContent,filteredSeries)
           
            // hubFilmsList.classList.remove('message');
            // hubFilmsList.classList.add("support-body-section-contenus");
            // generatedContenus(hubFilmsList,filteredFilms);

        }
            
    
    }else{
        seriesChildContent.style.display="grid"

        searchSeriesChildContent.style.display="none"
        // hubFilmsList.classList.remove('message');
        // hubFilmsList.classList.add("support-body-section-contenus");
        // generatedContenus(film,ordonnerContenus(films));
    }
    
   
        
 

    }
}
// fetch(`${baseUrl}/series/all`)
// .then(res=>res.json())
// .then(s=>{
//     seriesForSearch = getContenuWithType("Serie",s)
   
// })
// .catch(res=> console.log("Erreur lors du chargement"))


async function filterDataAnimes(e){
          
    if(filmsForSearch === null || seriesForSearch === null || animesForSearch === null)
    await  loadContenusFromServer()
   
    const motRechercher = e.target.value.toLowerCase(),
    filteredAnimes = filterContenus(animes,motRechercher);
   
    
    if(motRechercher!= ""){
        
        animesChildContent.style.display="none"

        searchAnimesChildContent.style.display="grid"
        
        if(filteredAnimes.length == 0){
            // hubFilmsList.classList.add('message');
            // hubFilmsList.classList.remove("support-body-section-contenus");
            // hubFilmsList.innerHTML =  `
            // <p class="default-message ">aucun film n'a ete trouver pour ce mot cle</p>
            // `
           searchAnimesChildContent.classList.remove("child-content")

           searchAnimesChildContent.innerHTML=`
           <p  style="color:#f00">aucun film n'a ete trouver pour ce mot cle</p>
           `
        }else{
            searchAnimesChildContent.innerHTML=""
            searchAnimesChildContent.classList.add("child-content")
            generatedContenus(searchAnimesChildContent,filteredAnimes)
           
            // hubFilmsList.classList.remove('message');
            // hubFilmsList.classList.add("support-body-section-contenus");
            // generatedContenus(hubFilmsList,filteredFilms);

        }
            
    
    }else{
        animesChildContent.style.display="grid"

        searchAnimesChildContent.style.display="none"
        // hubFilmsList.classList.remove('message');
        // hubFilmsList.classList.add("support-body-section-contenus");
        // generatedContenus(film,ordonnerContenus(films));
    }
    
   
        
 
    
}

// fetch(`${baseUrl}/animes/all`)
// .then(res=> res.json())
// .then(a=>{
//     animesForSearch = getContenuWithType("anime",a)
//     // inputAnimesContentSearch.addEventListener('keyup',filterDataAnimes)
// })
// .catch(res=> console.log("Erreur lors du chargement"))

async function filterDataFilms(e){

    if(filmsForSearch === null || seriesForSearch === null || animesForSearch === null)
    await  loadContenusFromServer()
   
    const motRechercher = e.target.value.toLowerCase(),
    filteredFilms = filterContenus(filmsForSearch,motRechercher);
   
    
    if(motRechercher!= ""){
        
        filmsChildContent.style.display="none"

        searchFilmsChildContent.style.display="grid"
        
        if(filteredFilms.length == 0){
            // hubFilmsList.classList.add('message');
            // hubFilmsList.classList.remove("support-body-section-contenus");
            // hubFilmsList.innerHTML =  `
            // <p class="default-message ">aucun film n'a ete trouver pour ce mot cle</p>
            // `
           searchFilmsChildContent.classList.remove("child-content")

           searchFilmsChildContent.innerHTML=`
           <p  style="color:#f00">aucun film n'a ete trouver pour ce mot cle</p>
           `
        }else{
            searchFilmsChildContent.innerHTML=""
            searchFilmsChildContent.classList.add("child-content")
            generatedContenus(searchFilmsChildContent,filteredFilms)
           
            // hubFilmsList.classList.remove('message');
            // hubFilmsList.classList.add("support-body-section-contenus");
            // generatedContenus(hubFilmsList,filteredFilms);

        }
            
    
    }else{
        filmsChildContent.style.display="grid"

        searchFilmsChildContent.style.display="none"
        // hubFilmsList.classList.remove('message');
        // hubFilmsList.classList.add("support-body-section-contenus");
        // generatedContenus(film,ordonnerContenus(films));
    }
    
   
        
 
    
}

async function loadContenusFromServer(){
    filmsForSearch = await fetch(`${baseUrl}/films/all`).then(res=>res.json())
    seriesForSearch = await fetch(`${baseUrl}/series/all`).then(res=>res.json())
    animesForSearch = await fetch(`${baseUrl}/animes/all`).then(res=>res.json())

    animesForSearch = getContenuWithType("Anime",animesForSearch)
    seriesForSearch = getContenuWithType("Serie",seriesForSearch)
    filmsForSearch = getContenuWithType("Film",filmsForSearch)

}

// fetch(`${baseUrl}/films/all`)
// .then(res=> res.json())
// .then(f=>{
   
//     filmsForSearch = getContenuWithType("film",f)
    
// })
// .catch(res=> console.log("Erreur lors du chargement"))



function filterContenus(contenus,motRechercher){
    return contenus.filter(
        contenu => contenu.titre.toLowerCase().includes(motRechercher) ||
         `${contenu.annee}`.toLowerCase().includes(motRechercher) ||
         contenu.genre.toLowerCase().includes(motRechercher) 
    )
}

function generatedContenus(container,contenus){
    container.innerHTML = "";
    contenus.forEach(contenu => {
        let contenuCard = document.createElement("div")

        contenuCard.classList.add("contenu-card")

        contenuCard.innerHTML=`
            <span class="version">VF</span>
            <span class="annee" >${contenu.annee}</span>
                
            <img src="${baseUrl}/img/${contenu.imageCover.idStreamFile}">

            <div class="titre-card">
                ${contenu.titre}
            </div>
        `
        contenuCard.addEventListener("click",()=>{
            if(contenu.type === "Film"){
                
                    showDetailFilmPage(contenu)
            }else if(contenu.type==="Serie"){
               
                showDetailSeriePage(contenu)
            }else{
                
                showDetailAnimePage(contenu)
            }
        })

            container.appendChild(contenuCard)
        
    });
}



function filterDataFilm(e,films){
    
   
   
    const motRechercher = e.target.value.toLowerCase(),
    filteredFilms = filterContenus(films,motRechercher);
   
    
    if(motRechercher!= ""){
        filmsChildContent.classList.add("hidden")
        searchFilmsChildContent.classList.remove("hidden")
        // if(filteredFilms.length == 0){
        //     hubFilmsList.classList.add('message');
        //     hubFilmsList.classList.remove("support-body-section-contenus");
        //     hubFilmsList.innerHTML =  `
        //     <p class="default-message ">aucun film n'a ete trouver pour ce mot cle</p>
        //     `
           

        // }else{
        //     hubFilmsList.classList.remove('message');
        //     hubFilmsList.classList.add("support-body-section-contenus");
        //     generatedContenus(hubFilmsList,filteredFilms);

        // }
            
    
    }else{
        filmsChildContent.classList.remove("hidden")
        searchFilmsChildContent.classList.add("hidden")
        // hubFilmsList.classList.remove('message');
        // hubFilmsList.classList.add("support-body-section-contenus");
        // generatedContenus(hubFilmsList,ordonnerContenus(films));
    }
    
   
        
 
}

function ordonnerContenus(contenus){
        return contenus.sort((a,b)=> b.annee - a.annee)
}