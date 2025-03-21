import { ObjetVisible } from "./ObjetVisible";

export class Afficheur extends ObjetVisible {
	private monChampKill:createjs.Text=null;
	private monChampTime:createjs.Text=null;
	private timeMinute:number = null;
	private timeSeconde :number = null;
	private timeTotal:number = null;

	private tHealthPoint : Array<any> = null;

	public constructor(refScene:createjs.Stage) {
		super(refScene, 0, 0);
		this.maScene = refScene;
		this.tHealthPoint = new Array;
		for (let cptEnregistrement = 1 ; cptEnregistrement <= 8 ; cptEnregistrement++){
			let healthFrame = cptEnregistrement;
			if (healthFrame > 4){
				healthFrame = healthFrame-4
			}
			this.tHealthPoint[cptEnregistrement] = this["Health_"+cptEnregistrement];
			this.tHealthPoint[cptEnregistrement].gotoAndStop(healthFrame-1);
		}
		this.monChampKill = this.clip_kill.txt
		this.monChampKill.text = String(0);
		/*new createjs.Text("0", "36px Dark Magic", "#000000");
		this.monChampKill.x = 160
		this.monChampKill.y = 25;*/
		this.monChampTime =  this.clip_time.txt/*new createjs.Text("0", "30px Dark Magic", "#000000");
		this.maScene.addChild(this.monChampTime);*/
		this.timeMinute = 0;
		this.timeSeconde = 0;
		this.timeTotal = 0;
		/*this.monChampTime.x = 35
		this.monChampTime.y = 25*/
	}
	
	public updateTimeur(newValue):void {
		this.timeTotal = newValue;
		let timeMinute = Math.floor(this.timeTotal/60);
		let timeSeconde = this.timeTotal - timeMinute*60
		if (timeSeconde<10){
			this.monChampTime.text = String(timeMinute + ":0" + timeSeconde);
		} else {
			this.monChampTime.text = String(timeMinute + ":" + timeSeconde);
		}
	}
	public updatePoint(newValue):void {
		this.monChampKill.text = String(parseInt(this.monChampKill.text) + newValue);
	}
	public updateHitPoint(newValue) : void {
		for (let cptEnregistrement = 1 ; cptEnregistrement <= 8 ; cptEnregistrement++){
			if (cptEnregistrement >= newValue+1){
				let healthFrame = cptEnregistrement;
				if (healthFrame > 4){
					healthFrame = healthFrame-4
				}
				this.tHealthPoint[cptEnregistrement].gotoAndStop(healthFrame-1+4);
			}	
		}
	}
	protected dessiner():void {
        window.lib.ClipAfficheur.call(this);
        this.frameBounds = window.lib.ClipAfficheur.prototype.frameBounds;
    }
	protected arreter(): void {
		this.arreterAfficheur();		
	}
	public arreterAfficheur():void{
		this.maScene.removeChild(this.monChampTime)
		this.maScene.removeChild(this.monChampKill)
		for (let cpt=0; cpt<this.tHealthPoint.length; cpt++){
			this.maScene.removeChild(this.tHealthPoint[cpt])
		}
		this.tHealthPoint = null;
		this.arreterObjetVisible();
	}
}//fin classe


