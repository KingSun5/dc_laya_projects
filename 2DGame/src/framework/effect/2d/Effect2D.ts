module dc
{
    /**
     * 特效
     * @author hannibal
     * @time 2017-7-11
     */	
	export class BaseEffect extends EventDispatcher implements IPoolsObject
	{
        protected m_Active:boolean = false      //是否激活中;
        protected m_ObjectUID:number = 0;       //对象唯一ID
        protected m_TotalTime:number = 0;       //总时长
        protected m_OffsetPos:Vector2 = null;   //位置偏移
        protected m_IsLoadComplete:boolean = false;//是否准备完成

        protected m_RootNode:LayaSprite = null;
        protected m_Animation:LayaAnimation = null;

        constructor()
        {
            super();
            this.m_OffsetPos = Vector2.zero;
            this.m_RootNode = new LayaSprite();
        }

        public Init():void
        {
        }

        public Setup(file:string)
        {
            this.m_Active = true;
            if(this.m_TotalTime > 0)
            {
                TimerManager.Instance.AddOnce(this.m_TotalTime, this, this.OnComponentDestroy)
            }
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
            this.Dispatch(EffectEvent.EFFECT_DESTROY);
        }
        public Update(elapse:number, game_frame:number):boolean
        {
            return true;
        }
        /// <summary>
        /// 加载内部资源
        /// </summary>
        private LoadResource(file:string):boolean
        {
            if(StringUtils.IsNullOrEmpty(file))return false;
            this.m_IsLoadComplete = false;
            ResourceManager.Instance.AddAsync(file, Laya.Loader.ATLAS, this, this.OnLoadComplete);
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
        }
        /// <summary>
        /// 组件自动销毁回调
        /// </summary>
        private OnComponentDestroy()
        {
            this.m_Active = false;
            EffectManager.Instance.RemoveEffect(this.m_ObjectUID);
        }
        public SetParent(node:LayaNode):void
        {
            if(node != null)node.addChild(this.m_RootNode);
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