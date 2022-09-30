const cardList=[
    'card_crayfish_time',
    'card_crayfish_paper',
    'card_fist_noob',
    'card_fist_lucky',
    'card_heal',
    'card_providence',
    'card_strongest_scissor',
    'card_unreasonable_slap',
    'card_fist_high_damage',
    'card_choice',
    'card_continuous_panch',
    'card_additional_scissor',
    'card_fist_training',
    'card_fist_normal',
    'card_fist_proficiency',
    'card_fist_strong_guy',
    'card_fist_ultimate',
    'card_trebuchet',
    'card_sword',
    'card_shield'
];
let shouldUpdatePlayers=true;
let nextTurnButton;

//classes
class Player{
    static JUDGE_WIN=2;
    static JUDGE_LOSE=1;
    static JUDGE_DRAW=0;

    /**@type {number} */
    hp;
    /**@type {Effect[]} */
    effects;
    /**@type {Card} */
    card;
    /**@type {number} */
    judge;
    /**@type {string} */
    name;

    /**
     * 
     * @param {string} name 
     * @param {number} hp 
     */
    constructor(name,hp){
        this.hp=hp;
        this.effects=[];
        this.name=name;
    }

    /**
     * @param {Player} opponent
     */
    updateJudge(opponent){
        this.judge=(3+this.card.type-opponent.card.type)%3;
    }

    win(){
        console.log('Game Finish!!!');
    }

    damage(amount,isJudgeDamage){
        this.hp-=amount;
        for(const effect of this.effects){
            effect.onDamage(amount,isJudgeDamage);
        }
    }

    heal(amount){
        this.hp+=amount;
        for(const effect of this.effects){
            effect.onHeal(amount);
        }
    }
}

//effect
class Effect{
    /**@type {number} */
    time; 
    /**@type {string} */
    effectText;
    /**@type {Player} */
    parentPlayer;

    /**
     * 
     * @param {Player} parentPlayer
     * @param {Number} time 
     * @param {String} effectText
     */
    constructor(parentPlayer,time,effectText){
        this.time=time;
        this.effectText=effectText;
        this.parentPlayer=parentPlayer;
    }

    run(){
        this.time--;
    }

    /**
     * 
     * @param {number} amount 受けたダメージ量
     * @param {boolean} isJudgeDamage ジャンケンのルールによるダメージかどうか
     */
    onDamage(amount,isJudgeDamage){

    }

    onHeal(amount){

    }
}

class EffectCrayFish extends Effect{
    constructor(parentPlayer,time){
        super(parentPlayer,time,'ザリガニ・タイム');
    }
    /**
     * 
     * @param {Player} player 
     * @param {Player} opponent 
     */
    run(){
        super.run();

        //奥の手スキップ処理
        if(this.parentPlayer.card.name===cardList[1])
            return;
        
        //パーをチョキに
        if(this.parentPlayer.card.type==2)
            this.parentPlayer.card.type=1;
    }
}

class EffectShield extends Effect{
    constructor(parentPlayer,time){
        super(parentPlayer,time,'シールド');
    }

    /**
     * 
     * @param {number} amount 
     * @param {boolean} isJudgeDamage 
     */
    onDamage(amount,isJudgeDamage){
        if(isJudgeDamage)
            return;
        
        this.parentPlayer.hp+=amount;
    }
}

class EffectDisableJudgeDamage extends Effect{
    constructor(parentPlayer,time){
        super(parentPlayer,time,'ジャッジダメージ無効化');
    }
    onDamage(amount,isJudgeDamage){
        if(!isJudgeDamage)
            return;

        this.parentPlayer.hp+=amount;
    }
}

//card
class Card{
    /**@type {number} */
    id;
    /**@type {string} */
    name;
    /**@type {number} */
    type;

    static ROCK=0;
    static SCISSOR=1;
    static PAPER=2;

    /**
     * 
     * @param {number} id 
     * @param {string} name 
     * @param {string} type 
     */
    constructor(id,name,type){
        this.id=id;
        this.name=name;
        this.type=type;
    }

