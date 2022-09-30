import { Player } from './modules/player.js';
import { Card } from './modules/card.js';
import { Game } from './modules/game.js';
import * as videoConverter from './modules/video_converter.js';
import * as audio from './modules/audio.js';


const life=5;
const playerL=new Player('player1',life);
const playerR=new Player('player2',life);

const game=new Game(playerL,playerR);

const playerLHp=document.getElementById('player1-hp');
const playerRHp=document.getElementById('player2-hp');

const cardImageL=document.getElementById('card1');
const cardImageR=document.getElementById('card2');

const nextTurnButton=document.getElementById('next-turn-button');

let isStarted=false;

//camera setup
const video=document.createElement('video');
navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'}}).then((stream)=>{
    video.srcObject=stream;
    video.play();
    requestAnimationFrame(tick);
});

/**
 * update players's cards
 * @returns {void}
 */
function tick(){
    requestAnimationFrame(tick);

    if(video.readyState!==video.HAVE_ENOUGH_DATA)
        return;

    const imageDataL=videoConverter.getImageDataFromVideo(video,0,0,Math.floor(video.videoWidth/2),video.videoHeight);
    const imageDataR=videoConverter.getImageDataFromVideo(video,Math.floor(video.videoWidth/2),0,Math.floor(video.videoWidth/2),video.videoHeight);            
    
    const cardIdL=videoConverter.getCardId(imageDataL);
    const cardIdR=videoConverter.getCardId(imageDataR);


    if(!isNaN(cardIdL))
        playerL.card=Card.fromCardId(cardIdL);
        
    if(!isNaN(cardIdR))
        playerR.card=Card.fromCardId(cardIdR);
    
}

/**
 * startTurnButton onclick event
 * @returns {void}
 */
function start(){
    if(!isStarted){
        isStarted=true;
        audio.bgm.play();
    }

    game.resetPlayerCards();

    nextTurnButton.style.display='none';

    console.log('start turn!!');
    game.resetPlayerCards(playerL,playerR);
    game.update().then(()=>{
        cardImageL.classList.toggle('turning');
        cardImageR.classList.toggle('turning');

        audio.cardSE.currentTime=0;
        audio.cardSE.play();

        setTimeout(()=>{
            cardImageL.src=`img/${playerL.card.name}.svg`;
            cardImageR.src=`img/${playerR.card.name}.svg`;
        },1000);

        setTimeout(()=>{
            cardImageL.classList.toggle('turning');
            cardImageR.classList.toggle('turning');
            
            playerLHp.textContent=playerL.hp;
            playerRHp.textContent=playerR.hp;

            nextTurnButton.style.display='inline';
        },2000);
    });
    
    cardImageL.src=`img/card_hidden.svg`;
    cardImageR.src=`img/card_hidden.svg`;
}

nextTurnButton.addEventListener('click',start);