"use strict";
//IIFE - Immediately Invoked Function Expression
//means -> self-executing anonymous function
var Game = (function () {
    // variable declarations
    var canvas = document.getElementsByTagName('canvas')[0];
    var stage;
    var currentSceneState;
    var currentScene;
    var assets;
    var textureAtlas;
    var oceanAtlas;
    var assetManifest = [
        { id: "ocean", src: "./Assets/images/road.png" },
        { id: "atlas", src: "./Assets/sprites/atlas.png" },
        { id: "engine", src: "./Assets/audio/engine.ogg" },
        { id: "yay", src: "./Assets/audio/yay.ogg" },
        { id: "thunder", src: "./Assets/audio/thunder.ogg" },
    ];
    var spriteData = {
        "images": {},
        "frames": [
            [1, 1, 226, 178, 0, 0, 0],
            [229, 1, 65, 65, 0, 0, 0],
            [296, 1, 65, 65, 0, 0, 0],
            [229, 68, 65, 65, 0, 0, 0],
            [296, 68, 65, 65, 0, 0, 0],
            [229, 135, 62, 63, 0, 0, 0],
            [293, 135, 60, 60, 0, 0, 0],
            [293, 197, 60, 60, 0, 0, 0],
            [1, 259, 60, 60, 0, 0, 0],
            [1, 200, 150, 50, 0, 0, 0],
            [1, 181, 16, 16, 0, 0, 0],
            [153, 181, 60, 60, 0, 0, 0],
            [215, 200, 60, 60, 0, 0, 0],
            [63, 252, 150, 50, 0, 0, 0],
            [215, 262, 150, 50, 0, 0, 0],
            [63, 304, 150, 50, 0, 0, 0],
            [215, 314, 150, 50, 0, 0, 0]
        ],
        "animations": {
            "cloud": { "frames": [0] },
            "placeholder": { "frames": [1] },
            "plane1": { "frames": [2] },
            "plane2": { "frames": [3] },
            "plane3": { "frames": [4] },
            "island": { "frames": [5] },
            "agent": { "frames": [6] },
            "bullet1": { "frames": [7] },
            "bullet2": { "frames": [8] },
            "backButton": { "frames": [9] },
            "bullet": { "frames": [10] },
            "bullet3": { "frames": [11] },
            "enemy": { "frames": [12] },
            "button": { "frames": [13] },
            "nextButton": { "frames": [14] },
            "restartButton": { "frames": [15] },
            "startButton": { "frames": [16] }
        }
    };
    var oceanData = {
        "images": {},
        "frames": [
            [0, 0, 640, 1200, 0, 0, 0],
        ],
        "animations": {
            "ocean": { "frames": [0] },
        }
    };
    function Preload() {
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
    function Start() {
        console.log("%c Game Started!", "color: blue; font-size: 20px; font-weight: bold;");
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
    function Update() {
        if (currentSceneState != config.Game.SCENE) {
            Main();
        }
        currentScene.Update();
        stage.update();
    }
    /**
     * This is the main function of the Game (where all the fun happens)
     *
     */
    function Main() {
        console.log("%c Scene Switched...", "color: green; font-size: 16px;");
        // clean up
        if (currentSceneState != scenes.State.NO_SCENE) {
            currentScene.Clean();
            stage.removeAllChildren();
        }
        // switch to the new scene
        switch (config.Game.SCENE) {
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
//# sourceMappingURL=game.js.map