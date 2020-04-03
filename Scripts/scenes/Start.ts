module scenes
{
    export class Start extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _welcomeLabel: objects.Label;
        private _instructionLabel: objects.Label;
        private _startButton: objects.Button;
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
            this._instructionLabel = new objects.Label("use mouse and space button to shoot enemy", "20px", "Consolas", "#FF0000", 320, 280, true);
            // buttons
             this._startButton = new objects.Button("startButton", 320, 430, true);

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
        
            this.addChild(this._startButton);

            this._startButton.on("click", ()=>{
                config.Game.SCENE = scenes.State.PLAY;
            });

        }

        public Clean(): void{
            this.removeAllChildren();
        }

        
    }
}