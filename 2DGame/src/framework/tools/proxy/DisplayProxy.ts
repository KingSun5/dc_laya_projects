module dc
{
    /**
     * 显示代理:用于加载资源时，表现出转圈等提示效果
     * @author hannibal
     * @time 2017-7-15
     */	
	export class DisplayProxy
	{
		protected m_RootNode:LayaSprite = null;

		protected m_Url:string;
		protected m_Alige:eAligeType;
		protected m_Callback:LayaHandler = null;

		constructor()
		{

		}
		protected Load(url:string, type:string, callback:LayaHandler=null, alige:eAligeType=eAligeType.MID, proxy:LayaSprite=null):void
		{
			this.m_Url = url;
			this.m_Alige = alige;
			this.m_Callback = callback;

			let res:any = ResourceManager.Instance.GetRes(url);
			if(res)
			{//已经存在资源
				this.ShowReal(url);
				if(this.m_Callback)
				{
					this.m_Callback.runWith(url);
					this.m_Callback = null;
				}
			}
			else
			{
				this.ShowProxy(proxy);
				ResourceManager.Instance.LoadRes(url, type, LayaHandler.create(this, this.OnLoadComplete));
			}
		}

		private OnLoadComplete(url:string):void
		{
			if(this.m_Url != url)return;

			this.ShowReal(url);
			if(this.m_Callback)
			{
				this.m_Callback.runWith(this.m_Url);
				this.m_Callback = null;
			}
		}
		protected ShowReal(url:string):void
		{
		}
		protected ShowProxy(proxy:LayaSprite):void
		{
			if(proxy)
			{
				DisplayUtils.SetAlige(proxy, this.m_Alige);
				this.m_RootNode.addChild(proxy);
			}
		}
		public Destroy():void
		{
			if(this.m_Callback)
			{
				this.m_Callback.recover();
				this.m_Callback = null;
			}
			if(this.m_RootNode)
			{
				this.m_RootNode.removeSelf();
				this.m_RootNode.destroy();
				this.m_RootNode = null;
			}
		}

		public get RootNode():LayaSprite
		{
			return this.m_RootNode;
		}
		/**获取代理显示对象*/
		public static GetProxy(url:string):LayaSprite
		{
			let exte:string = UrlUtils.GetFileExte(url).toLowerCase();
			if(exte == "json" || exte == "atlas")
			{
				let anim:LayaAnimation = new LayaAnimation();
				anim.loadAtlas(url);
				anim.play(1, true);
				return anim;
			}
			else
			{
				let spr:LayaSprite = new LayaSprite();
				spr.loadImage(url);
				return spr;
			}
		}
	}
    /**
     * 显示图片
     * @author hannibal
     * @time 2017-7-15
     */	
	export class PictureProxy extends DisplayProxy
	{
		constructor()
		{
			super();
			this.m_RootNode = new LayaSprite();
		}
		public Show(url:string, callback:LayaHandler=null, alige:eAligeType=eAligeType.MID, proxy:LayaSprite=null):void
		{
			this.Load(url, Laya.Loader.IMAGE, callback, alige, proxy);
		}
		protected ShowReal(url:string):void
		{
			super.ShowReal(url);

			var t: LayaTexture = Laya.loader.getRes(url);
			if(t == null)return;

			DisplayUtils.DestroyUINode(this.m_RootNode);
			this.m_RootNode = null;
		}
	}
    /**
     * 显示动画
     * @author hannibal
     * @time 2017-7-15
     */	
	export class AnimationProxy extends DisplayProxy
	{
		constructor()
		{
			super();
			this.m_RootNode = new LayaAnimation();
		}
		public Show(url:string, callback:LayaHandler=null, alige:eAligeType=eAligeType.MID, proxy:LayaSprite=null):void
		{
			this.Load(url, Laya.Loader.ATLAS, callback, alige, proxy);
		}
		protected ShowReal(url:string):void
		{
			super.ShowReal(url);

			var res: any = Laya.loader.getRes(url);
			if(!res)return;

			DisplayUtils.RemoveAllChild(this.m_RootNode);
			this.m_RootNode.graphics.clear();
			let anim:LayaAnimation = this.m_RootNode as LayaAnimation; 
            anim.loadAtlas(url);
            anim.play(1, true);
		}
	}
}