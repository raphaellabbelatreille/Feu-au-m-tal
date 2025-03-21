/**
 * @file Classe d'un écran de chargement
 * @author Michel Rouleau <mrouleau.cegep-ste-foy.qc.ca>
 * @version 0.0.1
 */

//importation des classes nécessaires de createjs
import Stage = createjs.Stage;

//importation de ce paquetage
import {ObjetVisible} from "./ObjetVisible";
import {App} from "./App";

/**
 * Classe de gestion d'un écran de chargement
 */
export class EcranChargement extends ObjetVisible{

    //Variables privées
    //conserve les références pour retirer les écouteurs
    private _surFinChargementBindRef:any=null;
    private _surErreurChargementBindRef:any=null;
    private _surProgresChargementBindRef:any=null;
    private _surClickBtnJouerBindRef:any=null;
    private _surClickBtnPrecedentBindRef:any=null;
    private _surClickBtnSuivantBindRef:any=null;

    //Conserve l'occurence de l'application pour destruction
    private _app:App=null;

    public constructor(scene:Stage,app:App){
        super(scene, 0, 0);
        this._app=app;
        this.dessiner();
    }

    /**
     * Fonction de chargement de l'objet
     */
    public charger():void{
        this.ajouterSurScene();
        //Procède au chargement du manifeste
        this.precharger();
        //intialise les écouteurs dMdévénement de la navigation
        this._surClickBtnJouerBindRef=this.surClickBtnJouer.bind(this);
        this["btn_jouer"].addEventListener("click", this._surClickBtnJouerBindRef);
        /*this._surClickBtnSuivantBindRef=this.surClickBtnSuivant.bind(this);
        this["btn_suivant"].addEventListener("click", this._surClickBtnSuivantBindRef);
        this._surClickBtnPrecedentBindRef=this.surClickBtnPrecedent.bind(this);
        this["btn_precedent"].addEventListener("click", this._surClickBtnPrecedentBindRef);*/
    }
    protected ajouterSurScene():void{
        this.maScene.addChild(this);
    }

    /**
     * Fonction de retrait des occurrences d'objet sur la scène
     */
    protected retirerDeScene():void{
        this.maScene.removeChild(this);
    }

    /**
     * Fonction de déchargement de l'objet
     */
    public decharger():void{
        this.retirerDeScene();
        this["btn_jouer"].removeEventListener("click", this._surClickBtnJouerBindRef);
        /*this["btn_suivant"].removeEventListener("click", this._surClickBtnSuivantBindRef);
        this["btn_precedent"].removeEventListener("click", this._surClickBtnPrecedentBindRef);*/
        this._app.faireDebuterPetitMonde();
    }

    /**
     * Fonction de dessin de l'objet
     */
    protected dessiner():void{
        window.lib.ClipChargement.call(this);
        this.frameBounds = window.lib.ClipTileBloc.prototype.frameBounds; 
        //intialise la barre de progression
        this["chargement"]["barre_progression"].scaleX=0;
        //intialise la position du point de registre
        this["chargement"]["barre_progression"].regX=0;
        this["chargement"]["barre_progression"].regY=0;
        //intialise la position de la barre
        this["chargement"]["barre_progression"].x=2;
        this["chargement"]["barre_progression"].y=2;
        //intitialise le champ de texte
        this["chargement"]["champ_progression"].text="0%";
        //cache le bouton jouer
        this["btn_jouer"].visible=false;
        //cache le bouton de la page précédente, montre le suivant
        /*this["btn_precedent"].visible=false;
        this["btn_suivant"].visible=true;*/
    }

    /**
     * Fonction de réponse à un clic sur le bouton Jouer
     * @param e {MouseEvent}
     */
    private surClickBtnJouer(e:MouseEvent):void{
        this.decharger();
    }


    //*******************Fonctions de chargement des médias***********************
    /**
     * Fonction de chargement des actifs du manifeste.
     * Cette fonction charge les éléments écrans de présentation, et d'instruction
     */
    private precharger():void{

        //Crée une queue de chargement pour les éléments du manifeste
        //Utilise XHR(?), répertoire racine, cross origine (chargement depuis un autre domaine?)
        let queue = new createjs.LoadQueue(true,"./",true);

        //Enregistre un plugin pour le sound (ici createjs.Sound)
        queue.installPlugin(createjs.Sound);

        //Déclare un écouteur pour la fin du chargement
        this._surFinChargementBindRef=this.surFinChargement.bind(this);
        queue.addEventListener("complete", this.surFinChargement.bind(this));

        //Déclare un écouteur pour superviser le progrès du chargement
        this._surProgresChargementBindRef= this.surProgresChargement.bind(this)
        queue.addEventListener("progress",this._surProgresChargementBindRef);

        //Déclare un écouteur pour superviser une erreur sur le chargement
        this._surErreurChargementBindRef=this.surErreurChargement.bind(this);
        queue.addEventListener("error", this.surErreurChargement.bind(this));

        //Charge les fichiers du manifeste
        queue.loadManifest(window.lib.properties.manifest);
    }

    /**
     * Fonction de supervision de la fin du chargement des médias
     * @param e {any} - Événement de fin du chargement
     */
    private surFinChargement(e):void {
        this.retirerEcouteursPrechargement(e);
        this["chargement"]["barre_progression"].scaleX=e.currentTarget.progress;
        this["chargement"]["champ_progression"].text=e.currentTarget.progress.toFixed(2)*100+"%";
        this["btn_jouer"].visible=true;
    }

    /**
     * Fonction de supervision d'erreur au chargement
     * @param e {any} - Événement d'erreur lors du chargement
     */
    private surErreurChargement(e):void{
        console.log("Une erreur est survenu lors du préchargement.");
        this.retirerEcouteursPrechargement(e);
    }

    /**
     * Fonction de supervision de la progression du chargement des médias
     * @param e {any} - Événement de progression du chargement
     */
    private surProgresChargement(e):void{
        this["chargement"]["barre_progression"].scaleX=e.currentTarget.progress;
        this["chargement"]["champ_progression"].text=e.currentTarget.progress.toFixed(2)*100+"%";
    }

    /**
     * Fonction de retrait des écouteur de supervision du chargement
     * @param e {any} - Événement déclencheur de la fin ou de l'interruption du chargement
     */
    private retirerEcouteursPrechargement(e):void{
        e.currentTarget.removeEventListener("complete", this._surFinChargementBindRef);
        e.currentTarget.removeEventListener("progress", this._surProgresChargementBindRef);
        e.currentTarget.removeEventListener("error", this._surErreurChargementBindRef);
    }
    protected arreter(): void {
        this.arreterObjetVisible()    
    }
}
