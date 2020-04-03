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
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Supply.prototype._checkBounds = function () {
            if (this.y >= config.Game.SCREEN_HEIGHT + this.height) {
                this.Reset();
            }
        };
        Supply.prototype._move = function () {
            this.position = objects.Vector2.add(this.position, this.velocity);
        };
        // PUBLIC METHODS
        Supply.prototype.Start = function () {
            this.type = enums.GameObjectType.SUPPLY;
            this._verticalSpeed = 5; // 5 px per frame
            this.velocity = new objects.Vector2(0, this._verticalSpeed);
            this.Reset();
        };
        Supply.prototype.Update = function () {
            this._move();
            this._checkBounds();
        };
        Supply.prototype.Reset = function () {
            var randomX = util.Mathf.RandomRange(this.halfWidth, config.Game.SCREEN_WIDTH - this.halfWidth);
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
            this.position = new objects.Vector2(randomX, -this.height);
        };
        return Supply;
    }(objects.GameObject));
    objects.Supply = Supply;
})(objects || (objects = {}));
//# sourceMappingURL=Supply.js.map