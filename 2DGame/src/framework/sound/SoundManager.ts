module dc
{
    /**
     * 声音管理器
     * @author hannibal
     * @time 2017-7-8
     */
    export class SoundManager extends Singleton
    {
        private m_IsCloseBGSound = false;
        private m_IsCloseEffectSound = false;
        private m_IsCloseVoiceSound = false;
        private m_BGSoundVolume = 1;
        private m_EffectSoundVolume = 1;
        private m_VoiceSoundVolume = 1;
        private m_ShareObjID:number = 0;

        private m_CurBGSound:BGSound = null;    //背景声音
        private m_DicEffectSound:NDictionary<Sound> = null; //特效声音

        private static instance:SoundManager = null;
        public static get Instance():SoundManager
        {
            if(!this.instance)this.instance = new SoundManager();
            return this.instance;
        }

        constructor()
        {
            super();
            this.m_DicEffectSound = new NDictionary<Sound>();
        }

        public Setup():void
        {
            this.RegisterEvent();
        }

        public Destroy():void
        {
            this.RemoveAll();
            this.UnRegisterEvent();
        }

        public Tick():void
        {
            
        }
        
        /**清理所有，一般是场景切换时执行*/
        public RemoveAll():void
        {
            if(this.m_CurBGSound)
            {
                this.RemoveSound(this.m_CurBGSound.ObjectUID);
            }
        }

        /**删除一个声音，一般是声音播放完成后调用*/
        public RemoveSound(id:number)
        {
            if(this.m_CurBGSound && this.m_CurBGSound.ObjectUID == id)
            {
                this.m_CurBGSound.Destroy();
                ObjectPools.Recover(this.m_CurBGSound);
                this.m_CurBGSound = null;
            }
            else
            {
                let sound:Sound = this.m_DicEffectSound.GetValue(id);
                if(sound)
                {
                    sound.Destroy();
                    ObjectPools.Recover(sound);
                }
                this.m_DicEffectSound.Remove(id);
            }
        }
        
        /**暂停游戏*/
        public PauseGame():void
        {            
            this.StopBGSound();
            this.m_DicEffectSound.Foreach(function(key, value)
            {
                value.Stop();
                return true;
            });

            if(this.m_CurBGSound)
            {
                this.m_CurBGSound.OnPauseEnter();
            }
            this.m_DicEffectSound.Foreach(function(key, value)
            {
                value.OnPauseEnter();
                return true;
            });
        }
		/**结束暂停*/
		public ResumeGame():void
        {
            this.ResumeBGSound();
            this.m_DicEffectSound.Foreach(function(key, value)
            {
                value.Resume();
                return true;
            });
            
            if(this.m_CurBGSound)
            {
                this.m_CurBGSound.OnPauseExit();
            }
            this.m_DicEffectSound.Foreach(function(key, value)
            {
                value.OnPauseExit();
                return true;
            });
        }
        
        /*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～背景声音～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/ 
         /**
         * 播放背景声音
         * @param	file_name	资源
         * @param	count	    播放次数
         */
        public PlayBGSound(file_name:string, count:number):BGSound
        {
            if(this.m_CurBGSound == null)
            {
                this.m_CurBGSound = new BGSound();
                this.m_CurBGSound.ObjectUID = this.ShareGUID();
            }
            
            this.m_CurBGSound.Setup({file:file_name, time:count});

            return this.m_CurBGSound;
        }
        public StopBGSound():void
        {
            if(this.m_CurBGSound)
            {
                this.m_CurBGSound.Stop();
            }
        }
        public PauseBGSound():void
        {
            if(this.m_CurBGSound)
            {
                this.m_CurBGSound.Pause();
            }
        }
        public ResumeBGSound():void
        {
            if(this.m_CurBGSound)
            {
                this.m_CurBGSound.Resume();
            }  
        }
        public SetBGSoundVolume(volume:number):void
        {
            if(this.m_CurBGSound)
            {
                this.m_CurBGSound.SetVolume(volume);
            }
        }
        /*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～音效～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*//**
         * 播放效果声音
         * @param	file_name	资源
         * @param	count	    播放次数
         */
        public PlaySoundEffect(file_name:string, count:number):EffectSound
        {
            let sound:EffectSound = ObjectPools.Get(EffectSound);
            sound.ObjectUID = this.ShareGUID();
            sound.Setup({file:file_name, time:count});

            return sound;
        }
        public StopSoundEffect(sound:EffectSound):void
        {
            if(sound)
            {
                sound.Stop();
            }
        }
        /*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～事件～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
        private RegisterEvent():void
        {
            EventController.AddEventListener(SoundEvent.SWITCH_BG_SOUND, this, this.OnSoundEvent);
            EventController.AddEventListener(SoundEvent.SWITCH_EFFECT_SOUND, this, this.OnSoundEvent);
            EventController.AddEventListener(SoundEvent.SWITCH_CHAT_SOUND, this, this.OnSoundEvent);
            EventController.AddEventListener(SoundEvent.ADJUST_BG_VOLUME, this, this.OnSoundEvent);
            EventController.AddEventListener(SoundEvent.ADJUST_EFFECT_VOLUME, this, this.OnSoundEvent);
            EventController.AddEventListener(SoundEvent.ADJUST_CHAT_VOLUME, this, this.OnSoundEvent);
        }
        private UnRegisterEvent():void
        {
            EventController.RemoveEventListener(SoundEvent.SWITCH_BG_SOUND, this, this.OnSoundEvent);
            EventController.RemoveEventListener(SoundEvent.SWITCH_EFFECT_SOUND, this, this.OnSoundEvent);
            EventController.RemoveEventListener(SoundEvent.SWITCH_CHAT_SOUND, this, this.OnSoundEvent);
            EventController.RemoveEventListener(SoundEvent.ADJUST_BG_VOLUME, this, this.OnSoundEvent);
            EventController.RemoveEventListener(SoundEvent.ADJUST_EFFECT_VOLUME, this, this.OnSoundEvent);
            EventController.RemoveEventListener(SoundEvent.ADJUST_CHAT_VOLUME, this, this.OnSoundEvent);
        }
        private OnSoundEvent(evt:EventArgs):void
        {
            let evt_type:string = evt.Type;
            switch(evt_type)
            {
                case SoundEvent.SWITCH_BG_SOUND:
                    this.m_IsCloseBGSound = evt.Get(0) == 0 ? true : false;
                    if(this.m_IsCloseBGSound)
                        this.PauseBGSound();
                    else
                        this.ResumeBGSound();
                    break;

                case SoundEvent.SWITCH_EFFECT_SOUND:
                    this.m_IsCloseEffectSound = evt.Get(0) == 0 ? true : false;
                    break;

                case SoundEvent.SWITCH_CHAT_SOUND:
                    // 语音开关
                    break;

                case SoundEvent.ADJUST_BG_VOLUME:
                    this.m_BGSoundVolume = evt.Get(0);
                    this.m_BGSoundVolume = MathUtils.Clamp(this.m_BGSoundVolume, 0, 1);
                    this.SetBGSoundVolume(this.m_BGSoundVolume);
                    break;

                case SoundEvent.ADJUST_EFFECT_VOLUME:
                    this.m_EffectSoundVolume = evt.Get(0);
                    this.m_EffectSoundVolume = MathUtils.Clamp(this.m_EffectSoundVolume, 0, 1);
                    break;

                case SoundEvent.ADJUST_CHAT_VOLUME:
                    // 语音音量大小
                    break;
            }
        }  
        /*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～get/set～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/   

        public ShareGUID():number
        {
            return ++this.m_ShareObjID;
        }        
        public get IsCloseBGSound():boolean
        {
            return this.m_IsCloseBGSound;
        }
        public get IsCloseEffectSound():boolean
        {
            return this.m_IsCloseBGSound;
        }
        public get IsCloseVoiceSound():boolean
        {
            return this.m_IsCloseBGSound;
        }
        public get BGSoundVolume():number
        {
            return this.m_BGSoundVolume;
        }
        public get EffectSoundVolume():number
        {
            return this.m_EffectSoundVolume;
        }
        public get VoiceSoundVolume():number
        {
            return this.m_VoiceSoundVolume;
        }        
    }
}