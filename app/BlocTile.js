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
define(["require", "exports", "./Tile"], function (require, exports, Tile_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Bloc = void 0;
    var Bloc = /** @class */ (function (_super) {
        __extends(Bloc, _super);
        function Bloc(refStage, unX, unY, intModel, refMonde) {
            var _this = _super.call(this, refStage, unX, unY, "Bloc", refMonde) || this;
            _this.gotoAndStop(intModel);
            return _this;
        }
        Bloc.prototype.dessiner = function () {
            window.lib.ClipTileBloc.call(this);
            this.frameBounds = window.lib.ClipTileBloc.prototype.frameBounds;
        };
        Bloc.prototype.arreter = function () {
            this.monMonde.despawnDeArray("bloc", this, this.arreterBloc());
        };
        Bloc.prototype.arreterBloc = function () {
            this.arreterTile();
        };
        return Bloc;
    }(Tile_1.Tile));
    exports.Bloc = Bloc;
});
//# sourceMappingURL=BlocTile.js.map