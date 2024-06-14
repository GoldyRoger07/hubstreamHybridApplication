// Film

function afficherDetailFilm(film){
    let idCompte = localStorage.getItem("idCompte")
    currentFilmGlobal = film
    firstTitleFilmValue.textContent=`Regarder le film ${film.titre}`
    secondTitleFilmValue.textContent=`Regarder le film ${film.titre}`
    anneeFilmValue.textContent=film.annee
    tempsFilmValue.textContent=film.temps
    genreFilmValue.textContent=film.genre
    castFilmValue.textContent=film.cast
    realisateurFilmValue.textContent=film.realisateur
    paysFilmValue.textContent=film.pays
    descriptionFilmValue.textContent=film.descriptionFilm
    imageCoverFilmValue.src=`${baseUrl}/img/${film.imageCover.idStreamFile}`
    baliseFilmVideo.src=`${watchFilmUrl}/${film.fichierVideo.name}/${idCompte}`

}


function afficherDetailSerie(serie){
    currentSerieGlobal = serie
    let innerInfoContainer = `
            <div class="titre">Regarder la serie ${serie.titre}</div>

            <img src="${baseUrl}/img/${serie.imageCover.idStreamFile}" alt="imageCover">
            <div class="info-detail">
                <div class="info-block">
                    <span>Annee</span>
                <span>${serie.annee}</span>
                </div>
                <div class="info-block">
                <span>Temps</span>
                <span >${serie.temps}</span>
                </div>
                <div class="info-block">
                <span>Genre</span>
                <span >${serie.genre}</span>
                </div>
                <div class="info-block">
                    <span>Cast</span>
                    <span>${serie.cast}</span>
                </div>
                <div class="info-block">
                <span>Realisateur</span>
                <span >${serie.realisateur}</span>
                </div>
                <div class="info-block">
                    <span>Pays</span>
                    <span>${serie.pays}</span>
                </div>
            </div>
    `

    serieContent.querySelector(".info-container").innerHTML=innerInfoContainer
    serieSeContent.querySelector(".info-container").innerHTML=innerInfoContainer
    serieEpisodeContent.querySelector(".info-container").innerHTML=innerInfoContainer

    serieContent.querySelector(".description-serie p").textContent=serie.descriptionSerie
    serieSeContent.querySelector(".description-container p").textContent=serie.descriptionSerie
    serieEpisodeContent.querySelector(".description-container p").textContent=serie.descriptionSerie

    let saisons = serie.saisons
    saisons.sort((a,b)=> a.numero - b.numero)
    saisonsItemContainer.innerHTML=""
    saisons.forEach(saison=>{
        let button = document.createElement("button")
        button.classList.add("saison-item")
        button.textContent=saison.titre

        button.addEventListener("click",()=>{
            showDetailSerieSePage(serie,saison)
        })

        saisonsItemContainer.appendChild(button)
    })
}

function afficherDetailSerieSaison(serie,saison){
    currentSerieSaisonGlobal = saison
    serieSeContent.querySelector(".saisons-container header span").textContent=`
      Liste des episodes de la ${saison.titre} de ${serie.titre}
    `
   let episodes = saison.episodes
   episodes.sort((a,b)=> a.numero - b.numero)
    episodesItemContainer.innerHTML=""
   episodes.forEach(episode=>{
        let button = document.createElement("button")
        button.classList.add("episode-item")
        button.textContent=episode.titre

        button.addEventListener("click",()=>{
            showDetailSerieSaisonEpisodePage(serie,saison,episode)
        })

        episodesItemContainer.appendChild(button)
   })
}

