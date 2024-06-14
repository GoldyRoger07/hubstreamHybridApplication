

let films = null,series = null,animes = null,
resultBox = document.querySelector(".result-box"),
navSearch = document.querySelector('#navSearch');

if(isOnline){
    mainAll()
    addListenerToInputs()
    
}

function addListenerToInputs(){
    navSearch.addEventListener('input',filterData)
    inputFilmsContentSearch.addEventListener('keyup',filterDataFilms)
    inputSeriesContentSearch.addEventListener('keyup',filterDataSeries)
    inputAnimesContentSearch.addEventListener('keyup',filterDataAnimes)
}

function removeListenerToInputs(){
    navSearch.removeEventListener('input',filterData)
    inputFilmsContentSearch.removeEventListener('keyup',filterDataFilms)
    inputSeriesContentSearch.removeEventListener('keyup',filterDataSeries)
    inputAnimesContentSearch.removeEventListener('keyup',filterDataAnimes)
}

window.addEventListener('online', () => {
   mainAll()
    if(!isOnline){
        addListenerToInputs()
        isOnline = true
    }else{
        removeListenerToInputs()
        addListenerToInputs()
    }
        
  console.log(`online : ${isOnline}`)
    // L'application est passée en mode en ligne, vous pouvez effectuer certaines tâches.
});

window.addEventListener('offline', () => {
    removeListenerToInputs()
    isOnline = false
    console.log(`offline : ${isOnline}`)
    // L'application est passée en mode hors ligne, vous pouvez gérer cela ici.
});

navSearch.addEventListener('input',filterData)



async function mainAll(){
// all = await getFromServer("/hubstream/contenu/all");
films = await fetch(`${baseUrl}/films/all`).then(res=>res.json())
series = await fetch(`${baseUrl}/series/all`).then(res=>res.json())
animes = await fetch(`${baseUrl}/animes/all`).then(res=>res.json())

// ({films,series,animes} = all);


//    console.log(listeCardsFilms2);
// generatedContenus(listeCardsFilms2,ordonnerContenus(films));
// generatedContenus(listeCardsSeries2,ordonnerContenus(series));
// generatedContenus(listeCardsAnimes2,ordonnerContenus(animes));


}

async function filterData(e){
   if(films === null || series === null || animes === null)
          await  mainAll()
    else{
            resultBox.innerHTML = '';
            formatageContenu('Film',films);
            formatageContenu('Serie',series);
            formatageContenu('Anime',animes);
            const motRechercher = e.target.value.toLowerCase(),
            filteredSeries = filterContenus(series,motRechercher),
            filteredFilms = filterContenus(films,motRechercher),
            filteredAnimes = filterContenus(animes,motRechercher);

            if(motRechercher!= ""){
                if(filteredSeries.length>0 || filteredFilms.length>0 || filteredAnimes.length>0){
                    navInputContainer.classList.remove("search-bottom-radius")
                    resultBox.classList.remove("hidden")
                }else{
                    navInputContainer.classList.add("search-bottom-radius")
                    resultBox.classList.add("hidden")
                }

            createSearchResultBox(filteredSeries);
            createSearchResultBox(filteredFilms);
            createSearchResultBox(filteredAnimes);
            }else{
                resultBox.innerHTML="";
                navInputContainer.classList.add("search-bottom-radius")
                resultBox.classList.add("hidden")
            }

    }


}

function filterContenus(contenus,motRechercher){
return contenus.filter(
contenu => contenu.titre.toLowerCase().includes(motRechercher) ||
`${contenu.annee}`.toLowerCase().includes(motRechercher) ||
contenu.genre.toLowerCase().includes(motRechercher) 
)
}

function createSearchResultBox(contenus){

contenus.forEach(contenu =>{
 const resultItem = document.createElement("div");
 resultItem.setAttribute('class','result-item');

 if(contenu.type == "Film"){
    
    resultItem.innerHTML = ` <span>${contenu.type}</span> ${contenu.titre}`;
 }

 if(contenu.type == "Serie"){
    
    resultItem.innerHTML = ` <span>${contenu.type}</span> ${contenu.titre}`;
 }

 if(contenu.type == "Anime"){
   
    resultItem.innerHTML = `<span>${contenu.type}</span> ${contenu.titre}`;
 }

 resultItem.addEventListener("click",()=>{
    navSearch.value=""
    resultBox.innerHTML="";
    navInputContainer.classList.add("search-bottom-radius")
    resultBox.classList.add("hidden")
    closeSideNav()
    if(contenu.type == "Film")
       showDetailFilmPage(contenu)
    
    if(contenu.type == "Serie")
        showDetailSeriePage(contenu)

    
    if(contenu.type == "Anime")
       showDetailAnimePage(contenu)
 })
 

 resultBox.appendChild(resultItem);
})
}


// function generatedContenus(liste,contenus){
// liste.innerHTML = "";
// contenus.forEach(contenu =>{
// const myCard = document.createElement("div");
// myCard.setAttribute("class","my-card");
// myCard.innerHTML = `
// <a href="#${contenu.titre}">
//            <span class="version">VF</span>
//             <span class="annee">${contenu.annee}</span>
                
//             <img src="/img/${contenu.imageCover.name}"  alt="">

           
//              <div class="titre-card">
//                  ${contenu.titre}
//              </div>
// </a>
// `
// liste.appendChild(myCard);
// })
// }


function formatage(type,contenu){
switch(type){
case 'Film' : contenu.type = type; break;
case 'Serie': contenu.type = type; break;
case 'Anime': contenu.type = type; break;
}
}

function formatageContenu(type,contenus){
contenus.forEach(contenu =>{
formatage(type,contenu);
})
}

