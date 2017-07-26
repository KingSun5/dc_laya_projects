module dc
{
    /**
     * 加载界面管理器
     * @author hannibal
     * @time 2017-7-25
     */
	export class LoadViewManager extends Singleton
	{
		private m_DicLoadView:NDictionary<ILoadView> = null;

        private static instance:LoadViewManager = null;
        public static get Instance():LoadViewManager
        {
            if(!this.instance)this.instance = new LoadViewManager();
            return this.instance;
        }

        public Setup():void
        {
			this.RegisterEvent();
			this.m_DicLoadView = new NDictionary<ILoadView>();
        }

        public Destroy():void
        {
			this.UnRegisterEvent();
			
			if(this.m_DicLoadView)
			{
				let view:any = null;
				this.m_DicLoadView.Foreach(function(key, value)
				{
					view = value;
					view.Close();
					return true;
				});
				this.m_DicLoadView.Clear();
				this.m_DicLoadView = null;				
			}
        }

        private RegisterEvent():void
        {
			EventController.AddEventListener(LoaderEvent.LOADVIEW_OPEN, this, this.OnLoadViewEvt);
			EventController.AddEventListener(LoaderEvent.LOADVIEW_COMPLATE, this, this.OnLoadViewEvt);
			EventController.AddEventListener(LoaderEvent.LOADVIEW_PROGRESS, this, this.OnLoadViewEvt);
        }
        private UnRegisterEvent():void
        {
			EventController.RemoveEventListener(LoaderEvent.LOADVIEW_OPEN, this, this.OnLoadViewEvt);
			EventController.RemoveEventListener(LoaderEvent.LOADVIEW_COMPLATE, this, this.OnLoadViewEvt);
			EventController.RemoveEventListener(LoaderEvent.LOADVIEW_PROGRESS, this, this.OnLoadViewEvt);
        }
		/**加载进度事件*/
		private OnLoadViewEvt(args:EventArgs):void
		{
			let type:string = args.Type;
			let viewType:eLoadViewType = args.Get(0);
			switch(type)
			{
				case LoaderEvent.LOADVIEW_OPEN:
				{
					Log.Debug("显示加载界面");
					let total:number = args.Get(1);
					this.Show(viewType, total);
				}
				break;
				case LoaderEvent.LOADVIEW_PROGRESS:
				{
					//Log.Debug("加载界面进度");
					let cur:number = args.Get(1);
					let total:number = args.Get(2);
					this.SetProgress(viewType, cur, total);
				}
				break;
				case LoaderEvent.LOADVIEW_COMPLATE:
				{
					Log.Debug("加载界面关闭");
					this.Close(viewType);
				}
				break;
			}
		}

		private Show(type:eLoadViewType, total:number):void
		{
			if(type == eLoadViewType.None)return;

			let view:any = this.m_DicLoadView.GetValue(type);
			if(!view)
			{
				switch(type)
				{
					case eLoadViewType.Window:
						view = new UILoaderView();
						break;
					case eLoadViewType.FullScreen:
						view = new UIFullscreeenLoadView();
						break;
					default:return;
				}
				view.Open([]);
				UILayerUtils.loader.addChild(view);
				this.m_DicLoadView.Add(type, view);
			}
			view.OnOpen(total);
			view.SetVisible(true);
		}
		private SetProgress(type:eLoadViewType, cur:number, total:number):void
		{
			let view = this.m_DicLoadView.GetValue(type);
			if(!view)
			{
				return;
			}
			view.SetProgress(cur, total);
		}
		private Close(type:eLoadViewType):void
		{
			// let view:any = this.m_DicLoadView.GetValue(type);
			// if(!view)
			// {
			// 	return;
			// }	
			// view.OnClose();
			// view.SetVisible(false);
		}
	}
	/**
	 * 加载界面类型
	*/
	export enum eLoadViewType
	{
		None,		//不显示
		Window = 1,	//窗口加载
		FullScreen,	//全屏加载
	}
}