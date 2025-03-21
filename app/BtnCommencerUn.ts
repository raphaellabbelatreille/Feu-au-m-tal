import { Button } from "./Button";
import { ObjetVisible } from "./ObjetVisible";
import { PetitMonde } from "./PetitMonde";

export class BtnCommencerUn extends Button {

	public constructor(refStage:createjs.Stage , unX: number, unY:number , refMonde)
	{   super(refStage, unX, unY, refMonde);
	}
    protected dessiner():void{
        window.lib.ClipBtnCommencer.call(this);
        this.frameBounds = window.lib.ClipBtnCommencer.prototype.frameBounds;
    }
    protected commencerSurClick():void {
        this.monMonde.afficherInstruction();
    }
    protected arreter(): void {
        this.arreterBtnCommencer()
    }
    public arreterBtnCommencer():void{
        this.arreterButton()
    }
}

