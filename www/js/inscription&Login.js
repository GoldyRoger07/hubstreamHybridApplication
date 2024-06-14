// let passwordInput = document.querySelector("#password");
// let confirmPasswordInput = document.querySelector("#confirmPassword");
// let messagePassword = document.querySelector(".message-password");
// let submitBtn = document.querySelector("#submitBtn");
// passwordInput.addEventListener("keyup",() =>{
//     codePassworFactoriser(confirmPasswordInput.value,passwordInput.value);
// })

// confirmPasswordInput.addEventListener("keyup",() =>{
//    codePassworFactoriser(confirmPasswordInput.value,passwordInput.value);
// })

// function codePassworFactoriser(confirmPasswordValue,passwordValue){
//     if(confirmPasswordValue != ""){
//         if(confirmPasswordValue == passwordValue){
           
//             messagePassword.textContent = "Passwords Match";
//             messagePassword.style.color = "#4ec200";
//         }else{
           
//             messagePassword.textContent = "Passwords don't Match";
//             messagePassword.style.color = "#e90000";
//         }   
            
//     }else
//         messagePassword.style.color = "#fff";
      

    
// }

let inscripInputs = document.querySelectorAll("#inscrip-inputs input")

let invisibleInscripInput = document.querySelector("#invisible-inscrip-input")


let loginInputs = document.querySelectorAll("#login-inputs input")

let invisibleLoginInput = document.querySelector("#invisible-login-input")

// invisibleInscripInput.addEventListener('keyup',()=>{
    
//     let invisibleValue = invisibleInscripInput.value

   
//     switch(invisibleValue.length){
//         case 0:
//             inscripInputs[0].value = ""
//         break
//         case 1:
//                 inscripInputs.forEach((input,index)=>{
//                     if(index==0)
//                         input.value=invisibleValue[index]
//                     else    
//                         input.value=""
//                 })
//         break
//         case 2: 
//                 inscripInputs.forEach((input,index)=>{
//                     if(index<2)
//                         input.value=invisibleValue[index]
//                     else    
//                         input.value=""
//                 })
//         break
//         case 3: 
//                 inscripInputs.forEach((input,index)=>{
//                     if(index!=3)
//                         input.value=invisibleValue[index]
//                     else    
//                         input.value=""
//                 })
//         break
//         case 4:
                
//                 inscripInputs.forEach((input,index)=>{
//                     input.value=invisibleValue[index]
//                 })
//         break
//         default:
//             invisibleInscripInput.value= invisibleInscripInput.value.substring(0,4)
//         break
//     }   
    
// })

gestionInputsPin(invisibleInscripInput,inscripInputs)
gestionInputsPin(invisibleLoginInput,loginInputs,"login")

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

                    if(option==="login"){
                        let usernameLogin = document.querySelector("#usernameLogin")

                        if(usernameLogin.value.length>=4){
                            traitementFormLogin()
                            
                        }
                            
                    }
            break
            default:
                invisibleInput.value= invisibleInput.value.substring(0,4)
            break
        }   
        
    })
}

let inscripShowHideBtn = document.querySelector("#inscrip-show-hide-btn")

let loginShowHideBtn = document.querySelector("#login-show-hide-btn")

// inscripShowHideBtn.addEventListener('click',()=>{
//    inscripShowHideBtn.innerHTML=`
//         <i class="fa-regular fa-eye"></i>
//    `
//     inscripInputs.forEach(input=>{
//         input.type="number"
//     })

//     setTimeout(()=>{
//         inscripInputs.forEach(input=>{
//             input.type="password"
//         })

//         inscripShowHideBtn.innerHTML=`
//             <i class="fa-regular fa-eye-slash"></i>
//         `
//     },400)
// })

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

addEventToShowHideBtn(inscripShowHideBtn,inscripInputs)
addEventToShowHideBtn(loginShowHideBtn,loginInputs)



// Traitement du login

