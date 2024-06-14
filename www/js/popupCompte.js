let popupCloseBtn = document.querySelector("#popup-close-btn")

let popupCompteContainer = document.querySelector(".popup-compte-container")

let popupChangePassword = document.querySelector(".popup-change-password ")

let popupCompte = document.querySelector(".popup-compte")



popupCloseBtn.addEventListener('click',()=>{
    popupCompteContainer.classList.add('hidden-popup')
    popupCompte.classList.add("hidden-popup")
    document.querySelector("body").style.overflow="auto"
})


let modifierCompteBtn = document.querySelector("#modifier-compte-btn")

modifierCompteBtn.addEventListener('click',()=>{
    cacherMenu();
    getFromServer(`${onlineApiUrl}/compte/${localStorage.getItem("idCompte")}`)
    .then(compte=> {
       
        modifierPopupCompte(compte)
        getSolde().then(solde=>modifierSolde(solde))
       document.querySelector("body").style.overflow="hidden"
        popupCompteContainer.classList.remove('hidden-popup')
        popupCompte.classList.remove('hidden-popup')
    })

})

let formModifierCompte = document.querySelector("#form-modifier-compte")
let inputNom = document.querySelector("#input-nom")
let inputPrenom = document.querySelector("#input-prenom")
let inputUsername = document.querySelector("#input-username")
let inputTelephone = document.querySelector("#input-telephone")
let divSolde = document.querySelector("#div-solde")
let divPoints = document.querySelector("#div-points")

formModifierCompte.addEventListener('submit',(e)=>{
    e.preventDefault();

   
        let compte = {
        idCompte: localStorage.getItem("idCompte"),
        nom: inputNom.value,
        prenom: inputPrenom.value,
        username: inputUsername.value,
        telephone: inputTelephone.value
    }

    postToServer(`${onlineApiUrl}/compte/update`,compte)
    .then(obj=>{
        if(obj.resultat){
          
            getFromServer(`${onlineApiUrl}/compte/${localStorage.getItem("idCompte")}`)
            .then(compte=> {
                modifierPopupCompte(compte)
                getSolde().then(solde=>modifierSolde(solde))
            })
            createToast("success","Votre compte a ete modifier.");
        }else{
            createToast("error","Ce username existe deja.");
        }
    })

})

async function getSolde(){

   return getFromServer(`${onlineApiUrl}/compte/${localStorage.getItem("idCompte")}/solde`)
    .then(compte => {
      return compte.solde
        
    })
    

}

function modifierPopupCompte(compte){
    inputNom.value = compte.nom
    inputPrenom.value = compte.prenom
    inputTelephone.value = compte.telephone
    inputUsername.value = compte.username

    inputNom.placeholder = compte.nom
    inputPrenom.placeholder = compte.prenom
    inputTelephone.placeholder = compte.telephone
    inputUsername.placeholder = compte.username
    divPoints.textContent=`${compte.points} pts`
   localStorage.setItem("nom",compte.nom)
   localStorage.setItem("prenom",compte.prenom)

    updateInfoInNav(compte.nom,compte.prenom)
  
}


function updateInfoInNav(nom,prenom){
    let userBtn = document.querySelector("#user-btn")
    userBtn.querySelector(".user-btn-logo").textContent=`${nom[0]}`
    userBtn.querySelector("#div-idCompte").textContent=nom+" "+prenom

}
let  compte = JSON.parse(localStorage.getItem("compte"))

if(compte!==null)
    updateInfoInNav(compte.nom,compte.prenom)


function modifierSolde(solde){
    divSolde.textContent = `${solde.toFixed(2)} HTG`
}

let modifierPasswordBtn = document.querySelector("#modifier-password-btn")



let formModifierPassword = document.querySelector("#form-modifier-password")

let inputAncienPassword = document.querySelector("#input-ancien-password")

let inputNouveauPassword = document.querySelector("#input-nouveau-password")

let inputConfirmationPassword = document.querySelector("#input-confirmation-password")

let popupCpCloseBtn = document.querySelector("#popup-cp-close-btn")

let confirmBox = document.querySelector(".confirm-box")

let isConfirm = false

modifierPasswordBtn.addEventListener('click',()=>{
    cacherMenu()
    popupCompteContainer.classList.remove("hidden-popup")
    popupChangePassword.classList.remove("hidden-popup")
})


