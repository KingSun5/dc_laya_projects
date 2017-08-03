module dc
{
    /**
     * 地图
     * @author hannibal
     * @time 2017-7-26
     */
	export class Terrain
	{
		private m_MapId:number = 0;
		private m_TerrainView:TerrainView = null;

		public Setup(map_id:number):void
		{	
			this.RegisterEvent();
			this.m_MapId = map_id;
			this.m_TerrainView = new TerrainView();
			this.m_TerrainView.Setup(map_id);

		}
		public Destroy():void
		{
			if(this.m_TerrainView)
			{
				this.m_TerrainView.Destroy();
				this.m_TerrainView = null;
			}
			Scene2D.Instance.Destroy();
			this.UnRegisterEvent();
		}
		public Update():void
		{
		}

        private RegisterEvent():void
        {
			EventController.AddEventListener(EventID.TERRAIN_LOADED, this, this.OnLoadComplete);
        }
        private UnRegisterEvent():void
        {
			EventController.RemoveEventListener(EventID.TERRAIN_LOADED, this, this.OnLoadComplete);
        }
        
		private OnLoadComplete(evt:EventArgs):void
		{
			if(!this.m_TerrainView)return;
			SceneLayers.root.size(this.m_TerrainView.width, this.m_TerrainView.height);
			Scene2D.Instance.Setup(SceneLayers.root, eCameraType.THIRD);
		}
	}
}