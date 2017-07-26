module dc
{
    /**
     * 资源管理
     * @author hannibal
     * @time 2017-7-10
     */
	export class ResourceManager extends Singleton
	{
		private m_DicLoaderUrl:SDictionary<sLoaderUrl> = null;	//加载过的信息，方便资源释放

        private static instance:ResourceManager = null;
        public static get Instance():ResourceManager
        {
            if(!this.instance)this.instance = new ResourceManager();
            return this.instance;
        }

		public Setup():void
		{
			this.m_DicLoaderUrl = new SDictionary<sLoaderUrl>();
		}

		public Destroy():void
		{
			if(this.m_DicLoaderUrl)
			{
				this.m_DicLoaderUrl.Clear();
				this.m_DicLoaderUrl = null;
			}
		}
		public Tick(elapse:number, game_frame:number):void
		{
		}	

		/**获取资源*/
		public GetRes(url:string):any
		{
			//修改访问时间
			this.RefreshResourceTime(url, false);
			return Laya.loader.getRes(url);
		}	
		/*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～加载～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
        /**
         * 加载资源，如果资源在此之前已经加载过，则当前帧会调用complete
         * @param	url 		单个资源地址
         * @param	type 		资源类型
         * @param	complete 	结束回调(参数：string 加载的资源url)
         * @param	viewType 	加载界面
         * @param	priority 	优先级，0-4，5个优先级，0优先级最高，默认为1。
         * @param	cache 		是否缓存加载结果。
         * @param	group 		分组，方便对资源进行管理。
         * @param	ignoreCache 是否忽略缓存，强制重新加载
         */		
		public LoadRes(url: string, 
					type: string = "", 
					complete: LayaHandler = null, 
					viewType: eLoadViewType = eLoadViewType.None,
					priority: number = 1, 
					cache: boolean = true, 
					group: string = "dc", 
					ignoreCache: boolean = false):void
		{
			//添加到加载目录
			this.RefreshResourceTime(url, true);

			//判断是否需要显示加载界面
			if(viewType != eLoadViewType.None)
			{
				if(Laya.loader.getRes(url))viewType = eLoadViewType.None;
			}
			//显示加载界面
			if(viewType != eLoadViewType.None)
			{
				EventController.DispatchEvent(LoaderEvent.LOADVIEW_OPEN, viewType, 1);
			}
			//加载
			Laya.loader.load(
				url, 
				LayaHandler.create(this, this.OnLoadComplete, [viewType, complete, [url]]), 
				LayaHandler.create(this, this.OnLoadProgress, [viewType, 1], false),
				type,
				priority,
				cache,
				group,
				ignoreCache);
		}
        /**
         * 批量加载资源，如果所有资源在此之前已经加载过，则当前帧会调用complete
         * @param	arr_res 	需要加载的资源数组
         * @param	complete 	结束回调(参数：Array<string>，加载的url数组)
         * @param	viewType 	加载界面
         * @param	priority 	优先级，0-4，5个优先级，0优先级最高，默认为1。
         * @param	cache 		是否缓存加载结果。
         * @param	group 		分组，方便对资源进行管理。
         * @param	ignoreCache 是否忽略缓存，强制重新加载
         */			
		public LoadArrayRes(arr_res: Array<{ url:string, type:string}>, 
					complete: LayaHandler = null, 
					viewType: eLoadViewType = eLoadViewType.None,
					priority: number = 1, 
					cache: boolean = true, 
					group: string = "dc", 
					ignoreCache: boolean = false):void
		{
			let has_unload:boolean = false;
            let assets = [];
			let urls = [];
            for (let res of arr_res)
			{
                assets.push({ url: res.url, type: res.type });
				urls.push(res.url);
				//判断是否有未加载资源
				if(!has_unload && !Laya.loader.getRes(res.url))has_unload = true;
				//添加到加载目录
				this.RefreshResourceTime(res.url, true);
            }
			//判断是否需要显示加载界面
			if(!has_unload && viewType != eLoadViewType.None)
			{
				viewType = eLoadViewType.None;
			}
			//显示加载界面
			if(viewType != eLoadViewType.None)
			{
				EventController.DispatchEvent(LoaderEvent.LOADVIEW_OPEN, viewType, assets.length);
			}
			//加载
			Laya.loader.load(
				assets, 
				LayaHandler.create(this, this.OnLoadComplete, [viewType, complete, urls]), 
				LayaHandler.create(this, this.OnLoadProgress, [viewType, assets.length], false),
				undefined,
				priority,
				cache,
				group,
				ignoreCache);
		}
		/**
		 * 加载完成
		 * @param	viewType	显示的加载界面类型
		 * @param 	handle 		加载时，传入的回调函数
		 * @param 	args		第一个参数为加载的资源url列表；第二个参数为是否加载成功
		 */
		public OnLoadComplete(viewType:eLoadViewType, handle:LayaHandler, ...args:any[]):void
		{
			//显示加载日志
			if(CommonID.LOG_LOAD_RES)
			{
				if(args)
				{
					let arr:Array<string> = args[0];
					for(let url of arr)Log.Debug("[load]加载完成url:" + url);
				}
			}
			//关闭加载界面
			if(viewType != eLoadViewType.None)
			{
				EventController.DispatchEvent(LoaderEvent.LOADVIEW_COMPLATE, viewType);
			}
			//加载完成回调
			if(handle)
			{
				if(args && args.length > 0)
				{
					let arr:Array<string> = args[0];
					if(!arr || arr.length > 1)
						handle.runWith(args);
					else
						handle.runWith(arr[0]);
				}
				else
					handle.run();
			}
		}
		/**
		 * 加载进度
		 * @param	viewType	显示的加载界面类型
		 * @param	total		总共需要加载的资源数量
		 * @param	progress	已经加载的数量，百分比；注意，有可能相同进度会下发多次
		*/
		public OnLoadProgress(viewType:eLoadViewType, total:number, progress:number):void
		{
			let cur:number = NumberUtils.toInt(Math.floor(progress*total));
			// if(CommonID.LOG_LOAD_RES)
			// {
			// 	Log.Debug("[load]进度:" + cur + ", total:" + total);
			// }
			if(viewType != eLoadViewType.None)
			{
				EventController.DispatchEvent(LoaderEvent.LOADVIEW_PROGRESS, viewType, cur, total);
			}
		}
		/**更新资源使用时间*/
		private RefreshResourceTime(url:string, is_create:boolean)
		{
			if(is_create)
			{
				let loader_info:sLoaderUrl = this.m_DicLoaderUrl.GetValue(url);
				if(!loader_info)
				{
					loader_info = new sLoaderUrl(url);
					this.m_DicLoaderUrl.Add(url, loader_info);
				}
				else
					loader_info.ctime = Time.timeSinceStartup;
			}
			else
			{
				let loader_info:sLoaderUrl = this.m_DicLoaderUrl.GetValue(url);
				if(loader_info)
				{
					loader_info.utime = Time.timeSinceStartup;
				}
			}
		}
 		/*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～资源释放～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
		/**
         * 释放资源
         * @param	type	释放策略
		 */		
		public ClearUnusedAssets(type:eClearStrategy):void
		{
			this.ClearAsset(type);
		}
		/**
         * 释放指定资源
         * @param	url	资源路径
		 */
		public ClearRes(url:string):any
		{
			this.m_DicLoaderUrl.Remove(url);
			Laya.loader.clearRes(url);
			Log.Info("[res]释放资源:" + url);
		}
		private ClearAsset(type:eClearStrategy):void
		{
			switch(type)
			{
				case eClearStrategy.ALL:
				{
					for(let key in this.m_DicLoaderUrl)
					{
						Laya.loader.clearRes(key);
					}
					this.m_DicLoaderUrl.Clear();
					Log.Info("[res]释放所有资源");
				}
				break;
				case eClearStrategy.FIFO:
				{
					let list:Array<sLoaderUrl> = this.m_DicLoaderUrl.GetValues();
					ArrayUtils.Sort(list,"ctime", eArraySortOrder.ASCENDING);
					for(let i = 0; i < list.length * 0.5; ++i)
					{
						this.ClearRes(list[i].url);
					}
				}
				break;	
				case eClearStrategy.FILO:
				{
					let list:Array<sLoaderUrl> = this.m_DicLoaderUrl.GetValues();
					ArrayUtils.Sort(list,"ctime", eArraySortOrder.DESCENDING);
					for(let i = 0; i < list.length * 0.5; ++i)
					{
						this.ClearRes(list[i].url);
					}
				}
				break;	
				case eClearStrategy.LRU:
				{
					let list:Array<sLoaderUrl> = this.m_DicLoaderUrl.GetValues();
					ArrayUtils.Sort(list,"utime", eArraySortOrder.ASCENDING);
					for(let i = 0; i < list.length * 0.5; ++i)
					{
						this.ClearRes(list[i].url);
					}
				}
				break;	
				case eClearStrategy.UN_USED:
				{
					//TODO
				}
				break;
			}
		}
	}
	/**
	 * 保存加载过的url
	 */
	class sLoaderUrl
	{
		public url:string;
		/**创建时间*/
		public ctime:number;
		/**最近使用时间*/
		public utime:number;	

		constructor(_url:string)
		{
			this.url = _url;
			this.ctime = Time.timeSinceStartup;
			this.utime = Time.timeSinceStartup;
		}
	}
}