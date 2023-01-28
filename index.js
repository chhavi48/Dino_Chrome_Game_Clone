 import { SetUpGround, updateGround } from "./gro.js";
import { updateDino,setupDino } from "./dinosetup.js";
import { updateCactus,setupCactus,getDinoRects,GetCactusRects, setDinoLose } from "./task.js";
const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SPEED_SCALE_INCREASE = 0.00001
const worldElement =document.querySelector('[data-world]');
const scoreElement=document.querySelector('[data-score]');
const StartElement = document.querySelector('[data-start-screen]');
setPixelToWorldscale()
window.addEventListener('resize',setPixelToWorldscale)
document.addEventListener('keydown',handleStart,{once:true})

SetUpGround()




// MOVING THE DINO
let lasttime
let speedScale 
let score
// Press key to start

function handleStart(){
    lasttime=null;
    speedScale=1
    score=0
    SetUpGround()
    setupDino()
    setupCactus()
    StartElement.classList.add('hide')
    window.requestAnimationFrame(update)
}
function updateSpeedscale(delta){
    speedScale += delta * SPEED_SCALE_INCREASE
}
function updateScore(delta){
    score+=delta*0.01
    scoreElement.textContent=Math.floor(score)
}

function update(time){
    if(lasttime==null){
        lasttime=time
        window.requestAnimationFrame(update)
        return
    }
    const delta=time-lasttime
    // console.log(delta)
    updateGround(delta,speedScale)
    updateSpeedscale(delta)
    updateScore(delta)
    updateDino(delta,speedScale)
    updateCactus(delta,speedScale)

    if(checkLose()) return handleLose()
    lasttime = time
    window.requestAnimationFrame(update)


}

function checkLose(){
    const dinoRect =getDinoRects()
    return GetCactusRects().some(rect=>isCollision(rect,dinoRect))
}
function handleLose() {
    setDinoLose()
    setTimeout(() => {
      document.addEventListener("keydown", handleStart, { once: true })
      StartElement.classList.remove("hide")
    }, 100)
  }

function isCollision(rect1, rect2) {
    return (
      rect1.left < rect2.right &&
      rect1.top < rect2.bottom &&
      rect1.right > rect2.left &&
      rect1.bottom > rect2.top
    )
  }

//RESPONSIVE NESS
function setPixelToWorldscale(){
    let worldpixelscale
    if(window.innerWidth/window.innerHeight< WORLD_WIDTH/WORLD_HEIGHT){
        worldpixelscale=window.innerWidth/WORLD_WIDTH
    } else{
        worldpixelscale=window.innerHeight/WORLD_HEIGHT
    }

  worldElement.style.width=`${WORLD_WIDTH*worldpixelscale}px`
  worldElement.style.height=`${WORLD_HEIGHT*worldpixelscale}px`
}

