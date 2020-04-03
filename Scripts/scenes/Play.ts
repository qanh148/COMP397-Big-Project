module scenes {
    export class Play extends objects.Scene {
        // PRIVATE INSTANCE MEMBERS
        private _ocean?: objects.Ocean;
        private _agent?: objects.Agent;
        private _supply?: objects.Supply;
        private _bullet?: objects.Bullet;

        private _enemy1: Array<objects.Enemy1>;

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
            this._agent = new objects.Agent();
            this._supply = new objects.Supply();

            // create the cloud array
            this._enemy1 = new Array<objects.Enemy1>(); // empty container

            // instantiating CLOUD_NUM clouds
            for (let index = 0; index < config.Game.CLOUD_NUM; index++) {
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
        }

        public Update(): void {
            this._ocean.Update();

            this._agent.Update();

            this._bulletManager.Update();

            this._supply.Update();

            if (managers.Collision.squaredRadiusCheck(this._agent, this._supply)) {
                console.log("Collision with Supply!");
                let yaySound = createjs.Sound.play("yay");
                yaySound.volume = 0.2;
                config.Game.SCORE_BOARD.Ammo += 10;

                if (config.Game.SCORE > config.Game.HIGH_SCORE) {
                    config.Game.HIGH_SCORE = config.Game.SCORE;
                }
            }


            this._enemy1.forEach(cloud => {
                cloud.Update();
                if(managers.Collision.squaredRadiusCheck(this._agent, cloud)){
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
                this._enemy1.forEach(cloud => {
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

            this.addChild(this._supply);

            this.addChild(this._agent);

            this._bulletManager.AddBulletsToScene(this);

            for (const cloud of this._enemy1) {
                this.addChild(cloud);
            }

            this.addChild(this._scoreBoard.LivesLabel);

            this.addChild(this._scoreBoard.ScoreLabel);

            this.addChild(this._scoreBoard.ammoLabel);
        }

        public Clean(): void {
            this._agent.engineSound.stop();
            this.removeAllChildren();
        }


    }


}