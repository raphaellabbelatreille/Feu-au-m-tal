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
define(["require", "exports", "./Entity"], function (require, exports, Entity_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Enemy = void 0;
    var Enemy = /** @class */ (function (_super) {
        __extends(Enemy, _super);
        function Enemy(refStage, unX, unY, refTPlateform, refMonde, refProtagoniste, refAfficheur, strType) {
            var _this = _super.call(this, refStage, unX, unY, refTPlateform) || this;
            _this.monProtagoniste = null;
            _this.monMonde = null;
            _this.isAlive = null;
            _this.fadeOut_lier = null;
            _this.pvCourant = null;
            _this.monAfficheur = null;
            _this.refMinuterieCollision = null;
            _this.collision_lier = null;
            _this.cptIntangible = null;
            _this.typeEnemy = null;
            _this.typeEnemy = strType;
            _this.isAlive = true;
            _this.monProtagoniste = refProtagoniste;
            _this.monMonde = refMonde;
            _this.fadeOut_lier = _this.fadeOut.bind(_this);
            _this.monAfficheur = refAfficheur;
            _this.collision_lier = _this.collisionDammage.bind(_this);
            _this.refMinuterieCollision = window.setInterval(_this.collision_lier, 1000 / 60);
            _this.cptIntangible = 0;
            return _this;
            //this.deactivateGravity()
        }
        Enemy.prototype.recoitDammage = function (numbreDammage) {
            if (this.cptIntangible <= 0) {
                this.pvCourant = this.pvCourant - numbreDammage;
                if (this.pvCourant <= 0) {
                    if (this.isAlive) {
                        console.log("enemy touche");
                        this.monAfficheur.updatePoint(1);
                        if (localStorage.getItem("nbrKill") != null) {
                            localStorage.setItem("nbrKill", String(parseInt(localStorage.getItem("nbrKill")) + 1));
                        }
                        else {
                            localStorage.setItem("nbrKill", "1");
                        }
                        this.joueAnimationMort();
                        this.addEventListener("tick", this.fadeOut_lier);
                        this.isAlive = false;
                    }
                }
                this.cptIntangible = 1;
                this.NothingSuspicious(numbreDammage);
            }
        };
        Enemy.prototype.collisionDammage = function () {
            if (this.x - 40 <= this.monProtagoniste.x && this.x + 40 >= this.monProtagoniste.x &&
                this.y - 80 <= this.monProtagoniste.y && this.y + 10 >= this.monProtagoniste.y) {
                console.log("um num num");
                this.monProtagoniste.recoitDammage(1);
            }
            //Obliger de l'avoir ici car cest un timeur;
            this.cptIntangible = this.cptIntangible - 1;
        };
        Enemy.prototype.deactivateCollision = function () {
            window.clearInterval(this.refMinuterieCollision);
            this.refMinuterieCollision = null;
        };
        Enemy.prototype.fadeOut = function () {
            this.alpha = this.alpha - 0.05;
            if (this.alpha < 0) {
                this.arreter();
            }
        };
        Enemy.prototype.arreterEnemy = function () {
            this.arreter();
        };
        Enemy.prototype.arreterMeca = function () {
            window.clearInterval(this.refMinuterieCollision);
            this.refMinuterieCollision = null;
            this.arreterEntity();
        };
        return Enemy;
    }(Entity_1.Entity));
    exports.Enemy = Enemy;
});
//# sourceMappingURL=Enemy.js.map