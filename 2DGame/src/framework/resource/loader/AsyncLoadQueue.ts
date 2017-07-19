module dc
{
    /**
     * 异步加载
     * @author hannibal
     * @time 20174-7-10
     */
	export class AsyncLoadQueue extends LoadQueue
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
			return super.Remove(url);
		}
	}
}