const MyFileOpener = require("../../plugins/info.android.raikiris/www/MyFileOpener")

const downloadFilmBtn = document.querySelector("#downloadFilmBtn")
const downloadSerieEpisodeBtn = document.querySelector("#downloadSerieEpisodeBtn")
const downloadAnimeEpisodeBtn = document.querySelector("#downloadAnimeEpisodeBtn")
const checkDeleteFilms = document.querySelector("#checkDeleteFilms")
const checkDeleteSeries = document.querySelector("#checkDeleteSeries")
const checkDeleteAnimes = document.querySelector("#checkDeleteAnimes")



checkDeleteFilms.addEventListener("change",function(){
        if(this.checked)
            enabledDeleteButton("filmsDownloadContainer")
        else
            disabledDeleteButton("filmsDownloadContainer")
        
   
})

checkDeleteSeries.addEventListener("change",function(){
        if(this.checked)
            enabledDeleteButton("seriesDownloadContainer")
        else
            disabledDeleteButton("seriesDownloadContainer")
        
})

checkDeleteAnimes.addEventListener("change",function(){
        if(this.checked)
            enabledDeleteButton("animesDownloadContainer") 
        else
            disabledDeleteButton("animesDownloadContainer")
        
})


function disabledDeleteButton(container){
    let downloadItems = document.querySelectorAll(`#${container} .the-container .download-item`)

    downloadItems.forEach(downloadItem=>{
        downloadItem.querySelector("button").classList.add("disabled")
    })
}

function enabledDeleteButton(container){
    let downloadItems = document.querySelectorAll(`#${container} .the-container .download-item`)

    downloadItems.forEach(downloadItem=>{
        downloadItem.querySelector("button").classList.remove("disabled")
    })
}

if(localStorage.getItem("telechargements")===null)
    localStorage.setItem("telechargements",JSON.stringify([]))

downloadFilmBtn.addEventListener("click",()=>{
    let liste = getTelechargementsEnCoursInContainer("filmsDownloadContainer")
  if(!isTelechargementExist(currentFilmGlobal.titre,liste)){
   let idCompte = localStorage.getItem("idCompte")
    fetch(`${onlineApiUrl}/plan/actif/Film/${idCompte}`)
    .then(res=> res.json())
    .then(planActif=>{
            // let dateActuelle = new Date()
            // let dateExpiration = new Date(planActif.dateExpiration)
           

            // console.log(dateActuelle < dateExpiration)

          if(planActif!==null){
        
                let telechargement = {
                    idTelechargement: genererChaineAleatoire(),
                    type: "Film",
                    titre: currentFilmGlobal.titre,
                    etat: "En cours",
                    idCompte: idCompte,
                    dateExpiration:new Date(planActif.dateExpiration),
                    canIWatchIt: false,
                    dateDebut: new Date()

                }

                addTelechargement(telechargement)
                addFilmDownloadToContainer(telechargement)
                createToast('success','Le telechargement est lancer')
        }
    })
    
   
  }
   
})

// ${serie.titre} ${saison.titre} ${episode.titre}

downloadSerieEpisodeBtn.addEventListener("click",()=>{
    let liste = getTelechargementsEnCoursInContainer("seriesDownloadContainer")

    if(!isTelechargementExist(`${currentSerieGlobal.titre} ${remplacerPartie(currentSerieSaisonGlobal.titre,"saison","S")} ${remplacerPartie(currentSerieEpisodeGlobal.titre,"episode","E")}`,liste)){
           let   idCompte = localStorage.getItem("idCompte")
          fetch(`${onlineApiUrl}/plan/actif/Serie/${idCompte}`)
          .then(res=> res.json())
          .then(planActif=>{
                if(planActif!==null){
                        let telechargement = {
                                    idTelechargement: genererChaineAleatoire(),
                                    type: "Serie",
                                    titre: `${currentSerieGlobal.titre} ${remplacerPartie(currentSerieSaisonGlobal.titre,"saison","S")} ${remplacerPartie(currentSerieEpisodeGlobal.titre,"episode","E")}`,
                                    etat: "En cours",
                                    idCompte: idCompte,
                                    dateExpiration:new Date(planActif.dateExpiration),
                                    canIWatchIt: false,
                                    dateDebut: new Date()
                
                        }
      
                        addTelechargement(telechargement)
                        addEpisodeSerieToContainer(telechargement)
                        createToast('success','Le telechargement est lancer')
                }
            })
         
            
    }
     
})






