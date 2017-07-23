module dc
{
    /**
     * 主城场景
     * @author hannibal
     * @time 2017-7-14
     */
	export class CityScene extends BaseScene
	{
        public OnEnter(type:eSceneType, scene_id:number, info:any):void
        {
            super.OnEnter(type, scene_id, info);
        }

        public OnExit()
        {
            super.OnExit();
        }

        public Update():void
        {
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