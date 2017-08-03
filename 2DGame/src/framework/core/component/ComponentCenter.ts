module dc
{	
	/**
     * 组件管理器
     * @author hannibal
     * @time 2017-8-3
     */
	export class ComponentCenter
	{
        protected m_CompnentList:Array<ComponentBase> = null;

		constructor()
		{
			this.m_CompnentList = new Array<ComponentBase>();
		}

        public Setup():void
        {
        }

        public Destroy():void
        {
            this.RemoveAllComponent();
        }
		
        public Update():boolean
        {    
			for(let c of this.m_CompnentList)
            {
                if(c)c.Update();
            }
            return true;
        }
		public OnChangeActive(b:boolean)
        {
			for(let c of this.m_CompnentList)
			{
				if(c)
				{              
					if(b)c.OnEnable();
					else c.OnDisable();
				}
			}
        }        
        public AddComponent(classDef:any, obj:IObject):ComponentBase
        {
			for(let item of this.m_CompnentList)
            {
                if(item && item instanceof classDef)
                {                
                    Log.Error("相同类型组件以及添加");
                    return null;
                }
            }
            let c:ComponentBase = new classDef();
            if(!c || c instanceof ComponentBase == false)
            {
                Log.Error("组件创建失败，必须继承ComponentBase");
                return null;
            }
            this.m_CompnentList.push(c);
            c.Owner = obj;
            c.Start();
            c.OnEnable();
            return c;
        }
		public RemoveComponent(classDef:any):void
		{
			for(let c of this.m_CompnentList)
            {
                if(c && c instanceof classDef)
                {              
                    c.OnDisable();
                    c.OnDestroy();
                    ArrayUtils.RemoveValue(this.m_CompnentList, c);
                    break;
                }
            }
		}
		public RemoveAllComponent():void
		{
			for(let c of this.m_CompnentList)
            {
                if(c)
                {
                    c.OnDisable();
                    c.OnDestroy();
                }
            }
            ArrayUtils.Clear(this.m_CompnentList);
		}
        public GetComponent(classDef:any):ComponentBase
        {
			for(let c of this.m_CompnentList)
            {
                if(c && c instanceof classDef)
                {              
                    return c;
                }
            }
            return null;
        }
	}
}