module dc
{
    /**
     * 游戏主逻辑
     * @author hannibal
     * @time 20174-7-9
     */
    export class Procedure extends Singleton
    {
        private static instance:Procedure = null;
        public static get Instance():Procedure
        {
            if(!this.instance)this.instance = new Procedure();
            return this.instance;
        }

        public Setup():void
        {
            Log.Info("Procedure::setup");
            this.InitGameManager();
            Laya.timer.frameLoop(1, this, this.MainLoop);
        }

        public Destroy():void
        {
            this.ReleaseGameManager();
        }

        public StartGame():void
        {
            GameApp.Instance.StartGame();    
        }

        private MainLoop():void
        {
            this.Tick(Time.deltaTime,Time.frameCount);
        }

        private InitGameManager():void
        {
            Framework.Instance.Setup(Laya.stage);
            
            GameApp.Instance.Setup();
            SceneManager.Instance.Setup();
        }
        private ReleaseGameManager():void
        {
            GameApp.Instance.Destroy();
            SceneManager.Instance.Destroy();

            Framework.Instance.Destroy();
        }

        private Tick(elapse:number, game_frame:number):void
        {
            Framework.Instance.Tick(elapse, game_frame);

            GameApp.Instance.Tick(elapse, game_frame);
            SceneManager.Instance.Tick(elapse, game_frame);
        }
    }
}