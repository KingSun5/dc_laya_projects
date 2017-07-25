module dc
{
    /**
     * 游戏对象基类
     * @author hannibal
     * @time 2017-7-6
     */
    export class GameObject implements IPoolsObject
    {
        protected m_Active:boolean        //是否激活中
        protected m_ObjectType:string;    //对象类型
        protected m_ObjectGUID:number;    //对象唯一ID
        protected m_ObjectServerID:string;//服务器id在客户端的备份

        protected m_Observer:EventDispatcher = null;

        constructor()
        {
             this.m_ObjectGUID = 0; 
             this.m_Observer = new EventDispatcher(); 
        }

        public Init():void
        {
             this.m_Active = true;
             this.m_ObjectType = "";
             this.m_ObjectServerID = ""; 
        }

        public Setup(info:any):void
        {
            this.RegisterEvent();
        }

        public Destroy():void
        {
            this.m_Active = false;
            this.m_Observer.Clear();
            this.UnRegisterEvent();
        }

        public Update(elapse:number, game_frame:number):boolean
        {
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
            this.m_Active = b;
        }

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