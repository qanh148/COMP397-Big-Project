module config
{
    export class Game
    {
        public static SCREEN_WIDTH:number = 640;
        public static SCREEN_HEIGHT:number = 480;
        public static SCENE: scenes.State;
        public static ASSETS: createjs.LoadQueue;
        public static FPS: number = 60; // 60 Frames per second
        public static CLOUD_NUM: number = 3;
        public static DIFFICULTY: string = "normal";
        public static LIVES: number = 10;
        public static SCORE: number = 0;
        public static AMMO: number = 30;
        public static HIGH_SCORE: number = 0;
        public static BULLET_TYPE: number = 1;
        public static SCORE_BOARD: managers.ScoreBoard;
        public static BULLET_MANAGER: managers.Bullet;
        public static KEYBOARD_MANAGER: managers.Keyboard;
        public static TEXTURE_ATLAS: createjs.SpriteSheet;
        public static OCEAN_ATLAS: createjs.SpriteSheet;

        public static Reset(): void {
        Game.CLOUD_NUM = 3;
        Game.DIFFICULTY = "normal";
        Game.LIVES = 10;
        Game.SCORE = 0;
        Game.AMMO = 30;
        Game.HIGH_SCORE = 0;
        Game.BULLET_TYPE = 1;
        }
    }
}