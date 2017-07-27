module dc
{
    /**
     * 战斗场景
     * @author hannibal
     * @time 2017-7-14
     */
	export class BattleScene extends BaseScene
	{
        private m_Terrain:Terrain = null;

        public OnEnter(type:eSceneType, scene_id:number, info:any):void
        {
            super.OnEnter(type, scene_id, info);
            Log.Info("enter battle scene");

            UIShowController.CloseAll([]);
            this.m_Terrain = new Terrain();
            this.m_Terrain.Setup(0);

            UnitAIManager.Instance.CreateMainPlayer();
        }

        public OnExit()
        {
            Log.Info("exit battle scene");
            if(this.m_Terrain)
            {
                this.m_Terrain.Destroy();
                this.m_Terrain = null;
            }
            super.OnExit();
        }

        public Update():void
        {            
            if(this.m_Terrain)
            {
                this.m_Terrain.Update();
            }
            super.Update();
        }

		private BuildLoadResource():void
		{

		}

        protected RegisterEvent():void
        {
			super.RegisterEvent();
        }
        protected UnRegisterEvent():void
        {
			super.UnRegisterEvent();
        }

        protected OnResourceLoadComplate():void
        {
			super.OnResourceLoadComplate();
        }
	}
}