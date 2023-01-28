 import { SetUpGround, updateGround } from "./gro.js";

const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const worldElement =document.querySelector('[data-world]');

setPixelToWorldscale()
window.addEventListener('resize',setPixelToWorldscale)
document.addEventListener('keydown',handleStart,{once:true})

SetUpGround()
// MOVING THE DINO
let lasttime
function update(time){
    if(lasttime==null){
        lasttime=time
        window.requestAnimationFrame(update)
        return
    }
    const delta=time-lasttime
    // console.log(delta)
    updateGround(delta,1)
    lasttime = time
    window.requestAnimationFrame(update)


}
window.requestAnimationFrame(update)


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

