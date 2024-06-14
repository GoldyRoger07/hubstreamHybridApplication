
function addContenuAleatoireToHomeContent(){
    if(isOnline){
      fetch(`${baseUrl}/films/aleatoire`)
      .then(res=> res.json())
      .then(contenus => {
          let contenusWithType = getContenuWithType("film",contenus)
          remplirContainerHome("homeFilmContenuContainer",contenusWithType)
      })
  
      fetch(`${baseUrl}/series/aleatoire`)
      .then(res=> res.json())
      .then(contenus => {
          let contenusWithType = getContenuWithType("serie",contenus)
          remplirContainerHome("homeSerieContenuContainer",contenusWithType)
      })
  
      fetch(`${baseUrl}/animes/aleatoire`)
      .then(res=> res.json())
      .then(contenus => {
          let contenusWithType = getContenuWithType("anime",contenus)
          remplirContainerHome("homeAnimeContenuContainer",contenusWithType)
      })
    }
  }
  
  
  
  function addContenuToFilmsContent(page){
      // animesContentContainer
      if(isOnline){ 
          fetch(`${baseUrl}/films?page=${page}`)
          .then(res=> res.json())
          .then(films => {
              let contenusWithType = getContenuWithType("film",films)
              
              remplirContainer("filmsContentContainer",contenusWithType)
          })
      }
  
  }
  
  function addContenuToSeriesContent(page){
      if(isOnline){
          fetch(`${baseUrl}/series?page=${page}`)
          .then(res=> res.json())
          .then(series => {
              let contenusWithType = getContenuWithType("serie",series)
              
  
              remplirContainer("seriesContentContainer",contenusWithType)
          })
      }
  
  }
  
  
  function addContenuToAnimesContent(page){
      if(isOnline){
          fetch(`${baseUrl}/animes?page=${page}`)
          .then(res=> res.json())
          .then(animes => {
              let contenusWithType = getContenuWithType("anime",animes)
              
              remplirContainer("animesContentContainer",contenusWithType)
          })
      }
  }
  
  
  function remplirContainerHome(containerName,contenus){
      let container = document.querySelector(`#${containerName}`)
     
          container.innerHTML=''
  
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
                  if(contenu.type==="film"){
                          // console.log(contenu)
                          showDetailFilmPage(contenu)
                  }else if(contenu.type==="serie"){
                      showDetailSeriePage(contenu)
                  }else{
                      showDetailAnimePage(contenu)
                  }
              })
                container.appendChild(contenuCard)
  
      });
  }
  
  
  
  function remplirContainer(containerName,contenus){
      let container = document.querySelector(`#${containerName} .child-content`)
     
      // let watcher = container.querySelector(".watcher")
          
          // container.innerHTML=''
  
      removeSkeletonCardFromContainer(container)
  
      contenus.forEach(contenu => {
              if(!nomsContenus.includes(contenu.titre)){
                  nomsContenus.push(contenu.titre)
                  
  
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
                      if(contenu.type==="film"){
                              // console.log(contenu)
                              showDetailFilmPage(contenu)
                      }else if(contenu.type==="serie"){
                          showDetailSeriePage(contenu)
                      }else{
                          showDetailAnimePage(contenu)
                      }
                  })
                  
                     
                      container.appendChild(contenuCard)
              }
              
              
      });
  
     
  }
  
  function removeSkeletonCardFromContainer(container){
      if(container.getAttribute("data-hasSkeleton") === "yes"){
          container.setAttribute("data-hasSkeleton","no")
          container.innerHTML=""
      }
  }
  
  
  
  const filmsIntersectionHandler = ()=>{
      let container = document.querySelector(`#filmsContentContainer .child-content`)
     if(isOnline){
          addContenuToFilmsContent(pageFilm)
          if(container.getAttribute("data-hasSkeleton") === "no")
              pageFilm++
     }
      
  }
  
  const seriesIntersectionHandler = ()=>{
      let container = document.querySelector(`#seriesContentContainer .child-content`)
      if(isOnline){
              addContenuToSeriesContent(pageSerie)
              if(container.getAttribute("data-hasSkeleton") === "no")
                  pageSerie++
      }
     
  }
  
  const animesIntersectionHandler = ()=>{
      let container = document.querySelector(`#animesContentContainer .child-content`)
      if(isOnline){
          addContenuToAnimesContent(pageAnime)
          if(container.getAttribute("data-hasSkeleton") === "no")
          pageAnime++
      }
  }
  
  
  
  let filmsIntersectionObserver = new IntersectionObserver(filmsIntersectionHandler),
  seriesIntersectionObserver = new IntersectionObserver(seriesIntersectionHandler),
  animesIntersectionObserver = new IntersectionObserver(animesIntersectionHandler)
  
  let filmsWatcher = document.querySelector("#filmsWatcher"),
  seriesWatcher = document.querySelector("#seriesWatcher"),
  animesWatcher = document.querySelector("#animesWatcher")
  
  filmsIntersectionObserver.observe(filmsWatcher)
  seriesIntersectionObserver.observe(seriesWatcher)
  animesIntersectionObserver.observe(animesWatcher)

  const top5UsersTitle = document.querySelector("#top5UsersTitle")
  const top5List = document.querySelector("#top5List")
  const lastWinnerListItem = document.querySelector("#lastWinnerListItem")
  const lastWinnerTitle = document.querySelector("#lastWinnerTitle")

  function setLastWinner(){
    fetch(`${onlineApiUrl}/lastWinner/title`)
    .then(res=> res.json())
    .then(obj=>{
          localStorage.setItem("lastWinnerTitle",obj.title) 
          lastWinnerTitle.textContent = obj.title 
    })
    .catch(err=>{
        let lastWTitle = localStorage.getItem("lastWinnerTitle")
        if(lastWTitle)
            lastWinnerTitle.textContent = lastWTitle

    })

    fetch(`${onlineApiUrl}/lastWinner`)
    .then(res=> res.json())
    .then(lastWinner=>{
       
        localStorage.setItem("lastWinner",JSON.stringify(lastWinner))
        remplirLastWinnerListItem(lastWinner)
        
    })
    .catch(err=>{
        let lastW = JSON.parse(localStorage.getItem('lastWinner'))

        if(lastW)
            remplirLastWinnerListItem(lastW)

        
    })
  }

  function remplirLastWinnerListItem(lastWinner){
   
            lastWinnerListItem.innerHTML = `
                <div class="right-box">
                    <i class="fa-solid fa-circle-user"></i>
                    <span class="username">${lastWinner.compte.username}</span>
                </div>
                <div class="left-box">
                    <span class="points">${lastWinner.time}</span>x
                </div>
            `
  }

