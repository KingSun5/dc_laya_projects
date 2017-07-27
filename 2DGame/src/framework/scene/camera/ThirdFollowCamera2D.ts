module dc
{
    /**
     * 2d跟随相机
     * @author hannibal
     * @time 2017-7-26
     */
	export class ThirdFollowCamera2D extends Camera2D
	{		
        constructor()
        {
            super();
			this.m_CameraType = eCameraType.THIRD;
        }
        public Setup():void
		{
			super.Setup();
		}
		public Destroy():void
		{
            super.Destroy();
		}
		public Update():void
		{
            super.Update();
		}
		/**
		 * 设置相机位置，会触发滚屏
		 * @param x
		 * @param y
		 */		
		public UpdatePosition(x:number, y:number):void
		{
			var offsetX:number = 0;
			var offsetY:number = 0;
			
			offsetX = Viewport2D.Width*0.5 - (x+Scene2D.Instance.sceneOffsetX);
			offsetY = Viewport2D.Height*0.5 - (y+Scene2D.Instance.sceneOffsetY);
			
			//夹取到有效位置
			offsetX = Camera2D.clampOffsetX(offsetX);
			offsetY = Camera2D.clampOffsetY(offsetY);
			
			if(offsetX!=0 || offsetY!=0)
			{
				Scene2D.Instance.ScrollScene(Scene2D.Instance.sceneOffsetX, Scene2D.Instance.sceneOffsetY);
			}
		}
	}
}