popupCpCloseBtn.addEventListener('click',()=>{
    popupCompteContainer.classList.add("hidden-popup")
    popupChangePassword.classList.add("hidden-popup")
})

formModifierPassword.addEventListener('submit',(e)=>{
    e.preventDefault()
  

        let FormModifPass = {
            idCompte: localStorage.getItem("idCompte"),
            ancienPassword: invisibleAncienInput.value,
            nouveauPassword: invisibleNouveauInput.value
        }

        postToServer(`${onlineApiUrl}/compte/password`,FormModifPass)
        .then(obj=>{
            if(obj.resultat){
                createToast("success","Votre code PIN a ete modifier.")
                popupCompteContainer.classList.add("hidden-popup")
                popupChangePassword.classList.add("hidden-popup")
            }else{
                createToast("error","Une erreur est survenue lors de la modification,verifier votre ancien code PIN")
            }
        })
    
})

let invisibleAncienInput = document.querySelector("#invisible-ancien-input")
let ancienPinInputs = document.querySelectorAll("#ancien-pin-inputs input")
let ancienShowHideBtn = document.querySelector("#ancien-show-hide-btn")

gestionInputsPin(invisibleAncienInput,ancienPinInputs)

let invisibleNouveauInput = document.querySelector("#invisible-nouveau-input")
let nouveauPinInputs = document.querySelectorAll("#nouveau-pin-inputs input")
let nouveauShowHideBtn = document.querySelector("#nouveau-show-hide-btn")

gestionInputsPin(invisibleNouveauInput,nouveauPinInputs)


function gestionInputsPin(invisibleInput,inputs,option){
    invisibleInput.addEventListener('keyup',()=>{
    
        let invisibleValue = invisibleInput.value
    
       
        switch(invisibleValue.length){
            case 0:
                inputs[0].value = ""
            break
            case 1:
                    inputs.forEach((input,index)=>{
                        if(index==0)
                            input.value=invisibleValue[index]
                        else    
                            input.value=""
                    })
            break
            case 2: 
                    inputs.forEach((input,index)=>{
                        if(index<2)
                            input.value=invisibleValue[index]
                        else    
                            input.value=""
                    })
            break
            case 3: 
                    inputs.forEach((input,index)=>{
                        if(index!=3)
                            input.value=invisibleValue[index]
                        else    
                            input.value=""
                    })
            break
            case 4:
                    
                    inputs.forEach((input,index)=>{
                        input.value=invisibleValue[index]
                    })

                    // if(option==="login"){
                    //     let usernameLogin = document.querySelector("#usernameLogin")

                    //     if(usernameLogin.value.length>=4){
                    //         traitementFormLogin()
                            
                    //     }
                            
                    // }
            break
            default:
                invisibleInput.value= invisibleInput.value.substring(0,4)
            break
        }   
        
    })
}

addEventToShowHideBtn(ancienShowHideBtn,ancienPinInputs)
addEventToShowHideBtn(nouveauShowHideBtn,nouveauPinInputs)

function addEventToShowHideBtn(btn,inputs){
    btn.addEventListener('click',()=>{
        btn.innerHTML=`
             <i class="fa-regular fa-eye"></i>
        `
        inputs.forEach(input=>{
             input.type="number"
         })
     
         setTimeout(()=>{
            inputs.forEach(input=>{
                 input.type="password"
             })
     
             btn.innerHTML=`
                 <i class="fa-regular fa-eye-slash"></i>
             `
         },400)
     })
}

let transfertBtn = document.querySelector("#transfert-btn")
let popupTransfertContainer = document.querySelector(".popup-transfert-container")
let popupTransfertCloseBtn = document.querySelector(".popup-transfert-close-btn")
let searchResultBox = document.querySelector(".search-result-box")
let usernameTransfertInput = document.querySelector("#username-transfert-input")
let montantTransfertInput = document.querySelector("#montant-transfert-input")
let verifUsername = document.querySelector("#verif-username")
let verifMontant = document.querySelector("#verif-montant")
let formTransfert = document.querySelector("#form-transfert")
let next1 = document.querySelector(".next-1")
let headerSolde = document.querySelector("#header-solde")

