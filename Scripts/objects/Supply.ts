module objects
{
    export class Supply extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _verticalSpeed?:number;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super(config.Game.TEXTURE_ATLAS, "bullet1", new Vector2(), true);
            
            this.Start();
        }

        // PRIVATE METHODS

        protected _checkBounds(): void 
        {
            if(this.y >= config.Game.SCREEN_HEIGHT + this.height)
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
            this.type = enums.GameObjectType.SUPPLY;
            this._verticalSpeed = 5; // 5 px per frame
            this.velocity = new Vector2(0, this._verticalSpeed);
            this.Reset();
        }
        
        public Update(): void 
        {
            this._move();
            this._checkBounds();
        }
        
        public Reset(): void 
        {
            let randomX = util.Mathf.RandomRange(this.halfWidth, config.Game.SCREEN_WIDTH - this.halfWidth);
            let randomSupply= Math.floor(util.Mathf.RandomRange(1,10));
            console.log(randomSupply);
            if(randomSupply<6)
            {
                this.gotoAndPlay("bullet1");
            }
            else if(randomSupply<9)
            {
                this.gotoAndPlay("bullet2");
            }
            else if(randomSupply<11)
            {
                this.gotoAndPlay("bullet3");
            }
            this.position = new Vector2(randomX, -this.height);
        }

        
    }
}