module objects
{
    export class Enemy1 extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _verticalSpeed?:number;
        private _horizontalSpeed?:number;
        private _frame : number=0;
        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super(config.Game.TEXTURE_ATLAS, "enemy", new Vector2(), true);

            this.Start();
        }

        // PRIVATE METHODS

        protected _checkBounds(): void 
        {
            if(this.y >= config.Game.SCREEN_HEIGHT + this.height)
            {
                this.Reset();
            }
            if(this.position.x <= this.halfWidth)
            {
                this._horizontalSpeed = util.Mathf.RandomRange(0, 3);
            }
            if(this.position.x >= config.Game.SCREEN_WIDTH - this.halfWidth)
            {
                this._horizontalSpeed = util.Mathf.RandomRange(-3, 0);
            }
        }       
        
        private _move():void
        {
            this.position = Vector2.add(this.position, this.velocity);
        }
        
        // PUBLIC METHODS
        public Start(): void 
        {
            this.type = enums.GameObjectType.ENEMY1;
            this.alpha = 1; // 100% transparent
            this.rotation= 180
            this.Reset();
        }
        
        public Update(): void 
        {
            this._move();
            this._checkBounds();
            this._frame+=1;
            if(this._frame%40==0){
                this._horizontalSpeed = util.Mathf.RandomRange(-3, 3);
            }
            
            this.velocity = new Vector2(this._horizontalSpeed, this._verticalSpeed);
        }
        
        public Reset(): void 
        {
            this._verticalSpeed = util.Mathf.RandomRange(3, 5);
            this._horizontalSpeed = util.Mathf.RandomRange(-2, 2);
            this.velocity = new Vector2(this._horizontalSpeed, this._verticalSpeed);
            let randomX = util.Mathf.RandomRange(this.halfWidth, config.Game.SCREEN_WIDTH - this.halfWidth);
            let randomY = util.Mathf.RandomRange(-this.height * 3, -this.height);
            this.position = new Vector2(randomX, randomY);
        }

        
    }
}