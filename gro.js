import { getCustomprop, incrementCustomprop, setCustomprop } from "./Customfun.js";

const SPEED =0.05
const groundEle=document.querySelectorAll('[data-ground]');


//setup 
  export function SetUpGround(){
     setCustomprop(groundEle[0],"--left",0)
     setCustomprop(groundEle[1],"--left",300)
  } 



export function updateGround(delta,speedScale){
 groundEle.forEach(ground=>{
    incrementCustomprop(ground,"--left",delta*speedScale*SPEED*-1);
    if (getCustomprop(ground, "--left") <= -300) {
      incrementCustomprop(ground, "--left", 600)
    }
   })


}