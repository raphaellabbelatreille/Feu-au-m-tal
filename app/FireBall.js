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
    exports.FireBall = void 0;
    var FireBall = /** @class */ (function (_super) {
        __extends(FireBall, _super);
        function FireBall(refStage, unX, unY, sens, refMonde, refTurtle, isADeseperate) {
            var _this = _super.call(this, refStage, unX, unY, refMonde) || this;
            _this.direction = null;
            _this.targetEnemy = null;
            _this.firingFireBall_lier = null;
            _this.refFiringFireBall = null;
            _this.isDesesperate = null;
            _this.direction = sens;
            _this.targetEnemy = refTurtle;
            _this.gotoAndPlay("idle");
            _this.isDesesperate = isADeseperate;
            switch (_this.direction) {
                case "right":
                    _this.rotation = 270;
                    break;
                case "left":
                    _this.rotation = 90;
                    break;
                case "down":
                    _this.rotation = 0;
                    break;
                case "up":
                    _this.rotation = 180;
                    break;
            }
            _this.firingFireBall_lier = _this.firingFireBall.bind(_this);
            _this.refFiringFireBall = window.setInterval(_this.firingFireBall_lier, 1000 / 60);
            return _this;
        }
        FireBall.prototype.dessiner = function () {
            window.lib.ClipFireBallVDeux.call(this);
            this.frameBounds = window.lib.ClipFireBallVDeux.prototype.frameBounds;
            /*if (this.charged){
              window.lib.ClipLaser.call(this);
              this.frameBounds = window.lib.ClipLaser.prototype.frameBounds;
            }
            if (this.charged){
              window.lib.ClipFireBallVDeux.call(this);
              this.frameBounds = window.lib.ClipFireBallVDeux.prototype.frameBounds;
            }*/
        };
        FireBall.prototype.firingFireBall = function () {
            // pour que desesperate aille beacoup moins loin;
            if (this.isDesesperate) {
                this.dureeDeVie = this.dureeDeVie - 1;
                this.projectileSpeed = this.projectileSpeed + 0.1;
            }
            switch (this.direction) {
                case "right":
                    this.x = this.x + this.projectileSpeed;
                    break;
                case "left":
                    this.x = this.x - this.projectileSpeed;
                    break;
                case "down":
                    this.y = this.y + this.projectileSpeed;
                    break;
                case "up":
                    this.y = this.y - this.projectileSpeed;
                    break;
            }
            var blnTouchSomething = true;
            for (var cptE = 0; cptE < this.targetEnemy.length; cptE++) {
                var position = this.parent.localToLocal(this.x, this.y, this.targetEnemy[cptE]);
                var collision = this.targetEnemy[cptE].hitTest(position.x, position.y);
                if ( /*this.x >= (this.targetEnemy[cptE].x -40) && this.x <= (this.targetEnemy[cptE].x +40)
                && this.y >= (this.targetEnemy[cptE].y -80) && this.y <= (this.targetEnemy[cptE].y) */collision == true) {
                    if (blnTouchSomething) {
                        this.gotoAndPlay("impact");
                        blnTouchSomething = false;
                        this.targetEnemy[cptE].recoitDammage(1);
                        createjs.Sound.play("SonFireImpactMeca", { loop: 0, volume: 0.5 });
                    }
                }
            }
            if (blnTouchSomething == false) {
                this.gotoAndPlay("impact");
                window.clearInterval(this.refMinuterieProjectile);
                window.clearInterval(this.refFiringFireBall);
                this.refFiringFireBall = null;
                this.refMinuterieProjectile = window.setInterval(this.explosionProjectile_lier, 1000 / 60);
            }
        };
        FireBall.prototype.arreter = function () {
            this.monMonde.despawnDeArray("fireball", this, this.arreterFireBall());
        };
        FireBall.prototype.arreterFireBall = function () {
            if (this.refFiringFireBall != null) {
                window.clearInterval(this.refFiringFireBall);
                this.refFiringFireBall = null;
            }
            this.arreterProjectile();
        };
        return FireBall;
    }(Projectile_1.Projectile));
    exports.FireBall = FireBall;
});
//# sourceMappingURL=FireBall.js.map