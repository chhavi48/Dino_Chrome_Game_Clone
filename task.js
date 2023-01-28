import { getCustomprop, incrementCustomprop, setCustomprop } from "./Customfun.js"

const SPEED = 0.05
const CACTUS_INTERVAL_MIN = 500
const CACTUS_INTERVAL_MAX = 2000
const worldElement = document.querySelector("[data-world]")
const dinoElement=document.querySelector("[data-dino]")
let nextCactusTim

export function updateCactus(delta,speedScale){
    document.querySelectorAll("[data-cactus]").forEach(cactus=>{
        incrementCustomprop(cactus,"--left",delta*speedScale*SPEED*-1)
        if(getCustomprop(cactus,"--left")<=-100){
          cactus.remove()
        }
    })
    if(nextCactusTim<=0){
      createCactus()
 nextCactusTim= randomNumberBetween(CACTUS_INTERVAL_MIN,CACTUS_INTERVAL_MAX)/speedScale
    }
  
nextCactusTim-=delta

}

function createCactus() {
    const cactus = document.createElement("img")
    cactus.dataset.cactus = true
    cactus.src = "imgs/cactus.png"
    cactus.classList.add("cactus")
    setCustomprop(cactus, "--left", 100)
    worldElement.append(cactus)
  }
  



export function setupCactus(){
  nextCactusTim=CACTUS_INTERVAL_MIN
  document.querySelectorAll("[data-cactus]").forEach(cactus => {
    cactus.remove()
  })
}

export function GetCactusRects(){
   return [...document.querySelectorAll("[data-cactus]")].map(cactus=>{
    return cactus.getBoundingClientRect()
   })
}

export function getDinoRects(){
    return dinoElement.getBoundingClientRect()
}
  

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  export function setDinoLose(){
   dinoElement.src= "imgs/dino-lose.png"

  }