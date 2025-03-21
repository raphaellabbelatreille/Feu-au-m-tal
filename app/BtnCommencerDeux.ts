import { Button } from "./Button";

export class btnCommencerDeux extends Button {

	public constructor(refStage:createjs.Stage , unX: number, unY:number , refMonde)
	{   super(refStage, unX, unY, refMonde);
	}
    protected dessiner():void{
        window.lib.ClipBtnCommencer.call(this);
        this.frameBounds = window.lib.ClipBtnCommencer.prototype.frameBounds;
    }
    protected commencerSurClick():void {
        this.monMonde.commencerNiveau(2, false);
    }
    protected arreter(): void {
        this.arreterBtnCommencer()
    }
    public arreterBtnCommencer():void{
        this.arreterObjetVisible()
    }
}