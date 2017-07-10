module dc
{
    /**
     * 异步加载
     * @author hannibal
     * @time 20174-7-10
     */
	export class ResourceLoadAsyncThread extends ResourceLoadThread
	{
		public Setup(strategy:eResLoadStrategy, thread_type:eResLoadThreadType):void
		{
			super.Setup(strategy, thread_type);
			this.m_Active = true;
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
			return super.Add(asset);
		}

		public Remove(url:string):boolean
		{
			if (this.m_CurLoaderAsset != null && url == this.m_CurLoaderAsset.Url) return false;
			return super.Remove(url);
		}
	}
}