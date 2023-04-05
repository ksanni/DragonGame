var gameOver=document.querySelector(".gameOver");
var scoreCount=document.querySelector(".scoreCount");
var monkey=document.querySelector(".monkey");
var lion=document.querySelector(".lion");
var playAgain=document.querySelector(".playAgain");
var startGame=document.querySelector(".startGame");



startGame.addEventListener('click',()=>{
    document.querySelector(".section").remove();
    document.querySelector(".hide").classList.remove('hide');

})

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
        monkey.classList.add('animateMonkey');
        setTimeout(() => {
        monkey.classList.remove('animateMonkey')
        }, 700);
    }
    if(e.key==="ArrowRight"){
       let monkeyX=parseInt(window.getComputedStyle(monkey,null).getPropertyValue('left'));
        monkey.style.left= monkeyX+75+"px";
    }
    if(e.key==="ArrowLeft"){
        let monkeyX=parseInt(window.getComputedStyle(monkey,null).getPropertyValue('left'));
        monkey.style.left=(monkeyX-112)+"px";
    }

});


 //game over
setInterval(() => {
    let dx= parseInt(window.getComputedStyle(monkey,null).getPropertyValue('left'));
    let dy= parseInt(window.getComputedStyle(monkey,null).getPropertyValue('top'));
    
    let ox= parseInt(window.getComputedStyle(lion,null).getPropertyValue('left'));
    let oy= parseInt(window.getComputedStyle(lion,null).getPropertyValue('top'));

    let offsetX= Math.abs(dx-ox);
    let offsetY= Math.abs(dy-oy);
   
   
    if(offsetX<73 && offsetY<52){
        gameOver.style.visibility='visible';
        playAgain.style.visibility='visible';
        document.querySelector(".img3").style.visibility='visible';
        lion.classList.remove('animateLion');
        monkey.classList.remove('monkey');
        lion.classList.remove('lion');

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
            let aniDur=parseFloat(window.getComputedStyle(lion,null).getPropertyValue('animation-duration'));
            let newDur= aniDur - .3;
            console.log("num"+ newDur);
            lion.style.animationDuration= newDur + 's';
            if(newDur<=5){
                lion.style.animationDuration= 5 + 's';
            }
        }, 500);
    }
}, 10);

function updateScore(score){
    scoreCount.innerHTML="Your Score:"+score;
}