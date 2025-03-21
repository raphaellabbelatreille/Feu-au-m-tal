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
    exports.Afficheur = void 0;
    var Afficheur = /** @class */ (function (_super) {
        __extends(Afficheur, _super);
        function Afficheur(refScene) {
            var _this = _super.call(this, refScene, 0, 0) || this;
            _this.monChampKill = null;
            _this.monChampTime = null;
            _this.timeMinute = null;
            _this.timeSeconde = null;
            _this.timeTotal = null;
            _this.tHealthPoint = null;
            _this.maScene = refScene;
            _this.tHealthPoint = new Array;
            for (var cptEnregistrement = 1; cptEnregistrement <= 8; cptEnregistrement++) {
                var healthFrame = cptEnregistrement;
                if (healthFrame > 4) {
                    healthFrame = healthFrame - 4;
                }
                _this.tHealthPoint[cptEnregistrement] = _this["Health_" + cptEnregistrement];
                _this.tHealthPoint[cptEnregistrement].gotoAndStop(healthFrame - 1);
            }
            _this.monChampKill = _this.clip_kill.txt;
            _this.monChampKill.text = String(0);
            /*new createjs.Text("0", "36px Dark Magic", "#000000");
            this.monChampKill.x = 160
            this.monChampKill.y = 25;*/
            _this.monChampTime = _this.clip_time.txt; /*new createjs.Text("0", "30px Dark Magic", "#000000");
            this.maScene.addChild(this.monChampTime);*/
            _this.timeMinute = 0;
            _this.timeSeconde = 0;
            _this.timeTotal = 0;
            return _this;
            /*this.monChampTime.x = 35
            this.monChampTime.y = 25*/
        }
        Afficheur.prototype.updateTimeur = function (newValue) {
            this.timeTotal = newValue;
            var timeMinute = Math.floor(this.timeTotal / 60);
            var timeSeconde = this.timeTotal - timeMinute * 60;
            if (timeSeconde < 10) {
                this.monChampTime.text = String(timeMinute + ":0" + timeSeconde);
            }
            else {
                this.monChampTime.text = String(timeMinute + ":" + timeSeconde);
            }
        };
        Afficheur.prototype.updatePoint = function (newValue) {
            this.monChampKill.text = String(parseInt(this.monChampKill.text) + newValue);
        };
        Afficheur.prototype.updateHitPoint = function (newValue) {
            for (var cptEnregistrement = 1; cptEnregistrement <= 8; cptEnregistrement++) {
                if (cptEnregistrement >= newValue + 1) {
                    var healthFrame = cptEnregistrement;
                    if (healthFrame > 4) {
                        healthFrame = healthFrame - 4;
                    }
                    this.tHealthPoint[cptEnregistrement].gotoAndStop(healthFrame - 1 + 4);
                }
            }
        };
        Afficheur.prototype.dessiner = function () {
            window.lib.ClipAfficheur.call(this);
            this.frameBounds = window.lib.ClipAfficheur.prototype.frameBounds;
        };
        Afficheur.prototype.arreter = function () {
            this.arreterAfficheur();
        };
        Afficheur.prototype.arreterAfficheur = function () {
            this.maScene.removeChild(this.monChampTime);
            this.maScene.removeChild(this.monChampKill);
            for (var cpt = 0; cpt < this.tHealthPoint.length; cpt++) {
                this.maScene.removeChild(this.tHealthPoint[cpt]);
            }
            this.tHealthPoint = null;
            this.arreterObjetVisible();
        };
        return Afficheur;
    }(ObjetVisible_1.ObjetVisible)); //fin classe
    exports.Afficheur = Afficheur;
});
//# sourceMappingURL=Afficheur.js.map