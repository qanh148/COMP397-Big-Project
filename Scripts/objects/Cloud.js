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
    var Cloud = /** @class */ (function (_super) {
        __extends(Cloud, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Cloud() {
            var _this = _super.call(this, config.Game.TEXTURE_ATLAS, "enemy", new objects.Vector2(), true) || this;
            _this._frame = 0;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Cloud.prototype._checkBounds = function () {
            if (this.y >= config.Game.SCREEN_HEIGHT + this.height) {
                this.Reset();
            }
            if (this.position.x <= this.halfWidth) {
                this._horizontalSpeed = util.Mathf.RandomRange(0, 3);
            }
            if (this.position.x >= config.Game.SCREEN_WIDTH - this.halfWidth) {
                this._horizontalSpeed = util.Mathf.RandomRange(-3, 0);
            }
        };
        Cloud.prototype._move = function () {
            this.position = objects.Vector2.add(this.position, this.velocity);
        };
        // PUBLIC METHODS
        Cloud.prototype.Start = function () {
            this.type = enums.GameObjectType.CLOUD;
            this.alpha = 1; // 100% transparent
            this.rotation = 180;
            this.Reset();
        };
        Cloud.prototype.Update = function () {
            this._move();
            this._checkBounds();
            this._frame += 1;
            if (this._frame % 40 == 0) {
                this._horizontalSpeed = util.Mathf.RandomRange(-3, 3);
            }
            this.velocity = new objects.Vector2(this._horizontalSpeed, this._verticalSpeed);
        };
        Cloud.prototype.Reset = function () {
            this._verticalSpeed = util.Mathf.RandomRange(3, 5);
            this._horizontalSpeed = util.Mathf.RandomRange(-2, 2);
            this.velocity = new objects.Vector2(this._horizontalSpeed, this._verticalSpeed);
            var randomX = util.Mathf.RandomRange(this.halfWidth, config.Game.SCREEN_WIDTH - this.halfWidth);
            var randomY = util.Mathf.RandomRange(-this.height * 3, -this.height);
            this.position = new objects.Vector2(randomX, randomY);
        };
        return Cloud;
    }(objects.GameObject));
    objects.Cloud = Cloud;
})(objects || (objects = {}));
//# sourceMappingURL=Cloud.js.map