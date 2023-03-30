var gameOver=document.querySelector(".gameOver");
var scoreCount=document.querySelector(".scoreCount");
var dino=document.querySelector(".dino");
var dragon=document.querySelector(".dragon");
var playAgain=document.querySelector(".playAgain");

let score=0;
let cross=true;

let audio= new Audio('./audio/music.mp3');
let audioGo= new Audio('./audio/gameover.mp3');

setTimeout(() => {
    audio.play();
}, 1000);


document.addEventListener("keydown", (e)=>{
    if(e.key==="ArrowUp"){
        console.log(e);
        dino.classList.add('animateDino');
        setTimeout(() => {
        dino.classList.remove('animateDino')
        }, 700);
    }
    if(e.key==="ArrowRight"){
       let dinoX=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left= dinoX+75+"px";
    }
    if(e.key==="ArrowLeft"){
        let dinoX=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left=(dinoX-112)+"px";
    }
});


 //game over
setInterval(() => {
    let dx= parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
    let dy= parseInt(window.getComputedStyle(dino,null).getPropertyValue('top'));
    
    let ox= parseInt(window.getComputedStyle(dragon,null).getPropertyValue('left'));
    let oy= parseInt(window.getComputedStyle(dragon,null).getPropertyValue('top'));

    let offsetX= Math.abs(dx-ox);
    let offsetY= Math.abs(dy-oy);
   
   
    if(offsetX<73 && offsetY<52){
        gameOver.style.visibility='visible';
        playAgain.style.visibility='visible';
        dragon.classList.remove('animateDrago');
        dino.classList.remove('dino');

        playAgain.addEventListener('click', ()=>{
           location.reload();
        })
        audioGo.play();
        setTimeout(() => {
            audioGo.pause();
            audio.pause();
        }, 1000);

    }else if(offsetX <145 && cross){ //update score
        score+=1;
        updateScore(score);
        cross=false;
        setTimeout(() => {
            cross=true;
        }, 1000);

        // speed increase
        setTimeout(() => {
            let aniDur=parseFloat(window.getComputedStyle(dragon,null).getPropertyValue('animation-duration'));
            let newDur= aniDur - .1;
            dragon.style.animationDuration= newDur + 's';
            if(newDur<=4){
                dragon.style.animationDuration= 4 + 's';
            }
        }, 500);
    }
}, 10);

function updateScore(score){
    scoreCount.innerHTML="Your Score:"+score;
}