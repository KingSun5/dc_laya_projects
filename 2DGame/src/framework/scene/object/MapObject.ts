module dc
{
    /**
     * 地图对象
     * @author hannibal
     * @time 20174-7-12
     */
	export class MapObject extends RenderObject
	{
		protected m_Direction:Vector2;	//移动方向
		protected m_MoveSpeed:number;	//移动速度

		protected m_RowIndex:number;	//所在地图的行
		protected m_ColIndex:number;	//所在地图的列

		protected m_PathGrid:PathGrid;	//对象所在的格子


        constructor()
        {
			super();
        }

        public Init():void
        {
			super.Init();

			this.m_Direction = Vector2.zero;
			this.m_MoveSpeed = 0;
           	this.m_RowIndex = -1;
           	this.m_ColIndex = -1;
			this.m_PathGrid = null;
        }

        public Setup(info:any):void
        {
			super.Setup(info);
        }

        public Destroy():void
        {
			if(this.m_RootNode != null)
			{
				this.m_RootNode.removeSelf();
				this.m_RootNode = null;
			}
			super.Destroy();
        }

        public Update(elapse:number, game_frame:number):boolean
        {
            return super.Update(elapse, game_frame);     
        }
		/**位置*/
		public SetPosition(x:number, y:number):void
		{
			super.SetPosition(x, y);
			
			EventController.DispatchEvent(ObjectEvent.MAP_POSITION, this.m_ObjectGUID, this.x, this.y);
		}
		/**格子改变*/
		protected OnMapGridChangle(new_row:number, new_col:number):void
		{
			
		}
	}
}