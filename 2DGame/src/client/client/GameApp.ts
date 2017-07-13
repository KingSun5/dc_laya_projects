module dc
{
    /**
     * 游戏逻辑层管理器
     * @author hannibal
     * @time 20174-7-9
     */
    export class GameApp extends Singleton
    {        
        private static instance:GameApp = null;
        public static get Instance():GameApp
        {
            if(!this.instance)this.instance = new GameApp();
            return this.instance;
        }
   
        public Setup():void
        {
            this.RegisterEvent();
            this.InitScene();
            this.InitData();
            this.InitGUI();
        }

        public Destroy():void
        {
            this.ReleaseGUI();
            this.ReleaseData();
            this.ReleaseScene();
            this.UnRegisterEvent();
        }

        public Tick(elapse:number, game_frame:number):void
        {
        }

        private RegisterEvent():void
        {
        }
        private UnRegisterEvent():void
        {
        }
        
        public StartGame():void
        {
        }
        //～～～～～～～～～～～～～～～～～～～～～～～初始化游戏～～～～～～～～～～～～～～～～～～～～～～～//
        private InitScene():void
        {
            Laya.Stat.show(0, 0);
            Laya.stage.frameRate = Laya.Stage.FRAME_MOUSE;
            Laya.stage.size(640,960);
            //Laya.stage.fullScreenEnabled = true;

            Laya.stage.scaleMode = laya.display.Stage.SCALE_EXACTFIT;
            //设置横竖屏
            Laya.stage.screenMode = laya.display.Stage.SCREEN_VERTICAL;
      
            //设置水平对齐
            Laya.stage.alignH =laya.display.Stage.ALIGN_CENTER;
            //设置垂直对齐
            Laya.stage.alignV = laya.display.Stage.ALIGN_MIDDLE;
        }
        private ReleaseScene():void
        {
        }
        private InitData():void
        {
            ConfigManger.Instance.Setup();
            DataManager.Instance.Setup();
        }
        private ReleaseData():void
        {
            ConfigManger.Instance.Destroy();
            DataManager.Instance.Destroy();
        }
        private InitGUI():void
        {
            UILoaderRegister.Setup();
            UIShowController.Setup();
        }
        private ReleaseGUI():void
        {
            UILoaderRegister.Destroy();
            UIShowController.Destroy();
        }
        //～～～～～～～～～～～～～～～～～～～～～～～事件～～～～～～～～～～～～～～～～～～～～～～～//
        /**玩家自身数据已经下发，初次进入游戏状态*/
        private OnFirstEnterGame():void
        {

        }
        private OnNetConnected():void
        {

        }
        private OnNetDisconnect():void
        {

        }
    }
}