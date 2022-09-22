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

class Card{
    id;name;type;

    static ROCK=0;
    static SCISSOR=1;
    static PAPER=2;

    static WIN=2;
    static LOSE=1;
    static DRAW=0;

    constructor(id,name,type){
        this.id=id;
        this.name=name;
        this.type=type;
    }

    /**
     * 
     * @param {Player} player 
     * @param {Player} opponent 
     */
    play(player,opponent){

    }

    prePlay(player,opponent){

    }
}

class Player{
    hp;
    effects;
    card;
    judge;

    constructor(hp){
        this.hp=hp;
        this.effects=[];
    }
}

class Effect{
    time;
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
        if(player.judge===WIN){
            opponent.hp--;
        }else if(player.judge===LOSE){
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

        if(player.judge===WIN)
            opponent++;
    }
}

class CardFistStrong extends Card{
    constructor(){
        super(8,cardList[8],Card.ROCK);
    }

    play(player,opponent){
        if(player.judge==WIN)
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
        opponent.hp-=100000;
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
 * @return {Number}
 */
function getCardId(){

}




function mainloop(){

}