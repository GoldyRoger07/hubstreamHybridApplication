

function closeAllPages(){
    let pages = document.querySelectorAll(".page")
    closeItems(pages)
}

function openOnePage(pageName){
   
        // if(sens==='next')
        //   getOpenPage().style="transform:translateX(-100%)"
        // else
        //   getOpenPage().style="transform:translateX(100%)"
        getOpenPage().classList.add("out-animation")


        setTimeout(()=>{
            closeAllPages()
          openItem(pageName)
            
        },150)
      
    
}



function getOpenPage(){
    let pages = document.querySelectorAll(".page")
    let pageOpened = {}
    pages.forEach(page => {
            if(!page.classList.contains('hidden'))
                return pageOpened =  page
    });

   return pageOpened
}

function getOpenInscriptionSection(){
    let finalSection = null
    let inscriptionSections = document.querySelectorAll(".inscription-section")
    inscriptionSections.forEach(section => {
        if(!section.classList.contains('hidden'))
            return finalSection = section
    });
    return finalSection;
}

function openOneInscriptionSection(sectionName){
    // if(sens==='next')
    //       getOpenInscriptionSection().style="transform:translateX(-100%)"
    // else
          getOpenInscriptionSection().classList.add("out-animation")

    setTimeout(()=>{
        closeAllInscriptionSections()
           openItem(sectionName)
           
          
            
    },150)
   
  
}

function closeAllInscriptionSections(){
    let inscriptionSections = document.querySelectorAll(".inscription-section")
    closeItems(inscriptionSections)
}

function closeItems(items){
    items.forEach(item => {
        if(!item.classList.contains("hidden"))
           item.classList.add("hidden")
    });
}

function openItem(name){
    let item = document.querySelector(`#${name}`)
    
    if(item.classList.contains("out-animation"))
        item.classList.remove("out-animation")
    item.classList.remove("hidden")
    // if(sens==='next')
    //     item.style="transform: translateX(100%)"
    // else
    //     item.style="transform: translateX(-100%)"

    return item;
}



const optionBack = document.querySelector("#optionBack")

let currentSection = 0


linkInscription.addEventListener('click',()=>{
    openOnePage('inscriptionPage','next')
    optionBack.querySelector("span").textContent="Se connecter"
    currentSection=1
})

optionBack.addEventListener('click',()=>{
    switch(currentSection){
        case 1: 
            openOnePage('loginPage','previous') 
            currentSection = 0
        break;
        case 2:
            openOneInscriptionSection('inscriptionPart1','previous')
            currentSection = 1
            optionBack.querySelector("span").textContent="Se connecter"
        break
        case 3:
            openOneInscriptionSection('inscriptionPart2','previous')
            currentSection = 2
            optionBack.querySelector("span").textContent="Retour"
        break 
    }
})





setTimeout(()=>{
    let welcomePage = document.querySelector("#welcomePage")

    welcomePage.classList.add("out-animation")
    setTimeout(()=>{
        let isConnecter = localStorage.getItem("isConnecter")
        if(isConnecter==='oui'){
            openOnePage('accueilPage')
            
                addContenuAleatoireToHomeContent()
            
           
        } else    
            openOnePage('loginPage')

    },150)
   
},3000)
