module dc
{
    /**
     * 场景层级
     * @author hannibal
     * @time 20174-7-13
     */	
	export class LayerManager extends Singleton
	{
		private static m_root:LayaSprite;			//根容器
		
		private static m_backLayer:LayaSprite;		//背景层
		private static m_gameLayer:LayaSprite;		//游戏层		游戏主内容
		private static m_toolsLayer:LayaSprite;		//工具层		角色信息、快捷菜单、聊天等工具视图
		private static m_appLayer:LayaSprite;		//app层		  面板视图
		private static m_loadLayer:LayaSprite;		//加载层		加载条、服务器请求遮罩等
		private static m_maskLayer:LayaSprite;		//遮罩层
		private static m_topLayer:LayaSprite;		//最高层	

        public static Setup(root:LayaSprite):void
        {
            this.m_root = root;

            this.m_backLayer = new LayaSprite();
            this.m_backLayer.name = "backLayer";
			this.m_backLayer.mouseEnabled = false;
            this.m_root.addChild(this.m_backLayer);

            this.m_gameLayer = new LayaSprite();
            this.m_gameLayer.name = "gameLayer";
			this.m_gameLayer.mouseEnabled = true;
            this.m_root.addChild(this.m_gameLayer);

            this.m_toolsLayer = new LayaSprite();
            this.m_toolsLayer.name = "toolsLayer";
			this.m_toolsLayer.mouseEnabled = true;
            this.m_root.addChild(this.m_toolsLayer);

            this.m_appLayer = new LayaSprite();
            this.m_appLayer.name = "appLayer";
			this.m_appLayer.mouseEnabled = true;
            this.m_root.addChild(this.m_appLayer);

            this.m_loadLayer = new LayaSprite();
            this.m_loadLayer.name = "loadLayer";
			this.m_loadLayer.mouseEnabled = true;
            this.m_root.addChild(this.m_loadLayer);

            this.m_maskLayer = new LayaSprite();
            this.m_maskLayer.name = "maskLayer";
			this.m_maskLayer.mouseEnabled = true;
            this.m_root.addChild(this.m_maskLayer);

            this.m_topLayer = new LayaSprite();
            this.m_topLayer.name = "topLayer";
			this.m_topLayer.mouseEnabled = true;
            this.m_root.addChild(this.m_topLayer);
        }
        public static Destroy():void
        {
            LayerManager.RemoveAll();
            DisplayUtils.RemoveAllChild(this.m_root);
            this.m_backLayer = null;
            this.m_gameLayer = null;
            this.m_toolsLayer = null;
            this.m_appLayer = null;
            this.m_loadLayer = null;
            this.m_maskLayer = null;
            this.m_topLayer = null;
        }
        public static RemoveAll():void
        {
            DisplayUtils.RemoveAllChild(this.m_backLayer);
            DisplayUtils.RemoveAllChild(this.m_gameLayer);
            DisplayUtils.RemoveAllChild(this.m_toolsLayer);
            DisplayUtils.RemoveAllChild(this.m_appLayer);
            DisplayUtils.RemoveAllChild(this.m_loadLayer);
            DisplayUtils.RemoveAllChild(this.m_maskLayer);
            DisplayUtils.RemoveAllChild(this.m_topLayer);
        }
        public static get root():LayaSprite
        {
            return this.m_root;
        }
        public static get backLayer():LayaSprite
        {
            return this.m_backLayer;
        }
		public static get gameLayer():LayaSprite
        {
            return this.m_gameLayer;
        }
		public static get toolsLayer():LayaSprite
        {
            return this.m_toolsLayer;
        }
		public static get appLayer():LayaSprite
        {
            return this.m_appLayer;
        }
		public static get loadLayer():LayaSprite
        {
            return this.m_loadLayer;
        }
		public static get maskLayer():LayaSprite
        {
            return this.m_maskLayer;
        }
		public static get topLayer():LayaSprite
        {
            return this.m_topLayer;
        }
	}
}