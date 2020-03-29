module objects
{
    export class Plane extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        
        private _engineSound : createjs.AbstractSoundInstance;
        private _bulletSpawn: objects.Vector2;
        private _horizontalSpeed: number;
        private _verticalSpeed: number;
        // PUBLIC PROPERTIES
        public get engineSound() : createjs.AbstractSoundInstance 
        {
            return this._engineSound;
        }

        // CONSTRUCTOR
        constructor()
        {
            super(config.Game.TEXTURE_ATLAS, "plane", 0, 0, true);

            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void 
        {
            // left boundary
            if(this.position.x <= this.halfWidth)
            {
                this.position = new Vector2(this.halfWidth, this.position.y);
            }

            // right boundary

            if(this.position.x >= config.Game.SCREEN_WIDTH - this.halfWidth)
            {
                this.position = new Vector2(config.Game.SCREEN_WIDTH - this.halfWidth, this.position.y);
            }

            // left boundary
            if(this.position.y <= this.halfHeight)
            {
                this.position = new Vector2(this.position.x, this.halfHeight);
            }

            // right boundary

            if(this.position.y >= config.Game.SCREEN_HEIGHT - this.halfHeight)
            {
                this.position = new Vector2(this.position.x,config.Game.SCREEN_HEIGHT - this.halfHeight);
            }
        }        

        private _move(): void
        {
            
            let pace = 4;
            

            // Keyboard Controls
            if(config.Game.KEYBOARD_MANAGER.MoveLeft){
                
                
                this.position.x-=pace;
                
                
            }
            if(config.Game.KEYBOARD_MANAGER.MoveRight){
                
                
                this.position.x+=pace;
                
                
            }
            if(config.Game.KEYBOARD_MANAGER.MoveDown){
                
                
                this.position.y+=pace;
                
                
            }
            if(config.Game.KEYBOARD_MANAGER.MoveUp){
                
               
                this.position.y-=pace;
                
                
            }
            this.position = new Vector2(this.position.x, this.position.y);
        }
        
        // PUBLIC METHODS
        public Start(): void 
        {
            this.type = enums.GameObjectType.PLANE;
            
            this._engineSound = createjs.Sound.play("engine");
            this._engineSound.loop = -1; // loop forever
            this._engineSound.volume = 0.1; // 10% volume
            this._horizontalSpeed = 10;
            this.position = new objects.Vector2(config.Game.SCREEN_WIDTH * 0.5, config.Game.SCREEN_HEIGHT * 0.5);
        }

        public Update(): void 
        {
            this._move();
            this._checkBounds();

            // fire bullets every 10 frames
            if(createjs.Ticker.getTicks() % 10 == 0)
            {
                if(config.Game.KEYBOARD_MANAGER.Fire)
                {
                    this.FireBullets();
                }
            }
            
        }

        public Reset(): void 
        {

        }

        public FireBullets(): void
        {
            let bullet = config.Game.BULLET_MANAGER.GetBullet();
            bullet.position = this._bulletSpawn;
        }

        
    }

}