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
define(["require", "exports", "./Projectile"], function (require, exports, Projectile_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Laser = void 0;
    var Laser = /** @class */ (function (_super) {
        __extends(Laser, _super);
        function Laser(refStage, unX, unY, refMonde, refMC) {
            var _this = _super.call(this, refStage, unX, unY, refMonde) || this;
            _this.targetMC = null;
            _this.firingLaser_lier = null;
            _this.refFiringLaser = null;
            _this.distanceX = null;
            _this.distanceY = null;
            _this.h = null;
            _this.targetMC = refMC;
            _this.gotoAndPlay("idle");
            _this.distanceY = _this.targetMC.y - 35 - _this.y;
            _this.distanceX = _this.targetMC.x - _this.x;
            _this.h = Math.sqrt(_this.distanceX * _this.distanceX + _this.distanceY * _this.distanceY);
            _this.rotation = Math.atan2(_this.distanceY, _this.distanceX) * 180 / Math.PI + 90 - 180;
            _this.firingLaser_lier = _this.firingLaser.bind(_this);
            _this.refFiringLaser = window.setInterval(_this.firingLaser_lier, 1000 / 60);
            return _this;
        }
        Laser.prototype.dessiner = function () {
            window.lib.ClipLaser.call(this);
            this.frameBounds = window.lib.ClipLaser.prototype.frameBounds;
        };
        Laser.prototype.firingLaser = function () {
            this.x = this.x + (this.distanceX / this.h) * this.projectileSpeed;
            this.y = this.y + (this.distanceY / this.h) * this.projectileSpeed;
            /*let target = this.targetMC
            target.scaleX = 1
            target.scaleY = 1
            let position: createjs.Point = this.parent.localToLocal(this.x-50, this.y-50, target);
                let collision = this.targetMC.hitTest(position.x, position.y);
                this.targetMC.scaleX = 0.5
                this.targetMC.scaleY = 0.5*/
            //let nouveauTruc = new Bloc(this.maScene, this.x, this.y, 1, this.monMonde)
            //nouveauTruc = new Bloc(this.maScene, position.x, position.y, 1, this.monMonde)
            if (this.x >= (this.targetMC.x - 10) && this.x <= (this.targetMC.x + 10) && this.y >= (this.targetMC.y - 80) && this.y <= (this.targetMC.y) /*collision == true*/) {
                window.clearInterval(this.refMinuterieProjectile);
                window.clearInterval(this.refFiringLaser);
                this.refFiringLaser = null;
                this.refMinuterieProjectile = window.setInterval(this.explosionProjectile_lier, 1000 / 60);
                this.targetMC.recoitDammage(1);
                createjs.Sound.play("SonLaserImpact", { loop: 0, volume: 0.8 });
            }
        };
        Laser.prototype.arreter = function () {
            this.monMonde.despawnDeArray("laser", this, this.arreterLaser());
        };
        Laser.prototype.arreterLaser = function () {
            if (this.refFiringLaser != null) {
                window.clearInterval(this.refFiringLaser);
                this.refFiringLaser = null;
            }
            this.arreterProjectile();
        };
        return Laser;
    }(Projectile_1.Projectile));
    exports.Laser = Laser;
});
//# sourceMappingURL=Laser.js.map