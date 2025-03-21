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
    exports.Button = void 0;
    var Button = /** @class */ (function (_super) {
        __extends(Button, _super);
        function Button(refStage, unX, unY, refMonde) {
            var _this = _super.call(this, refStage, unX, unY) || this;
            _this.monMonde = null;
            _this.commencerSurClick_lier = null;
            _this.monMonde = refMonde;
            _this.commencerSurClick_lier = _this.commencerSurClick.bind(_this);
            _this.addEventListener("click", _this.commencerSurClick_lier);
            return _this;
        }
        Button.prototype.arreterButton = function () {
            this.removeEventListener("click", this.commencerSurClick_lier);
            this.arreterObjetVisible();
        };
        return Button;
    }(ObjetVisible_1.ObjetVisible));
    exports.Button = Button;
});
//# sourceMappingURL=Button.js.map