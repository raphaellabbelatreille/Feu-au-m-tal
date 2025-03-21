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
define(["require", "exports", "./Defillant", "./ObjetVisible"], function (require, exports, Defillant_1, ObjetVisible_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BackGround = void 0;
    var BackGround = /** @class */ (function (_super) {
        __extends(BackGround, _super);
        function BackGround(refStage, levelNumber) {
            var _this = _super.call(this, refStage, 0, -10) || this;
            _this.levelNumber = null;
            _this.monStage = null;
            _this.creerDefillant_lier = null;
            _this.refMinuterieDefillant = null;
            _this.creerChaine_lier = null;
            _this.refMinuterieChaine = null;
            _this.cptTimeur = null;
            _this.cptTimeurChaine = null;
            _this.monStage = refStage;
            _this.levelNumber = levelNumber;
            _this.gotoAndStop(levelNumber - 1);
            _this.tDefillant = new Array;
            _this.creerDefillant_lier = _this.creerDefilant.bind(_this);
            _this.refMinuterieDefillant = window.setInterval(_this.creerDefillant_lier, 1000 / 60);
            _this.cptTimeur = 0;
            if (_this.levelNumber == 2) {
                _this.creerChaine_lier = _this.creerChaine.bind(_this);
                _this.refMinuterieChaine = window.setInterval(_this.creerChaine_lier, 1000 / 60);
                _this.cptTimeurChaine = 0;
            }
            return _this;
        }
        BackGround.prototype.dessiner = function () {
            window.lib.ClipBackground.call(this);
            this.frameBounds = window.lib.ClipBackground.prototype.frameBounds;
        };
        BackGround.prototype.creerDefilant = function () {
            if (this.cptTimeur <= 0) {
                var randomCoin = Math.floor(Math.random() * 4);
                if (randomCoin == 0) {
                    var randomId = Math.random() * 3;
                    if (randomId >= 1) {
                        randomId = Math.random() * 3;
                    }
                    var randomHeight = (Math.random() * 150) + randomId * 100; // si Id plus grand (le clip est plus petit), le nuage est moins haut
                    var nouveau = new Defillant_1.Defillant(this.monStage, randomHeight, randomId + (this.levelNumber - 1) * 3, this, "nuage"); /* chose */
                    this.tDefillant.push(nouveau);
                }
                this.cptTimeur = Math.floor(Math.random() * 100) + 350 - randomCoin * 80;
            }
            else {
                this.cptTimeur = this.cptTimeur;
            }
        };
        BackGround.prototype.creerChaine = function () {
            if (this.cptTimeurChaine <= 0) {
                var randomCoin = Math.floor(Math.random() * 2);
                var randomHeight = Math.floor((Math.random() * 2)) * 50;
                var nouveau = new Defillant_1.Defillant(this.monStage, randomHeight, randomCoin, this, "chaine"); /* chose */
                this.tDefillant.push(nouveau);
                this.cptTimeurChaine = 800;
            }
            else {
                this.cptTimeurChaine = this.cptTimeurChaine - 1;
            }
        };
        BackGround.prototype.despawnDefillant = function (evenement) {
            for (var cpt = 0; cpt < this.tDefillant.length; cpt++) {
                if (this.tDefillant[cpt] == evenement) {
                    this.tDefillant[cpt].arreterDefillant();
                    this.tDefillant[cpt] = null;
                    this.tDefillant.splice(cpt, 1);
                }
            }
        };
        BackGround.prototype.arreter = function () {
            this.arreterBackground();
        };
        BackGround.prototype.arreterBackground = function () {
            window.clearInterval(this.refMinuterieDefillant);
            this.refMinuterieDefillant = null;
            window.clearInterval(this.refMinuterieChaine);
            this.refMinuterieChaine = null;
            if (this.tDefillant.length != null) {
                while (this.tDefillant.length > 0) {
                    this.despawnDefillant(this.tDefillant[0]);
                }
            }
            this.tDefillant = null;
            this.arreterObjetVisible();
        };
        return BackGround;
    }(ObjetVisible_1.ObjetVisible));
    exports.BackGround = BackGround;
});
//# sourceMappingURL=Background.js.map