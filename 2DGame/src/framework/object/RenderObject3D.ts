module dc
{
    /**
     * 显示对象
     * @author hannibal
     * @time 2017-7-12
     */
	export class RenderObject3D extends GameObject
	{
		protected m_RootNode:LayaSprite3D = null;
		protected m_IsLoadComplete:boolean;	//是否准备完成

        constructor()
        {
			super();
        }

        public Init():void
        {
			super.Init();

			this.m_IsLoadComplete = false;
           	this.m_RootNode = new LayaSprite3D();
        }

        public Setup(info:any):void
        {
			super.Setup(info);
        }

        public Destroy():void
        {
			if(this.m_RootNode)
			{
				this.m_RootNode.destroy();
				this.m_RootNode = null;
			}
			super.Destroy();
        }

        public Update():boolean
        {
            return super.Update();     
        }
		/**加载外部资源*/
		public LoadResource(arr_res: Array<{ url:string, type:string}>):void
		{
			ResourceManager.Instance.LoadArrayRes(arr_res, LayaHandler.create(this, this.OnLoadComplete));
		}
		/**加载完成回调*/
		protected OnLoadComplete(args:Array<string>):void
		{
			this.m_IsLoadComplete = true;
		}
		/**位置*/
		public SetPosition(x:number, y:number, z:number):void
		{
			this.m_RootNode.transform.localPosition = new Vector3(x, y, z);
		}
		/**是否可见*/
		public SetVisible(b:boolean):void
		{
			this.m_RootNode.active = b;
		}
		/**移除所有子节点*/
		public RemoveAllChild():void
		{
			while(this.m_RootNode._childs.length > 0)
			{
				this.m_RootNode.removeChildAt(0);
			}
		}
		public get IsVisible():boolean
		{
			return this.m_RootNode.active;
		}
		public get IsLoadComplete():boolean
		{
			return this.m_IsLoadComplete;
		}	
		public get Position():Vector3
		{
			return this.m_RootNode.transform.position;
		}	
		public get x():number
		{
			return this.m_RootNode.transform.position.x;
		}		
		public get y():number
		{
			return this.m_RootNode.transform.position.y;
		}		
		public get z():number
		{
			return this.m_RootNode.transform.position.z;
		}	
		public get RootNode():LayaSprite3D
		{
			return this.m_RootNode;
		}
	}
}