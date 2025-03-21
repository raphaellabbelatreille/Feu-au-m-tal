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
define(["require", "exports", "./Button"], function (require, exports, Button_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.btnCommencerInfiny = void 0;
    var btnCommencerInfiny = /** @class */ (function (_super) {
        __extends(btnCommencerInfiny, _super);
        function btnCommencerInfiny(refStage, unX, unY, refMonde, meilleurTemps) {
            var _this = _super.call(this, refStage, unX, unY, refMonde) || this;
            _this.monChamp = null;
            _this.monChamp = new createjs.Text("0", "20px Arial", "#000000");
            _this.monChamp.text = String(meilleurTemps);
            _this.maScene.addChild(_this.monChamp);
            _this.monChamp.x = unX + 120;
            _this.monChamp.y = unY - 30;
            return _this;
        }
        btnCommencerInfiny.prototype.dessiner = function () {
            window.lib.ClipBtnCommencer.call(this);
            this.frameBounds = window.lib.ClipBtnCommencer.prototype.frameBounds;
        };
        btnCommencerInfiny.prototype.commencerSurClick = function () {
            this.monMonde.commencerNiveau(2, true);
        };
        btnCommencerInfiny.prototype.arreter = function () {
            this.arreterBtnCommencer();
        };
        btnCommencerInfiny.prototype.arreterBtnCommencer = function () {
            this.arreterObjetVisible();
        };
        return btnCommencerInfiny;
    }(Button_1.Button));
    exports.btnCommencerInfiny = btnCommencerInfiny;
});
//# sourceMappingURL=BtnInfiny.js.map