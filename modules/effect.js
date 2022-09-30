import { cardList,Card } from './card.js';
import { Player } from './player.js';

export class Effect{
    /**@type {number} */
    time; 
    /**@type {string} */
    effectText;
    /**@type {Player} */
    parentPlayer;

    /**
     * 
     * @param {Player} parentPlayer
     * @param {number} time 
     * @param {string} effectText
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
     * @abstract
     * @param {number} amount 受けたダメージ量
     * @param {boolean} isJudgeDamage ジャンケンのルールによるダメージかどうか
     */
    onDamage(amount,isJudgeDamage){

    }

    onHeal(amount){

    }
}

export class EffectCrayFish extends Effect{
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

export class EffectShield extends Effect{
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

export class EffectDisableJudgeDamage extends Effect{
    constructor(parentPlayer,time){
        super(parentPlayer,time,'ジャッジダメージ無効化');
    }
    onDamage(amount,isJudgeDamage){
        if(!isJudgeDamage)
            return;

        this.parentPlayer.hp+=amount;
    }
}
