const slidePage = document.querySelector(".page.slidepage")

const firstNextBtn = document.querySelector(".nextBtn")


const prevBtnSec = document.querySelector(".prev-1")
const nextBtnSec = document.querySelector(".next-1")
const prevBtnThird = document.querySelector(".prev-2")
const submitBtn = document.querySelector(".submit")
const progressText = document.querySelectorAll(".step p")

const progressCheck = document.querySelectorAll(".step .check")
const bullet = document.querySelectorAll(".step .bullet")

let max = 3
let current = 1

firstNextBtn.addEventListener('click',()=>{
    slidePage.style.marginLeft = "-300px"
    bullet[current - 1].classList.add('active')
    progressText[current - 1].classList.add("active")
    progressCheck[current - 1].classList.add("active")
    current += 1
})



nextBtnSec.addEventListener('click',()=>{
    slidePage.style.marginLeft = "-600px"
    bullet[current - 1].classList.add('active')
    progressText[current - 1].classList.add("active")
    progressCheck[current - 1].classList.add("active")
    current += 1
})

prevBtnThird.addEventListener('click',()=>{
    slidePage.style.marginLeft = "-300px"
    bullet[current - 2].classList.remove('active')
    progressText[current - 2].classList.remove("active")
    progressCheck[current - 2].classList.remove("active")
    current -= 1
})

prevBtnSec.addEventListener('click',()=>{
  
    slidePage.style.marginLeft = "0px"
    progressText[current - 2].classList.remove("active")
    bullet[current - 2].classList.remove('active')
    progressCheck[current - 2].classList.remove("active")
    current -= 1
    
})

submitBtn.addEventListener('click',()=>{
    bullet[current - 1].classList.add('active')
    progressText[current - 1].classList.add("active")
    progressCheck[current - 1].classList.add("active")
    current += 1
   
})

