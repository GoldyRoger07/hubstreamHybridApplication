
let argentBtn = document.querySelector("#argentBtn");
let pointBtn = document.querySelector("#pointBtn");

argentBtn.addEventListener("click",()=>{
    activerPlan('argent')
})

pointBtn.addEventListener("click",()=>{
    closePopup();
})

 function activerPlan(paiement){
    let formActiverPlan ={
        idCompte:localStorage.getItem("idCompte"),
        idPlan:idPlan,
        paiement:paiement
   }

   postToServer(`${onlineApiUrl}/plans/activation`,formActiverPlan)
   .then(obj=>{
        closePopup();
        if(obj.resultat){
            createToast("success","Votre plan a ete activer avec succes .");
        }else{
            createToast("error","Solde insufissant pour l'activation du plan .");
        }
   });
 }



let ongletPlanActif = document.querySelector("#ongletPlanActif");
let ongletPlans = document.querySelector("#ongletPlans");

ongletPlans.addEventListener('click',()=>{
     let planActifContenu = document.querySelector("#planActifContenu");
    if( planActifContenu.classList.contains('contenu-flex'))
        planActifContenu.classList.remove('contenu-flex');

        displayPlans()

})


ongletPlanActif.addEventListener("click",()=>{
   displayPlansActif()
})

function remplirPlanActifContainer(plansActif){
    let planActifsContainer = document.querySelector("#plan-actifs-container");
    let planActifContenu = document.querySelector("#planActifContenu");

   
    if(plansActif.length == 0){
        planActifContenu.innerHTML="";
        let p = document.createElement("p");
        p.classList.add("messageToUser");
        p.style.color="#f00"
        p.textContent="Vous n'avez aucun plan actif";
        planActifsContainer.classList.remove("plan-actifs-container");
        planActifContenu.classList.add("contenu-flex");
        planActifContenu.appendChild(p);
        planActifContenu.appendChild(planActifsContainer);
    
    }else{
        planActifContenu.innerHTML="";
        planActifContenu.appendChild(planActifsContainer);
        planActifsContainer.classList.add("plan-actifs-container");
        planActifContenu.classList.remove("contenu-flex");
        planActifsContainer.innerHTML="";
        
    plansActif.forEach(planActif=>{
        let div = document.createElement("div");
        div.classList.add("actif-card");
        let livraisonValue = planActif.activerPlan.plan.livraison>0?
        `${planActif.activerPlan.livraison}/${planActif.activerPlan.plan.livraison}`:"Aucune"
        
        div.innerHTML=`
        <div class="titre">
                <span>Plan:</span>
                <span>${planActif.activerPlan.plan.titre} | </span>
                <span>${planActif.prixFormatter} HTG</span>
        </div>

        <div class="partie-details-plan">

                <div class="ligne">
                    <span class="titre">Contenu:</span>
                    <span class="value">${planActif.activerPlan.plan.type}</span>
                </div>
                <div class="ligne">
                    <span class="titre">Duree:</span>
                    <span class="value">${planActif.activerPlan.plan.duree} ${planActif.activerPlan.plan.dureeExtension}</span>
                </div>

                <div class="ligne">
                    <span class="titre">Livraison(s):</span>
                    <span class="value">${livraisonValue}</span>
                </div>
      
        </div>
   
        <div class="partie-temps">
                <div class="ligne">
                    <span class="titre">Activé </span>
                    <span class="value" >${planActif.dateDebut}</span>
                    <span class="titre">à </span>
                    <span class="value">${planActif.heureDebut}</span>
                </div>
                <div class="ligne">
                    <span class="titre">Expire </span>
                    <span class="value"> ${planActif.dateExpiration}</span>
                    <span class="titre">à </span>
                    <span class="value">${planActif.heureExpiration}</span>
                </div>
        </div>

    </div>
        
        `

        planActifsContainer.appendChild(div);

      })
    }

   
}

function displayPlansActif(){
    let idCompte = localStorage.getItem("idCompte")
    fetch(`${onlineApiUrl}/plans/actif/${idCompte}`)
    .then(res=>res.json())
    .then(plansActif=>{
        remplirPlanActifContainer(plansActif)
    })
}

