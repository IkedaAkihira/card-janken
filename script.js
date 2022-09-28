const cardList=[
    'ザリガニ・タイム',
    '奥の手',
    '未熟な拳',
    '幸運の拳',
    '祈り',
    'プロビデンスのチョキ',
    '最強',
    '理不尽ビンタ',
    '強いパンチ',
    'チョイス',
    '連続パンチ',
    '追いのチョキ',
    '努力の拳',
    'そこそこの拳',
    '熟練の拳',
    '猛者の拳',
    '磨き上げられた拳',
    '投石器',
    '剣',
    '盾'
];

let shouldUpdatePlayers=true;
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

    constructor(hp){
        this.hp=hp;
        this.effects=[];
    }

    /**
     * @param {Player} opponent
     */
    updateJudge(opponent){
        this.judge=(3+this.card.type-opponent.card.type)%3;
    }

    win(){

    }
}

class Effect{
    /**@type {number} */
    time; 
    /**@type {string} */
    effectText;

    /**
     * 
     * @param {Number} time 
     * @param {String} effectText
     */
    constructor(time,effectText){
        this.time=time;
        this.effectText=effectText;
    }

    /**
     * 
     * @param {Player} player 
     * @param {Player} opponent 
     */
    run(player,opponent){
        time--;
    }
}

class EffectCrayFish extends Effect{
    constructor(time){
        super(time,'ザリガニ・タイム');
    }
    /**
     * 
     * @param {Player} player 
     * @param {Player} opponent 
     */
    run(player,opponent){
        super.run(player,opponent);

        //奥の手スキップ処理
        if(play.card.name===cardList[1])
            return;
        
        //パーをチョキに
        if(player.card.type==2)
            player.card.type=1;
    }
}

class CardCrayFish extends Card{
    constructor(){
        super(0,cardList[0],Card.SCISSOR);
    }

    play(player,opponent){
        player.effects.push(new EffectCrayFish(1));
        opponent.effects.push(new EffectCrayFish(1));
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
            opponent.hp--;
        }else if(player.judge===Player.JUDGE_LOSE){
            player.hp--;
        }
    }
}
class CardHeal extends Card{
    constructor(){
        super(4,cardList[4],Card.PAPER);
    }

    play(player,opponent){
        player.hp++;
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
        opponent.hp--;

        if(player.judge===Player.JUDGE_WIN)
            opponent++;
    }
}

class CardFistStrong extends Card{
    constructor(){
        super(8,cardList[8],Card.ROCK);
    }

    play(player,opponent){
        if(player.judge===Player.JUDGE_WIN)
            opponent.hp--;
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
        if(player.judge==LOSE){
            player.hp++;
        }
    }
}

class CardSword extends Card{
    constructor(){
        super(18,cardList[18],Card.SCISSOR);
    }

    play(player,opponent){
        opponent.hp--;
    }
}

class CardShield extends Card{
    constructor(){
        super(19,cardList[19],Card.PAPER);
    }

    play(player,opponent){
        
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
    )||NaN;
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
 * @returns 
 */
function mainloop(player0,player1){
    if(!player0.card||!player1.card){
        setTimeout(()=>{
            mainloop(player0,player1);
        },200);
        return;
    }

    shouldUpdatePlayers=false;

    for(const effect of player0.effects){
        effect.run(player0,player1);
    }

    for(const effect of player1.effects){
        effect.run(player1,player0);
    }

    player0.updateJudge(player1);
    player1.updateJudge(player0);

    player0.card.prePlay(player0,player1);
    player1.card.prePlay(player1,player0);

    player0.card.play(player0,player1);
    player1.card.play(player1,player0);

    if(player0.judge===Player.JUDGE_WIN)
        player1.hp--;
    
    if(player1.judge===Player.JUDGE_WIN)
        player0.hp--;
    
    if(player0.hp<=0)
        player1.win();
        
    if(player1.hp<=0)
        player0.win();

    resetPlayerCards(player0,player1);

    setTimeout(()=>{
        mainloop(player0,player1);
    },5000);
}