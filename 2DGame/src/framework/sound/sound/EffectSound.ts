module dc
{
    /**
     * 音效
     * @author hannibal
     * @time 20174-7-11
     */
	export class EffectSound extends Sound
	{

		public Setup(file_name:string, count:number):void
		{
			super.Setup(file_name, count);
		}
		public Destroy():void
		{
			super.Destroy();	
		}

		public Update():void
		{
			super.Update();
		}

		public Play():void
		{			
			if(StringUtils.IsNullOrEmpty(this.m_SoundFile))return;
			if(SoundManager.Instance.IsCloseEffectSound)return;
			
			if(this.m_SoundChannel == null)
			{
				this.m_SoundChannel = Laya.SoundManager.playMusic(this.m_SoundFile, this.m_PlayCount, LayaHandler.create(this, this.OnPlayComplete), 0);
			}
			this.SetVolume(SoundManager.Instance.EffectSoundVolume);

			super.Play();
		}

		public Stop():void
		{
			super.Stop();
		}

		public Pause():void
		{
			super.Pause();
		}

		public Resume():void
		{
			super.Resume();
		}

		public SetVolume(volume:number):void
		{
			super.SetVolume(volume);
		}
		
		protected OnPlayComplete():void
		{
			super.OnPlayComplete();
		}
	}
}