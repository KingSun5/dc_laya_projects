module dc
{	
	/**
     * 3d场景
     * @author hannibal
     * @time 2017-8-2
     */
	export class Scene3D extends Singleton
	{
		private m_MainScene:LayaScene;
		private m_MainCamera:LayaCamera;
		private m_MainLight:DirectionLight;
		
        private static instance:Scene3D = null;
        public static get Instance():Scene3D
        {
            if(!this.instance)this.instance = new Scene3D();
            return this.instance;
        }

		public Setup():void
		{
			this.RegisterEvent();

		}
		public Destroy():void
		{
			if(this.m_MainCamera)
			{
				this.m_MainCamera.destroy(true);
				this.m_MainCamera = null;
			}
			if(this.m_MainLight)
			{
				this.m_MainLight.destroy(true);
				this.m_MainLight = null;
			}
			if(this.m_MainScene)
			{
				this.m_MainScene.destroy(true);
				this.m_MainScene = null;
			}
			this.UnRegisterEvent();
		}
		public Update():void
		{
		}
		
		//～～～～～～～～～～～～～～～～～～～～～～～场景～～～～～～～～～～～～～～～～～～～～～～～//
		/**
		 * 创建场景
		 * @param	file	场景文件，如果为空则创建空场景
		 */
		public CreateScene(file:string):void
		{
			if(StringUtils.IsNullOrEmpty(file))
			{
				this.m_MainScene = new LayaScene();
			}
			else
			{
            	this.m_MainScene = LayaScene.load(file);
			}
			LayerManager.gameLayer.addChild(this.m_MainScene);
		}
		/**
		 * 添加到场景
		 * @param	node	需要添加的节点
		*/
		public AddChild(node: LayaNode) : LayaNode
		{
			if(!this.m_MainScene)
			{
				Log.Error("未初始化场景");
				return null;
			}
			if(!node)return null;
			return this.m_MainScene.addChild(node);
		}
		//～～～～～～～～～～～～～～～～～～～～～～～相机～～～～～～～～～～～～～～～～～～～～～～～//
		/**
		 * 创建相机 
		 * @param 	pos			相机初始位置
		 * @param 	lookat		相机注视点
         * @param	aspectRatio 横纵比。
         * @param	nearPlane 	近裁面。
         * @param	farPlane 	远裁面。
		 */		
		public CreateMainCamera(pos:Vector3, lookat:Vector3, aspectRatio: number=0, nearPlane: number=0.1, farPlane: number=1000):void
		{
			if(!this.m_MainScene)
			{
				Log.Error("未初始化场景");
				return;
			}
			this.m_MainCamera = new LayaCamera(aspectRatio, nearPlane, farPlane);
			this.m_MainScene.addChild(this.m_MainCamera);
        	this.m_MainCamera.transform.translate(pos);
        	this.m_MainCamera.transform.lookAt(lookat, Vector3.Up, false);
        	this.m_MainCamera.clearColor = null;
		}
        //～～～～～～～～～～～～～～～～～～～～～～～灯光～～～～～～～～～～～～～～～～～～～～～～～//
		/**
		 * 创建灯光
		 * @param 	direction		设置灯光的方向
		 * @param 	ambientColor	设置灯光的环境光颜色
		 * @param 	diffuseColor	设置灯光的漫反射颜色
		 * @param 	specularColor	设置灯光的高光颜色
		*/
		public CreateMainLight(direction:Vector3, ambientColor:Vector3, diffuseColor:Vector3, specularColor:Vector3):void
		{
			if(!this.m_MainScene)
			{
				Log.Error("未初始化场景");
				return;
			}
			this.m_MainLight = new Laya.DirectionLight();
			this.m_MainScene.addChild(this.m_MainLight);
        	//this.m_MainLight.ambientColor = ambientColor;
        	//this.m_MainLight.specularColor = specularColor;
        	this.m_MainLight.diffuseColor = diffuseColor;
        	this.m_MainLight.direction = direction;
		}
        //～～～～～～～～～～～～～～～～～～～～～～～天空盒～～～～～～～～～～～～～～～～～～～～～～～//
		/**
		 * 创建天空盒
		 * @param 	file		天空盒文件
		 * @param	clearFlag	清除标记
		*/
		public SetSkybox(file:string):void
		{
			if(!this.m_MainCamera)
			{
				Log.Error("未初始化相机");
				return;
			}
			var skyBox:Laya.SkyBox = new Laya.SkyBox();
			this.m_MainCamera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
			this.m_MainCamera.sky = skyBox;
			skyBox.textureCube = Laya.TextureCube.load(file);
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
        //～～～～～～～～～～～～～～～～～～～～～～～get/sedt～～～～～～～～～～～～～～～～～～～～～～～//	
		public get MainScene():LayaScene
		{
			return this.m_MainScene;
		}	
		public get MainCamera():LayaCamera
		{
			return this.m_MainCamera;
		}	
		public get MainLight():DirectionLight
		{
			return this.m_MainLight;
		}
	}
}