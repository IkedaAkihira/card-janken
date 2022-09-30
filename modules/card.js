import {
    EffectCrayFish,
    EffectDisableJudgeDamage,
    EffectShield
} from './effect.js';
import { Player } from './player.js';

export {
    Card,
    CardAdditional,
    CardChoice,
    CardContinuous,
    CardCrayFish,
    CardCrayFishPaper,
    CardFistLucky,
    CardFistNoob,
    CardFistNormal,
    CardFistProficiency,
    CardFistStrong,
    CardFistStrongGuy,
    CardFistTraining,
    CardFistUltimate,
    CardHeal,
    CardProvidence,
    CardShield,
    CardStrongest,
    CardSword,
    CardTrebuchet,
    CardUnreasonable
};

export const cardList=[
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