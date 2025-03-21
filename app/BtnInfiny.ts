import { Button } from "./Button";

export class btnCommencerInfiny extends Button {
    private monChamp = null;
	public constructor(refStage:createjs.Stage , unX: number, unY:number , refMonde, meilleurTemps)
	{   super(refStage, unX, unY, refMonde);
        this.monChamp = new createjs.Text("0", "20px Arial", "#000000");
        this.monChamp.text = String(meilleurTemps);
		this.maScene.addChild(this.monChamp);
        this.monChamp.x = unX+120
        this.monChamp.y = unY-30
	}
    protected dessiner():void{
        window.lib.ClipBtnCommencer.call(this);
        this.frameBounds = window.lib.ClipBtnCommencer.prototype.frameBounds;
    }
    protected commencerSurClick():void {
        this.monMonde.commencerNiveau(2, true);
    }
    protected arreter(): void {
        this.arreterBtnCommencer()
    }
    public arreterBtnCommencer():void{
        this.arreterObjetVisible()
    }
}