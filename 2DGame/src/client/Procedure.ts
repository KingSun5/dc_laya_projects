module dc
{
    /**
     * 游戏主逻辑
     * @author hannibal
     * @time 2017-7-9
     */
    export class Procedure extends Singleton
    {
        private static instance:Procedure = null;
        public static get Instance():Procedure
        {
            if(!this.instance)this.instance = new Procedure();
            return this.instance;
        }
        /**
         * 初始化
        */
        public Setup():void
        {
            UIID.DEFAULT_WIDTH = 640;
            UIID.DEFAULT_HEIGHT = 960;
            Laya.init(UIID.DEFAULT_WIDTH,UIID.DEFAULT_HEIGHT, Laya.WebGL);
            
            Log.Info("Procedure::setup");
            this.InitGameManager();
        }
        /**
         * 销毁
        */
        public Destroy():void
        {
            Laya.timer.clearAll(this);
            this.ReleaseGameManager();
        }
        /**
         * 开始游戏，逻辑开始执行
        */
        public StartGame():void
        {
            GameApp.Instance.StartGame();    
        }

        private InitGameManager():void
        {
            Framework.Instance.Setup(Laya.stage, LayaHandler.create(this, this.Tick, null, false));
            GameApp.Instance.Setup();
            SceneManager.Instance.Setup();
            LoadViewManager.Instance.Setup();
            UILoaderRegister.Setup();
            //add here
            
        }
        private ReleaseGameManager():void
        {
            SceneManager.Instance.Destroy();
            LoadViewManager.Instance.Destroy();
            UILoaderRegister.Destroy();
            //add here

            GameApp.Instance.Destroy();
            Framework.Instance.Destroy();
        }

        private Tick(elapse:number, game_frame:number):void
        {
            GameApp.Instance.Tick(elapse, game_frame);
            SceneManager.Instance.Tick(elapse, game_frame);
        }
    }
}