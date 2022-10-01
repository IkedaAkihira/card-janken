import { Card } from './card.js';

export class Player{
    static JUDGE_WIN=2;
    static JUDGE_LOSE=1;
    static JUDGE_DRAW=0;

    /**@type {number} */
    hp;
    /**@type {Effect[]} */
    effects;
    /**@type {Card} */
    #card;
    /**@type {number} */
    judge;
    /**@type {string} */
    name;
    /**@type {boolean} */
    canChangeCard=true;
    /**@type {boolean} */
    isWon=false;

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
     * @return {Card}
     */
    get card(){
        return this.#card;
    }

    /**
     * @param {Card} card
     */
    set card(card){
        if(this.canChangeCard)
            this.#card=card;
    }

    /**
     * @param {Player} opponent
     */
    updateJudge(opponent){
        this.judge=(3+this.card.type-opponent.card.type)%3;
    }

    win(){
        console.log('Game Finish!!!');
        this.isWon=true;
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
