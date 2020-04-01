module scenes {
    export class Play extends objects.Scene {
        // PRIVATE INSTANCE MEMBERS
        private _ocean?: objects.Ocean;
        private _plane?: objects.Plane;
        private _island?: objects.Island;
        private _bullet?: objects.Bullet;

        private _clouds: Array<objects.Cloud>;

        private _scoreBoard: managers.ScoreBoard;
        private _bulletManager: managers.Bullet;
        private _keyboardManager: managers.Keyboard;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor() {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS

        //initialize and instatiate
        public Start(): void {

            this._ocean = new objects.Ocean();
            this._plane = new objects.Plane();
            this._island = new objects.Island();

            // create the cloud array
            this._clouds = new Array<objects.Cloud>(); // empty container

            // instantiating CLOUD_NUM clouds
            for (let index = 0; index < config.Game.CLOUD_NUM; index++) {
                this._clouds.push(new objects.Cloud());
            }

            this._scoreBoard = new managers.ScoreBoard();
            config.Game.SCORE_BOARD = this._scoreBoard;

            this._bulletManager = new managers.Bullet();
            config.Game.BULLET_MANAGER = this._bulletManager;

            this._keyboardManager = new managers.Keyboard();
            config.Game.KEYBOARD_MANAGER = this._keyboardManager;

            this._bullet = this._bulletManager.GetBullet();
            this.Main();
        }

        public Update(): void {
            this._ocean.Update();

            this._plane.Update();

            this._bulletManager.Update();

            this._island.Update();

            if (managers.Collision.squaredRadiusCheck(this._plane, this._island)) {
                console.log("Collision with Island!");
                let yaySound = createjs.Sound.play("yay");
                yaySound.volume = 0.2;
                config.Game.SCORE_BOARD.Score += 100;

                if (config.Game.SCORE > config.Game.HIGH_SCORE) {
                    config.Game.HIGH_SCORE = config.Game.SCORE;
                }
            }


            this._clouds.forEach(cloud => {
                cloud.Update();
                if(managers.Collision.squaredRadiusCheck(this._plane, cloud)){
                    console.log("Collision with Cloud!");
                    let thunderSound = createjs.Sound.play("thunder");
                    thunderSound.volume = 0.2;
                    
                    config.Game.SCORE_BOARD.Lives -= 1;
                    // check if lives falls less than 1 and then switch to END scene
                    if (config.Game.LIVES < 1) {
                        config.Game.SCENE = scenes.State.END;
                    }
                }
            });
            let bullet: objects.Bullet;
            for (bullet of managers.Bullet.firingBullet) {
                this._clouds.forEach(cloud => {
                    if(managers.Collision.squaredRadiusCheck(cloud, bullet)){
                        console.log("Bullet Collision with Cloud!");
                        config.Game.SCORE_BOARD.Score += 20;
                        bullet.Reset();
                        cloud.Reset();
                    }
                });
            }

        }

        public Main(): void {
            this.addChild(this._ocean);

            this.addChild(this._island);

            this.addChild(this._plane);

            this._bulletManager.AddBulletsToScene(this);

            for (const cloud of this._clouds) {
                this.addChild(cloud);
            }

            this.addChild(this._scoreBoard.LivesLabel);

            this.addChild(this._scoreBoard.ScoreLabel);
        }

        public Clean(): void {
            this._plane.engineSound.stop();
            this.removeAllChildren();
        }


    }


}