module objects
{
    export class Supply extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _verticalSpeed?:number;
        private _activeTime: number =0;
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
        
        protected _checkTime(): void 
        {
            if(this.isActive== true){
                this._activeTime++;
            }
            if(this._activeTime>=300){
                if(this._activeTime%40==20){
                    this.alpha=0.5;
                }
                if(this._activeTime%40==0){
                    this.alpha=1;
                }
            }
            if(this._activeTime==500){
                this.Reset();
            }
        }     
        
        
        // PUBLIC METHODS
        public Start(): void 
        {
            this.isActive=false;
            this.type = enums.GameObjectType.SUPPLY;
            this.position = new Vector2(-1000,-1000);
            this.Reset();
        }
        
        public Update(): void 
        {
            this._checkTime();
        }
        
        public Reset(): void 
        {
            this.alpha=1;
            this._activeTime=0;
            this.isActive=false;
            this.position = new Vector2(-1000,-1000);
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
            
        }

        
    }
}