module dc
{
    /**
     * 管理器
     * @author hannibal
     * @time 20174-7-6
     */
    export class Framework extends Singleton
    {        
        private static instance:Framework = null;
        public static get Instance():Framework
        {
            if(!this.instance)this.instance = new Framework();
            return this.instance;
        }

        public Setup():void
        {
            Time.Start();
            TimerManager.Instance.Setup();
            UIManager.Instance.Setup();
            ObjectManager.Instance.Setup();
            SoundManager.Instance.Setup();
            ResourceManager.Instance.Setup();
            EffectManager.Instance.Setup();
        }

        public Destroy():void
        {
            TimerManager.Instance.Destroy();
            UIManager.Instance.Destroy();
            ObjectManager.Instance.Destroy();   
            SoundManager.Instance.Destroy();    
            ResourceManager.Instance.Destroy();  
            EffectManager.Instance.Destroy();
        }

        public Tick(elapse:number, game_frame:number):void
        {
            TimerManager.Instance.Tick(elapse, game_frame);
            UIManager.Instance.Tick(elapse, game_frame);
            ObjectManager.Instance.Tick(elapse, game_frame);
            SoundManager.Instance.Tick(elapse, game_frame);
            ResourceManager.Instance.Tick(elapse, game_frame);
            EffectManager.Instance.Tick(elapse, game_frame);
        }
    }
}