next1.addEventListener('click',()=>{
  if(usernameTransfertInput.value!=""){
    verifUsername.innerHTML=`
    Username: <span>${usernameTransfertInput.value}</span>
`


  }else {
    verifUsername.innerHTML=`Username: <span> Aucun </span>`
  }

  if(montantTransfertInput.value!=""){
       verifMontant.innerHTML=`
        Montant: <span>${montantTransfertInput.value} HTG</span>
    `
  }else{
    verifMontant.innerHTML=` Montant: <span>0 HTG</span> `
  }
})

formTransfert.addEventListener('submit',(e)=>{
    e.preventDefault()
    let usernameTransfert = usernameTransfertInput.value
    let montantTransfert = montantTransfertInput.value
    let transfert = {
        compteSource:{
            idCompte: localStorage.getItem("idCompte") 
        },
        compteDestinataire:{
            idCompte: getIdCompteByUsername(usernameTransfert)
        },
        montant: montantTransfert
    }



    console.log(transfert.compteDestinataire)
        if(transfert.compteSource.idCompte!=transfert.compteDestinataire.idCompte){
            postToServer(`${onlineApiUrl}/transfert`,transfert)
            .then(obj=>{
                if(obj.resultat){
                    createToast('success','Transfert effectuer avec succes !')
                    popupTransfertContainer.classList.add('hidden-popup')
                }else{
                    console.log(obj.resultat)
                    createToast('error','Solde insuffisant ou le montant du transfert est trop petit')
                    setTimeout(()=> popupTransfertContainer.classList.add('hidden-popup'),300)

                }
        
            })
        
        }else{
            createToast('error','Une erreur est survenue')
            setTimeout(()=> popupTransfertContainer.classList.add('hidden-popup'),300)
        }


})

function getIdCompteByUsername(username){
    let result =""
    comptes.forEach(compte=>{
        if(compte.username == username)
            result = compte.idCompte
    })

    return result
}


const progressTexts = document.querySelectorAll(".step p")
const progressChecks = document.querySelectorAll(".step .check")
const bullets = document.querySelectorAll(".step .bullet")
let slidePages = document.querySelector(".page.slidepage")

function resetPopup(){
    progressChecks.forEach(progressCheck=>{
        progressCheck.classList.remove("active")
    })

    progressTexts.forEach(progressText=>{
        progressText.classList.remove("active")
    })

    bullets.forEach(bullet=>{
        bullet.classList.remove("active")
    })

    current = 1

    slidePages.style.marginLeft = "0px"

    usernameTransfertInput.value=""
    montantTransfertInput.value=""
}



transfertBtn.addEventListener('click',()=>{
    cacherMenu()

    getSolde().then(solde=>{
        headerSolde.textContent=`Votre solde: ${solde.toFixed(2)} HTG`
    })

    resetPopup()
    popupTransfertContainer.classList.remove("hidden-popup")

})

popupTransfertCloseBtn.addEventListener('click',()=>{
    popupTransfertContainer.classList.add("hidden-popup")
})

let comptes;
async function getComptes(){
    getFromServer(`${onlineApiUrl}/comptes`)
    .then(listeComptes =>{
        comptes = listeComptes;
    })
}

getComptes()

usernameTransfertInput.addEventListener('keyup',()=>{
  

    let usernameTransfert = usernameTransfertInput.value.toLowerCase()
   console.log(comptes)
    let filteredComptes = filterComptes(comptes,usernameTransfert)

    if(usernameTransfert!="" && filteredComptes!=null){
        createSearchResultB(filteredComptes)
    } else{
        searchResultBox.innerHTML=""    
        searchResultBox.style="display:none"     
    }
    
})

function createSearchResultB(comptes){
    if(comptes != null){
        searchResultBox.innerHTML=""
        searchResultBox.style="display:block"
            comptes.forEach(compte=>{
                let resultLine = document.createElement("div")
                resultLine.classList.add("result-line")
                resultLine.textContent = compte.username
                searchResultBox.appendChild(resultLine)

                resultLine.addEventListener('click',()=>{
                    usernameTransfertInput.value=resultLine.textContent
                    searchResultBox.innerHTML=""
                    searchResultBox.style="display:none"     
                })

            })
    }
}

function filterComptes(comptes,motRechercher){
    return comptes.filter(
            compte => compte.username.toLowerCase().startsWith(motRechercher)
    )
}