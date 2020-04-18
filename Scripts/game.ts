//IIFE - Immediately Invoked Function Expression
//means -> self-executing anonymous function
let Game = (function(){

    // variable declarations
    let canvas:HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    let stage:createjs.Stage;
    
    let currentSceneState:scenes.State;
    let currentScene: objects.Scene;

    let assets: createjs.LoadQueue;

    let textureAtlas: createjs.SpriteSheet;
    let oceanAtlas: createjs.SpriteSheet;

    let assetManifest = 
    [
        {id:"ocean", src:"./Assets/images/road.png"},
        {id:"atlas", src:"./Assets/sprites/atlas.png"},
        {id:"engine", src:"./Assets/audio/engine.ogg"},
        {id:"yay", src:"./Assets/audio/yay.ogg"},
        {id:"thunder", src:"./Assets/audio/thunder.ogg"},
    ];

    let spriteData =
    {

        "images": {},
        "frames": [
            [1, 1, 226, 178, 0, 0, 0],
            [229, 1, 150, 50, 0, 0, 0],
            [381, 1, 16, 16, 0, 0, 0],
            [229, 53, 150, 50, 0, 0, 0],
            [229, 105, 150, 50, 0, 0, 0],
            [229, 157, 150, 50, 0, 0, 0],
            [1, 181, 150, 50, 0, 0, 0],
            [153, 181, 65, 65, 0, 0, 0],
            [1, 233, 150, 50, 0, 0, 0],
            [220, 209, 150, 50, 0, 0, 0],
            [153, 248, 65, 65, 0, 0, 0],
            [1, 285, 150, 50, 0, 0, 0],
            [1, 337, 60, 60, 0, 0, 0],
            [63, 337, 60, 60, 0, 0, 0],
            [125, 337, 60, 60, 0, 0, 0],
            [187, 315, 65, 65, 0, 0, 0],
            [254, 261, 65, 65, 0, 0, 0],
            [254, 328, 62, 63, 0, 0, 0],
            [318, 328, 60, 60, 0, 0, 0],
            [321, 261, 60, 60, 0, 0, 0]
        ],
        
        "animations": {
            "cloud": { "frames": [0] },
            "backButton": { "frames": [1] },
            "bullet": { "frames": [2] },
            "button": { "frames": [3] },
            "easyButton": { "frames": [4] },
            "hardButton": { "frames": [5] },
            "nextButton": { "frames": [6] },
            "placeholder": { "frames": [7] },
            "normalButton": { "frames": [8] },
            "restartButton": { "frames": [9] },
            "plane1": { "frames": [10] },
            "startButton": { "frames": [11] },
            "agent": { "frames": [12] },
            "bullet1": { "frames": [13] },
            "bullet2": { "frames": [14] },
            "plane2": { "frames": [15] },
            "plane3": { "frames": [16] },
            "island": { "frames": [17] },
            "bullet3": { "frames": [18] },
            "enemy": { "frames": [19] }
        }
        
        };

    let oceanData = 
    {
        "images": {},
        "frames": [
            [0, 0, 640, 1200, 0, 0, 0],
        ],
        "animations": {
            "ocean": { "frames": [0] },
        }
    }


    function Preload():void
    {
        assets = new createjs.LoadQueue(); // asset container
        config.Game.ASSETS = assets; // make a reference to the assets in the global config
        assets.installPlugin(createjs.Sound); // supports sound preloading
        assets.loadManifest(assetManifest);
        assets.on("complete", Start);
    }

    /**
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
     */
    function Start():void
    {
        console.log(`%c Game Started!`, "color: blue; font-size: 20px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = config.Game.FPS;
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);

        spriteData.images = [assets.getResult("atlas")];
        textureAtlas = new createjs.SpriteSheet(spriteData);
        config.Game.TEXTURE_ATLAS = textureAtlas;

        oceanData.images = [assets.getResult("ocean")];
        oceanAtlas = new createjs.SpriteSheet(oceanData);
        config.Game.OCEAN_ATLAS = oceanAtlas;
        
        currentSceneState = scenes.State.NO_SCENE;
        config.Game.SCENE = scenes.State.START;
    }

    /**
     * This function is triggered every frame (16ms)
     * The stage is then erased and redrawn 
     */
    function Update():void
    {
        if(currentSceneState != config.Game.SCENE)
        {
            Main();
        }

        currentScene.Update();
        


        stage.update();
    }

    /**
     * This is the main function of the Game (where all the fun happens)
     *
     */
    function Main():void
    {
        console.log(`%c Scene Switched...`, "color: green; font-size: 16px;");

        // clean up
        if(currentSceneState != scenes.State.NO_SCENE)
        {
            currentScene.Clean();
            stage.removeAllChildren();
        }

        // switch to the new scene

        switch(config.Game.SCENE)
        {
            case scenes.State.START:
                console.log("switch to Start Scene");
                currentScene = new scenes.Start(); 
                break;
            case scenes.State.PLAY:
                console.log("switch to Play Scene");
                currentScene = new scenes.Play(); 
                break;
            case scenes.State.END:
                console.log("switch to End Scene");
                currentScene = new scenes.End(); 
                break;
        }

        currentSceneState = config.Game.SCENE;
        stage.addChild(currentScene);

    }

    window.addEventListener('load', Preload);


})();