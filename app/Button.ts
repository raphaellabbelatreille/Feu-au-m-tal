import { ObjetVisible } from "./ObjetVisible";
import { PetitMonde } from "./PetitMonde";

export abstract class Button extends ObjetVisible {
    protected monMonde:PetitMonde = null;
    private commencerSurClick_lier = null;

	public constructor(refStage:createjs.Stage , unX: number, unY:number , refMonde)
	{   super(refStage, unX, unY);
		this.monMonde = refMonde;
        this.commencerSurClick_lier = this.commencerSurClick.bind(this)
        this.addEventListener("click", this.commencerSurClick_lier)
	}
    protected abstract dessiner():void;
	protected abstract arreter():void;
    protected abstract commencerSurClick():void;
    public arreterButton():void{
        this.removeEventListener("click", this.commencerSurClick_lier);
        this.arreterObjetVisible()
    }
}

