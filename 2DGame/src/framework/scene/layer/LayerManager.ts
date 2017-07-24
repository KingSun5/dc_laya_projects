module dc
{
    /**
     * 场景层级
     * @author hannibal
     * @time 2017-7-13
     */	
	export class LayerManager extends Singleton
	{
		private static m_root:LayaSprite;			//根容器
		
		private static m_backLayer:LayaSprite;		//背景层
		private static m_gameLayer:LayaSprite;		//游戏层		游戏主内容
		private static m_uiLayer:LayaSprite;		//ui层		角色信息、快捷菜单、聊天等工具视图
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

            this.m_uiLayer = new LayaSprite();
            this.m_uiLayer.name = "uiLayer";
			this.m_uiLayer.mouseEnabled = true;
            this.m_root.addChild(this.m_uiLayer);

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
            this.m_uiLayer = null;
            this.m_topLayer = null;
        }
        public static RemoveAll():void
        {
            DisplayUtils.RemoveAllChild(this.m_backLayer);
            DisplayUtils.RemoveAllChild(this.m_gameLayer);
            DisplayUtils.RemoveAllChild(this.m_uiLayer);
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
		public static get uiLayer():LayaSprite
        {
            return this.m_uiLayer;
        }
		public static get topLayer():LayaSprite
        {
            return this.m_topLayer;
        }
	}
}