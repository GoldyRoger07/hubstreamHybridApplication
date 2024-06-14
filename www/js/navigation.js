let navCloseBtn = document.querySelector("#navCloseBtn")
let menuBtn = document.querySelector("#menuBtn")

navCloseBtn.addEventListener('click',()=>{
    closeSideNav()
})

menuBtn.addEventListener('click',()=>{
    sideNav.style="transform: translateX(0%)"
   
})

// menuBtn.addEventListener('touchstart', () => {
//     sideNav.style.transform = "translateX(0%)";
// });



//-------------MenuPopup
 let button = document.querySelector("#user-btn")
let menuPopup =  document.querySelector(".menu-popup")

const cacherMenu = () =>{
  setTimeout(()=>{
      menuPopup.style.display="none"
      menuPopup.setAttribute('data-etat','close')
      button.classList.remove('btn-focus')
  },100)
 
}

const afficherMenu = () =>{
  menuPopup.style.display="flex"
  menuPopup.setAttribute('data-etat','open')
  button.classList.add('btn-focus')
}

document.addEventListener('click',(e)=>{
    let conditionButton = false,
    conditionMenu = false;
    let etatMenu = menuPopup.getAttribute("data-etat")


    if(button == e.target || button.contains(e.target))
        conditionButton = true

    if(menuPopup == e.target || menuPopup.contains(e.target))
        conditionMenu = true
    

    if(conditionMenu)
        button.classList.add('btn-focus')

    if(conditionButton && etatMenu=='close')
        afficherMenu();
    else if(conditionButton && etatMenu=='open')
        cacherMenu();
    else if(!conditionMenu && etatMenu=='open')
        cacherMenu();
         
})
// End Menu Popup


let innerContents = document.querySelectorAll(".inner-content")
let currentOpenInnerContent = null

function closeAllInnerContent(){
        innerContents.forEach(innerContent=>{
            if(!innerContent.classList.contains("hidden"))
                innerContent.classList.add("hidden")
        })
}

function openOneInnerContent(name){
        closeAllInnerContent()
        let innerContent = document.querySelector(`#${name}`)
        innerContent.classList.remove("hidden") 
        currentOpenInnerContent = innerContent   
}


const homeLinkItem = document.querySelector("#homeLinkItem"),
filmsLinkItem = document.querySelector("#filmsLinkItem"),
seriesLinkItem = document.querySelector("#seriesLinkItem"),
animesLinkItem = document.querySelector("#animesLinkItem"),
plansLinkItem = document.querySelector("#plansLinkItem"),
downloadsLinkItem = document.querySelector("#downloadsLinkItem")

function removeActiveFromLinkItem(){
    let linkItems = document.querySelectorAll(".link-item")

    linkItems.forEach(linkItem=>{
        if(linkItem.classList.contains("active"))
            linkItem.classList.remove("active")
    })
}

homeLinkItem.addEventListener('click',()=>{
    removeActiveFromLinkItem()

    homeLinkItem.classList.add("active")
    closeSideNav()
    openOneInnerContent("homeContent")
    addContenuAleatoireToHomeContent()
})

addContenuAleatoireToHomeContent()

filmsLinkItem.addEventListener('click',()=>{
    showFilms()
})

function showFilms(){
    removeActiveFromLinkItem()
    filmsLinkItem.classList.add("active")
    closeSideNav()
   
    openOneInnerContent("filmsContent")
    addContenuToFilmsContent(pageFilm)
}


seriesLinkItem.addEventListener('click',()=>{
    showSeries()
})

function showSeries(){
    removeActiveFromLinkItem()

    seriesLinkItem.classList.add("active")
    closeSideNav()
    openOneInnerContent("seriesContent")
    addContenuToSeriesContent(pageSerie)
}


animesLinkItem.addEventListener('click',()=>{
    showAnimes()
})

function showAnimes(){
    removeActiveFromLinkItem()

    animesLinkItem.classList.add("active")
    closeSideNav()
    openOneInnerContent("animesContent")
    addContenuToAnimesContent(pageAnime)
}

plansLinkItem.addEventListener('click',()=>{
    removeActiveFromLinkItem()

    plansLinkItem.classList.add("active")
    closeSideNav()
    displayPlansActif()
    displayPlans()
    openOneInnerContent("plansContent")
})

downloadsLinkItem.addEventListener('click',()=>{
    removeActiveFromLinkItem()

    downloadsLinkItem.classList.add("active")
    closeSideNav()
   
    openOneInnerContent("downloadsContent")
})


document.addEventListener("backbutton",function(e){
    e.preventDefault()

   if(currentOpenInnerContent !== null){
        let containerPrec = currentOpenInnerContent.getAttribute("data-vuePrecedent")
        let linkItem =  currentOpenInnerContent.getAttribute("data-linkItem")
        if(containerPrec!==null){
                openOneInnerContent(containerPrec)
                addActiveToLinkItem(linkItem)
        }
               

   }

})

function addActiveToLinkItem(linkName){
    removeActiveFromLinkItem()
    document.querySelector(`#${linkName}`).classList.add("active")
}
