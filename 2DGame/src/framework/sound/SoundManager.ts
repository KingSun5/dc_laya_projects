module dc
{
    /**
     * 声音管理器
     * @author hannibal
     * @time 20174-7-8
     */
    export class SoundManager extends Singleton
    {
        private m_CurBGSound:BGSound = null;
        private m_IsCloseBGSound = false;
        private m_IsCloseEffectSound = false;
        private m_IsCloseVoiceSound = false;
        private m_BGSoundVolume = 1;
        private m_EffectSoundVolume = 1;
        private m_VoiceSoundVolume = 1;

        private static instance:SoundManager = null;
        public static get Instance():SoundManager
        {
            if(!this.instance)this.instance = new SoundManager();
            return this.instance;
        }

        public Setup():void
        {
            this.RegisterEvent();
        }

        public Destroy():void
        {
            this.UnRegisterEvent();
        }

        public Tick(elapse:number, game_frame:number):void
        {
            
        }
        /*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～背景声音～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
        public PlayBGSound(file_name:string, count:number):BGSound
        {
            if(this.m_CurBGSound == null)
                this.m_CurBGSound = new BGSound();
            
            this.m_CurBGSound.Setup(file_name, count);

            return this.m_CurBGSound;
        }
        public StopBGSound():void
        {
            if(this.m_CurBGSound != null)
            {
                this.m_CurBGSound.Stop();
            }
        }
        public PauseBGSound():void
        {
            if(this.m_CurBGSound != null)
            {
                this.m_CurBGSound.Pause();
            }
        }
        public ResumeBGSound():void
        {
            if(this.m_CurBGSound != null)
            {
                this.m_CurBGSound.Resume();
            }  
        }
        public SetBGSoundVolume(volume:number):void
        {
            if(this.m_CurBGSound != null)
            {
                this.m_CurBGSound.SetVolume(volume);
            }
        }
        /*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～音效～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
        public PlaySoundEffect(file_name:string, count:number):EffectSound
        {
            var sound:EffectSound = new EffectSound();
            sound.Setup(file_name, count);

            return sound;
        }
        public StopSoundEffect(sound:EffectSound):void
        {
            if(sound != null)
            {
                sound.Stop();
            }
        }
        /*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～事件～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
        private RegisterEvent():void
        {
            EventController.AddEventListener(SoundID.SWITCH_BG_SOUND, this, this.OnSoundEvent);
            EventController.AddEventListener(SoundID.SWITCH_EFFECT_SOUND, this, this.OnSoundEvent);
            EventController.AddEventListener(SoundID.SWITCH_CHAT_SOUND, this, this.OnSoundEvent);
            EventController.AddEventListener(SoundID.ADJUST_BG_VOLUME, this, this.OnSoundEvent);
            EventController.AddEventListener(SoundID.ADJUST_EFFECT_VOLUME, this, this.OnSoundEvent);
            EventController.AddEventListener(SoundID.ADJUST_CHAT_VOLUME, this, this.OnSoundEvent);
        }
        private UnRegisterEvent():void
        {
            EventController.RemoveEventListener(SoundID.SWITCH_BG_SOUND, this, this.OnSoundEvent);
            EventController.RemoveEventListener(SoundID.SWITCH_EFFECT_SOUND, this, this.OnSoundEvent);
            EventController.RemoveEventListener(SoundID.SWITCH_CHAT_SOUND, this, this.OnSoundEvent);
            EventController.RemoveEventListener(SoundID.ADJUST_BG_VOLUME, this, this.OnSoundEvent);
            EventController.RemoveEventListener(SoundID.ADJUST_EFFECT_VOLUME, this, this.OnSoundEvent);
            EventController.RemoveEventListener(SoundID.ADJUST_CHAT_VOLUME, this, this.OnSoundEvent);
        }
        private OnSoundEvent(evt:EventArgs):void
        {
            var evt_type:string = evt.Type;
            switch(evt_type)
            {
                case SoundID.SWITCH_BG_SOUND:
                    this.m_IsCloseBGSound = evt.Get(0) == 0 ? true : false;
                    if(this.m_IsCloseBGSound)
                        this.PauseBGSound();
                    else
                        this.ResumeBGSound();
                    break;

                case SoundID.SWITCH_EFFECT_SOUND:
                    this.m_IsCloseEffectSound = evt.Get(0) == 0 ? true : false;
                    break;

                case SoundID.SWITCH_CHAT_SOUND:
                    // 语音开关
                    break;

                case SoundID.ADJUST_BG_VOLUME:
                    this.m_BGSoundVolume = evt.Get(0);
                    this.m_BGSoundVolume = MathUtils.Clamp(this.m_BGSoundVolume, 0, 1);
                    this.SetBGSoundVolume(this.m_BGSoundVolume);
                    break;

                case SoundID.ADJUST_EFFECT_VOLUME:
                    this.m_EffectSoundVolume = evt.Get(0);
                    this.m_EffectSoundVolume = MathUtils.Clamp(this.m_EffectSoundVolume, 0, 1);
                    break;

                case SoundID.ADJUST_CHAT_VOLUME:
                    // 语音音量大小
                    break;
            }
        }  
        /*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～get/set～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/   
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