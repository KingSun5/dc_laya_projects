module dc
{
    /**
     * 声音管理器
     * @author hannibal
     * @time 20174-7-8
     */
    export class SoundManager
    {
        private static instance:SoundManager = null;
        public static get Instance():SoundManager
        {
            if(!this.instance)this.instance = new SoundManager();
            return this.instance;
        }

        public Setup():void
        {

        }

        public Destroy():void
        {

        }

        public Tick(elapse:number, game_frame:number):void
        {
            
        }
    }
}