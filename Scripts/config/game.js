"use strict";
var config;
(function (config) {
    var Game = /** @class */ (function () {
        function Game() {
        }
        Game.Reset = function () {
            Game.CLOUD_NUM = 3;
            Game.DIFFICULTY = "normal";
            Game.LIVES = 10;
            Game.SCORE = 0;
            Game.AMMO = 30;
            Game.HIGH_SCORE = 0;
            Game.BULLET_TYPE = 1;
        };
        Game.SCREEN_WIDTH = 640;
        Game.SCREEN_HEIGHT = 480;
        Game.FPS = 60; // 60 Frames per second
        Game.CLOUD_NUM = 3;
        Game.DIFFICULTY = "normal";
        Game.LIVES = 10;
        Game.SCORE = 0;
        Game.AMMO = 30;
        Game.HIGH_SCORE = 0;
        Game.BULLET_TYPE = 1;
        return Game;
    }());
    config.Game = Game;
})(config || (config = {}));
//# sourceMappingURL=game.js.map