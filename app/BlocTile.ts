import { PetitMonde } from "./PetitMonde";
import { Tile } from "./Tile";

export class Bloc extends Tile {    

	public constructor(refStage:createjs.Stage , unX: number, unY:number, intModel:number, refMonde:PetitMonde ){   
        super(refStage, unX, unY, "Bloc", refMonde);
        this.gotoAndStop(intModel)
	}    
    protected dessiner():void {
        window.lib.ClipTileBloc.call(this);
        this.frameBounds = window.lib.ClipTileBloc.prototype.frameBounds;  
    }
    protected arreter(): void {
        this.monMonde.despawnDeArray("bloc", this, this.arreterBloc())
    }
    public arreterBloc(): void {
        this.arreterTile();
    }
}