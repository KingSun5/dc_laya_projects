module dc
{
    /**
     * 游戏对象基类
     * @author hannibal
     * @time 2017-7-6
     */
    export class GameObject implements IPoolsObject, IObject, IComponentObject, IPauseObject
    {
        protected m_Active:boolean        //是否激活中
        protected m_ObjectType:string;    //对象类型
        protected m_ObjectGUID:number;    //对象唯一ID
        protected m_ObjectServerID:string;//服务器id在客户端的备份

        protected m_Observer:EventDispatcher = null;
        protected m_Component:ComponentCenter = null;

        constructor()
        {
            this.m_Observer = new EventDispatcher(); 
            this.m_Component = new ComponentCenter();
        }

        public Init():void
        {
            this.m_ObjectGUID = ObjectManager.Instance.ShareObjectGUID(); 
            this.m_Active = true;
            this.m_ObjectType = "";
            this.m_ObjectServerID = ""; 
        }

        public Setup(info:any):void
        {
            this.m_Component.Setup();
            this.RegisterEvent();
        }

        public Destroy():void
        {
            this.m_Active = false;
            this.m_Observer.Clear();
            this.UnRegisterEvent();
            this.m_Component.Destroy();
        }

        public Update():boolean
        {
            if(this.m_Active)
            {
                this.m_Component.Update();
            }
            return true;     
        }
        /**注册事件*/
        protected RegisterEvent():void
        {
        }
        protected UnRegisterEvent():void
        {
        }

        public SetActive(b:boolean)
        {
            let old:boolean = this.m_Active;
            this.m_Active = b;
            if(old != this.m_Active)
            {
                this.m_Component.OnChangeActive(this.m_Active);
            }
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

        }

		/**暂停结束时会调用该方法*/
		public OnPauseExit():void
        {
            
        }
        //～～～～～～～～～～～～～～～～～～～～～～～get/set～～～～～～～～～～～～～～～～～～～～～～～//
        public get Active():boolean
        {
            return this.m_Active;
        }
        public get ObjectGUID():number
        {
            return this.m_ObjectGUID;
        }
        public get ObjectServerID():string
        {
            return this.m_ObjectServerID;
        }
        public set ObjectServerID(id:string)
        {
            this.m_ObjectServerID = id;
        }

        public get ObjectType():string
        {
            return this.m_ObjectType;
        }
        public set ObjectType(type:string)
        {
            this.ObjectType = type;
        }
        public get Observer():EventDispatcher
        {
            return this.m_Observer;
        }
    }
}