downloadAnimeEpisodeBtn.addEventListener("click",()=>{
    let liste = getTelechargementsEnCoursInContainer("animesDownloadContainer")

    if(!isTelechargementExist( `${currentAnimeGlobal.titre} ${remplacerPartie(currentAnimeSaisonGlobal.titre,"saison","S")} ${remplacerPartie(currentAnimeEpisodeGlobal.titre,"episode","E")}`,liste)){
       
    let idCompte = localStorage.getItem("idCompte")
    fetch(`${onlineApiUrl}/plan/actif/Anime/${idCompte}`)
    .then(res=> res.json())
    .then(planActif=>{
        if(planActif!==null){
            let telechargement = {
                    idTelechargement: genererChaineAleatoire(),
                    type: "Anime",
                    titre: `${currentAnimeGlobal.titre} ${remplacerPartie(currentAnimeSaisonGlobal.titre,"saison ","S")} ${remplacerPartie(currentAnimeEpisodeGlobal.titre,"episode","E")}`,
                    etat: "En cours",
                    idCompte: idCompte,
                    dateExpiration:new Date(planActif.dateExpiration),
                    canIWatchIt: false,
                    dateDebut: new Date()

                }

                addTelechargement(telechargement)
                addEpisodeAnimeToContainer(telechargement)
                createToast('success','Le telechargement est lancer')
        }
    })
    }
})

function addEpisodeAnimeToContainer(telechargement){
   
    let theContainer = document.querySelector("#animesDownloadContainer .the-container")
    let downloadItem = document.createElement("div")
    downloadItem.classList.add("download-item")
    downloadItem.setAttribute("data-id",telechargement.idTelechargement)
    downloadItem.setAttribute("data-etat",telechargement.etat)
    downloadItem.innerHTML = `
            <div class="first-section">
                <div class="icon-container">
                        <i class="fa-solid fa-play"></i>
                </div>
                    <div class="details-section">
                        <span class="download-title-item">${telechargement.titre}</span>
                        <div>
                            <span class="download-total-capacity">0 Mo</span>
                            <div class="point-separator"></div>
                            <span class="download-pourcentage">${telechargement.etat}</span>  
                        </div>
                     </div>
            </div>
            <button class="disabled">
                <i class="fa-solid fa-trash"></i>
            </button>
    `

    theContainer.appendChild(downloadItem)
    let idCompte = localStorage.getItem("idCompte")
    downloadAndSaveVideo(`${baseUrl}/download/anime-episode/${currentAnimeEpisodeGlobal.fichierVideo.name}/compte/${idCompte}`,telechargement.titre,downloadItem)
   
}    

function addEpisodeSerieToContainer(telechargement){
    let theContainer = document.querySelector("#seriesDownloadContainer .the-container")
    let downloadItem = document.createElement("div")
    downloadItem.classList.add("download-item")
    downloadItem.setAttribute("data-id",telechargement.idTelechargement)
    downloadItem.setAttribute("data-etat",telechargement.etat)
    downloadItem.innerHTML = `
            <div class="first-section">
                <div class="icon-container">
                        <i class="fa-solid fa-play"></i>
                </div>
                    <div class="details-section">
                        <span class="download-title-item">${telechargement.titre}</span>
                        <div>
                            <span class="download-total-capacity">0 Mo</span>
                            <div class="point-separator"></div>
                            <span class="download-pourcentage">${telechargement.etat}</span>  
                        </div>
                     </div>
            </div>
            <button class="disabled">
                <i class="fa-solid fa-trash"></i>
            </button>
    `

    theContainer.appendChild(downloadItem)
    let idCompte = localStorage.getItem("idCompte")
    // /download/serie-episode/{videoName}/compte/{idCompte}"
    downloadAndSaveVideo(`${baseUrl}/download/serie-episode/${currentSerieEpisodeGlobal.fichierVideo.name}/compte/${idCompte}`,telechargement.titre,downloadItem)
   
}                                               

