module dc
{
    /**
     * 特效
     * @author hannibal
     * @time 20174-7-11
     */	
	export class BaseEffect extends EventDispatcher
	{
        protected m_ObjectUID:number = 0;       //对象唯一ID
        protected m_StartTime:number = 0;       //开始激活时间
        protected m_TotalTime:number = 0;       //总时长
        protected m_OffsetPos:Vector2 = null;   //位置偏移
        protected m_Active:boolean = false      //是否激活中;
        protected m_IsLoadComplete:boolean = false;//是否准备完成

        protected m_RootNode:LayaSprite = null;
        protected m_Animation:LayaAnimation = null;

        constructor()
        {
            super();
            this.m_OffsetPos = Vector2.zero;
            this.m_RootNode = new LayaSprite();
        }

        public Setup()
        {
            this.m_Active = true;
            this.m_StartTime = Time.timeSinceStartup;
            this.RegisterEvent();
        }

        public Destroy()
        {
            this.m_Active = false;
            this.UnRegisterEvent();
        }
        /// <summary>
        /// 注册事件
        /// </summary>
        public RegisterEvent()
        {
        }

        public UnRegisterEvent()
        {
        }

        public Update(elapse:number, game_frame:number):boolean
        {
            return true;
        }
        /// <summary>
        /// 加载内部资源
        /// </summary>
        public LoadResource(file:string):boolean
        {
            if(StringUtils.IsNullOrEmpty(file))return false;
            this.m_IsLoadComplete = false;
            ResourceManager.Instance.AddAsync(file, Laya.Loader.JSON, LayaHandler.create(this, this.OnLoadComplete));
        }
        protected OnLoadComplete(url:string):void
        {
            if(!this.m_Active)return;

            this.m_IsLoadComplete = true;
            this.m_Animation = new LayaAnimation();
            this.m_Animation.loadAtlas(url);
            this.m_Animation.play(0, false);
            this.m_RootNode.addChild(this.m_Animation);
            this.m_Animation.pos(this.m_OffsetPos.x, this.m_OffsetPos.y);
        }
        /// <summary>
        /// 组件自动销毁回调
        /// </summary>
        private OnComponentDestroy()
        {
            this.m_Active = false;
            this.Dispatch(EffectEvent.EFFECT_DESTROY);
            EffectManager.Instance.RemoveEffect(this);
        }
        public SetPos(x:number, y:number)
        {
            this.m_RootNode.pos(x, y);
        }
        /// <summary>
        /// 相对于中心点、父节点的偏移值
        /// </summary>
        public SetOffset(x:number, y:number)
        {
            this.m_OffsetPos.Set(x, y);
        }
        public SetVisible(b:boolean):void
        {
            this.m_RootNode.visible = b;
        }
        public get ObjectUID():number
        {
            return this.m_ObjectUID;
        }
        public set ObjectUID(value:number)
        {
            this.m_ObjectUID = value; 
        }
        public get TotalTime():number
        {
            return this.m_TotalTime; 
        }
        public set TotalTime(value:number)
        {
            this.m_TotalTime = value; 
        }
        public get IsLoadComplete():boolean
        {
            return this.m_IsLoadComplete; 
        }
	}
}