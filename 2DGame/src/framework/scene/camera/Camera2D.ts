module dc
{
    /**
     * 2d相机
     * @author hannibal
     * @time 2017-7-9
     */
	export class Camera2D
	{
		protected m_CameraType:eCameraType;

		constructor()
		{
		}

		public Setup():void
		{
		}
		public Destroy():void
		{

		}
		public Update():void
		{

		}
		/**
		 * 设置相机位置，会触发滚屏
		 * @param x
		 * @param y
		 */		
		public UpdatePosition(x:number, y:number):void
		{
			
		}
		public get cameraType():eCameraType
		{
			return this.m_CameraType;
		}
		
		/**
		 * 夹取到有效位置 
		 * @param offsetX
		 * @return 
		 * 
		 */		
		public static clampOffsetX(offsetX:number):number
		{
			if(Scene2D.Instance.sceneOffsetX + offsetX>=0)
			{
				offsetX = -Scene2D.Instance.sceneOffsetX;
			}
			else if((Scene2D.Instance.sceneOffsetX + offsetX)+Scene2D.Instance.sceneWidth <= Viewport2D.clientWidth)
			{
				offsetX = Viewport2D.clientWidth-Scene2D.Instance.sceneWidth-Scene2D.Instance.sceneOffsetX;
			}
			return offsetX;
		}
		/**
		 * 夹取到有效位置 
		 * @param offsetY
		 * @return 
		 * 
		 */	
		public static clampOffsetY(offsetY:number):number
		{
			if(Scene2D.Instance.sceneOffsetY + offsetY>=0)
			{
				offsetY = -Scene2D.Instance.sceneOffsetY;
			}
			else if((Scene2D.Instance.sceneOffsetY + offsetY)+Scene2D.Instance.sceneHeight <= Viewport2D.clientHeight)
			{
				offsetY = Viewport2D.clientHeight-Scene2D.Instance.sceneHeight-Scene2D.Instance.sceneOffsetY;
			}
			return offsetY;
		}			
	}
	/**
	 * 相机类型
	*/
	export enum eCameraType
	{
		NONE = 0,
		FREE,
		THIRD,
		THIRDRECT,
	}
}