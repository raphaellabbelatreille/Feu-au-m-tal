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
define(["require", "exports", "./PeutScroll"], function (require, exports, PeutScroll_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Entity = void 0;
    var Entity = /** @class */ (function (_super) {
        __extends(Entity, _super);
        function Entity(refStage, unX, unY, refTPlateform) {
            var _this = _super.call(this, refStage, unX, unY) || this;
            _this.isFalling = false;
            _this.isOnFloor = false;
            _this.maxForceGravite = 10;
            _this.tPlateforme = null;
            _this.refMinuterieDetectionSolAir = null;
            _this.refMinuterieGravity = null;
            _this.gravity_lier = null;
            _this.detectSolAir_lier = null;
            _this.tempsPasserAir = null;
            _this.gravity_lier = _this.gravity.bind(_this);
            _this.activateGravity();
            _this.detectSolAir_lier = _this.isInTheAirDetect.bind(_this);
            _this.refMinuterieDetectionSolAir = window.setInterval(_this.detectSolAir_lier, 1000 / 30);
            _this.tPlateforme = new Array;
            _this.tPlateforme = refTPlateform;
            _this.isFalling = true;
            _this.isOnFloor = false;
            _this.tempsPasserAir = 0;
            return _this;
        }
        Entity.prototype.activateGravity = function () {
            if (this.refMinuterieGravity == null) {
                this.refMinuterieGravity = window.setInterval(this.gravity_lier, 1000 / 30);
            }
        };
        Entity.prototype.deactivateGravity = function () {
            if (this.refMinuterieGravity != null) {
                window.clearInterval(this.refMinuterieGravity);
                this.refMinuterieGravity = null;
            }
        };
        Entity.prototype.gravity = function () {
            if (this.isFalling) {
                this.isOnFloor = false;
                var forceGravity = this.tempsPasserAir;
                if (forceGravity > this.maxForceGravite) {
                    forceGravity = this.maxForceGravite;
                }
                this.y = this.y + forceGravity;
                for (var cpt = 0; cpt < this.tPlateforme.length; cpt++) {
                    if (this.y >= this.tPlateforme[cpt].y && this.y <= (this.tPlateforme[cpt].y + 50)
                        && this.x > (this.tPlateforme[cpt].x - this.tPlateforme[cpt].largeur - 2) && this.x < (this.tPlateforme[cpt].x + this.tPlateforme[cpt].largeur + 2)) {
                        this.y = this.tPlateforme[cpt].y;
                        this.isFalling = false;
                        this.isOnFloor = true;
                    }
                }
            }
        };
        Entity.prototype.isInTheAirDetect = function () {
            if (this.isFalling) {
                this.tempsPasserAir = this.tempsPasserAir + 1;
                //console.log(this.tempsPasserAir)
                this.isOnFloor = false;
                //console.log("IsFalling")
            }
            if (this.isOnFloor) {
                this.tempsPasserAir = 0;
                this.isFalling = false;
                //console.log("Floor")
            }
        };
        Entity.prototype.arreterEntity = function () {
            this.deactivateGravity();
            window.clearInterval(this.refMinuterieDetectionSolAir);
            this.refMinuterieDetectionSolAir = null;
            this.arreterScroll();
        };
        return Entity;
    }(PeutScroll_1.PeutScroll));
    exports.Entity = Entity;
});
//# sourceMappingURL=Entity.js.map