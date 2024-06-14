const onglets = document.querySelectorAll(".onglets");

const contenus = document.querySelectorAll(".contenu-p")

let index = 0;

onglets.forEach(onglet=>{
    onglet.addEventListener("click",()=>{
        if(onglet.classList.contains("activeOnglet")){
            return;
        }else{
            onglet.classList.add("activeOnglet");
        }

        index= onglet.getAttribute("data-anim");

        for(i=0;i<onglets.length;i++){
            if(onglets[i].getAttribute("data-anim") != index){
                onglets[i].classList.remove("activeOnglet");
            }
        }

        for(j=0;j<contenus.length;j++){
            if(contenus[j].getAttribute("data-anim") == index){
                contenus[j].classList.add("activeContenu")
             
            }else{
                contenus[j].classList.remove("activeContenu");
               
            }
        }
    })
})