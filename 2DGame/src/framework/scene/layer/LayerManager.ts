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
            this.m_root.addChild(this.m_backLayer);

            this.m_gameLayer = new LayaSprite();
            this.m_gameLayer.name = "gameLayer";
            this.m_root.addChild(this.m_gameLayer);

            this.m_toolsLayer = new LayaSprite();
            this.m_toolsLayer.name = "toolsLayer";
            this.m_root.addChild(this.m_toolsLayer);

            this.m_appLayer = new LayaSprite();
            this.m_appLayer.name = "appLayer";
            this.m_root.addChild(this.m_appLayer);

            this.m_loadLayer = new LayaSprite();
            this.m_loadLayer.name = "loadLayer";
            this.m_root.addChild(this.m_loadLayer);

            this.m_maskLayer = new LayaSprite();
            this.m_maskLayer.name = "maskLayer";
            this.m_root.addChild(this.m_maskLayer);

            this.m_topLayer = new LayaSprite();
            this.m_topLayer.name = "topLayer";
            this.m_root.addChild(this.m_topLayer);
        }
        public static Destroy():void
        {
            DisplayUtils.RemoveAllChild(this.m_root);
            this.m_root.removeSelf();
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