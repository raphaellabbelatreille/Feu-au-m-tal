/**
 * @file Classe d'un écran de chargement
 * @author Michel Rouleau <mrouleau.cegep-ste-foy.qc.ca>
 * @version 0.0.1
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./ObjetVisible"], function (require, exports, ObjetVisible_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EcranChargement = void 0;
    /**
     * Classe de gestion d'un écran de chargement
     */
    var EcranChargement = /** @class */ (function (_super) {
        __extends(EcranChargement, _super);
        function EcranChargement(scene, app) {
            var _this = _super.call(this, scene, 0, 0) || this;
            //Variables privées
            //conserve les références pour retirer les écouteurs
            _this._surFinChargementBindRef = null;
            _this._surErreurChargementBindRef = null;
            _this._surProgresChargementBindRef = null;
            _this._surClickBtnJouerBindRef = null;
            _this._surClickBtnPrecedentBindRef = null;
            _this._surClickBtnSuivantBindRef = null;
            //Conserve l'occurence de l'application pour destruction
            _this._app = null;
            _this._app = app;
            _this.dessiner();
            return _this;
        }
        /**
         * Fonction de chargement de l'objet
         */
        EcranChargement.prototype.charger = function () {
            this.ajouterSurScene();
            //Procède au chargement du manifeste
            this.precharger();
            //intialise les écouteurs dMdévénement de la navigation
            this._surClickBtnJouerBindRef = this.surClickBtnJouer.bind(this);
            this["btn_jouer"].addEventListener("click", this._surClickBtnJouerBindRef);
            /*this._surClickBtnSuivantBindRef=this.surClickBtnSuivant.bind(this);
            this["btn_suivant"].addEventListener("click", this._surClickBtnSuivantBindRef);
            this._surClickBtnPrecedentBindRef=this.surClickBtnPrecedent.bind(this);
            this["btn_precedent"].addEventListener("click", this._surClickBtnPrecedentBindRef);*/
        };
        EcranChargement.prototype.ajouterSurScene = function () {
            this.maScene.addChild(this);
        };
        /**
         * Fonction de retrait des occurrences d'objet sur la scène
         */
        EcranChargement.prototype.retirerDeScene = function () {
            this.maScene.removeChild(this);
        };
        /**
         * Fonction de déchargement de l'objet
         */
        EcranChargement.prototype.decharger = function () {
            this.retirerDeScene();
            this["btn_jouer"].removeEventListener("click", this._surClickBtnJouerBindRef);
            /*this["btn_suivant"].removeEventListener("click", this._surClickBtnSuivantBindRef);
            this["btn_precedent"].removeEventListener("click", this._surClickBtnPrecedentBindRef);*/
            this._app.faireDebuterPetitMonde();
        };
        /**
         * Fonction de dessin de l'objet
         */
        EcranChargement.prototype.dessiner = function () {
            window.lib.ClipChargement.call(this);
            this.frameBounds = window.lib.ClipTileBloc.prototype.frameBounds;
            //intialise la barre de progression
            this["chargement"]["barre_progression"].scaleX = 0;
            //intialise la position du point de registre
            this["chargement"]["barre_progression"].regX = 0;
            this["chargement"]["barre_progression"].regY = 0;
            //intialise la position de la barre
            this["chargement"]["barre_progression"].x = 2;
            this["chargement"]["barre_progression"].y = 2;
            //intitialise le champ de texte
            this["chargement"]["champ_progression"].text = "0%";
            //cache le bouton jouer
            this["btn_jouer"].visible = false;
            //cache le bouton de la page précédente, montre le suivant
            /*this["btn_precedent"].visible=false;
            this["btn_suivant"].visible=true;*/
        };
        /**
         * Fonction de réponse à un clic sur le bouton Jouer
         * @param e {MouseEvent}
         */
        EcranChargement.prototype.surClickBtnJouer = function (e) {
            this.decharger();
        };
        //*******************Fonctions de chargement des médias***********************
        /**
         * Fonction de chargement des actifs du manifeste.
         * Cette fonction charge les éléments écrans de présentation, et d'instruction
         */
        EcranChargement.prototype.precharger = function () {
            //Crée une queue de chargement pour les éléments du manifeste
            //Utilise XHR(?), répertoire racine, cross origine (chargement depuis un autre domaine?)
            var queue = new createjs.LoadQueue(true, "./", true);
            //Enregistre un plugin pour le sound (ici createjs.Sound)
            queue.installPlugin(createjs.Sound);
            //Déclare un écouteur pour la fin du chargement
            this._surFinChargementBindRef = this.surFinChargement.bind(this);
            queue.addEventListener("complete", this.surFinChargement.bind(this));
            //Déclare un écouteur pour superviser le progrès du chargement
            this._surProgresChargementBindRef = this.surProgresChargement.bind(this);
            queue.addEventListener("progress", this._surProgresChargementBindRef);
            //Déclare un écouteur pour superviser une erreur sur le chargement
            this._surErreurChargementBindRef = this.surErreurChargement.bind(this);
            queue.addEventListener("error", this.surErreurChargement.bind(this));
            //Charge les fichiers du manifeste
            queue.loadManifest(window.lib.properties.manifest);
        };
        /**
         * Fonction de supervision de la fin du chargement des médias
         * @param e {any} - Événement de fin du chargement
         */
        EcranChargement.prototype.surFinChargement = function (e) {
            this.retirerEcouteursPrechargement(e);
            this["chargement"]["barre_progression"].scaleX = e.currentTarget.progress;
            this["chargement"]["champ_progression"].text = e.currentTarget.progress.toFixed(2) * 100 + "%";
            this["btn_jouer"].visible = true;
        };
        /**
         * Fonction de supervision d'erreur au chargement
         * @param e {any} - Événement d'erreur lors du chargement
         */
        EcranChargement.prototype.surErreurChargement = function (e) {
            console.log("Une erreur est survenu lors du préchargement.");
            this.retirerEcouteursPrechargement(e);
        };
        /**
         * Fonction de supervision de la progression du chargement des médias
         * @param e {any} - Événement de progression du chargement
         */
        EcranChargement.prototype.surProgresChargement = function (e) {
            this["chargement"]["barre_progression"].scaleX = e.currentTarget.progress;
            this["chargement"]["champ_progression"].text = e.currentTarget.progress.toFixed(2) * 100 + "%";
        };
        /**
         * Fonction de retrait des écouteur de supervision du chargement
         * @param e {any} - Événement déclencheur de la fin ou de l'interruption du chargement
         */
        EcranChargement.prototype.retirerEcouteursPrechargement = function (e) {
            e.currentTarget.removeEventListener("complete", this._surFinChargementBindRef);
            e.currentTarget.removeEventListener("progress", this._surProgresChargementBindRef);
            e.currentTarget.removeEventListener("error", this._surErreurChargementBindRef);
        };
        EcranChargement.prototype.arreter = function () {
            this.arreterObjetVisible();
        };
        return EcranChargement;
    }(ObjetVisible_1.ObjetVisible));
    exports.EcranChargement = EcranChargement;
});
//# sourceMappingURL=EcranChargement.js.map