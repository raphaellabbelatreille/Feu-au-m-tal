define(["require", "exports", "./EcranChargement", "./PetitMonde"], function (require, exports, EcranChargement_1, PetitMonde_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.App = void 0;
    var App = /** @class */ (function () {
        // Méthodes
        function App() {
            // Attributs
            this.scene = null;
            this.zaWorld = null;
            this.chargement = null;
            // Télécharger les médias et initialiser l'animation.
            window.init(this);
        }
        App.prototype.initialiser = function (refScene) {
            // Initialisation des attributs relatifs à l'animation ---------------------------------------
            this.scene = refScene; // Récupérer la référence de la scène nouvellement créée
            createjs.Ticker.framerate = 30; // Vitesse de l'animation (peut être modifiée si nécessaire)
            // -------------------------------------------------------------------------------------------
            // Initialisation des objets du lieu 0
            this.chargement = new EcranChargement_1.EcranChargement(this.scene, this);
            this.chargement.charger();
        };
        App.prototype.faireDebuterPetitMonde = function () {
            console.log("je débute!");
            if (this.zaWorld == null) {
                this.zaWorld = new PetitMonde_1.PetitMonde(this.scene);
            }
            if (this.chargement != null) {
                this.chargement.arreter();
            }
        };
        App.prototype.rafraichirScene = function (e) {
            this.scene.update();
        };
        return App;
    }()); // fin classe
    exports.App = App;
});
//# sourceMappingURL=App.js.map