    /**
     * 
     * @param {number} cardId 
     * @returns {Card}
     */
    static fromCardId(cardId){
        if(cardId===0)
            return new CardCrayFish();
        if(cardId===1)
            return new CardCrayFishPaper();
        if(cardId===2)
            return new CardFistNoob();
        if(cardId===3)
            return new CardFistLucky();
        if(cardId===4)
            return new CardHeal();
        if(cardId===5)
            return new CardProvidence();
        if(cardId===6)
            return new CardStrongest();
        if(cardId===7)
            return new CardUnreasonable();
        if(cardId===8)
            return new CardFistStrong();
        if(cardId===9)
            return new CardChoice();
        if(cardId===10)
            return new CardContinuous();
        if(cardId===11)
            return new CardAdditional();
        if(cardId===12)
            return new CardFistTraining();
        if(cardId===13)
            return new CardFistNormal();
        if(cardId===14)
            return new CardFistProficiency();
        if(cardId===15)
            return new CardFistStrongGuy();
        if(cardId===16)
            return new CardFistUltimate();
        if(cardId===17)
            return new CardTrebuchet();
        if(cardId===18)
            return new CardSword();
        if(cardId===19)
	        return new CardShield();
        return undefined;
    }

    /**
     * 
     * @param {Player} player 
     * @param {Player} opponent 
     */
    play(player,opponent){

    }

    /**
     * 
     * @param {Player} player 
     * @param {Player} opponent 
     */
    prePlay(player,opponent){

    }
}

class CardCrayFish extends Card{
    constructor(){
        super(0,cardList[0],Card.SCISSOR);
    }

    play(player,opponent){
        player.effects.push(new EffectCrayFish(player,1));
        opponent.effects.push(new EffectCrayFish(opponent,1));
    }
}

class CardCrayFishPaper extends Card{
    constructor(){
        super(1,cardList[1],Card.PAPER);
    }
}

class CardFistNoob extends Card{
    constructor(){
        super(2,cardList[2],Card.ROCK);
    }
}

class CardFistLucky extends Card{
    constructor(){
        super(3,cardList[3],Card.ROCK);
    }

    play(player,opponent){
        if(player.judge===Player.JUDGE_WIN){
            opponent.damage(1,false);
        }else if(player.judge===Player.JUDGE_LOSE){
            player.damage(1,false);
        }
    }
}
class CardHeal extends Card{
    constructor(){
        super(4,cardList[4],Card.PAPER);
    }

    play(player,opponent){
        player.heal(1);
    }
}

class CardProvidence extends Card{
    constructor(){
        super(5,cardList[5],Card.SCISSOR);
    }
}

class CardStrongest extends Card{
    constructor(){
        super(6,cardList[6],Card.SCISSOR);
    }

    prePlay(player,opponent){
        if(opponent.card instanceof CardStrongest)
            return;
        player.judge=2;
        opponent.judge=1;
    }
}

class CardUnreasonable extends Card{
    constructor(){
        super(7,cardList[7],Card.PAPER);
    }

    play(player,opponent){
        opponent.damage(1,false);

        opponent.effects.push(new EffectDisableJudgeDamage(opponent,1));
    }
}

class CardFistStrong extends Card{
    constructor(){
        super(8,cardList[8],Card.ROCK);
    }

    play(player,opponent){
        if(player.judge===Player.JUDGE_WIN)
            opponent.damage(1,false);
    }
}

class CardChoice extends Card{
    constructor(){
        super(9,cardList[9],Card.PAPER);
    }
}

class CardContinuous extends Card{
    constructor(){
        super(10,cardList[10],Card.ROCK);
    }
}

class CardAdditional extends Card{
    constructor(){
        super(11,cardList[11],Card.SCISSOR);
    }
}

class CardFistTraining extends Card{
    constructor(){
        super(12,cardList[12],Card.ROCK);
    }
}

