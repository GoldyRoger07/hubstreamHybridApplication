let plansFilm = document.querySelector("#plans-film");
let plansFilmEntete = document.querySelector("#plans-film .entete");
let plansFilmBtn = document.querySelector("#plans-film-btn");


let plansSerie = document.querySelector("#plans-serie");
let plansSerieEntete = document.querySelector("#plans-serie .entete");
let plansSerieBtn = document.querySelector("#plans-serie-btn");

let plansAnime = document.querySelector("#plans-anime");
let plansAnimeEntete = document.querySelector("#plans-anime .entete");
let plansAnimeBtn = document.querySelector("#plans-anime-btn");

let plansAll = document.querySelector("#plans-all");
let plansAllEntete = document.querySelector("#plans-all .entete");
let plansAllBtn = document.querySelector("#plans-all-btn");



// plansFilmBtn.addEventListener("click",()=>{
//     dropDownFunc(plansFilm,plansFilmEntete,plansFilmBtn);
// })

// plansFilmEntete.addEventListener('click',()=>{
//     dropDownFunc(plansFilm,plansFilmEntete,plansFilmBtn);
// })

// plansSerieBtn.addEventListener("click",()=>{
//     dropDownFunc(plansSerie,plansSerieEntete,plansSerieBtn);
// })

// plansSerieEntete.addEventListener('click',()=>{
//     dropDownFunc(plansSerie,plansSerieEntete,plansSerieBtn);
// })

// plansAnimeBtn.addEventListener("click",()=>{
//     dropDownFunc(plansAnime,plansAnimeEntete,plansAnimeBtn);
// })

// plansAnimeEntete.addEventListener('click',()=>{
//     dropDownFunc(plansAnime,plansAnimeEntete,plansAnimeBtn);
// })

// plansAllBtn.addEventListener("click",()=>{
//     dropDownFunc(plansAll,plansAllEntete,plansAllBtn);
// })

plansAllEntete.addEventListener('click',()=>{
    dropDownFunc(plansAll,plansAllEntete,plansAllBtn);
})

function dropDownFunc(container,entete,btn){
    let etat = btn.dataset.etat*1;
    
    if(etat === 0){
        container.style.height= `${container.scrollHeight}px`;
        btn.dataset.etat="1";
        btn.setAttribute("class","fa-solid fa-square-minus")
    }else{
        container.style.height= `${entete.scrollHeight}px`;
        btn.dataset.etat="0";
        btn.setAttribute("class","fa-solid fa-square-plus")
    }
}