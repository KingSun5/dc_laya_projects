module dc
{
    /**
     * 2d场景，作用：
	 * 1.管理相机
	 * 2.rpg游戏的滚屏
     * @author hannibal
     * @time 2017-7-26
     */
	export class Scene2D extends Singleton
	{		
		/**相机 */		
		private m_CurCamera:Camera2D = null;
		/**滚屏对象*/		
		private m_RootScene:LayaSprite = null;
		
        private static instance:Scene2D = null;
        public static get Instance():Scene2D
        {
            if(!this.instance)this.instance = new Scene2D();
            return this.instance;
        }

		constructor()
		{
			super();
		}
		
		public Setup(node:LayaSprite,type:eCameraType):void
		{
			assertNullOrNil(node);

			this.RegisterEvent();
			this.m_RootScene = node;
			this.m_CurCamera = null;
			this.CreateCamera(type);
			this.OnScreenResize();	
		}
		public Destroy():void
		{
			if(this.m_CurCamera)
			{
				this.m_CurCamera.Destroy();
				this.m_CurCamera = null;
			}
			this.m_RootScene = null;
			this.UnRegisterEvent();
		}
		public Update():void
		{
			if(this.m_CurCamera)
			{
				this.m_CurCamera.Update();
			}
		}
		public SetSceneSize(w:number, h:number):void
		{
			if(this.m_RootScene)
			{
				this.m_RootScene.size(w, h);
			}
		}
		/**
		 * 点是否在场景
		 * @param x
		 * @param y
		 */		
		public IsInScene(x:number, y:number):boolean
		{
			return ((x >= this.sceneOffsetX) && (x < this.sceneWidth+this.sceneWidth) && (y >= this.sceneOffsetY) && (y < this.sceneOffsetY+this.sceneHeight));
		}
        //～～～～～～～～～～～～～～～～～～～～～～～事件～～～～～～～～～～～～～～～～～～～～～～～//
        private RegisterEvent():void
        {
			Laya.stage.on(LayaEvent.RESIZE, this, this.OnScreenResize);
        }
        private UnRegisterEvent():void
        {
			Laya.stage.off(LayaEvent.RESIZE, this, this.OnScreenResize);
        }		
		/**
		 * 屏幕尺寸改变
		 */		
		private OnScreenResize():void
		{
			Log.Info("界面大小改变：client:"+Laya.Browser.clientWidth+"*"+Laya.Browser.clientHeight+",stage:"+Laya.stage.width+"*"+Laya.stage.height);
		}
		//～～～～～～～～～～～～～～～～～～～～～～～滚屏～～～～～～～～～～～～～～～～～～～～～～～//
		/**
		 * 滚动场景
		*/
		public ScrollScene(x:number, y:number):void
		{
			if(this.m_RootScene)
			{
				this.m_RootScene.pos(x, y)
			}
		}	
		public get sceneOffsetX():number
		{
			return this.m_RootScene.x;
		}
		public get sceneOffsetY():number
		{
			return this.m_RootScene.y;
		}
		public get sceneWidth():number
		{
			return this.m_RootScene.width;
		}
		public get sceneHeight():number
		{
			return this.m_RootScene.height;
		}	
        //～～～～～～～～～～～～～～～～～～～～～～～相机～～～～～～～～～～～～～～～～～～～～～～～//
		/**
		 * 创建相机 
		 * @param type
		 */		
		private CreateCamera(type:eCameraType):void
		{
			switch(type)
			{
				case eCameraType.FREE:
					break;
				case eCameraType.THIRD:
					this.m_CurCamera = new ThirdFollowCamera2D();
					break;
				case eCameraType.THIRDRECT:
					break;
				default:
					break;
			}
		}
		/**
		 * 设置相机位置，会触发滚屏
		 * @param x
		 * @param y
		 */		
		public UpdateCameraPosition(x:number, y:number):void
		{
			if(this.m_CurCamera)
			{
				this.m_CurCamera.UpdatePosition(x, y);
			}
		}
	}
}