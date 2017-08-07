module dc
{
    /**
     * 游戏逻辑层管理器
     * @author hannibal
     * @time 2017-7-9
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

        public Tick():void
        {
        }

        private RegisterEvent():void
        {

        }
        private UnRegisterEvent():void
        {

        }
        
        public Start():void
        {
            EventController.DispatchEvent(EventID.BEGIN_GAME);
            this.LoadCoreResource();
        }
        /**
         * 需要加载的核心资源，资源尽量不要放在这加载，不会显示加载进度界面
         */
        private LoadCoreResource():void
        {
            Log.Info("开始加载核心资源");
            let assets:Array<any> = [];
            assets.push({url:"data/bg/image_loading_bg.jpg", type:LayaLoader.IMAGE});//这个是加载界面需要的资源，需要提前加载
            assets.push({url:"res/atlas/ui/common.json", type:LayaLoader.ATLAS});
            ResourceManager.Instance.LoadArrayRes(assets, LayaHandler.create(this, this.LoadMustResource), eLoadViewType.None);
        }
        private LoadMustResource():void
        {
            Log.Info("开始加载必须资源");
            let assets:Array<any> = [];
            assets.push({url:"res/atlas/comp.json", type:LayaLoader.ATLAS});
            assets.push({url:"res/atlas/ui/main.json", type:LayaLoader.ATLAS});
            assets = assets.concat(ConfigManger.Instance.PreLoadRes);
            assets = assets.concat(LangManager.Instance.PreLoadRes);
            ResourceManager.Instance.LoadArrayRes(assets, LayaHandler.create(this, this.OnDownloadComplate), eLoadViewType.None);
        }
        //～～～～～～～～～～～～～～～～～～～～～～～初始化游戏～～～～～～～～～～～～～～～～～～～～～～～//
        private InitScene():void
        {
            //Laya.Stat.show(0, 0);
            //调试面板
            //Laya.DebugPanel.init();
            //调用DebugTool调试面板
            //Laya.DebugTool.init();

            //Laya.stage.frameRate = Laya.Stage.FRAME_MOUSE;
            Laya.stage.size(UIID.DEFAULT_WIDTH,UIID.DEFAULT_HEIGHT);
            //Laya.stage.fullScreenEnabled = true;

            Laya.stage.scaleMode = laya.display.Stage.SCALE_EXACTFIT;
            //设置横竖屏
            Laya.stage.screenMode = laya.display.Stage.SCREEN_VERTICAL;

            //设置水平对齐
            Laya.stage.alignH =laya.display.Stage.ALIGN_CENTER;
            //设置垂直对齐
            Laya.stage.alignV = laya.display.Stage.ALIGN_MIDDLE;

            SceneLayers.Setup();
        }
        private ReleaseScene():void
        {
            SceneLayers.Destroy();
        }
        private InitData():void
        {
            DataManager.Instance.Init();
            LangManager.Instance.Init();
            ConfigManger.Instance.Init();
        }
        private ReleaseData():void
        {
            DataManager.Instance.Release();
            ConfigManger.Instance.Release();
            LangManager.Instance.Release();
        }
        private InitGUI():void
        {
        }
        private ReleaseGUI():void
        {
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
        /**资源加载完成*/
        private OnDownloadComplate(args:Array<string>):void
        {
            Log.Info("必须资源更新完成");
            LangManager.Instance.SwitchLang(eLangType.en);
            ConfigManger.Instance.LoadAll();
            LangManager.Instance.LoadAll();

            //显示登陆界面
            UIShowController.Show(GUIID.LOGIN, 111,1112);
            
            //new GameMain();
            // //压力测试
            // //UnitAIManager.Instance.CreateTestRobot();

            // let info:SceneTransmitInfo = new SceneTransmitInfo();
            // info.sceneId = 1000;
            // EventController.DispatchEvent(EventID.CHANGE_SCENE, info);

            //this.Test3D();
        }

        private Test3D():void
        {
            Scene3D.Instance.Setup();
            //Scene3D.Instance.CreateScene("");
            Scene3D.Instance.CreateScene("res/scene/Arena/Arena.ls");
            Scene3D.Instance.CreateMainCamera(new Vector3(0, 3, 3), new Vector3(0, 0, 0), 0, 0.1, 100);
            Scene3D.Instance.CreateMainLight(new Vector3(1, -1, 0),new Vector3(0.6, 0.6, 0.6),new Vector3(1.6, 1.6, 1.6),new Vector3(0.6, 0.6, 0.6));
            Scene3D.Instance.SetSkybox("res/skyBox/skyBox2/skyCube.ltc");
            
            // //添加自定义模型
            // var box: Laya.MeshSprite3D = new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 1));
            // Scene3D.Instance.AddChild(box);
            // box.transform.rotate(new Vector3(0, 45, 0), false, false);
            // var material: StandardMaterial = new StandardMaterial();
            // material.diffuseTexture = Texture2D.load("res/image/1.png");
            // box.meshRender.material = material;

            // var vect:Laya.Vector3 = new Laya.Vector3(1,1,0);
            // //每10毫秒旋转一次
            // Laya.timer.loop(10,null,function(){
            //     box.transform.rotate(vect,true,false);
            // });
        }
    }
}