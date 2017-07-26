module dc
{
    /**
     * 地图表现
     * @author hannibal
     * @time 2017-7-26
     */
	export class TerrainView extends LayaSprite
	{
		public Show(map_id:number):void
		{	
			ResourceManager.Instance.LoadRes("res/image/map/1001.jpg", LayaLoader.IMAGE, LayaHandler.create(this, this.OnLoadComplete));
		}

		private OnLoadComplete(url:string):void
		{
			let tex:LayaTexture = ResourceManager.Instance.GetRes(url);
			assertNullOrNil(tex);
			this.graphics.drawTexture(tex);
			this.size(tex.width, tex.height);
			SceneLayers.terrain.addChild(this);
		}
	}
}