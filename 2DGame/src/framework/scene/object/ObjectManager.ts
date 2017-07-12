module dc
{
    /**
     * 对象管理
     * @author hannibal
     * @time 20174-7-6
     */
    export class ObjectManager extends Singleton
    {
        private m_shareObjID:number = 0;
        private m_DicObject:Object = {};
        private m_DicServerObject:Object = {};
        private m_ListReleaseObject:GameObject[] = [];

        private static instance:ObjectManager = null;
        public static get Instance():ObjectManager
        {
            if(!this.instance)this.instance = new ObjectManager();
            return this.instance;
        }

        public Setup():void
        {

        }

        public Destroy():void
        {

        }

        public Tick(elapse:number, game_frame:number):void
        {
            for(let key in this.m_DicObject)
            {
                let obj:GameObject = this.m_DicObject[key];
                if(obj != null && obj.Active && obj.Update(elapse, game_frame))
                {
                    
                }
                else
                {

                }
            }
        }

	    /*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～对象集合～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
        /**移除对象*/
        public RemoveObject(obj:GameObject, force:boolean):void
        {
            if(obj == null)return;
            if(force)
            {
                this.ReleaseObject(obj);
            }
            else
            {
                obj.SetActive(false);
            }
        }
        /**移除所有对象*/
        public ReleaseAllObject():void
        {
            for(let key in this.m_DicObject)
            {
                this.ReleaseObject(this.m_DicObject[key]);
            }
            this.m_ListReleaseObject.length = 0;
        }
        /**释放对象*/
        private ReleaseObject(obj:GameObject):void
        {
            if(obj == null)return;

            this.DetachObject(obj);
            obj.Destroy();
            obj = null;
        }
        /**加入对象管理器*/
        public AttachObject(obj:GameObject):void
        {
            if(obj == null)return;
            if(this.m_DicObject[obj.ObjectGUID] != null)return;

            this.m_DicObject[obj.ObjectGUID] = obj;

            if(obj.ObjectServerID != "")
            {
			    this.m_DicServerObject[obj.ObjectServerID] = obj;
            }
        }

        public DetachObject(obj:GameObject):void
        {
            if(obj == null)return;

            if(this.m_DicObject[obj.ObjectGUID] != null)delete this.m_DicObject[obj.ObjectGUID];
            if(this.m_DicServerObject[obj.ObjectServerID] != null)delete this.m_DicServerObject[obj.ObjectServerID];
        }

        public ProcessReleaseObject():void
        {
            if(this.m_ListReleaseObject.length == 0)return;

            for(let obj of this.m_ListReleaseObject)
            {
                this.ReleaseObject(obj);
            }

            this.m_ListReleaseObject.length = 0;
        }

	    /*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～get/set～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
        public GetObjectByID(id:number):GameObject
        {
            return this.m_DicObject[id];
        }
        public GetServerObjectByID(id:string):GameObject
        {
            return this.m_DicServerObject[id];
        }

        public ShareObjectGUID():number
        {
            return ++this.m_shareObjID;
        }
    }
}