function displayPlans(){
    fetch(`${onlineApiUrl}/plans`)
    .then(res=> res.json())
    .then(plans=>{
        // filmCardPlanContainer.innerHTML=""
        // serieCardPlanContainer.innerHTML=""
        // animeCardPlanContainer.innerHTML=""
        allCardPlanContainer.innerHTML=""

        // plans.plansFilm.forEach(plan=>{
        //     let cardPlan = document.createElement("div")
        //     cardPlan.classList.add("card-plan")
        //     cardPlan.innerHTML=`
        //         <div class="head-card">
        //             <h3>${plan.titre}</h3>
        //         </div>
        //         <div class="body-card">
        //                 <div class="ligne">
        //                     <span class="titre">Duree</span>
        //                     <span class="value">${plan.duree} ${plan.dureeExtension}</span>
        //                 </div>

        //                 <div class="ligne">
        //                     <span class="titre">Points</span>
        //                     <span class="value">${plan.points} pts</span>
        //                 </div>

        //                 <div class="ligne">
        //                     <span class="titre">Prix</span>
        //                     <span class="value">${plan.prix} HTG</span>
        //                 </div>
        //                 <button onclick="openPopup(${plan.idPlan})">Activer</button>
        //         </div>
        //     `

        //     filmCardPlanContainer.appendChild(cardPlan)
        // })

        // plans.plansSerie.forEach(plan=>{
        //     let cardPlan = document.createElement("div")
        //     cardPlan.classList.add("card-plan")
        //     cardPlan.innerHTML=`
        //         <div class="head-card">
        //             <h3>${plan.titre}</h3>
        //         </div>
        //         <div class="body-card">
        //                 <div class="ligne">
        //                     <span class="titre">Duree</span>
        //                     <span class="value">${plan.duree} ${plan.dureeExtension}</span>
        //                 </div>

        //                 <div class="ligne">
        //                     <span class="titre">Points</span>
        //                     <span class="value">${plan.points} pts</span>
        //                 </div>

        //                 <div class="ligne">
        //                     <span class="titre">Prix</span>
        //                     <span class="value">${plan.prix} HTG</span>
        //                 </div>
        //                 <button onclick="openPopup(${plan.idPlan})">Activer</button>
        //         </div>
        //     `

        //     serieCardPlanContainer.appendChild(cardPlan)
        // })

        // plans.plansAnime.forEach(plan=>{
        //     let cardPlan = document.createElement("div")
        //     cardPlan.classList.add("card-plan")
        //     cardPlan.innerHTML=`
        //         <div class="head-card">
        //             <h3>${plan.titre}</h3>
        //         </div>
        //         <div class="body-card">
        //                 <div class="ligne">
        //                     <span class="titre">Duree</span>
        //                     <span class="value">${plan.duree} ${plan.dureeExtension}</span>
        //                 </div>

        //                 <div class="ligne">
        //                     <span class="titre">Points</span>
        //                     <span class="value">${plan.points} pts</span>
        //                 </div>

        //                 <div class="ligne">
        //                     <span class="titre">Prix</span>
        //                     <span class="value">${plan.prix} HTG</span>
        //                 </div>
        //                 <button onclick="openPopup(${plan.idPlan})">Activer</button>
        //         </div>
        //     `

        //     animeCardPlanContainer.appendChild(cardPlan)
        // })

        plans.plansAll.forEach(plan=>{
            let cardPlan = document.createElement("div")
            cardPlan.classList.add("card-plan")
            cardPlan.innerHTML=`
                <div class="head-card">
                    <h3>${plan.titre}</h3>
                </div>
                <div class="body-card">
                        <div class="ligne">
                            <span class="titre">Duree</span>
                            <span class="value">${plan.duree} ${plan.dureeExtension}</span>
                        </div>

                        <div class="ligne">
                            <span class="titre">Points</span>
                            <span class="value">${plan.points} pts</span>
                        </div>

                        <div class="ligne">
                            <span class="titre">Prix</span>
                            <span class="value">${plan.prix} HTG</span>
                        </div>

                        <div class="ligne">
                            <span class="titre">Livraison(s)</span>
                            <span class="value">${plan.livraison}</span>
                        </div>
                        <button onclick="openPopup(${plan.idPlan})">Activer</button>
                </div>
            `

            allCardPlanContainer.appendChild(cardPlan)
        })

    })
}

