module dc
{
    /**
     * 特效
     * @author hannibal
     * @time 2017-7-11
     */	
	export class BaseEffect extends EventDispatcher implements IPoolsObject, IObject, IComponentObject, IPauseObject
	{
        protected m_Active:boolean = false          //是否激活中;
        protected m_ObjectUID:number = 0;           //对象唯一ID
        protected m_TotalTime:number = 0;           //总时长
        protected m_OffsetPos:Vector2 = null;       //位置偏移
        protected m_IsLoadComplete:boolean = false; //是否准备完成

        protected m_RootNode:LayaSprite = null;
        protected m_Animation:LayaAnimation = null;

        protected m_Component:ComponentCenter = null;

        constructor()
        {
            super();
            this.m_OffsetPos = Vector2.ZERO;
            this.m_RootNode = new LayaSprite();
            this.m_Component = new ComponentCenter();
        }

        public Init():void
        {
        }

        public Setup(file:string)
        {
            this.m_Component.Setup();
            this.m_Active = true;
            if(!StringUtils.IsNullOrEmpty(file))
            {
                this.LoadResource(file);
            }
        }
        public Destroy()
        {
            this.m_Active = false;
            if(this.m_Animation != null)
            {
                this.m_Animation.destroy();
                this.m_Animation = null;
            }
            DisplayUtils.RemoveAllChild(this.m_RootNode);
            this.m_RootNode.removeSelf();
            this.m_Component.Destroy();
            this.Dispatch(EffectEvent.EFFECT_DESTROY);
        }
        public Update():boolean
        {
            if(this.m_Active)
            {
                this.m_Component.Update();
            }
            return true;
        }
        /**加载内部资源*/
        private LoadResource(file:string):boolean
        {
            if(StringUtils.IsNullOrEmpty(file))return false;
            this.m_IsLoadComplete = false;
            ResourceManager.Instance.LoadRes(file, Laya.Loader.ATLAS, LayaHandler.create(this, this.OnLoadComplete));
        }
        protected OnLoadComplete(url:string):void
        {
            if(!this.m_Active)return;

            this.m_IsLoadComplete = true;
            this.m_Animation = new LayaAnimation();
            this.m_Animation.loadAtlas(url);
            this.m_Animation.play(1, true);
            this.m_RootNode.addChild(this.m_Animation);
            this.m_Animation.pos(this.m_OffsetPos.x, this.m_OffsetPos.y);
            
            //加载完成后添加事件
            if(this.m_TotalTime > 0)
            {//按指定时间播放
                TimerManager.Instance.AddOnce(this.m_TotalTime, this, this.OnPlayComplete)
            }
            else
            {//单次播放
			    this.m_Animation.on(LayaEvent.COMPLETE, this, this.OnPlayComplete);
            }
        }
		/**动画播放结束*/
		private OnPlayComplete()
		{
            if(!this.m_Active)return;
            
            EffectManager.Instance.RemoveEffect(this.m_ObjectUID);
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
        //～～～～～～～～～～～～～～～～～～～～～～～暂停～～～～～～～～～～～～～～～～～～～～～～～//
        /**暂停开始时会调用该方法*/
		public OnPauseEnter():void
        {
            if(this.m_Animation)
            {
                this.m_Animation.stop();
            }
        }

		/**暂停结束时会调用该方法*/
		public OnPauseExit():void
        {
            if(this.m_Animation)
            {
                this.m_Animation.play(1, true);
            }
        }        
        //～～～～～～～～～～～～～～～～～～～～～～～get/set～～～～～～～～～～～～～～～～～～～～～～～//        
        public SetParent(node:LayaNode):void
        {
            if(node)node.addChild(this.m_RootNode);
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
            Vec2Set(this.m_OffsetPos, x, y);
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
	/**
     * 挂到其他对象上的特效
     * @author hannibal
     * @time 2017-7-11
     */	
	export class JoinEffect extends BaseEffect
	{        
        public Setup(file:string)
        {
            super.Setup(file);
        }

        public Destroy()
        {
            super.Destroy();
        }
	}  
    /**
     * ui界面特效
     * @author hannibal
     * @time 2017-7-11
     */	
	export class UIEffect extends BaseEffect
	{
        public Setup(file:string)
        {
            super.Setup(file);
        }

        public Destroy()
        {
            super.Destroy();
        }
	}      
}