function afficherDetailSerieSaisonEpisode(serie,saison,episode){
    currentSerieEpisodeGlobal = episode
    let idCompte = localStorage.getItem("idCompte")
    let saisonClicked = saison
    let episodeCurrent = episode
    serieEpisodeContent.querySelector(".episode-container header span").textContent=`
        ${serie.titre} ${saison.titre} ${episode.titre}
    `
    baliseSerieVideo.src=`${watchSerieUrl}/${episode.fichierVideo.name}/${idCompte}`
    selectSerieSaisons.querySelector(".select .selected").textContent=saison.titre
    let menuSaison =  selectSerieSaisons.querySelector(".menu")

    let saisons = serie.saisons
    saisons.sort((a,b)=> a.numero - b.numero)

    let selectedSaison = selectSerieSaisons.querySelector(".select .selected")
    let selectSaison = selectSerieSaisons.querySelector(".select")
    let caretSaison = selectSerieSaisons.querySelector(".caret")


    menuSaison.innerHTML=""
    saisons.forEach(saison=>{
        let li = document.createElement("li")
        li.setAttribute("data-value",saison.idSaison)
        li.innerHTML=`
            <span>${saison.titre}</span>
        `
        if(saisonClicked.idSaison === saison.idSaison)
            li.classList.add("active")
            
        li.addEventListener("click",()=>{
            selectedSaison.textContent=li.textContent
            selectSaison.classList.remove("select-clicked");
            caretSaison.classList.remove("caret-rotate");
            menuSaison.classList.remove("menu-open");

            menuSaison.querySelectorAll("li").forEach(li=>{
                li.classList.remove("active");
            })

            li.classList.add("active");
            saisonClicked = saison
    })
        menuSaison.appendChild(li)
    })

    
    let selectedEpisode = selectSerieEpisodes.querySelector(".select .selected")
    let selectEpisode = selectSerieEpisodes.querySelector(".select")
    let caretEpisode = selectSerieEpisodes.querySelector(".caret")


    selectedEpisode.textContent = episode.titre

    let menuEpisode = selectSerieEpisodes.querySelector(".menu")
    menuEpisode.innerHTML=""
    let episodes = saison.episodes
    episodes.sort((a,b)=> a.numero - b.numero)

    episodes.forEach(episode=>{
        let li = document.createElement("li")
        li.setAttribute("data-value",episode.numero)
        li.innerHTML=`
            <span>${episode.titre}</span>
        `

        if(episodeCurrent.idEpisode===episode.idEpisode)
            li.classList.add("active")

        li.addEventListener("click",()=>{
                selectedEpisode.textContent=li.textContent
                selectEpisode.classList.remove("select-clicked");
                caretEpisode.classList.remove("caret-rotate");
                menuEpisode.classList.remove("menu-open");

                menuEpisode.querySelectorAll("li").forEach(li=>{
                    li.classList.remove("active");
                })

                li.classList.add("active");
                serieBtnEpisodeSuivant.style.opacity=1;
                serieBtnEpisodePrecedent.style.opacity=1;
              showDetailSerieSaisonEpisodePage(serie,saisonClicked,getEpisodeByNumero(saisonClicked,episode.numero))  
        })
        menuEpisode.appendChild(li)
    })
    

    
}

function afficherDetailAnime(anime){
    currentAnimeGlobal = anime

    let innerInfoContainer = ` <div class="titre">Regarder l'anime ${anime.titre}</div>
   
        <img src="${baseUrl}/img/${anime.imageCover.idStreamFile}" alt="imageCover">
        <div class="info-detail">
            <div class="info-block">
                <span >Annee</span>
               <span>${anime.annee}</span>
            </div>
            <div class="info-block">
               <span>Temps</span>
               <span>${anime.temps}</span>
            </div>
            <div class="info-block">
               <span>Genre</span>
               <span>${anime.genre}"</span>
            </div>
            <div class="info-block">
                <span>Pays</span>
                <span>${anime.pays}</span>
            </div>
            <div class="info-block">
                <span>Auteur</span>
                <span>${anime.auteur}</span>
            </div>
        </div>`


    animeContent.querySelector(".info-container").innerHTML=innerInfoContainer
    animeSeContent.querySelector(".info-container").innerHTML=innerInfoContainer
    animeEpisodeContent.querySelector(".info-container").innerHTML=innerInfoContainer

    animeContent.querySelector(".description-container p").textContent=anime.descriptionAnime
    animeSeContent.querySelector(".description-container p").textContent=anime.descriptionAnime
    animeEpisodeContent.querySelector(".description-container p").textContent=anime.descriptionAnime

    let saisons = anime.saisons
    saisons.sort((a,b)=> a.numero - b.numero)
    animeSaisonsItemContainer.innerHTML=""
    saisons.forEach(saison=>{
        let button = document.createElement("button")
        button.classList.add("saison-item")
        button.textContent=saison.titre

        button.addEventListener("click",()=>{
            showDetailAnimeSePage(anime,saison)
        })

        animeSaisonsItemContainer.appendChild(button)
    })
}

