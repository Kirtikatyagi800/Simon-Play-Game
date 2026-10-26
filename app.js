let gameSeq=[];
let userSeq=[];

let btns=["yellow","red","purple","green"];

let started=false;
let level=0;

let h2=document.querySelector('h2');

// Key press- game start
document.addEventListener("keydown",function(){
    if(started==false){
        console.log("game is started");
        started=true;

        levelUp();
    }
});
// btnflash + levelupx
function gameFlash(btn){
    btn.classList.add("flash"); // here btn is flash with white color
    setTimeout(function(){
        btn.classList.remove("flash"); // flash remove after 1 sec
    },250);
}
// userFlash
function userFlash(btn){
    btn.classList.add("userflash"); // here btn is flash with green color
    setTimeout(function(){
        btn.classList.remove("userflash"); // flash remove after 1 sec
    },250);
}
function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`level ${level}`;

    //  random btn flash
    // choose random no from range 0 to 3
    let randIdx = Math.floor(Math.random() * btns.length); // let assume randomidx=2
    let randColor=btns[randIdx];             // btns[2]=purple=randomcolor
    let randBtn=document.querySelector(`.${randColor}`);    //.purple (randomColor) class ko btn access krliya

    //  a new random color push in gameSeq
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);   // purple color is flashed
}
// btnpress---check if(userSeq==gameSeq) if yes--levelup , if no--gameover
function checkAns(idx){
    // console.log("curr level:", level);
    // let idx=level-1; // if level is 3 then idx=2; but here idx is fixed
    if(userSeq[idx]===gameSeq[idx]){ // check userSeq[2]==gameSeq[2] has same color
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
    } else{
        h2.innerHTML=`Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
        // when game is over set whole screen to red for some time
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        reset();
    }
}
function btnPress() {
    // Game start hone se pehle clicks ignore karo
    if (!started) return;

    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    console.log("Expected sequence:", gameSeq);
    console.log("Your sequence:", userSeq);

    checkAns(userSeq.length - 1);
}
let allBtns=document.querySelectorAll('.btn');
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}
