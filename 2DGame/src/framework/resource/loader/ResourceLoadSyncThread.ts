module dc
{
    /**
     * 同步加载：可以显示加载进度条
     * @author hannibal
     * @time 20174-7-10
     */
	export class ResourceLoadSyncThread extends ResourceLoadThread
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
			for(var item of this.m_LoadQueue)
			{
				if(item.Url == asset.Url)
				{
					Log.Warning("ResourceLoadSyncThread::Add - 相同资源已经在队列中:" + asset.Url);
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

		private Stop():void
		{
			this.m_Active = false;
		}

		/**加载完成侦听器*/
		protected OnComplete(asset: any): void 
		{
			super.OnComplete(asset);
			this.m_TotalCount++;
			EventController.Instance.DispatchEvent(LoaderID.RESOURCE_LOAD_PROGRESS, this.m_TotalCount, this.m_TotalCount+this.m_LoadQueue.length);
			this.CheckLoadComplate();
		}
		/**验证是否加载完成*/
		private CheckLoadComplate():boolean
		{
			if(this.m_LoadQueue.length == 0)
			{
            	Log.Info("[load]load complate");
				this.Stop();
				EventController.Instance.DispatchEvent(LoaderID.RESOURCE_LOAD_COMPLATE, this.m_TotalCount);
				return true;
			}
			return false;
		}
	}
}