import { EcranChargement } from './EcranChargement';
import { PetitMonde } from './PetitMonde';
import Stage = createjs.Stage

export class App {

  // Attributs

  private scene:createjs.Stage = null;
  
  private zaWorld:PetitMonde = null;
  private chargement:EcranChargement = null;


  // Méthodes

  public constructor(){
      // Télécharger les médias et initialiser l'animation.
      window.init(this);
  }

  public initialiser(refScene:createjs.Stage) {

    // Initialisation des attributs relatifs à l'animation ---------------------------------------
    this.scene  =  refScene; 	      // Récupérer la référence de la scène nouvellement créée
    createjs.Ticker.framerate = 30;   // Vitesse de l'animation (peut être modifiée si nécessaire)
    // -------------------------------------------------------------------------------------------

    // Initialisation des objets du lieu 0
    this.chargement=new EcranChargement(this.scene,this);
    this.chargement.charger();
  }
  public faireDebuterPetitMonde():void{
    console.log("je débute!");
    if (this.zaWorld==null) {
      this.zaWorld=new PetitMonde(this.scene);
    }
    if (this.chargement!=null) {
      this.chargement.arreter()
    }
  }
  private rafraichirScene(e):void{
    this.scene.update();
  }
} // fin classe






