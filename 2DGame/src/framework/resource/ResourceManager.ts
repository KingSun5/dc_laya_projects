module dc
{
    /**
     * 资源管理
     * @author hannibal
     * @time 2017-7-10
     */
	export class ResourceManager extends Singleton
	{
		private m_ShareGUID:number = 0;
		private m_FrontLoadThread:LoadQueue = null;   //同步加载线程
		private m_BackLoadThread:LoadQueue = null;    //异步加载线程
		private m_SyncLoadBatch:SyncLoadBatch = null;

		private m_DicLoaderUrl:SDictionary<sLoaderUrl> = null;	//加载过的信息，方便资源释放

        private static instance:ResourceManager = null;
        public static get Instance():ResourceManager
        {
            if(!this.instance)this.instance = new ResourceManager();
            return this.instance;
        }

		public Setup():void
		{
			this.m_ShareGUID = 0;

			this.m_FrontLoadThread = new SyncLoadQueue();
			this.m_BackLoadThread = new AsyncLoadQueue();
			this.m_SyncLoadBatch = new SyncLoadBatch();
			this.m_BackLoadThread.Setup(eResLoadStrategy.FIFO, eResLoadThreadType.ASYNC);
			this.m_FrontLoadThread.Setup(eResLoadStrategy.FIFO, eResLoadThreadType.SYNC);
			this.m_SyncLoadBatch.Setup(this.m_FrontLoadThread);

			this.m_DicLoaderUrl = new SDictionary<sLoaderUrl>();

			Laya.loader.maxLoader = 2;
		}

		public Destroy():void
		{
			if (this.m_FrontLoadThread != null)
			{
				this.m_FrontLoadThread.Destroy();
				this.m_FrontLoadThread = null;
			}
			if (this.m_BackLoadThread != null)
			{
				this.m_BackLoadThread.Destroy();
				this.m_BackLoadThread = null;
			}
			if (this.m_SyncLoadBatch != null)
			{
				this.m_SyncLoadBatch.Destroy();
				this.m_SyncLoadBatch = null;
			}
			if(this.m_DicLoaderUrl != null)
			{
				this.m_DicLoaderUrl.Clear();
				this.m_DicLoaderUrl = null;
			}
		}
		public Tick(elapse:number, game_frame:number):void
		{
			if (this.m_FrontLoadThread != null)
			{
				this.m_FrontLoadThread.Update();
			}
			if (this.m_BackLoadThread != null)
			{
				this.m_BackLoadThread.Update();
			}
			if (this.m_SyncLoadBatch != null)
			{
				this.m_SyncLoadBatch.Update();
			}
		}	

		/**获取资源*/
		public GetRes(url:string):any
		{
			//修改访问时间
			let loader_info:sLoaderUrl = this.m_DicLoaderUrl.GetValue(url);
			if(loader_info)
			{
				loader_info.utime = Time.timeSinceStartup;
			}
			return Laya.loader.getRes(url);
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
		/**
         * 释放资源
         * @param	type	释放策略
		 */		
		public ClearUnusedAssets(type:eClearStrategy):void
		{
			this.ClearAsset(type);
		}
		private ShareGUID():number
		{
			return ++this.m_ShareGUID;
		}	

 		/*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～同步加载～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
		/**
         * 增加多个同步资源加载。
         * @param	assets		资源数组[{url,type},{url,type},...]
         * @param	caller		调用对象实例
         * @param	complete	加载完成，回调函数参数[无]
         * @param	progress	加载进度，回调函数参数[已经加载数量，总共需要加载数量]
		 * 例
		    let assets = [];
            assets.push({url:"res/image/1.png", type:Laya.Loader.IMAGE});
            assets.push({url:"res/image/2.png", type:Laya.Loader.IMAGE});
            assets.push({url:"res/image/3.png", type:Laya.Loader.IMAGE});
            dc.ResourceManager.Instance.AddSync(assets, this, this.OnComplete, this.OnProgress);
		 */
		public AddSync(assets:Array<any>, caller:any=null, complete:Function=null, progress:Function=null):void
		{
			if (this.m_FrontLoadThread == null || !assets || assets.length <= 0)
			{
				if(complete)complete.call(caller);
				return;
			}

			//加载
			let batch:LoadBatchInfo = new LoadBatchInfo();
			for(let asset of assets)
			{
				let url:string = asset.url;
				let type:string = asset.type;		
				let id:number = this.ShareGUID();
				let info:LoaderAsset = new LoaderAsset(url, type, null, eResLoadPriority.HIGH, true, "sync", false);
				info.ID = id;
				batch.Add(info);
				//添加到加载目录
				if(!this.m_DicLoaderUrl.ContainsKey(url))
				{
					this.m_DicLoaderUrl.Add(url, new sLoaderUrl(url));
				}
			}	
			if(caller)
			{
				if(complete)batch.CompleteFun = LayaHandler.create(caller, complete);
				if(progress)batch.ProgressFun = LayaHandler.create(caller, progress, null, false);
			}
			this.m_SyncLoadBatch.AddBatch(batch);
		}
		public RemoveSync(url:string):void
		{
			if (!this.m_FrontLoadThread) return;
			this.m_FrontLoadThread.Remove(url);
		}

		public ClearSync():void
		{
			if (!this.m_FrontLoadThread) return;
			this.m_FrontLoadThread.Clear();
		}

		/*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～异步加载～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
		/**
         * 添加异步资源加载
         * @param	url		资源路径
         * @param	type	资源类型
         * @param	callback 资源成功或失败回调函数
		 */
		public AddAsync(url:string, type:string, caller:any=null, complete:Function=null):number
		{
			if (this.m_BackLoadThread == null || StringUtils.IsNullOrEmpty(url)) return 0;

			//判断是否已经加载过
			let res:any = this.GetRes(url);
			if (res != null)
			{
				if (complete != null) complete.call(caller, url);
				return 0;
			}
			//加载
			let id:number = this.ShareGUID();
			let info:LoaderAsset = new LoaderAsset(url, type, LayaHandler.create(caller, complete), eResLoadPriority.LOW, true, "sync", false);
			info.ID = id;
			this.m_BackLoadThread.Add(info);
			//添加到加载目录
			if(!this.m_DicLoaderUrl.ContainsKey(url))
			{
				this.m_DicLoaderUrl.Add(url, new sLoaderUrl(url));
			}

			return id;
		}

		public RemoveAsync(url:string):void
		{
			if (this.m_BackLoadThread == null) return;

			if(this.m_BackLoadThread.Remove(url))
			{
				this.m_DicLoaderUrl.Remove(url);
			}
		}

		public ClearAsync():void
		{
			if (this.m_BackLoadThread == null) return;
			this.m_BackLoadThread.Clear();
		}
 		/*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～资源释放～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
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