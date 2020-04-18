module scenes
{
    export class Start extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _welcomeLabel: objects.Label;
        private _instructionLabel: objects.Label;
        private _easyButton: objects.Button;
        private _normalButton: objects.Button;
        private _hardButton: objects.Button;
        private _ocean: objects.Ocean;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS
        public Start(): void 
        {
             //instantiate a new Text object
            this._welcomeLabel = new objects.Label("Agent Borris", "80px", "Consolas", "#FFFF00", 320, 180, true);
            this._instructionLabel = new objects.Label("Use mouse and space button to shoot enemy.\nDon't let enemy run away.\nBeware of running out of ammo.", "24px", "Consolas", "#BFF8FD", 320, 280, true);
            // buttons
             this._easyButton = new objects.Button("easyButton", 80, 430, true);
             this._normalButton = new objects.Button("normalButton", 320, 430, true);
             this._hardButton = new objects.Button("hardButton", 540, 430, true);

             this._ocean = new objects.Ocean();
            this.Main();
        }        
            
        public Update(): void 
        {
           this._ocean.Update();
        }
        
        public Main(): void 
        {
            this.addChild(this._ocean);
       
            this.addChild(this._welcomeLabel);

            this.addChild(this._instructionLabel);
        
            this.addChild(this._easyButton);

            this._easyButton.on("click", ()=>{
                config.Game.DIFFICULTY="easy";
                config.Game.CLOUD_NUM=2;
                config.Game.SCENE = scenes.State.PLAY;
            });
            
            this.addChild(this._normalButton);

            this._normalButton.on("click", ()=>{
                config.Game.DIFFICULTY="normal";
                config.Game.CLOUD_NUM=3;
                config.Game.SCENE = scenes.State.PLAY;
            });

            this.addChild(this._hardButton);

            this._hardButton.on("click", ()=>{
                config.Game.DIFFICULTY="hard";
                config.Game.CLOUD_NUM=4;
                config.Game.SCENE = scenes.State.PLAY;
            });

        }

        public Clean(): void{
            this.removeAllChildren();
        }

        
    }
}