module dc
{
    /**
     * 同步加载：可以显示加载进度条
     * @author hannibal
     * @time 20174-7-10
     */
	export class SyncLoadQueue extends LoadQueue
	{
		protected m_TotalCount:number = 0;
		
		public Setup(strategy:eResLoadStrategy, thread_type:eResLoadThreadType):void
		{
			super.Setup(strategy, thread_type);
			this.m_Active = false;
			this.m_TotalCount = 0;
		}

		public Update():void
		{
			super.Update();
		}
		
		public Destroy():void
		{
			super.Destroy();
		}

		public Add(asset:LoaderAsset):boolean
		{
			if(this.m_Active)
			{
				Log.Error("加载队列正在执行:" + asset.Url);
				return false;
			}
			for(let item of this.m_LoadQueue)
			{
				if(item.Url == asset.Url)
				{
					Log.Warning("SyncLoadQueue::Add - 相同资源已经在队列中:" + asset.Url);
					return false;
				}
			}
			return super.Add(asset);
		}

		public Remove(url:string):boolean
		{
			return super.Remove(url);
		}

		public Clear():void
		{
			super.Clear();
		}

		public Start():void
		{
			super.Start();
			this.m_TotalCount = 0;
		}

		/**加载完成侦听器*/
		protected OnComplete(asset: any): void 
		{
			super.OnComplete(asset);
			this.m_TotalCount++;
			EventController.DispatchEvent(LoaderID.RESOURCE_LOAD_PROGRESS, this.m_TotalCount, this.m_TotalCount+this.m_LoadQueue.length);
			this.CheckLoadComplate();
		}
		/**验证是否加载完成*/
		private CheckLoadComplate():boolean
		{
			if(this.m_LoadQueue.length == 0)
			{
            	Log.Info("[load]load complate");
				this.Stop();
				EventController.DispatchEvent(LoaderID.RESOURCE_LOAD_COMPLATE);
				return true;
			}
			return false;
		}
	}
	/**
	 * 加载批次
	*/
	export class SyncLoadBatch
	{
		protected m_LoadThread:LoadQueue = null;
		protected m_CurBatch:LoadBatchInfo = null;
		protected m_LoadBatchQueue:Array<LoadBatchInfo> = null;

		public Setup(thread:LoadQueue):void
		{
			this.m_LoadThread = thread;
			this.m_LoadBatchQueue = [];
			this.RegisterEvent();
		}

		public Update():void
		{
			this.CheckBatchLoad();
		}
		
		public Destroy():void
		{
			this.UnRegisterEvent();
			this.m_LoadThread = null;
			this.m_LoadBatchQueue = null;
		}

		public AddBatch(batch:LoadBatchInfo):void
		{
			this.m_LoadBatchQueue.push(batch);
			this.CheckBatchLoad();
		}
		private CheckBatchLoad()
		{
			if(this.m_LoadThread && !this.m_LoadThread.Active && this.m_LoadBatchQueue.length > 0)
			{
				assert(this.m_LoadThread.GetUnloadCount() <= 0, "内部错误，上个队列存在未加载完成项");
				this.m_CurBatch = this.m_LoadBatchQueue.shift();
				if(this.m_CurBatch && this.m_CurBatch.mLoadBatchQueue.length > 0)
				{
					for(let asset of this.m_CurBatch.mLoadBatchQueue)
					{
						this.m_LoadThread.Add(asset);
					}
					this.m_LoadThread.Start();
				}
			}
		}

        protected RegisterEvent():void
        {
			EventController.AddEventListener(LoaderID.RESOURCE_LOAD_PROGRESS, this, this.OnProgress);
			EventController.AddEventListener(LoaderID.RESOURCE_LOAD_COMPLATE, this, this.OnComplete);
        }
        protected UnRegisterEvent():void
        {
			EventController.RemoveEventListener(LoaderID.RESOURCE_LOAD_PROGRESS, this, this.OnProgress);
			EventController.RemoveEventListener(LoaderID.RESOURCE_LOAD_COMPLATE, this, this.OnComplete);
        }
		protected OnComplete(args:EventArgs): void 
		{
			if(this.m_CurBatch)
			{
				if(this.m_CurBatch.CompleteFun)
					this.m_CurBatch.CompleteFun.run();
			}
		}
		protected OnProgress(args:EventArgs): void 
		{
			let cur_loader:number = args.Get(0);
			let total_loader:number = args.Get(1);
			if(this.m_CurBatch)
			{
				if(this.m_CurBatch.ProgressFun)
					this.m_CurBatch.ProgressFun.runWith([cur_loader, total_loader]);
			}
		}
	}
}