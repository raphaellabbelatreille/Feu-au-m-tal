import { Bloc } from "./BlocTile";
import { Defillant } from "./Defillant";
import { ObjetVisible } from "./ObjetVisible";
import { PetitMonde } from "./PetitMonde";
import { PeutScroll } from "./PeutScroll";
import { Projectile } from "./Projectile";
import { Tortue } from "./TurtleMeca";

export class BackGround extends ObjetVisible{
    private levelNumber : number = null;
    private tDefillant : Array<any>
    private monStage : createjs.Stage = null;
    private creerDefillant_lier : any = null;
    private refMinuterieDefillant : number = null;
    private creerChaine_lier : any = null;
    private refMinuterieChaine : number = null;
    private cptTimeur :number = null;
    private cptTimeurChaine :number = null;
	
    public constructor(refStage:createjs.Stage, levelNumber){
        super(refStage, 0, -10);
        this.monStage = refStage
        this.levelNumber = levelNumber
        this.gotoAndStop(levelNumber-1);
        this.tDefillant = new Array;
        this.creerDefillant_lier = this.creerDefilant.bind(this)
        this.refMinuterieDefillant = window.setInterval(this.creerDefillant_lier, 1000/60);
        this.cptTimeur = 0;
        if (this.levelNumber == 2){
            this.creerChaine_lier = this.creerChaine.bind(this)
            this.refMinuterieChaine = window.setInterval(this.creerChaine_lier, 1000/60);
            this.cptTimeurChaine = 0;
        }
    }
    protected dessiner():void {
        window.lib.ClipBackground.call(this);
        this.frameBounds = window.lib.ClipBackground.prototype.frameBounds;
    }
    private creerDefilant():void{
        if (this.cptTimeur <= 0){
            let randomCoin = Math.floor(Math.random()*4)
            if (randomCoin == 0){
                let randomId = Math.random()*3
                if (randomId >= 1){
                    randomId = Math.random()*3  
                }
                let randomHeight = (Math.random()*150)+randomId*100 // si Id plus grand (le clip est plus petit), le nuage est moins haut
                let nouveau = new Defillant(this.monStage, randomHeight, randomId+ (this.levelNumber-1)*3  , this, "nuage")/* chose */
                this.tDefillant.push(nouveau)
            }
            this.cptTimeur = Math.floor(Math.random()*100)+350 - randomCoin*80
        } else {
            this.cptTimeur = this.cptTimeur
        } 
    }
    private creerChaine():void{
        if (this.cptTimeurChaine <= 0){
            let randomCoin = Math.floor(Math.random()*2)
            let randomHeight = Math.floor((Math.random()*2))* 50
            let nouveau = new Defillant(this.monStage,randomHeight, randomCoin , this, "chaine")/* chose */
            this.tDefillant.push(nouveau)
            this.cptTimeurChaine = 800
        } else {
            this.cptTimeurChaine = this.cptTimeurChaine - 1
        } 
    }
    public despawnDefillant (evenement):void {
        for (let cpt=0;cpt<this.tDefillant.length;cpt++){
            if(this.tDefillant[cpt] == evenement){
                this.tDefillant[cpt].arreterDefillant();
                this.tDefillant[cpt]=null
                this.tDefillant.splice(cpt,1);
            }
        }   
    }
    protected arreter(): void {
        this.arreterBackground()
    }
    public arreterBackground():void {
        window.clearInterval(this.refMinuterieDefillant);
        this.refMinuterieDefillant = null;
        window.clearInterval(this.refMinuterieChaine);
        this.refMinuterieChaine = null;
        if (this.tDefillant.length != null){
            while (this.tDefillant.length > 0){
                this.despawnDefillant(this.tDefillant[0]);
            }
        }
        this.tDefillant = null;
        this.arreterObjetVisible();
    }
}