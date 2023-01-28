import { getCustomprop, incrementCustomprop, setCustomprop } from "./Customfun.js"

const dinoElement =document.querySelector("[data-dino]")

const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
const DINO_FRAME_COUNT = 2
const FRAME_TIME = 100

let isJumping
let dinoFrame
let currentFrameTime
let yVelocity

export function setupDino(){
   isJumping=false
   dinoFrame=0
   currentFrameTime=0
   yVelocity=0
   setCustomprop(dinoElement,"--bottom",0)
   document.removeEventListener('keydown',onJump)
   document.addEventListener('keydown',onJump)
}
export function updateDino(delta,speedScale){
   handleRun(delta,speedScale)
   handleJump(delta)
}

function handleRun(delta,speedScale){
  if(isJumping)
  {   
     dinoElement.src = `imgs/dino-stationary.png`
            return
  }

  if (currentFrameTime >= FRAME_TIME) {
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
    dinoElement.src = `imgs/dino-run-${dinoFrame}.png`
    currentFrameTime -= FRAME_TIME
  }
  currentFrameTime += delta * speedScale
}
function handleJump(delta){
    if(!isJumping) return
     
    incrementCustomprop(dinoElement,"--bottom",yVelocity*delta)
   if(getCustomprop(dinoElement,"--bottom")<=0){
     setCustomprop(dinoElement,"--bottom",0)
     isJumping=false
   }
    
   yVelocity-=GRAVITY*delta
}

function onJump(e){
  if(e.code=="Space" || isJumping) return
  yVelocity=JUMP_SPEED
  isJumping=true
}