import { Afficheur } from "./Afficheur";
import { PetitMonde } from "./PetitMonde";
import { Bloc } from "./BlocTile";
import { Fluo } from "./Fluo";
import { Tortue } from "./TurtleMeca";
import { Plateform } from "./PlateformeTile";
import { Tile } from "./Tile";
import { Sentry } from "./Sentry";
import { Enemy } from "./Enemy";

export class CreateurNiveau {
    private mesTiles:Array<Tile> = null;
    private mesEnemy:Array<Enemy> = null;
    private monMonde:PetitMonde = null;
    private monStage:createjs.Stage = null;
    private myFluoMC : Fluo = null;
    private monAfficheur: Afficheur = null;
    
    private static vitesseScroll:number = 5;
    private morceauRecent:number = null;
    private cptConstruction:number = null;
    
    private static niveauDifficulte:number = 2;
    private manqueDifficulte:number = null;
    private creationMorceau_lier = null;
    private refMinuterieNiveau:number= null;
    private niveauDesign : number = 0;
    private tMorceauPermit:Array<number> = null;

    constructor(refTabPlatforme:Array<Tile>, refTabEnemy: Array<Enemy>, refMonde:PetitMonde, refStage, refMC, refAfficheur, levelNumber:number){
        console.log("hello?")
        this.cptConstruction = 0;
        this.mesTiles = new Array;
        this.mesTiles = refTabPlatforme;
        this.mesEnemy = new Array;
        this.mesEnemy = refTabEnemy;
        this.monMonde = refMonde;
        this.monStage = refStage;
        this.myFluoMC = refMC;
        this.monAfficheur = refAfficheur;
        if (levelNumber == 2){
            this.niveauDesign = 4;
        } else {
            this.niveauDesign = 0
        }
        this.tMorceauPermit = new Array;
        if (levelNumber == 1){
            this.tMorceauPermit = [1,2,5,6,7]
        } 
        if (levelNumber == 2){
            this.tMorceauPermit = [0,1,3,4,5,6,7,8]
        } 
        

        /*Création des prochains morceau*/
        this.morceauRecent = 0;
        this.creationMorceau_lier = this.creerMorceau.bind(this)
        this.refMinuterieNiveau = window.setInterval(this.creationMorceau_lier ,1000/60);
        //this.monStage.addEventListener("tick", this.creerMorceau.bind(this));

    }
    private randomCoin():boolean{
        let bln = true;
        let random = Math.floor(Math.random()*2)
        if (random == 0){
            bln = false;
        }
        return bln
    }
    private creerBloc(hauteur:number, quantite:number):void {
        for (let cptQuantity = 0; cptQuantity< quantite; cptQuantity ++){
            //for (let cpt= 0 ; cpt<= hauteur; cpt++){
                // permet au bloc d'avoir des apparences différentes
                let typeBloc = Math.floor(Math.random()*4)
                if (typeBloc >= 2){
                    typeBloc = Math.floor(Math.random()*4);
                    if (typeBloc == 3){
                        typeBloc = Math.floor(Math.random()*4)
                    }
                }
                if (cptQuantity == 1 || cptQuantity == 3){
                    if (quantite == 3 || quantite >= 5){
                        this.creerEnemy("any", hauteur)
                    }
                }
                let nouveau = new Bloc(this.monStage, (this.cptConstruction+window.lib.properties.width+159) , window.lib.properties.height-(hauteur*80), typeBloc+this.niveauDesign, this.monMonde);
                this.mesTiles.push(nouveau)
            //}
            this.cptConstruction = this.cptConstruction+80 
        }
    }
    private creerPileOfBlocs(hauteur, quantite):void {
        for (let cptQuantity = 0; cptQuantity< quantite; cptQuantity ++){
            for (let cpt= 0 ; cpt<= hauteur; cpt++){
                // permet au bloc d'avoir des apparences différentes
                let typeBloc = Math.floor(Math.random()*4)
                let nouveau = new Bloc(this.monStage, (this.cptConstruction+window.lib.properties.width+159) , window.lib.properties.height-(cpt*80), typeBloc+this.niveauDesign, this.monMonde);
                this.mesTiles.push(nouveau)
            }
            this.cptConstruction = this.cptConstruction+80 
        }
    }
    private creerPlusieursPlateformes(hauteur:number, quantite:number):void {
        // permet au plateforme d'avoir la même apparence;
        let typeSemi = Math.floor(Math.random()*4+this.niveauDesign)
        if (hauteur== 1 || typeSemi == 1){
            typeSemi = this.niveauDesign
        }
        for (let cpt = 0; cpt< quantite; cpt++){
            let nouveau = null
            if (quantite>=3){
                if (cpt== 1 || (cpt==3 && quantite >= 5)){
                    this.creerEnemy("any", hauteur)
                    if (typeSemi == 0){
                        //pour avoir blank banniere blank
                        nouveau = new Plateform (this.monStage, (this.cptConstruction+window.lib.properties.width+159) , window.lib.properties.height-(hauteur*80), 1, this.monMonde);    
                    } else { 
                        nouveau = new Plateform (this.monStage, (this.cptConstruction+window.lib.properties.width+159) , window.lib.properties.height-(hauteur*80), typeSemi, this.monMonde);
                    }
                } else {
                    nouveau = new Plateform (this.monStage, (this.cptConstruction+window.lib.properties.width+159) , window.lib.properties.height-(hauteur*80), typeSemi, this.monMonde);
                }
            } else {
                nouveau = new Plateform (this.monStage, (this.cptConstruction+window.lib.properties.width+159) , window.lib.properties.height-(hauteur*80), typeSemi, this.monMonde);
            }
            this.mesTiles.push(nouveau)
            this.cptConstruction = this.cptConstruction+80 
        }
    }
    private creerEnemy(type, hauteur):void {
        //Si peu enemie à l'écran, augmente les chances de voir un enemie
        if (this.mesEnemy.length <= 2){
            this.manqueDifficulte = this.manqueDifficulte+0.25
        }

        // Fonctionnement, lance un chiffre entre 1 et 6, si le chiffre est plus bas que le niveau de difficulté, permet la construction d'un enemie;
        // en d'autre terme: le niveau 1 fait apparaitre des enemie sur un "5+" ou 2/6 ou 1/3. Niveau 2 sur "4+" ou 1/2;
        // this.manque difficulté n'est que là que pour augmenter les chances de voir des enemies quand ils sont peu. Il est réinitialiser à 0 (ou -0.5 pour sentry) après avoir spawn un enemie
        let random = Math.floor(Math.random()*6)-this.manqueDifficulte
        if (random < CreateurNiveau.niveauDifficulte){
            let nouveauEnemy = null;
            // 1 chance sur 4 d'être une tourelle car tourelle OP 
            if (type == "any"){
                let randomCoin1 = this.randomCoin();
                let randomCoin2 = this.randomCoin();
                if (randomCoin1==true && randomCoin2==true){
                    type = "sentry"
                    let randomCoin = this.randomCoin()
                    if (randomCoin){
                        hauteur= hauteur+2
                        this.creerPlusieursPlateformes(hauteur, 1);
                        this.cptConstruction = this.cptConstruction-80
                    } 
                } else {
                    type = "tortue"
                }             
            }

            // il n'y a pas de tourelle au niveau 1
            if (this.niveauDesign == 0){
                type = "tortue"
            }

            //Check la quantité de tourelle
            let intManySentry = 0
            for (let cptCheck = 0; cptCheck < this.mesEnemy.length ; cptCheck++){
                if (this.mesEnemy[cptCheck].typeEnemy == "sentry"){
                    intManySentry = intManySentry+1;
                }
            }   
            if (intManySentry>5 && type == "sentry"){
                type = null;
            }
            
            switch (type){
                case "tortue":
                    nouveauEnemy =new Tortue(this.monStage, (window.lib.properties.width+this.cptConstruction+160), window.lib.properties.height-(hauteur*80)-1, this.mesTiles,this.monMonde,this.myFluoMC, this.monAfficheur);
                    this.mesEnemy.push(nouveauEnemy)
                    this.manqueDifficulte = 0;
                    break;
                case "sentry":
                    nouveauEnemy =new Sentry(this.monStage, (window.lib.properties.width+this.cptConstruction+160), window.lib.properties.height-(hauteur*80)-1, this.mesTiles,this.monMonde,this.myFluoMC, this.monAfficheur);
                    this.mesEnemy.push(nouveauEnemy)
                    //les tourelles sont trop OP, alors ils causent une baisse de chances de voir des enemies dans les opportunité qui suivent.
                    this.manqueDifficulte = -0.5;
                    break;
                default:
                    //Quand il échouent de faire spawn un enemi.
                    this.manqueDifficulte = this.manqueDifficulte + 0.25
                    break;
            }
        } else {
            //Quand il échouent de faire spawn un enemi.
            this.manqueDifficulte = this.manqueDifficulte + 0.25
        }
        
    }
    public determinerVitesseScroll(newValue){
        CreateurNiveau.vitesseScroll = newValue;
    }
    public determinerNiveauDiff(newValue){
        CreateurNiveau.niveauDifficulte = newValue;
    }
    /**
     * creerMorceau crée des morceaux prédéfinies selon les "morceaux" permie (this.tMorceauPermi).
     * Pour ce faire, il fait appelle au fonction nécessaire pour créer les blocs, plateformes et les enemie
     * Ensuite, il attend que le morceau créé scrolle à l'écran avant de recommencer grâce à un compteur (this.cptConstruction)
     */
    private creerMorceau(){
        this.cptConstruction = this.cptConstruction-CreateurNiveau.vitesseScroll;
        let randomCoin:boolean = null;
        if (this.cptConstruction<=0){ 
            let random =Math.floor(Math.random()*this.tMorceauPermit.length)
            while (random == this.morceauRecent) {
                random = Math.floor(Math.random()*this.tMorceauPermit.length)
            }
            this.morceauRecent = random;
            console.log(random)
            this.cptConstruction = 0
            switch (this.tMorceauPermit[random]){
                case 0:
                    // - =t=-=t= - 
                    this.cptConstruction =this.cptConstruction+80
                    randomCoin = this.randomCoin();
                    if (randomCoin == true){
                        this.creerBloc(1,3)
                    } else {
                        this.creerPlusieursPlateformes(1,3);
                    }
                    this.cptConstruction = this.cptConstruction-240;
                    this.creerPlusieursPlateformes(3,3);

                    this.cptConstruction= this.cptConstruction+80
                    
                    this.creerPileOfBlocs(2,2);
                    
                    this.cptConstruction= this.cptConstruction+80
                    
                    this.creerBloc(1,3)
                    this.cptConstruction = this.cptConstruction-240;
                    this.creerPlusieursPlateformes(3,3);
                    this.cptConstruction =this.cptConstruction+80
                    break;
                case 1:
                    //  T  
                    this.cptConstruction = this.cptConstruction+120
                    this.creerPileOfBlocs(2,1)
                    this.creerPlusieursPlateformes(2,3)
                    this.creerPileOfBlocs(2,1)
                    this.cptConstruction = this.cptConstruction+120

                    break;
                case 2:
                    // _ -a- _ 
                    this.creerPlusieursPlateformes(2,2)
                    this.cptConstruction= this.cptConstruction+80;
                    this.creerPileOfBlocs(3,4)
                    this.cptConstruction = this.cptConstruction-240;
                    this.creerEnemy("tortue",4) 
                    this.creerPlusieursPlateformes(5,3)
                    this.creerEnemy("tortue",4) 
                    this.cptConstruction= this.cptConstruction+240;
                    this.creerPlusieursPlateformes(2,2)

                    break;
                case 3:
                    //_ - =t= - _
                    this.creerBloc(1, 2)
                    this.cptConstruction= this.cptConstruction+80;
                    this.creerBloc(2, 2)
                    this.cptConstruction= this.cptConstruction+80;
                     
                    this.creerBloc(1,4);
                    this.cptConstruction = this.cptConstruction-320;
                    this.creerPlusieursPlateformes(3,4);

                    this.cptConstruction= this.cptConstruction+80;
                    this.creerBloc(2, 2)
                    this.cptConstruction= this.cptConstruction+80;
                    this.creerBloc(1, 2)
                    break;
                case 4:
                    // __=- = 
                    for (let cptPlat =0 ; cptPlat<3 ; cptPlat++){
                        this.creerBloc(1, 1); 
                        if (cptPlat == 2){this.creerEnemy("tortue", 1)} 
                    }
                    this.cptConstruction= this.cptConstruction-80
                    this.creerPlusieursPlateformes(2,1);
                    this.cptConstruction= this.cptConstruction-160
                    this.creerPlusieursPlateformes(3,1);
                    this.creerPlusieursPlateformes(4,2); 
                    this.creerPileOfBlocs(4,2);
                    this.cptConstruction = this.cptConstruction+80;
                    this.creerPlusieursPlateformes(3,4);
                    this.cptConstruction = this.cptConstruction+80
                    this.creerPileOfBlocs(2,3);
                    this.creerEnemy("tortue", 2)
                    break;
                case 5:
                    for (let cptPlat =0 ; cptPlat<3 ; cptPlat++){
                        this.creerBloc(1,1); 
                        if (cptPlat == 2){this.creerEnemy("sentry", 1)} 
                    }
                    break;
                case 6:
                    //  i i==i - i  
                    this.cptConstruction = this.cptConstruction+120
                    this.creerPlusieursPlateformes(2,2)
                    this.cptConstruction = this.cptConstruction+120
                    this.creerPileOfBlocs(2,1)
                    this.creerPlusieursPlateformes(2,3);
                    this.cptConstruction = this.cptConstruction-240;
                    this.creerPlusieursPlateformes(4,3);
                    this.creerPileOfBlocs(2,1)
                    this.cptConstruction=this.cptConstruction+80;
                    this.creerEnemy("any", 2)
                    this.creerPileOfBlocs(2,1)
                    this.cptConstruction = this.cptConstruction+120
                    this.creerPlusieursPlateformes(2,2)
                    this.cptConstruction = this.cptConstruction+120
    
                    break;
                case 7:
                    this.creerBloc(1,1);
                    this.creerPlusieursPlateformes(1, 1)
                    this.creerPlusieursPlateformes(1, 2) 
                    this.cptConstruction = this.cptConstruction-160
                    this.creerEnemy("sentry",4)
                    this.creerEnemy("tortue",1)
                    this.creerPlusieursPlateformes(4,1)
                    
                    this.cptConstruction = this.cptConstruction+80
                    this.creerBloc(1,1); 
                    break;
                case 8:
                    this.creerPlusieursPlateformes(2,2);
                    this.cptConstruction = this.cptConstruction+160
                    let flipper = true
                    for (let cpt = 0; cpt< 7; cpt++){
                        if (flipper){
                            this.creerPlusieursPlateformes(3,1);
                            flipper = false 
                        } else {
                            this.creerEnemy("sentry", 0.5);
                            this.creerBloc(0.5,1);
                            flipper = true
                        }
                    }
                    this.cptConstruction = this.cptConstruction+160
                    this.creerPlusieursPlateformes(2,2);
                    break;    
                default :
                    break;
            }   
        }
	}
    public arreterCreateurNiveau():void {
        window.clearInterval(this.refMinuterieNiveau);
        this.refMinuterieNiveau = null;
        while (this.mesTiles.length > 0){
            this.mesTiles[0].arreterBlocOuPlate()
        }
        while (this.mesEnemy.length > 0){
            this.mesEnemy[0].arreterEnemy()
        }
    }
}