module dc
{
    /**
     * 场景管理器
     * @author hannibal
     * @time 20174-7-13
     */
	export class SceneManager
	{
        private m_CurScene:BaseScene = null;
	    private m_CurSceneID:number = 0;

        private static instance:SceneManager = null;
        public static get Instance():SceneManager
        {
            if(!this.instance)this.instance = new SceneManager();
            return this.instance;
        }
   
        public Setup():void
        {
            this.RegisterEvent();
        }

        public Destroy():void
        {
            this.UnRegisterEvent();
        }

        public Tick(elapse:number, game_frame:number):void
        {
            if(this.m_CurScene != null)
            {
                this.m_CurScene.Update();
            }
        }

        private RegisterEvent():void
        {
            EventController.AddEventListener(EventID.CHANGE_SCENE, this, this.OnChangeScene);
        }
        private UnRegisterEvent():void
        {
            EventController.RemoveEventListener(EventID.CHANGE_SCENE, this, this.OnChangeScene);
        }
        private OnChangeScene(evt:EventArgs):void
        {
            let info:SceneTransmitInfo = evt.Get(0);
            let type:eSceneType = SceneID.GetSceneTypeByID(info.sceneId);
            this.GotoScene(type, info.sceneId);
        }
        //～～～～～～～～～～～～～～～～～～～～～～～场景切换~～～～～～～～～～～～～～～～～～～～～～～～//   
        /**跳转场景*/
        public GotoScene(type:eSceneType, scene_id:number):void
        {
            this.OnBeginChangeScene(scene_id);
            
            //场景切换
            this.LeaveScene();
            this.EnterScene(type, scene_id);

            this.OnEndChangeScene();
        }
        /**退出当前场景*/
        public ExitCurScene():void
        {
            this.LeaveScene();
        }
        /**进入场景*/
        private EnterScene(type:eSceneType, scene_id:number):void
        {
            this.m_CurSceneID = scene_id;
            let scene_name:string = SceneID.ListSceneName[type];
            //切换
            if(scene_name.length > 0)
            {
                switch(type)
                {
                case eSceneType.LOADER:
                    this.m_CurScene = new LoaderScene();
                    break;
                case eSceneType.CITY:
                    this.m_CurScene = new CityScene();
                    break;
                case eSceneType.BATTLE:
                    this.m_CurScene = new BattleScene();
                    break;
                }
                if(this.m_CurScene != null)
                {
                    this.m_CurScene.OnEnter(type, scene_id, null);
                }
            }
        }
        private LeaveScene():void
        {
            if(this.m_CurScene != null)
            {
                this.m_CurScene.OnExit();
                this.m_CurScene = null;
            }
        }
        /**开始切换场景*/
        private OnBeginChangeScene(scene_id:number):void
        {
        }
        private OnEndChangeScene():void
        {
        }          
	}
}