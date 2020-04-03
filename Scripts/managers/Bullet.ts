module managers
{
    export class Bullet 
    {
        // PRIVATE INSTANCE MEMBERS
        private _bulletNumber: number;
        public _bulletPool: Array<objects.Bullet>;
        public static firingBullet:Array<objects.Bullet>;
        
        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {

            this._buildBulletPool();
        }

        // PRIVATE METHODS
        private _buildBulletPool():void
        {
            // initialize bullet number
            this._bulletNumber = config.Game.AMMO;

            // create an empty container
            this._bulletPool = new Array<objects.Bullet>();

            for (let count = 0; count < this._bulletNumber; count++) {
                let bullet = new objects.Bullet();
                this._bulletPool.push(bullet);
            }
        }

        // PUBLIC METHODS

        public AddBulletsToScene(scene:objects.Scene)
        {
            this._bulletPool.forEach(bullet => {
                scene.addChild(bullet);
            });
        }


        public GetBullet():objects.Bullet
        {
            // remove the bullet from the front of the pool
            let bullet = this._bulletPool.shift();

            bullet.isActive = true;
            config.Game.SCORE_BOARD.Ammo-=1;
            // push the bullet to the back of the pool
            this._bulletPool.push(bullet);
            // return a reference to the active bullet
            return bullet;
        }

        public Update()
        {
            this._bulletPool.forEach(bullet => {
                bullet.Update();
            });
            Bullet.firingBullet= this._bulletPool;
        }
    }
}