const formLogin = document.querySelector("#formLogin"),
      usernameLogin = document.querySelector("#usernameLogin"),
      pinLogin = document.querySelector("#invisible-login-input");

      formLogin.addEventListener('submit',(event)=>{
            event.preventDefault();
           
      })

      if(localStorage.getItem('username')!=null)
        usernameLogin.value = localStorage.getItem('username')

      function traitementFormLogin(){
        let compte = {
            username : usernameLogin.value,
            codePin : pinLogin.value 
        }

       soumissionFormLogin(compte)

      }

      function soumissionFormLogin(compte){
        let xhr = new XMLHttpRequest();
        showLoader()
        xhr.open("POST",`${onlineApiUrl}/compte/login`,true);
        xhr.setRequestHeader('Content-Type','application/json')
        xhr.onload= function (){
            if(xhr.status === 200){
                let reponse = JSON.parse(xhr.responseText);
                if(reponse.status=="success"){

                    localStorage.setItem('username',compte.username)
                    localStorage.setItem('idCompte',reponse.idCompte)
                    fetch(`${onlineApiUrl}/compte/${reponse.idCompte}`)
                    .then(res=>res.json())
                    .then(compte=>{
                        localStorage.setItem("compte",JSON.stringify(compte))
                        updateInfoInNav(compte.nom,compte.prenom)
                    })
                    localStorage.setItem('isConnecter','oui')
                    openOneInnerContent("homeContent")
                    openOnePage('accueilPage','next')
                    hideLoader()

                } else{
                    let loginInputs = document.querySelectorAll("#login-inputs input")
                    loginInputs.forEach(input=>{
                        input.value=""
                    })
                    document.querySelector("#invisible-login-input").value=""
                    createToast(reponse.status,reponse.message,null,'light');
                    hideLoader()
                }
                   
                    
                    
            }
        }
        xhr.send(JSON.stringify(compte));
      }


// Traitement de l'inscription des utilisateurs

const formInscription = document.querySelector("#formInscription"),
formInscription2 = document.querySelector("#formInscription2"),
formInscription3 = document.querySelector("#formInscription3"),
nomInscription = document.querySelector("#nomInscription"),
prenomInscription = document.querySelector("#prenomInscription"),
usermameInscription = document.querySelector("#usernameInscription2"),
telephoneInscription = document.querySelector("#telephoneInscription");



formInscription.addEventListener('submit',(event)=>{
    event.preventDefault();
    optionBack.querySelector("span").textContent="Retour"
   openOneInscriptionSection('inscriptionPart2','next')
   currentSection=2
})

formInscription2.addEventListener('submit',(event)=>{
    event.preventDefault();
    compte = {
        username : usermameInscription.value
    }

    let xhr = new XMLHttpRequest();
        xhr.open("GET",`${onlineApiUrl}/compte/test-username/${usermameInscription.value}`,true);
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.onload = function (){
            if(xhr.status === 200){
                let reponse = JSON.parse(xhr.responseText);
                    if(reponse.status == "error")
                        createToast(reponse.status,reponse.message,null,'light');
                     else{
                        optionBack.querySelector("span").textContent="Retour"
                        openOneInscriptionSection('inscriptionPart3','next')
                        currentSection=3
                     }
                       
            }
        }
        xhr.send();
})

let InscripInput = document.querySelector("#invisible-inscrip-input")
formInscription3.addEventListener('submit',(event)=>{
    event.preventDefault();
    let pinValue = InscripInput.value;

    let test1 = pinValue.length == 4 
        

         if(test1){
              let compte={
                  nom : nomInscription.value,
                  prenom : prenomInscription.value,
                  telephone : telephoneInscription.value,
                  username : usermameInscription.value,
                  codePin : pinValue
              }
              
              soumissionFormInscription(compte)
             
         }else
             createToast("error","Le code PIN doit avoir 4 chiffres",null,'light')
         
         
           
})


function  soumissionFormInscription(compte){
    let xhr = new XMLHttpRequest();

    xhr.open("POST",`${onlineApiUrl}/compte/inscription`,true);
    xhr.setRequestHeader("Content-Type","application/json");
    xhr.onload= function (){
        if(xhr.status === 200){
            let reponse = JSON.parse(xhr.responseText);
            if(reponse.status == "error"){
                createToast(reponse.status,reponse.message,null,'light');
               
                optionBack.querySelector("span").textContent="Retour"
                openOneInscriptionSection('inscriptionPart2','previous')
                currentSection=2
            }else{
                createToast("success",reponse.message,null,'light');
                
                optionBack.querySelector("span").textContent="Se connecter"
                openOnePage('loginPage')
                currentSection=0
            }
               

        }
    }
    xhr.send(JSON.stringify(compte));
}

// Deconnexion

function deconnexion(){
    let idCompte = localStorage.getItem("idCompte")

    getFromServer(`${onlineApiUrl}/compte/deconnexion/${idCompte}`).
    then(response=>{
        console.log(idCompte)
        if(response.status=="success"){
            localStorage.setItem("idCompte","")
            localStorage.setItem("isConnecter","non")
            closeAllInnerContent()
            closeSideNav()
            window.location.reload()
            openOnePage('loginPage','previous')
            
        }
    }).
    catch(error=>{
        createToast("error","Connecter vous au wifi Hubstream",null,'dark');
    })
    
}