module dc
{
    /**
     * 特效管理器
     * @author hannibal
     * @time 20174-7-11
     */
	export class EffectManager extends Singleton
	{
        private static instance:EffectManager = null;
        public static get Instance():EffectManager
        {
            if(!this.instance)this.instance = new EffectManager();
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