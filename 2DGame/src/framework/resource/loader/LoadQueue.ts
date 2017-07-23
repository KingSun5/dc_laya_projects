module dc
{
    /**
     * 资源加载
     * @author hannibal
     * @time 2017-7-10
     */
	export class LoadQueue
	{
		protected m_Active:boolean = false;
		protected m_LoadStrategy:eResLoadStrategy;
		protected m_LoadThreadType:eResLoadThreadType;

		protected m_IsLoading:boolean = false;
		protected m_CurLoaderAsset:LoaderAsset = null;

		protected m_LoadQueue:Array<LoaderAsset> = null;

		public Setup(strategy:eResLoadStrategy, thread_type:eResLoadThreadType):void
		{
			this.m_LoadStrategy = strategy;
			this.m_LoadThreadType = thread_type;
			this.m_IsLoading = false;
			this.m_CurLoaderAsset = null;
			this.m_LoadQueue = [];
		}

		public Update():void
		{
			if(!this.m_Active)return;

			if(!this.m_IsLoading && this.m_LoadQueue.length > 0)
			{
				this.ProcessLoad();
			}
		}
		
		public Destroy():void
		{
			this.m_Active = false;
			this.m_IsLoading = false;
			this.m_CurLoaderAsset = null;
			ArrayUtils.Clear(this.m_LoadQueue);
			this.m_LoadQueue = null;
		}
		/**添加到加载队列*/
		public Add(asset:LoaderAsset):boolean
		{
			Log.Info("[load]add load url:" + asset.Url);
			switch(this.m_LoadStrategy)
			{
				case eResLoadStrategy.FIFO:
					this.m_LoadQueue.push(asset);
					break;

				case eResLoadStrategy.FILO:
					this.m_LoadQueue.splice(0, 1, asset);
					break;

				case eResLoadStrategy.PRIORITY:
					//TODO
					this.m_LoadQueue.push(asset);
					break;

				default:
					this.m_LoadQueue.push(asset);
					break;
			}
			return true;
		}
		/**从加载队列移除未开始加载的资源*/
		public Remove(url:string):boolean
		{
			if (this.m_CurLoaderAsset && url == this.m_CurLoaderAsset.Url) return false;

			let info:LoaderAsset = null;
			for (let i = 0; i <this.m_LoadQueue.length; ++i)
			{
				info = this.m_LoadQueue[i];
				if(info.Url == url && info.Stage == eResLoadStage.UNLOAD)
				{//只有处于未加载状态的资源才能取消
					this.m_LoadQueue.splice(i, 1);
					return true;
				}
			}
			return false;
		}

		public Clear():void
		{
			this.Stop();
			this.m_CurLoaderAsset = null;
			ArrayUtils.Clear(this.m_LoadQueue)
		}

		public Start():void
		{
			this.m_Active = true;
			Log.Info("[load]begin load total:" + this.m_LoadQueue.length);
		}
		public Stop():void
		{
			this.m_Active = false;
		}
		public Pause():void
		{
			this.m_Active = false;
		}

		public Resume():void
		{
			this.m_Active = true;
		}
		
		protected ProcessLoad()
		{
			if(!this.m_Active || this.m_IsLoading || this.m_LoadQueue.length == 0)
				return;

			//当前需要加载的资源
			this.m_IsLoading = true;
			this.m_CurLoaderAsset = this.m_LoadQueue.shift();
			this.m_CurLoaderAsset.Stage = eResLoadStage.LOADING;

			//判断是否已经加载过
			if(ResourceManager.Instance.GetRes(this.m_CurLoaderAsset.Url))
			{
				this.OnComplete(this.m_CurLoaderAsset.Url);
			}
			else
			{
				Laya.loader.load(
					this.m_CurLoaderAsset.Url,
					LayaHandler.create(this, this.OnAssetComplete),
					LayaHandler.create(this, this.OnAssetProgress),
					this.m_CurLoaderAsset.Type,
					this.m_CurLoaderAsset.Priority,
					this.m_CurLoaderAsset.Cache,
					this.m_CurLoaderAsset.Group,
					this.m_CurLoaderAsset.IgnoreCache);	
			}
		}
		/**加载完成侦听器:加载失败也会触发*/
		private OnAssetComplete(asset: any): void 
		{
			this.OnComplete(asset);
		}

		/**加载进度侦听器*/
		private OnAssetProgress(progress: number): void
		{
			//undo
		}

		/**加载完成侦听器*/
		protected OnComplete(asset: any): void 
		{
			if(this.m_CurLoaderAsset)
			{
				Log.Debug("[load]load complete res:" + this.m_CurLoaderAsset.Url);
				this.m_CurLoaderAsset.Stage = eResLoadStage.LOADED;
				if(this.m_CurLoaderAsset.Complete)
					this.m_CurLoaderAsset.Complete.runWith(this.m_CurLoaderAsset.Url);
			}
			this.m_IsLoading = false;
		}
		/**未加载的数量*/
		public GetUnloadCount():number
		{
			return this.m_LoadQueue.length;
		}		
		public get Active():boolean
		{
			return this.m_Active;
		}
	}
}