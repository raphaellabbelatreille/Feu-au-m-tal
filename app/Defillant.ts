import { BackGround } from "./Background";
import { PeutScroll } from "./PeutScroll";

export class Defillant extends PeutScroll {    
    private monBackground:BackGround = null;
    private scrollLent_lier = null;
    private type : string = null;

	public constructor(refStage:createjs.Stage , unY:number, intModel:number, refBackground:BackGround, strType:string ){   
        super(refStage, window.lib.properties.width+160 , unY);
        this.monBackground = refBackground;
        this.type = strType
        window.clearInterval(this.refMinuterieScroll);
        this.scrollLent_lier = this.scrollLent.bind(this);
        


        switch (this.type){
            case "chaine":
                window.lib.ClipChaine.call(this);
                this.frameBounds = window.lib.ClipChaine.prototype.frameBounds; 
                this.refMinuterieScroll = window.setInterval(this.scrollLent_lier , 1000/40)
                this.y = -5
                break;
            case "nuage":
                window.lib.ClipNuage.call(this);
                this.frameBounds = window.lib.ClipNuage.prototype.frameBounds;
                this.refMinuterieScroll = window.setInterval(this.scrollLent_lier , 1000/60)
                this.y = unY
            default: 
                break; 
        }
        this.x = window.lib.properties.width+160
        
        this.gotoAndStop(intModel);
		
	}    
    /* Est exactement le meme code que PeutScroll.bougerScroll() mais plus lent;*/
    private scrollLent(){
        this.x = this.x-PeutScroll.vitesseScroll/2;
		if (this.x <= -500){
			this.arreter();
		}
    };
    protected dessiner():void {
        /*window.lib.ClipNuage.call(this);
        this.frameBounds = window.lib.ClipNuage.prototype.frameBounds;*/
    }
    protected arreter(): void {
        this.monBackground.despawnDefillant(this) //despawnDeArray
    }
    public arreterDefillant(): void {
        this.arreterScroll();
    }
}