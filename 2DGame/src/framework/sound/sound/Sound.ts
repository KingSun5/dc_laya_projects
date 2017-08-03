module dc
{
    /**
     * 声音播放基类
     * @author hannibal
     * @time 2017-7-11
     */
	export class Sound implements IPoolsObject, IObject, IComponentObject
	{
		protected m_Active:boolean;
		protected m_SoundFile:string;
		protected m_IsPlaying:boolean;
		protected m_PlayCount:number;
		protected m_SoundChannel:Laya.SoundChannel = null;

        protected m_Component:ComponentCenter = null;
		
        constructor()
        { 
            this.m_Component = new ComponentCenter();
        }

        public Init():void
        {

        }

		public Setup(info:any):void
		{
			this.m_Active = true;
			this.m_SoundFile = info.file;
			this.m_PlayCount = info.time;
			this.m_IsPlaying = false;
			this.m_SoundChannel = null;
            this.m_Component.Setup();
			this.LoadResource();
		}
		public Destroy():void
		{
			if(!this.m_Active)return;
			
			this.m_Active = false;
			if(this.m_SoundChannel)
			{
				this.m_SoundChannel.stop();
				this.m_SoundChannel = null;
			}
            this.m_Component.Destroy();
			ObjectPools.Recover(this);
		}

		public Update():boolean
		{
            if(this.m_Active)
            {
                this.m_Component.Update();
            }
			return true;
		}

		public Play():void
		{			
			if(this.m_SoundChannel)
			{
				this.m_SoundChannel.play();
			}
			this.m_IsPlaying = true;
		}

		public Stop():void
		{
			if(this.m_SoundChannel)
			{
				this.m_SoundChannel.stop();
			}
		}

		public Pause():void
		{
			if(this.m_SoundChannel)
			{
				this.m_SoundChannel.pause();
			}
		}

		public Resume():void
		{
			if(this.m_SoundChannel)
			{
				this.m_SoundChannel.resume();
			}
		}

		public SetVolume(volume:number):void
		{
			if(this.m_SoundChannel)
			{
				this.m_SoundChannel.volume = volume;
			}
		}

		private LoadResource():void
		{
			ResourceManager.Instance.LoadRes(this.m_SoundFile, LayaLoader.SOUND, LayaHandler.create(this, this.OnLoadComplete));
		}

		private OnLoadComplete(url:string):void
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
		
        //～～～～～～～～～～～～～～～～～～～～～～～组件～～～～～～～～～～～～～～～～～～～～～～～//
        public AddComponent(classDef:any):ComponentBase
        {
            return this.m_Component.AddComponent(classDef, this);
        }
		public RemoveComponent(classDef:any):void
        {
            this.m_Component.RemoveComponent(classDef);
        }
		public RemoveAllComponent():void
        {
            this.m_Component.RemoveAllComponent();
        }
        public GetComponent(classDef:any):ComponentBase
        {
            return this.m_Component.GetComponent(classDef);
        }
	}
}