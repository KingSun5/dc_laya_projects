module dc
{	
	/**
     * 播放声音脚本
     * @author hannibal
     * @time 2017-8-7
	 * 例：
	 * ObjectPools.Get(UIPlaySoundScript).Setup(this.btnLogin,{file:"res/sound/hit.mp3"});
     */
	export class UIPlaySoundScript extends UIComponentScript
	{
		private m_SoundFile:string = "";

		/**
		 * @param 	info	格式{file:XXX}
		*/
		public Setup(owner:LayaSprite, info:{file:string}):void
		{
			super.Setup(owner, info);
			this.m_SoundFile = info.file;
		}
	
        protected RegisterEvent():void
        {
			if(this.m_Owner)
			{
				this.m_Owner.on(LayaEvent.MOUSE_DOWN, this, this.OnMouseDown);
			}
        }
        protected UnRegisterEvent():void
        {
			if(this.m_Owner)
			{
				this.m_Owner.off(LayaEvent.MOUSE_DOWN, this, this.OnMouseDown);
			}
        }
		private OnMouseDown(evt:any):void
		{
			if(!StringUtils.IsNullOrEmpty(this.m_SoundFile))
			{
				SoundManager.Instance.PlaySoundEffect(this.m_SoundFile, 1);
			}
		}
	}
}