function addFilmDownloadToContainer(telechargement){
   
    let theContainer = document.querySelector("#filmsDownloadContainer .the-container")
    let downloadItem = document.createElement("div")
    downloadItem.classList.add("download-item")
    downloadItem.setAttribute("data-id",telechargement.idTelechargement)
    downloadItem.setAttribute("data-etat",telechargement.etat)
    downloadItem.innerHTML = `
            <div class="first-section">
                <div class="icon-container">
                        <i class="fa-solid fa-play"></i>
                </div>
                    <div class="details-section">
                        <span class="download-title-item">${telechargement.titre}</span>
                        <div>
                            <span class="download-total-capacity">0 Mo</span>
                            <div class="point-separator"></div>
                            <span class="download-pourcentage">${telechargement.etat}</span>  
                        </div>
                     </div>
            </div>
            <button class="disabled">
                <i class="fa-solid fa-trash"></i>
            </button>
    `

    theContainer.appendChild(downloadItem)
    let idCompte = localStorage.getItem("idCompte")
    downloadAndSaveVideo(`${baseUrl}/download/film/${currentFilmGlobal.fichierVideo.name}/compte/${idCompte}`,telechargement.titre,downloadItem)
    
}



function convertirOctetsEnChaine(octets) {
    const suffixes = ['O', 'Ko', 'Mo', 'Go', 'To'];

    let index = 0;
    while (octets >= 1024 && index < suffixes.length - 1) {
        octets /= 1024;
        index++;
    }

    // Vérifier si le nombre après la virgule est égal à zéro
    const nombreFormatte = octets % 1 === 0 ? octets.toFixed(0) : octets.toFixed(2);

    return nombreFormatte + ' ' + suffixes[index];
}



function showTelechargements(container,telechargements){
    let theContainer = document.querySelector(`#${container} .the-container`)
   
    
    let telechargementsTerminer = []
    if(telechargements!==null){
        telechargements.forEach(telechargement=>{
            if(telechargement.etat==="Terminer")
                telechargementsTerminer.push(telechargement)
    
        })
    

    telechargementsTerminer.forEach(telechargement=>{
        
        let downloadItem = document.createElement("div")
        downloadItem.classList.add("download-item")
        downloadItem.setAttribute("data-id",telechargement.idTelechargement)
        downloadItem.setAttribute("data-etat",telechargement.etat)
        downloadItem.innerHTML = `
                <div class="first-section">
                    <div class="icon-container">
                            <i class="fa-solid fa-play"></i>
                    </div>
                        <div class="details-section">
                            <span class="download-title-item">${telechargement.titre}</span>
                            <div>
                                <span class="download-total-capacity">${telechargement.totalCapacity}</span>
                                <div class="point-separator"></div>
                                <span class="download-pourcentage">${telechargement.etat}</span>  
                            </div>
                         </div>
                </div>
                <button class="disabled">
                    <i class="fa-solid fa-trash"></i>
                </button>
        `
        
        theContainer.appendChild(downloadItem)
         downloadItem.querySelector(".first-section").addEventListener("click",()=>{  
                lireVideo(telechargement)
         })

         downloadItem.querySelector("button").addEventListener("click",()=>{
            if(telechargement.type === "Film" && checkDeleteFilms.checked){
                    deleteVideo(telechargement)
            }

            if(telechargement.type === "Serie" && checkDeleteSeries.checked){
                deleteVideo(telechargement)
            }

            if(telechargement.type === "Anime" && checkDeleteAnimes.checked){
                deleteVideo(telechargement)
            }

         })

    })

  }
    
}

