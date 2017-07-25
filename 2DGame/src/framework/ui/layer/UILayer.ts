module dc
{
    /**
     * ui层管理
     * @author hannibal
     * @time 2017-7-19
     */
	export class UILayerUtils
	{
		/**ui根容器*/
		private static m_uiRootContainer:LayaSprite;	

		/**最高层*/
		private static m_topContainer:LayaSprite;	
		/**特效*/
		private static m_maskContainer:LayaSprite;	
		/**加载*/
		private static m_loaderContainer:LayaSprite;	
		/**弹出式对话框*/
		private static m_dialogContainer:LayaSprite;	
		/**普通界面*/
		private static m_viewContainer:LayaSprite;		
		/**主城等主界面*/
		private static m_backContainer:LayaSprite;
		
		public static Setup():void
		{
			this.m_uiRootContainer = new LayaSprite();
			this.m_uiRootContainer.name = "uiRootContainer";
			this.m_uiRootContainer.mouseEnabled = true;

			this.m_topContainer = new LayaSprite();
			this.m_topContainer.name = "topContainer";
			this.m_topContainer.mouseEnabled = true;
			this.m_maskContainer = new LayaSprite();
			this.m_maskContainer.name = "maskContainer";
			this.m_maskContainer.mouseEnabled = false;
			this.m_loaderContainer = new LayaSprite();
			this.m_loaderContainer.name = "loaderContainer";
			this.m_loaderContainer.mouseEnabled = true;
			this.m_dialogContainer = new LayaSprite();
			this.m_dialogContainer.name = "dialogContainer";
			this.m_dialogContainer.mouseEnabled = true;
			this.m_viewContainer = new LayaSprite();
			this.m_viewContainer.name = "viewContainer";
			this.m_viewContainer.mouseEnabled = true;
			this.m_backContainer = new LayaSprite();
			this.m_backContainer.name = "backContainer";
			this.m_backContainer.mouseEnabled = true;

			
			LayerManager.uiLayer.addChild(this.m_uiRootContainer);
			this.m_uiRootContainer.addChild(this.m_backContainer);
			this.m_uiRootContainer.addChild(this.m_viewContainer);
			this.m_uiRootContainer.addChild(this.m_dialogContainer);
			this.m_uiRootContainer.addChild(this.m_loaderContainer);
			this.m_uiRootContainer.addChild(this.m_maskContainer);
			this.m_uiRootContainer.addChild(this.m_topContainer);
		}	
		public static Destroy():void
		{
			DisplayUtils.RemoveAllChild(this.m_backContainer);
			DisplayUtils.RemoveAllChild(this.m_viewContainer);
			DisplayUtils.RemoveAllChild(this.m_dialogContainer);
			DisplayUtils.RemoveAllChild(this.m_loaderContainer);
			DisplayUtils.RemoveAllChild(this.m_maskContainer);
			DisplayUtils.RemoveAllChild(this.m_topContainer);
			
			DisplayUtils.RemoveAllChild(this.m_uiRootContainer);
			this.m_uiRootContainer.removeSelf();

			this.m_uiRootContainer = null;
			this.m_backContainer = null;
			this.m_viewContainer = null;
			this.m_dialogContainer = null;
			this.m_loaderContainer = null;
			this.m_maskContainer = null;
			this.m_topContainer = null;
		}
		public static Clear():void
		{
			DisplayUtils.RemoveAllChild(this.m_backContainer);
			DisplayUtils.RemoveAllChild(this.m_viewContainer);
			DisplayUtils.RemoveAllChild(this.m_dialogContainer);
			DisplayUtils.RemoveAllChild(this.m_loaderContainer);
			DisplayUtils.RemoveAllChild(this.m_maskContainer);
			DisplayUtils.RemoveAllChild(this.m_topContainer);
		}
		/**
		 * 根据类型获取对应的layer
		*/
		public static GetLayer(type:eUILayer):LayaSprite
		{
			switch(type)
			{
				case eUILayer.BACK: 	return this.m_backContainer;
        		case eUILayer.VIEW: 	return this.m_viewContainer;
        		case eUILayer.DIALOG: 	return this.m_dialogContainer;
        		case eUILayer.Loader: 	return this.m_loaderContainer;
        		case eUILayer.MASK: 	return this.m_maskContainer;
        		case eUILayer.TOP: 	return this.m_topContainer;
				default:						return this.m_uiRootContainer;
			}
		}
		public static get back():LayaSprite
		{
			return this.m_backContainer;
		}
		public static get view():LayaSprite
		{
			return this.m_viewContainer;
		}
		public static get dialog():LayaSprite
		{
			return this.m_dialogContainer;
		}
		public static get loader():LayaSprite
		{
			return this.m_loaderContainer;
		}
		public static get mask():LayaSprite
		{
			return this.m_maskContainer;
		}
		public static get top():LayaSprite
		{
			return this.m_topContainer;
		}
	}
}