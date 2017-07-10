module dc
{
    /**
     * 资源管理
     * @author hannibal
     * @time 20174-7-10
     */
	export class ResourceManager
	{
		private m_ShareGUID:number = 0;
		private m_FrontLoadThread:ResourceLoadThread = null;   //同步加载线程
		private m_BackLoadThread:ResourceLoadThread = null;    //异步加载线程

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

			var id:number = this.ShareGUID();
			var info:LoaderAsset = new LoaderAsset(url, type, null, eResLoadPriority.HIGH, true, "sync", false);
			info.ID = id;
			this.m_FrontLoadThread.Add(info);
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
			var res:any = Laya.loader.getRes(url);
			if (res != null)
			{
				if (callback != null) callback.runWith(url);
				return 0;
			}

			var id:number = this.ShareGUID();
			var info:LoaderAsset = new LoaderAsset(url, type, callback, eResLoadPriority.LOW, true, "sync", false);
			info.ID = id;
			this.m_BackLoadThread.Add(info);
			return id;
		}

		public RemoveAsync(url:string):void
		{
			if (this.m_BackLoadThread == null) return;
			this.m_BackLoadThread.Remove(url);
		}

		public ClearAsync():void
		{
			if (this.m_BackLoadThread == null) return;
			this.m_BackLoadThread.Clear();
		}
	}
}