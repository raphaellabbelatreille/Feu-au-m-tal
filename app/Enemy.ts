import { Entity } from "./Entity";
import { PetitMonde } from "./PetitMonde";
import { Fluo } from "./Fluo";
import { Afficheur } from "./Afficheur";

export abstract class Enemy extends Entity {
    
    protected monProtagoniste: Fluo = null;
    public monMonde :PetitMonde = null;
    protected isAlive: boolean = null;
    public fadeOut_lier : any = null;
    protected pvCourant : number = null;
    protected monAfficheur : Afficheur = null;
    private refMinuterieCollision : number = null;
    private collision_lier : any = null;
    protected cptIntangible:number = null;
    public typeEnemy:string = null
    
    

	public constructor(refStage:createjs.Stage , unX: number, unY:number, refTPlateform, refMonde, refProtagoniste, refAfficheur:Afficheur, strType){   
        super(refStage, unX, unY, refTPlateform);
        this.typeEnemy = strType;
        this.isAlive = true
        this.monProtagoniste = refProtagoniste;
        this.monMonde = refMonde;
        this.fadeOut_lier = this.fadeOut.bind(this);
        this.monAfficheur = refAfficheur;
        this.collision_lier = this.collisionDammage.bind(this)
        this.refMinuterieCollision = window.setInterval(this.collision_lier, 1000/60);
        this.cptIntangible = 0;
        //this.deactivateGravity()
	}    
    public recoitDammage(numbreDammage):void{
        if (this.cptIntangible <= 0){
            this.pvCourant = this.pvCourant-numbreDammage;
            if (this.pvCourant<= 0){
                if (this.isAlive){
                    console.log("enemy touche");
                    this.monAfficheur.updatePoint(1)
                    if (localStorage.getItem("nbrKill") != null){
                        localStorage.setItem("nbrKill", String(parseInt(localStorage.getItem("nbrKill"))+1))
                    } else {
                        localStorage.setItem("nbrKill", "1")
                    }
                    this.joueAnimationMort();
                    this.addEventListener("tick", this.fadeOut_lier)
                    this.isAlive = false;
                }
            } 
            this.cptIntangible = 1
            this.NothingSuspicious(numbreDammage)
        }
        
        
    }
    protected abstract NothingSuspicious(numbreDammage):void
    protected collisionDammage():void {
        if (this.x-40 <= this.monProtagoniste.x && this.x+40 >= this.monProtagoniste.x &&
            this.y-80 <= this.monProtagoniste.y && this.y+10 >= this.monProtagoniste.y ){
            console.log("um num num")
            this.monProtagoniste.recoitDammage(1);
        }
        //Obliger de l'avoir ici car cest un timeur;
        this.cptIntangible = this.cptIntangible-1
    }
    public deactivateCollision():void {
        window.clearInterval(this.refMinuterieCollision);
        this.refMinuterieCollision = null;
    }
    public fadeOut():void {
        this.alpha = this.alpha-0.05;
        if (this.alpha < 0){
            this.arreter()
        }
    }
    protected abstract joueAnimationMort():void;
    public arreterEnemy():void {
        this.arreter()
    }
    public arreterMeca():void {
        window.clearInterval(this.refMinuterieCollision)
        this.refMinuterieCollision = null;
        this.arreterEntity();  
    }
}