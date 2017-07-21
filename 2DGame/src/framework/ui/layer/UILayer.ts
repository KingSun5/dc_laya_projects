module dc
{
    /**
     * ui层管理
     * @author hannibal
     * @time 20174-7-19
     */
	export class UILayerUtils
	{
		/**ui根容器*/
		private static m_uiRootContainer:LayaSprite;	

		/**最高层*/
		private static m_topLevelContainer:LayaSprite;	
		/**特效*/
		private static m_maskLevelContainer:LayaSprite;	
		/**玩家名字*/
		private static m_loaderLevelContainer:LayaSprite;	
		/**玩家*/
		private static m_dialogLevelContainer:LayaSprite;	
		/**角色 */
		private static m_viewLevelContainer:LayaSprite;		
		/**子弹*/
		private static m_backLevelContainer:LayaSprite;
		
		public static Setup():void
		{
			this.m_uiRootContainer = new LayaSprite();
			this.m_uiRootContainer.name = "sceneRootContainer";
			this.m_uiRootContainer.mouseEnabled = true;

			this.m_topLevelContainer = new LayaSprite();
			this.m_topLevelContainer.name = "topLevelContainer";
			this.m_topLevelContainer.mouseEnabled = true;
			this.m_maskLevelContainer = new LayaSprite();
			this.m_maskLevelContainer.name = "maskLevelContainer";
			this.m_maskLevelContainer.mouseEnabled = false;
			this.m_loaderLevelContainer = new LayaSprite();
			this.m_loaderLevelContainer.name = "loaderLevelContainer";
			this.m_loaderLevelContainer.mouseEnabled = true;
			this.m_dialogLevelContainer = new LayaSprite();
			this.m_dialogLevelContainer.name = "dialogLevelContainer";
			this.m_dialogLevelContainer.mouseEnabled = true;
			this.m_viewLevelContainer = new LayaSprite();
			this.m_viewLevelContainer.name = "viewLevelContainer";
			this.m_viewLevelContainer.mouseEnabled = true;
			this.m_backLevelContainer = new LayaSprite();
			this.m_backLevelContainer.name = "backLevelContainer";
			this.m_backLevelContainer.mouseEnabled = true;

			
			LayerManager.uiLayer.addChild(this.m_uiRootContainer);
			this.m_uiRootContainer.addChild(this.m_backLevelContainer);
			this.m_uiRootContainer.addChild(this.m_viewLevelContainer);
			this.m_uiRootContainer.addChild(this.m_dialogLevelContainer);
			this.m_uiRootContainer.addChild(this.m_loaderLevelContainer);
			this.m_uiRootContainer.addChild(this.m_maskLevelContainer);
			this.m_uiRootContainer.addChild(this.m_topLevelContainer);
		}	
		public static Destroy():void
		{
			DisplayUtils.RemoveAllChild(this.m_backLevelContainer);
			DisplayUtils.RemoveAllChild(this.m_viewLevelContainer);
			DisplayUtils.RemoveAllChild(this.m_dialogLevelContainer);
			DisplayUtils.RemoveAllChild(this.m_loaderLevelContainer);
			DisplayUtils.RemoveAllChild(this.m_maskLevelContainer);
			DisplayUtils.RemoveAllChild(this.m_topLevelContainer);
			
			DisplayUtils.RemoveAllChild(this.m_uiRootContainer);
			this.m_uiRootContainer.removeSelf();

			this.m_uiRootContainer = null;
			this.m_backLevelContainer = null;
			this.m_viewLevelContainer = null;
			this.m_dialogLevelContainer = null;
			this.m_loaderLevelContainer = null;
			this.m_maskLevelContainer = null;
			this.m_topLevelContainer = null;
		}
		public static Clear():void
		{
			DisplayUtils.RemoveAllChild(this.m_backLevelContainer);
			DisplayUtils.RemoveAllChild(this.m_viewLevelContainer);
			DisplayUtils.RemoveAllChild(this.m_dialogLevelContainer);
			DisplayUtils.RemoveAllChild(this.m_loaderLevelContainer);
			DisplayUtils.RemoveAllChild(this.m_maskLevelContainer);
			DisplayUtils.RemoveAllChild(this.m_topLevelContainer);
		}
		/**
		 * 根据类型获取对应的layer
		*/
		public static GetLayer(type:eUILayer):LayaSprite
		{
			switch(type)
			{
				case eUILayer.BACK: 	return this.m_backLevelContainer;
        		case eUILayer.VIEW: 	return this.m_viewLevelContainer;
        		case eUILayer.DIALOG: 	return this.m_dialogLevelContainer;
        		case eUILayer.Loader: 	return this.m_loaderLevelContainer;
        		case eUILayer.MASK: 	return this.m_maskLevelContainer;
        		case eUILayer.TOP: 	return this.m_topLevelContainer;
				default:						return this.m_uiRootContainer;
			}
		}
		public static get back():LayaSprite
		{
			return this.m_backLevelContainer;
		}
		public static get view():LayaSprite
		{
			return this.m_viewLevelContainer;
		}
		public static get dialog():LayaSprite
		{
			return this.m_dialogLevelContainer;
		}
		public static get loader():LayaSprite
		{
			return this.m_loaderLevelContainer;
		}
		public static get mask():LayaSprite
		{
			return this.m_maskLevelContainer;
		}
		public static get top():LayaSprite
		{
			return this.m_topLevelContainer;
		}
	}
}