function setTop5PotentielUsers(){

    fetch(`${onlineApiUrl}/comptes/top5/title`)
    .then(res=> res.json())
    .then(obj=>{
        localStorage.setItem("top5ListTitle",obj.title)
        top5UsersTitle.textContent = obj.title
    })
    .catch(err=> {
        let top5ListTitleOffline = localStorage.getItem("top5ListTitle")
        if(top5ListTitleOffline)
            top5UsersTitle.textContent = top5ListTitleOffline
  
           
    })

    fetch(`${onlineApiUrl}/comptes/top5`)
    .then(res => res.json())
    .then(comptes=>{
        localStorage.setItem("top5Users",JSON.stringify(comptes))

        remplirTopList(comptes)
    })
    .catch(err=>{
        let top5ListOffLine = JSON.parse(localStorage.getItem("top5Users"))
        
        if(top5ListOffLine)
            remplirTopList(top5ListOffLine)
    
            
    })
}

function remplirTopList(comptes){
    top5List.innerHTML = ""
    comptes.forEach(compte=>{
        let div = document.createElement("div")
        div.classList.add("list-item")
        div.innerHTML = `
                <div class="right-box">
                    <i class="fa-solid fa-circle-user"></i>
                    <span class="username">${compte.username}</span>
                </div>
                <div class="left-box">
                    <span class="points">${compte.points}</span> pts
                </div>
        `

        top5List.appendChild(div)
    })
}

setLastWinner()
setTop5PotentielUsers()

setInterval(()=>{
    setTop5PotentielUsers()
    setLastWinner()
}, 5000)

