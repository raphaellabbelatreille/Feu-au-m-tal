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
    exports.Defillant = void 0;
    var Defillant = /** @class */ (function (_super) {
        __extends(Defillant, _super);
        function Defillant(refStage, unY, intModel, refBackground, strType) {
            var _this = _super.call(this, refStage, window.lib.properties.width + 160, unY) || this;
            _this.monBackground = null;
            _this.scrollLent_lier = null;
            _this.type = null;
            _this.monBackground = refBackground;
            _this.type = strType;
            window.clearInterval(_this.refMinuterieScroll);
            _this.scrollLent_lier = _this.scrollLent.bind(_this);
            switch (_this.type) {
                case "chaine":
                    window.lib.ClipChaine.call(_this);
                    _this.frameBounds = window.lib.ClipChaine.prototype.frameBounds;
                    _this.refMinuterieScroll = window.setInterval(_this.scrollLent_lier, 1000 / 40);
                    _this.y = -5;
                    break;
                case "nuage":
                    window.lib.ClipNuage.call(_this);
                    _this.frameBounds = window.lib.ClipNuage.prototype.frameBounds;
                    _this.refMinuterieScroll = window.setInterval(_this.scrollLent_lier, 1000 / 60);
                    _this.y = unY;
                default:
                    break;
            }
            _this.x = window.lib.properties.width + 160;
            _this.gotoAndStop(intModel);
            return _this;
        }
        /* Est exactement le meme code que PeutScroll.bougerScroll() mais plus lent;*/
        Defillant.prototype.scrollLent = function () {
            this.x = this.x - PeutScroll_1.PeutScroll.vitesseScroll / 2;
            if (this.x <= -500) {
                this.arreter();
            }
        };
        ;
        Defillant.prototype.dessiner = function () {
            /*window.lib.ClipNuage.call(this);
            this.frameBounds = window.lib.ClipNuage.prototype.frameBounds;*/
        };
        Defillant.prototype.arreter = function () {
            this.monBackground.despawnDefillant(this); //despawnDeArray
        };
        Defillant.prototype.arreterDefillant = function () {
            this.arreterScroll();
        };
        return Defillant;
    }(PeutScroll_1.PeutScroll));
    exports.Defillant = Defillant;
});
//# sourceMappingURL=Defillant.js.map