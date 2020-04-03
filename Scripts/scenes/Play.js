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
    var Play = /** @class */ (function (_super) {
        __extends(Play, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Play() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        //initialize and instatiate
        Play.prototype.Start = function () {
            this._ocean = new objects.Ocean();
            this._agent = new objects.Agent();
            this._supply = new objects.Supply();
            // create the cloud array
            this._enemy1 = new Array(); // empty container
            // instantiating CLOUD_NUM clouds
            for (var index = 0; index < config.Game.CLOUD_NUM; index++) {
                this._enemy1.push(new objects.Enemy1());
            }
            this._scoreBoard = new managers.ScoreBoard();
            config.Game.SCORE_BOARD = this._scoreBoard;
            this._bulletManager = new managers.Bullet();
            config.Game.BULLET_MANAGER = this._bulletManager;
            this._keyboardManager = new managers.Keyboard();
            config.Game.KEYBOARD_MANAGER = this._keyboardManager;
            this._bullet = this._bulletManager.GetBullet();
            this.Main();
        };
        Play.prototype.Update = function () {
            var _this = this;
            this._ocean.Update();
            this._agent.Update();
            this._bulletManager.Update();
            this._supply.Update();
            if (managers.Collision.squaredRadiusCheck(this._agent, this._supply)) {
                console.log("Collision with Supply!");
                var yaySound = createjs.Sound.play("yay");
                yaySound.volume = 0.2;
                config.Game.SCORE_BOARD.Ammo += 10;
                if (config.Game.SCORE > config.Game.HIGH_SCORE) {
                    config.Game.HIGH_SCORE = config.Game.SCORE;
                }
            }
            this._enemy1.forEach(function (cloud) {
                cloud.Update();
                if (managers.Collision.squaredRadiusCheck(_this._agent, cloud)) {
                    console.log("Collision with Cloud!");
                    var thunderSound = createjs.Sound.play("thunder");
                    thunderSound.volume = 0.2;
                    config.Game.SCORE_BOARD.Lives -= 1;
                    // check if lives falls less than 1 and then switch to END scene
                    if (config.Game.LIVES < 1) {
                        config.Game.SCENE = scenes.State.END;
                    }
                }
            });
            var bullet;
            for (var _i = 0, _a = managers.Bullet.firingBullet; _i < _a.length; _i++) {
                bullet = _a[_i];
                this._enemy1.forEach(function (cloud) {
                    if (managers.Collision.squaredRadiusCheck(cloud, bullet)) {
                        console.log("Bullet Collision with Cloud!");
                        config.Game.SCORE_BOARD.Score += 20;
                        bullet.Reset();
                        cloud.Reset();
                    }
                });
            }
        };
        Play.prototype.Main = function () {
            this.addChild(this._ocean);
            this.addChild(this._supply);
            this.addChild(this._agent);
            this._bulletManager.AddBulletsToScene(this);
            for (var _i = 0, _a = this._enemy1; _i < _a.length; _i++) {
                var cloud = _a[_i];
                this.addChild(cloud);
            }
            this.addChild(this._scoreBoard.LivesLabel);
            this.addChild(this._scoreBoard.ScoreLabel);
            this.addChild(this._scoreBoard.ammoLabel);
        };
        Play.prototype.Clean = function () {
            this._agent.engineSound.stop();
            this.removeAllChildren();
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=Play.js.map