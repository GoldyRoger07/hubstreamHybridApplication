let popupContainer = document.querySelector(".popup-container");

function openPopup(id){
    popupContainer.style="display:flex";
    idPlan=id
    
}

function closePopup(){
    popupContainer.style="display:none";
}


const paramResPopupContainer = document.querySelector("#paramResPopupContainer")
const paramResPopupHeaderTitle = document.querySelector("#paramResPopupHeaderTitle")
const paramResForm = document.querySelector("#paramResForm")
const paramResUrlInput = document.querySelector("#paramResUrlInput")
const paramResModiferBtn = document.querySelector("#paramResModiferBtn")
const paramResAnnulerBtn = document.querySelector("#paramResAnnulerBtn")
const paramResPopup = document.querySelector("#paramResPopup")
const modifierUrlBtn = document.querySelector("#modifierUrlBtn")
const testBtn =  document.querySelector("#testBtn")

let parametresReseauxBtn = document.querySelector("#parametres-reseaux-btn")



function openPopupParamRes(parametres){
    
    openPopup2(paramResPopupContainer)
    paramResUrlInput.value=""
    paramResPopupHeaderTitle.textContent = parametres.popupHeaderTitle
    
    paramResForm.addEventListener("submit",(e)=>{
        e.preventDefault()
        parametres.modifier(paramResUrlInput.value)
    })

    paramResAnnulerBtn.addEventListener("click",()=>{
        parametres.annuler()
    })

    paramResAddTheme(parametres.theme)
}

function paramResAddTheme(theme){
    paramResPopup.classList.replace('dark'&&'light',theme)
    paramResPopup.querySelector(".button-container").classList.replace('dark'&&'light',theme)
    paramResPopup.querySelector(".input-container").classList.replace('dark'&&'light',theme)
    paramResPopup.querySelector(".title-generic").classList.replace('dark'&&'light',theme)
   
}

let paramRes = {
    popupHeaderTitle: "Parametres",
    theme:"light",
    modifier:function(url){
        console.log(url)
        updateOnlineApiUrl(url)
        closePopup2(paramResPopupContainer)
    },
    annuler:function(){
      closePopup2(paramResPopupContainer)
    }
}

modifierUrlBtn.addEventListener("click",()=>{
    paramRes.theme="light"
    openPopupParamRes(paramRes)
})


parametresReseauxBtn.addEventListener('click',()=>{
    cacherMenu()
    paramRes.theme="dark"
    openPopupParamRes(paramRes)
})

function closePopup2(container){
    container.classList.add("hidden")
}

function openPopup2(container){
    container.classList.remove("hidden")
}