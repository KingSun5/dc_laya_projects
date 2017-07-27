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
			this.m_MapId = map_id;
			this.m_TerrainView = new TerrainView();
			this.m_TerrainView.Setup(map_id);

			Scene2D.Instance.Setup(this.m_TerrainView, eCameraType.THIRD);
		}
		public Destroy():void
		{
			if(this.m_TerrainView)
			{
				this.m_TerrainView.Destroy();
				this.m_TerrainView.destroy();
				this.m_TerrainView = null;
			}
			Scene2D.Instance.Destroy();
		}
		public Update():void
		{
			if(Input.GetKeyDown(eKeyCode.A))
			{
				Log.Debug("KeyDown:A");
			}
			if(Input.GetKey(eKeyCode.A))
			{
				Log.Debug("KeyPress:A");
			}
			if(Input.GetKeyUp(eKeyCode.A))
			{
				Log.Debug("KeyUp:A");
			}
		}
	}
}