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
var scenes;
(function (scenes) {
    var Start = /** @class */ (function (_super) {
        __extends(Start, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Start() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        Start.prototype.Start = function () {
            //instantiate a new Text object
            this._welcomeLabel = new objects.Label("Agent Borris", "80px", "Consolas", "#FFFF00", 320, 180, true);
            this._instructionLabel = new objects.Label("Use mouse and space button to shoot enemy.\nDon't let enemy run away.\nBeware of running out of ammo.", "24px", "Consolas", "#BFF8FD", 320, 280, true);
            // buttons
            this._easyButton = new objects.Button("easyButton", 80, 430, true);
            this._normalButton = new objects.Button("normalButton", 320, 430, true);
            this._hardButton = new objects.Button("hardButton", 540, 430, true);
            this._ocean = new objects.Ocean();
            this.Main();
        };
        Start.prototype.Update = function () {
            this._ocean.Update();
        };
        Start.prototype.Main = function () {
            this.addChild(this._ocean);
            this.addChild(this._welcomeLabel);
            this.addChild(this._instructionLabel);
            this.addChild(this._easyButton);
            this._easyButton.on("click", function () {
                config.Game.DIFFICULTY = "easy";
                config.Game.CLOUD_NUM = 2;
                config.Game.SCENE = scenes.State.PLAY;
            });
            this.addChild(this._normalButton);
            this._normalButton.on("click", function () {
                config.Game.DIFFICULTY = "normal";
                config.Game.CLOUD_NUM = 3;
                config.Game.SCENE = scenes.State.PLAY;
            });
            this.addChild(this._hardButton);
            this._hardButton.on("click", function () {
                config.Game.DIFFICULTY = "hard";
                config.Game.CLOUD_NUM = 4;
                config.Game.SCENE = scenes.State.PLAY;
            });
        };
        Start.prototype.Clean = function () {
            this.removeAllChildren();
        };
        return Start;
    }(objects.Scene));
    scenes.Start = Start;
})(scenes || (scenes = {}));
//# sourceMappingURL=Start.js.map