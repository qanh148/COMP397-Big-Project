"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var objects;
(function (objects) {
    var Supply = /** @class */ (function (_super) {
        __extends(Supply, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Supply() {
            var _this = _super.call(this, config.Game.TEXTURE_ATLAS, "bullet1", new objects.Vector2(), true) || this;
            _this._activeTime = 0;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Supply.prototype._checkBounds = function () {
            if (this.y >= config.Game.SCREEN_HEIGHT + this.height) {
                this.Reset();
            }
        };
        Supply.prototype._checkTime = function () {
            if (this.isActive == true) {
                this._activeTime++;
            }
            if (this._activeTime >= 300) {
                if (this._activeTime % 40 == 20) {
                    this.alpha = 0.5;
                }
                if (this._activeTime % 40 == 0) {
                    this.alpha = 1;
                }
            }
            if (this._activeTime == 500) {
                this.Reset();
            }
        };
        // PUBLIC METHODS
        Supply.prototype.Start = function () {
            this.isActive = false;
            this.type = enums.GameObjectType.SUPPLY;
            this.position = new objects.Vector2(-1000, -1000);
            this.Reset();
        };
        Supply.prototype.Update = function () {
            this._checkTime();
        };
        Supply.prototype.Reset = function () {
            this.alpha = 1;
            this._activeTime = 0;
            this.isActive = false;
            this.position = new objects.Vector2(-1000, -1000);
            var randomSupply = Math.floor(util.Mathf.RandomRange(1, 10));
            console.log(randomSupply);
            if (randomSupply < 6) {
                this.gotoAndPlay("bullet1");
            }
            else if (randomSupply < 9) {
                this.gotoAndPlay("bullet2");
            }
            else if (randomSupply < 11) {
                this.gotoAndPlay("bullet3");
            }
        };
        return Supply;
    }(objects.GameObject));
    objects.Supply = Supply;
})(objects || (objects = {}));
//# sourceMappingURL=Supply.js.map