function getTelechargementByType(type){
    let telechargements = getTelechargements()
    let finalT = []
   
    if(telechargements!==null){

        telechargements.forEach(t=>{
           
            if(t.type === type)
                finalT.push(t)
        })

        return finalT
    }
           
    return null;
}


showTelechargements("filmsDownloadContainer", getTelechargementByType("Film"))

showTelechargements("seriesDownloadContainer",getTelechargementByType("Serie"))

showTelechargements( "animesDownloadContainer",getTelechargementByType("Anime"))


function lireVideo(telechargement){
    localUpdateTelechargements()
    telechargement = getTelechargement(telechargement.idTelechargement)
    let filePath = cordova.file.dataDirectory+telechargement.titre.replace(/\s/g,'')+".mp4"                 
      let conditionProprietaire = telechargement.idCompte === localStorage.getItem("idCompte")
      let canIWatchItCondition =  telechargement.canIWatchIt
      let myFileOpener = new MyFileOpener()
      if(conditionProprietaire && canIWatchItCondition){
        // cordova.plugins.fileOpener2.open(
        //     filePath,
        //     "video/mp4",{
        //        error:function(){
        //             console.log("erreur lors de l'ouverture")
        //     },
        //        success:function(){console.log("ouverture reussi")}
        //     }
        // )

        myFileOpener.open(
            filePath,
            "video/mp4",
            "cn.xender",{
                error:function(){
                    console.log("il y a eu une erreur")
                },success:function(){
                    console.log("il y a eu une erreur")
                }
            }
        )
      }

      if(!conditionProprietaire)
        createToast('error',"Vous n'etes pas le proprietaire de ce telechargement ")

      if(!canIWatchItCondition)
        createToast('error',"Veuillez activer un plan afin de pourvoir regarder de nouveau")

    
                                                         
}

            
            
function downloadAndSaveVideo(urlVideo,videoName,downloadItem){

        // Chemin où vous souhaitez enregistrer la vidéo téléchargée dans le dossier de l'application
                    let filePath = cordova.file.dataDirectory +videoName.replace(/\s/g,'')+".mp4"
                    
                    // URL de la vidéo à télécharger depuis l'API
                    let isCapacitySet = false

                    // Création de l'objet FileTransfer
                    let fileTransfer = new FileTransfer();
                    
                    // Options du téléchargement
                    let options = {
                        headers: {
                            // Vous pouvez spécifier des en-têtes HTTP supplémentaires si nécessaire
                        }
                    };

                    // Fonction de mise à jour du progrès du téléchargement
                    let onProgress = function(progressEvent) {
                      
                        if (progressEvent.lengthComputable) {
                           
                            if(!isCapacitySet){
                                downloadItem.querySelector(".download-total-capacity").textContent = convertirOctetsEnChaine( progressEvent.total);
                                let telechargement = getTelechargement(downloadItem.getAttribute("data-id"))
                                telechargement.totalCapacity = convertirOctetsEnChaine( progressEvent.total);
                                updateTelechargement(telechargement)
                                isCapacitySet = true
                            }


                            let percentage = progressEvent.loaded / progressEvent.total * 100;
                            showProgression(percentage,downloadItem)
                           
                            // Vous pouvez mettre à jour l'interface utilisateur avec le pourcentage de téléchargement
                        }
                    };

                    // Téléchargement de la vidéo
                    fileTransfer.onprogress = onProgress;
                    fileTransfer.download(urlVideo, filePath, 
                        function(entry) {
                           
                            console.log('Téléchargement terminé : ' + entry.toURL());
                            let  telechargement = getTelechargement(downloadItem.getAttribute("data-id"))
                            telechargement.etat="Terminer"
                            telechargement.canIWatchIt = true
                           
                            downloadItem.querySelector(".download-pourcentage").textContent=telechargement.etat
                            
                            downloadItem.setAttribute("data-etat",telechargement.etat)
                   
                            updateTelechargement(telechargement)
                           
                            downloadItem.querySelector(".first-section").addEventListener("click",()=>{
                                lireVideo(telechargement)
                            })

                            downloadItem.querySelector("button").addEventListener("click",()=>{
                                if(telechargement.type === "Film" && checkDeleteFilms.checked){
                                        deleteVideo(telechargement)
                                }
                    
                                if(telechargement.type === "Serie" && checkDeleteFilms.checked){
                                    deleteVideo(telechargement)
                                }
                    
                                if(telechargement.type === "Anime" && checkDeleteAnimes.checked){
                                    deleteVideo(telechargement)
                                }
                    
                             })
                            // Le téléchargement est terminé, vous pouvez accéder à l'URL du fichier téléchargé
                        }, 
                        function(error) {
                              
                               console.log("download error source " + error.source);
                               console.log("download error target " + error.target);
                               console.log("download error code" + error.code);
                        }, 
                        false, 
                        options
                    );

}


