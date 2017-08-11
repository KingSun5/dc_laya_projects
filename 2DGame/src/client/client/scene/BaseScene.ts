module dc
{
    /**
     * 场景基类
     * @author hannibal
     * @time 2017-7-13
     */
	export class BaseScene
	{
        protected m_SceneId:number;

        public OnEnter(type:eSceneType, scene_id:number, info:any):void
        {
            this.RegisterEvent();
        }

        public OnExit()
        {
            UIShowController.CloseAll([]);
            ObjectManager.Instance.RemoveAll();
            SoundManager.Instance.RemoveAll();
            SceneLayers.Clear();
            this.UnRegisterEvent();
        }

        public Update():void
        {

        }

        protected RegisterEvent():void
        {
        }
        protected UnRegisterEvent():void
        {
        }

        protected OnResourceLoadComplate():void
        {

        }
	}
}