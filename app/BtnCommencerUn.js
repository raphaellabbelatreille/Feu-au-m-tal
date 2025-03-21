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
    exports.BtnCommencerUn = void 0;
    var BtnCommencerUn = /** @class */ (function (_super) {
        __extends(BtnCommencerUn, _super);
        function BtnCommencerUn(refStage, unX, unY, refMonde) {
            return _super.call(this, refStage, unX, unY, refMonde) || this;
        }
        BtnCommencerUn.prototype.dessiner = function () {
            window.lib.ClipBtnCommencer.call(this);
            this.frameBounds = window.lib.ClipBtnCommencer.prototype.frameBounds;
        };
        BtnCommencerUn.prototype.commencerSurClick = function () {
            this.monMonde.afficherInstruction();
        };
        BtnCommencerUn.prototype.arreter = function () {
            this.arreterBtnCommencer();
        };
        BtnCommencerUn.prototype.arreterBtnCommencer = function () {
            this.arreterButton();
        };
        return BtnCommencerUn;
    }(Button_1.Button));
    exports.BtnCommencerUn = BtnCommencerUn;
});
//# sourceMappingURL=BtnCommencerUn.js.map