function showProgression(progression,downloadItem){
    downloadItem.querySelector(".download-pourcentage").textContent= progression.toFixed(0)+"%";
  
}






function addTelechargement(telechargement){
    let telechargements = JSON.parse(localStorage.getItem("telechargements"))
    if(telechargements===null)
        localStorage.setItem("telechargements",JSON.stringify([]))
    else{
        telechargements.push(telechargement)
        saveTelechargements(telechargements);
    }
   
}

function saveTelechargements(telechargements){
    localStorage.setItem("telechargements",JSON.stringify(telechargements))
}

function updateTelechargement(telechargementUpdate){
    let telechargements = getTelechargements()
    let newTelechargements = []

    telechargements.forEach(telechargement => {
            if(telechargementUpdate.idTelechargement !== telechargement.idTelechargement)        
                newTelechargements.push(telechargement)
    });

    newTelechargements.push(telechargementUpdate);
    saveTelechargements(newTelechargements)
}

function deleteTelechargement(telechargementDelete){
    let telechargements = getTelechargements()
    let newTelechargements = []

    telechargements.forEach(telechargement => {
            if(telechargementDelete.idTelechargement !== telechargement.idTelechargement)        
                newTelechargements.push(telechargement)
    });

    saveTelechargements(newTelechargements)
}

function isTelechargementExist(titre,telechargementsInContainer){
    let telechargements = telechargementsInContainer
    let result = false
    if(telechargements!==null){
        telechargements.forEach(telechargement=>{
            if(telechargement.titre === titre)
                    result = true
        })
    }
   
    return result;
}


function getTelechargements(){
    return JSON.parse(localStorage.getItem("telechargements"));
}

function getTelechargement(id){
    let telechargements = getTelechargements()

    let telechargementFound = {}

    telechargements.forEach(telechargement=>{
        if(telechargement.idTelechargement === id)
            telechargementFound = telechargement
    })

    return telechargementFound;
}

function deleteNotSafeTelechargementEnCours(){
    let telechargements = getTelechargementsByEtat("En cours")
    let dateActuelle = new Date()
    if(telechargements!==null){
        telechargements.forEach(t => {
                if( t.dateDebut < dateActuelle )
                    deleteTelechargement(t)
        });
    }
}

deleteNotSafeTelechargementEnCours()




function getTelechargementsByEtat(etat){
    let telechargements = getTelechargements()

    let telechargementEtats = []
    telechargements.forEach(t=>{
        if(t.etat === etat)
            telechargementEtats.push(t)
    })

    return telechargementEtats
}



function getTelechargementsEnCoursInContainer(container){
    let downloadItems = document.querySelectorAll(`#${container} .the-container .download-item`)
    let telechargementsEnCours = []
    if(downloadItems!==null){
        downloadItems.forEach(d=>{
            if(d.getAttribute("data-etat") === "En cours" || d.getAttribute("data-etat") === "Terminer")
                telechargementsEnCours.push(getTelechargement(d.getAttribute("data-id")))
        })
    
        return telechargementsEnCours
    }
    return null
}


