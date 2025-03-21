import { ObjetVisible } from "./ObjetVisible";
import { PeutScroll } from "./PeutScroll";
import { Tile } from "./Tile";

export abstract class Entity extends PeutScroll {
	protected isFalling:boolean=false;
    protected isOnFloor:boolean=false;
    private maxForceGravite:number = 10;
    public tPlateforme:Array<Tile> = null;
    private refMinuterieDetectionSolAir:number = null;
    protected refMinuterieGravity:number = null;
    protected gravity_lier:any = null;
    protected detectSolAir_lier:any = null;
    protected tempsPasserAir:any = null;
    
    

	public constructor(refStage:createjs.Stage , unX: number, unY:number, refTPlateform:Array<Tile>)
	{   super(refStage, unX, unY);
        this.gravity_lier = this.gravity.bind(this)
        this.activateGravity();
        this.detectSolAir_lier = this.isInTheAirDetect.bind(this)
        this.refMinuterieDetectionSolAir = window.setInterval(this.detectSolAir_lier,1000/30);
        this.tPlateforme = new Array;
        this.tPlateforme = refTPlateform;
        this.isFalling = true;
        this.isOnFloor = false;
        this.tempsPasserAir = 0;
	}
    public activateGravity():void{
        if (this.refMinuterieGravity == null){
            this.refMinuterieGravity = window.setInterval(this.gravity_lier ,1000/30);
        }  
    }
    public deactivateGravity():void{
        if (this.refMinuterieGravity != null){
            window.clearInterval(this.refMinuterieGravity);
            this.refMinuterieGravity = null;
        } 
    }
    private gravity():void{
        if (this.isFalling){
            this.isOnFloor = false;
            let forceGravity = this.tempsPasserAir 
            if (forceGravity> this.maxForceGravite){
                forceGravity = this.maxForceGravite
            }
            this.y = this.y + forceGravity
            for (let cpt=0; cpt < this.tPlateforme.length; cpt++){
                if (this.y >= this.tPlateforme[cpt].y && this.y <= (this.tPlateforme[cpt].y+50) 
                    && this.x > (this.tPlateforme[cpt].x-this.tPlateforme[cpt].largeur -2) && this.x < (this.tPlateforme[cpt].x+this.tPlateforme[cpt].largeur+2)){
                    this.y = this.tPlateforme[cpt].y;
                    this.isFalling = false;
                    this.isOnFloor = true;
                } 
            }
        }
    }
    private isInTheAirDetect():void {
        if (this.isFalling){
            this.tempsPasserAir = this.tempsPasserAir+1
            //console.log(this.tempsPasserAir)
            this.isOnFloor = false
            //console.log("IsFalling")
        }
        if (this.isOnFloor){
            this.tempsPasserAir=0;
            this.isFalling = false
            //console.log("Floor")
        }
        
    }
    public arreterEntity():void {
        this.deactivateGravity();
        
        window.clearInterval(this.refMinuterieDetectionSolAir);
        this.refMinuterieDetectionSolAir = null;
        this.arreterScroll();
    }
}