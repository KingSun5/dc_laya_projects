module dc
{
    /**
     * 声音播放基类
     * @author hannibal
     * @time 2017-7-11
     */
	export class Sound implements IPoolsObject
	{
		protected m_Active:boolean;
		protected m_SoundFile:string;
		protected m_IsPlaying:boolean;
		protected m_PlayCount:number;
		protected m_SoundChannel:Laya.SoundChannel = null;

        public Init():void
        {

        }

		public Setup(file_name:string, count:number):void
		{
			this.m_Active = true;
			this.m_SoundFile = file_name;
			this.m_PlayCount = count;
			this.m_IsPlaying = false;
			this.m_SoundChannel = null;
			this.LoadResource();
		}
		public Destroy():void
		{
			this.m_Active = false;
			if(this.m_SoundChannel != null)
			{
				this.m_SoundChannel.stop();
				this.m_SoundChannel = null;
			}
			ObjectPools.Recover(this);
		}

		public Update():void
		{

		}

		public Play():void
		{			
			if(this.m_SoundChannel != null)
			{
				this.m_SoundChannel.play();
			}
			this.m_IsPlaying = true;
		}

		public Stop():void
		{
			if(this.m_SoundChannel != null)
			{
				this.m_SoundChannel.stop();
			}
		}

		public Pause():void
		{
			if(this.m_SoundChannel != null)
			{
				this.m_SoundChannel.pause();
			}
		}

		public Resume():void
		{
			if(this.m_SoundChannel != null)
			{
				this.m_SoundChannel.resume();
			}
		}

		public SetVolume(volume:number):void
		{
			if(this.m_SoundChannel != null)
			{
				this.m_SoundChannel.volume = volume;
			}
		}

		private LoadResource():void
		{
			ResourceManager.Instance.AddAsync(this.m_SoundFile, Laya.Loader.SOUND, this, this.OnLoadComplete);
		}

		private OnLoadComplete():void
		{
			if(!this.m_Active)return;

			this.Play();
		}

		protected OnPlayComplete():void
		{
			this.Destroy();
		}

		public IsPlaying():boolean
		{
			return this.m_IsPlaying;
		}
	}
}