function remplacerPartie(chaine, partie, remplacement) {
    return chaine.toLowerCase().replace(partie, remplacement).replace(/\s/g,'');
}


function deleteVideo(telechargement){
    let filePath = cordova.file.dataDirectory+telechargement.titre.replace(/\s/g,"")+".mp4"

    window.resolveLocalFileSystemURL(filePath,function(fileEntry){

        fileEntry.remove(function (){

            if(telechargement.etat==="Terminer"){
                if(telechargement.type==="Film")
                    removeDownloadItemFromContainer("filmsDownloadContainer",telechargement)
             

                if(telechargement.type==="Serie")
                    removeDownloadItemFromContainer("seriesDownloadContainer",telechargement)
             

                if(telechargement.type==="Anime")
                    removeDownloadItemFromContainer("animesDownloadContainer",telechargement)

                deleteTelechargement(telechargement)
                createToast('success','Le telechargement a ete supprimer')
            }

        },function(err){
            console.error("Erreur lors de la suppression du fichier : ",err)
            createToast('error','Erreur lors de la suppression du telechargement ')
        })

    },function(err){
        console.error("Erreur lors de l'access au fichier: ",err)
    })
}


function removeDownloadItemFromContainer(container,telechargement){
    let parentContainer = document.querySelector("#"+container+" .the-container")
    let downloadItems = parentContainer.querySelectorAll(".download-item")
    downloadItems.forEach(downloadItem=>{
        if(downloadItem.getAttribute("data-id") === telechargement.idTelechargement)
            parentContainer.removeChild(downloadItem)
    })
}



function localUpdateTelechargements(){
    let telechargements = getTelechargements()
   
    let dateActuelle = new Date()
   
    if(telechargements!==null){
        telechargements.forEach(t=>{
            
            if(dateActuelle > new Date(t.dateExpiration)){
                t.canIWatchIt = false
                updateTelechargement(t)
            }
        })
    }
}

 function onlineUpdateTelechargements(){
   
    let idCompte = localStorage.getItem("idCompte")
     fetch(`${onlineApiUrl}/plan/actif/Film/${idCompte}`)
     .then(res=> res.json())
     .then(planFilm=>{
            onlineUpdateSupport("Film",planFilm,idCompte)
     })

     fetch(`${onlineApiUrl}/plan/actif/Serie/${idCompte}`)
     .then(res=> res.json())
     .then(planSerie=>{
       
        onlineUpdateSupport("Serie",planSerie,idCompte)
     })


     fetch(`${onlineApiUrl}/plan/actif/Anime/${idCompte}`)
     .then(res=> res.json())
     .then(planAnime=>{
        onlineUpdateSupport("Anime",planAnime,idCompte)
     })
}

function onlineUpdateSupport(type,planActif,idCompte){
    let telechargements = getTelechargementByType(type)
    if(telechargements!==null){
       
        telechargements.forEach(t=>{
            if(t.idCompte === idCompte){
               
                if(t.type === planActif.plan.type || planActif.plan.type === "All"){
                    t.dateExpiration = new Date(planActif.dateExpiration)
                    t.canIWatchIt = true
                    updateTelechargement(t)
                }
            }
        })
    }
}

const ongletFilmsDownload = document.querySelector("#ongletFilmsDownload")
const ongletSeriesDownload = document.querySelector("#ongletSeriesDownload")
const ongletAnimesDownload = document.querySelector("#ongletAnimesDownload")


ongletFilmsDownload.addEventListener("click", function(){ 
    onlineUpdateTelechargements()
})

ongletSeriesDownload.addEventListener("click", function(){
     onlineUpdateTelechargements()
    
})

ongletAnimesDownload.addEventListener("click",function(){onlineUpdateTelechargements()})




// last update 



  

    


