module dc
{
    /**
     * UI管理器
     * @author hannibal
     * @time 20174-7-9
     */	
	export class UIManager extends Singleton
	{
        private static instance:UIManager = null;
        public static get Instance():UIManager
        {
            if(!this.instance)this.instance = new UIManager();
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