module objects
{
    export class Bullet extends objects.GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _verticalSpeed?:number;
        private _horizontalSpeed?:number;
        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super(config.Game.TEXTURE_ATLAS, "bullet", new Vector2(), true);

            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void 
        {
            // check upper bounds
            if(this.position.x <= this.halfWidth||this.position.x >= config.Game.SCREEN_WIDTH - this.halfWidth||this.position.y <= this.halfHeight||this.position.y >= config.Game.SCREEN_HEIGHT - this.halfHeight)
            {
                this.Reset();
            }
        }

        private _move():void 
        {
            this.position = Vector2.add(this.position, this.velocity);
        }

        // PUBLIC METHODS
        public Start(): void 
        {
            this.type = enums.GameObjectType.BULLET;
            
            this.Reset();
        }

        public Update(): void 
        {
            if(this.isActive)
            {
                this._move();
                this._checkBounds();
            }
        }

        public Reset(): void 
        {
           this.position = new objects.Vector2(-1000, -1000);
           this.isActive = false;
        }
    }
}