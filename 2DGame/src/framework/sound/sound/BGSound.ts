module dc
{
    /**
     * 背景音乐
     * @author hannibal
     * @time 2017-7-11
     */
	export class BGSound extends Sound
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

			if(this.m_SoundChannel == null)
			{
				this.m_SoundChannel = Laya.SoundManager.playSound(this.m_SoundFile, this.m_PlayCount, LayaHandler.create(this, this.OnPlayComplete), null, 0);
			}
			this.SetVolume(SoundManager.Instance.BGSoundVolume);

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