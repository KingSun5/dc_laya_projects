module dc
{	
	/**
     * ui组件脚本
	 * 可以给按钮等附加脚本逻辑
     * @author hannibal
     * @time 2017-8-7
     */
	export class UIComponentScript implements IPoolsObject
	{
		protected m_Owner:LayaSprite = null;

		constructor()
		{
		}
		public Init():void
		{
			this.m_Owner = null;
		}

		public Setup(owner:LayaSprite, info:any):void
		{
			assertNullOrNil(owner);
			this.m_Owner = owner;
			this.RegisterEvent();
			this.m_Owner.on(LayaEvent.REMOVED, this, this.OnDestroy);
		}
		public Destroy():void
		{
			this.UnRegisterEvent();
			
			if(this.m_Owner)
			{
				this.m_Owner.off(LayaEvent.REMOVED, this, this.OnDestroy);
				this.m_Owner = null;
			}
			ObjectPools.Recover(this);
		}
		
        protected RegisterEvent():void
        {
        }
        protected UnRegisterEvent():void
        {
        }

		protected OnDestroy():void
		{
			this.Destroy();
			Log.Debug("OnDestroy");
		}
	}
}