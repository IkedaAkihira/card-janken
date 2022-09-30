import { Player } from './player.js';

export class Game{
    /**@type {Player} */
    player0;
    /**@type {Player} */
    player1;

    constructor(player0,player1){
        this.player0=player0;
        this.player1=player1;
    }

    resetPlayerCards(){
        this.player0.card=null;
        this.player1.card=null;

        this.player0.canChangeCard=true;
        this.player1.canChangeCard=true;
    }

    /**
     * 
     * @returns {Promise} 
     */
    update(){
        return new Promise(
            (res,rej)=>{
                //wait while cards are not set
                if(!this.player0.card||!this.player1.card){
                    setTimeout(()=>{
                        this.update().then(res).catch(rej);
                    },200);
                    return;
                }

                //stop updating players' cards
                this.player0.canChangeCard=false;
                this.player1.canChangeCard=false;


                //run effects
                for(const effect of this.player0.effects){
                    effect.run(this.player0,this.player1);
                }

                for(const effect of this.player1.effects){
                    effect.run(this.player1,this.player0);
                }
                
                //remove finished effects
                this.player0.effects=this.player0.effects.filter((v)=>v.time>0);
                this.player1.effects=this.player1.effects.filter((v)=>v.time>0);

                //update this.player judge
                this.player0.updateJudge(this.player1);
                this.player1.updateJudge(this.player0);

                //prePlay
                this.player0.card.prePlay(this.player0,this.player1);
                this.player1.card.prePlay(this.player1,this.player0);

                //play
                this.player0.card.play(this.player0,this.player1);
                this.player1.card.play(this.player1,this.player0);

                if(this.player0.judge===Player.JUDGE_WIN)
                    this.player1.damage(1,true);
                
                if(this.player1.judge===Player.JUDGE_WIN)
                    this.player0.damage(1,true);
                
                if(this.player0.hp<=0)
                    this.player1.win();
                    
                if(this.player1.hp<=0)
                    this.player0.win();
                
                console.log(this.player0);
                console.log(this.player1);

                res();
            }
        );
    }
}