function afficherDetailAnimeSaison(anime,saison){
    currentAnimeSaisonGlobal = saison
    animeSeContent.querySelector(".saisons-container header span").textContent=`
      Liste des episodes de la ${saison.titre} de ${anime.titre}
    `
   let episodes = saison.episodes
   episodes.sort((a,b)=> a.numero - b.numero)
    animeEpisodesItemContainer.innerHTML=""
   episodes.forEach(episode=>{
        let button = document.createElement("button")
        button.classList.add("episode-item")
        button.textContent=episode.titre

        button.addEventListener("click",()=>{
            showDetailAnimeSaisonEpisodePage(anime,saison,episode)
        })

        animeEpisodesItemContainer.appendChild(button)
   })
}



function afficherDetailAnimeSaisonEpisode(anime,saison,episode){
    currentAnimeEpisodeGlobal = episode
    let idCompte = localStorage.getItem("idCompte")
    let saisonClicked = saison
    let episodeCurrent = episode
    animeEpisodeContent.querySelector(".episode-container header span").textContent=`
        ${anime.titre} ${saison.titre} ${episode.titre}
    `
    baliseAnimeVideo.src=`${watchAnimeUrl}/${episode.fichierVideo.name}/${idCompte}`
    selectAnimeSaisons.querySelector(".select .selected").textContent=saison.titre
    let menuSaison =  selectAnimeSaisons.querySelector(".menu")

    let saisons = anime.saisons
    saisons.sort((a,b)=> a.numero - b.numero)

    let selectedSaison = selectAnimeSaisons.querySelector(".select .selected")
    let selectSaison = selectAnimeSaisons.querySelector(".select")
    let caretSaison = selectAnimeSaisons.querySelector(".caret")


    menuSaison.innerHTML=""
    saisons.forEach(saison=>{
        let li = document.createElement("li")
        li.setAttribute("data-value",saison.idSaison)
        li.innerHTML=`
            <span>${saison.titre}</span>
        `
        if(saisonClicked.idSaison === saison.idSaison)
            li.classList.add("active")
            
        li.addEventListener("click",()=>{
            selectedSaison.textContent=li.textContent
            selectSaison.classList.remove("select-clicked");
            caretSaison.classList.remove("caret-rotate");
            menuSaison.classList.remove("menu-open");

            menuSaison.querySelectorAll("li").forEach(li=>{
                li.classList.remove("active");
            })

            li.classList.add("active");
            saisonClicked = saison
    })
        menuSaison.appendChild(li)
    })

    
    let selectedEpisode = selectAnimeEpisodes.querySelector(".select .selected")
    let selectEpisode = selectAnimeEpisodes.querySelector(".select")
    let caretEpisode = selectAnimeEpisodes.querySelector(".caret")


    selectedEpisode.textContent = episode.titre

    let menuEpisode = selectAnimeEpisodes.querySelector(".menu")
    menuEpisode.innerHTML=""
    let episodes = saison.episodes
    episodes.sort((a,b)=> a.numero - b.numero)

    episodes.forEach(episode=>{
        let li = document.createElement("li")
        li.setAttribute("data-value",episode.numero)
        li.innerHTML=`
            <span>${episode.titre}</span>
        `

        if(episodeCurrent.idEpisode===episode.idEpisode)
            li.classList.add("active")

        li.addEventListener("click",()=>{
                selectedEpisode.textContent=li.textContent
                selectEpisode.classList.remove("select-clicked");
                caretEpisode.classList.remove("caret-rotate");
                menuEpisode.classList.remove("menu-open");

                menuEpisode.querySelectorAll("li").forEach(li=>{
                    li.classList.remove("active");
                })

                li.classList.add("active");
                animeBtnEpisodeSuivant.style.opacity=1;
                animeBtnEpisodePrecedent.style.opacity=1;
              showDetailAnimeSaisonEpisodePage(anime,saisonClicked,getEpisodeByNumero(saisonClicked,episode.numero))  
        })
        menuEpisode.appendChild(li)
    })
    

    
}




