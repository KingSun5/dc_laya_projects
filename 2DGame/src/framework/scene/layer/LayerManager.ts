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
		private static m_viewLayer:LayaSprite;		//ui工具层		角色信息、快捷菜单、聊天等工具视图
		private static m_dialogLayer:LayaSprite;	//ui弹出框层   面板视图
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

            this.m_viewLayer = new LayaSprite();
            this.m_viewLayer.name = "toolsLayer";
			this.m_viewLayer.mouseEnabled = true;
            this.m_root.addChild(this.m_viewLayer);

            this.m_dialogLayer = new LayaSprite();
            this.m_dialogLayer.name = "uiLayer";
			this.m_dialogLayer.mouseEnabled = true;
            this.m_root.addChild(this.m_dialogLayer);

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
            this.m_viewLayer = null;
            this.m_dialogLayer = null;
            this.m_loadLayer = null;
            this.m_maskLayer = null;
            this.m_topLayer = null;
        }
        public static RemoveAll():void
        {
            DisplayUtils.RemoveAllChild(this.m_backLayer);
            DisplayUtils.RemoveAllChild(this.m_gameLayer);
            DisplayUtils.RemoveAllChild(this.m_viewLayer);
            DisplayUtils.RemoveAllChild(this.m_dialogLayer);
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
		public static get viewLayer():LayaSprite
        {
            return this.m_viewLayer;
        }
		public static get dialogLayer():LayaSprite
        {
            return this.m_dialogLayer;
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