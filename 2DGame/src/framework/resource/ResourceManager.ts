module dc
{
    /**
     * 资源管理
     * @author hannibal
     * @time 20174-7-10
     */
	export class ResourceManager extends Singleton
	{
		private m_ShareGUID:number = 0;
		private m_FrontLoadThread:ResourceLoadThread = null;   //同步加载线程
		private m_BackLoadThread:ResourceLoadThread = null;    //异步加载线程

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

			this.m_FrontLoadThread = new ResourceLoadSyncThread();
			this.m_BackLoadThread = new ResourceLoadAsyncThread();
			this.m_BackLoadThread.Setup(eResLoadStrategy.FIFO, eResLoadThreadType.ASYNC);
			this.m_FrontLoadThread.Setup(eResLoadStrategy.FIFO, eResLoadThreadType.SYNC);

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
		}	

		/**获取资源*/
		public GetRes(url:string):any
		{
			return Laya.loader.getRes(url);
		}
		/**释放资源*/
		public ClearUnusedAssets(type:eClearStrategy):void
		{

		}
		private ShareGUID():number
		{
			return ++this.m_ShareGUID;
		}	
 		/*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～同步加载～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
		/// <summary>
		/// 增加同步资源加载
		/// </summary>
		/// <param name="path">资源路径</param>
		/// <param name="type">资源类型</param>
		/// <returns></returns>
		public AddSync(url:string, type:string):number
		{
			if (this.m_FrontLoadThread == null || StringUtils.IsNullOrEmpty(url)) return 0;

			//加载
			var id:number = this.ShareGUID();
			var info:LoaderAsset = new LoaderAsset(url, type, null, eResLoadPriority.HIGH, true, "sync", false);
			info.ID = id;
			this.m_FrontLoadThread.Add(info);
			//添加到加载目录
			if(!this.m_DicLoaderUrl.ContainsKey(url))
			{
				this.m_DicLoaderUrl.Add(url, new sLoaderUrl(url));
			}

			return id;
		}

		public RemoveSync(url:string):void
		{
			if (this.m_FrontLoadThread == null) return;
			this.m_FrontLoadThread.Remove(url);
		}

		public ClearSync():void
		{
			if (this.m_FrontLoadThread == null) return;
			this.m_FrontLoadThread.Clear();
		}

		public StartSync():void
		{
			if (this.m_FrontLoadThread == null) return;
			this.m_FrontLoadThread.Start();
		}

		/*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～异步加载～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
		/// <summary>
		/// 添加异步资源加载
		/// </summary>
		/// <param name="path">资源路径</param>
		/// <param name="type">资源类型</param>
		/// <param name="callback">资源成功或失败回调函数</param>
		/// <returns></returns>
		public AddAsync(url:string, type:string, callback:Laya.Handler):number
		{
			if (this.m_BackLoadThread == null || StringUtils.IsNullOrEmpty(url)) return 0;

			//判断是否已经加载过
			var res:any = this.GetRes(url);
			if (res != null)
			{
				if (callback != null) callback.runWith(url);
				return 0;
			}
			//加载
			var id:number = this.ShareGUID();
			var info:LoaderAsset = new LoaderAsset(url, type, callback, eResLoadPriority.LOW, true, "sync", false);
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
	}
	///
	///保存加载过的url
	///
	class sLoaderUrl
	{
		public url:string;
		public ctime:number;	//创建时间
		public utime:number;	//最近使用时间

		constructor(_url:string)
		{
			this.url = _url;
			this.ctime = Time.timeSinceStartup;
			this.utime = Time.timeSinceStartup;
		}
	}
}