class CardFistNormal extends Card{
    constructor(){
        super(13,cardList[13],Card.ROCK);
    }
}

class CardFistProficiency extends Card{
    constructor(){
        super(14,cardList[14],Card.ROCK);
    }
}

class CardFistStrongGuy extends Card{
    constructor(){
        super(15,cardList[15],Card.ROCK);
    }
}

class CardFistUltimate extends Card{
    constructor(){
        super(16,cardList[16],Card.ROCK);
    }

    play(player,opponent){
        player.win();
    }
}

class CardTrebuchet extends Card{
    constructor(){
        super(17,cardList[17],Card.ROCK);
    }

    play(player,opponent){
        player.effects.push(new EffectDisableJudgeDamage(player,1));
    }
}

class CardSword extends Card{
    constructor(){
        super(18,cardList[18],Card.SCISSOR);
    }

    play(player,opponent){
        opponent.damage(1,false);
    }
}

class CardShield extends Card{
    constructor(){
        super(19,cardList[19],Card.PAPER);
    }

    prePlay(player,opponent){
        player.effects.push(new EffectShield(player,1));
    }
}

/**
 * 
 * @param {HTMLVideoElement} video 
 * @param {number} x 
 * @param {number} y 
 * @param {number} width 
 * @param {number} height 
 * @returns 
 */
function getImageDataFromVideo(video,x,y,width,height){
    const canvas=document.createElement('canvas');
    canvas.height=video.videoHeight;
    canvas.width=video.videoWidth;

    const ctx=canvas.getContext('2d');

    ctx.drawImage(video,0,0);

    const imageData=ctx.getImageData(x,y,width,height);

    return imageData;
}

/**
 * @param {ImageData} imageData
 * @return {Number}
 */
function getCardId(imageData){
    
    const code=jsQR(
        imageData.data,
        imageData.width,
        imageData.height,
        {inversionAttempts:'dontInvert'}
    );
    if(!code)
        return NaN;
    return parseInt(
        code.data
    );
}

/**
 * 
 * @param {Player[]} players 
 */
function resetPlayerCards(...players){
    for(const player of players){
        player.card=null;
    }

    shouldUpdatePlayers=true;
}

/**
 * 
 * @param {Player} player0 
 * @param {Player} player1 
 * @param {Function} callback
 * @param {Function} startCallback
 * @returns 
 */
function mainloop(player0,player1,callback,startCallback){
    //wait while cards are not set
    if(!player0.card||!player1.card){
        setTimeout(()=>{
            mainloop(player0,player1,callback,startCallback);
        },200);
        return;
    }

    //stop updating players' cards
    shouldUpdatePlayers=false;


    //run effects
    for(const effect of player0.effects){
        effect.run(player0,player1);
    }

    for(const effect of player1.effects){
        effect.run(player1,player0);
    }
    
    //remove finished effects
    player0.effects=player0.effects.filter((v)=>v.time>0);
    player1.effects=player1.effects.filter((v)=>v.time>0);

    //update player judge
    player0.updateJudge(player1);
    player1.updateJudge(player0);

    //prePlay
    player0.card.prePlay(player0,player1);
    player1.card.prePlay(player1,player0);

    //play
    player0.card.play(player0,player1);
    player1.card.play(player1,player0);

    if(player0.judge===Player.JUDGE_WIN)
        player1.damage(1,true);
    
    if(player1.judge===Player.JUDGE_WIN)
        player0.damage(1,true);
    
    if(player0.hp<=0)
        player1.win();
        
    if(player1.hp<=0)
        player0.win();
    
    console.log(player0);
    console.log(player1);

    callback();

    startNextTurn(startCallback);
}

/**
 * 
 * @param {Function} startCallback 
 */
function startNextTurn(startCallback){
    console.log('next turn');
    nextTurnButton.style.display='inline';

    nextTurnButton.onclick=()=>{
        console.log(startCallback);
        startCallback();
        nextTurnButton.style.display='none';
    }
}