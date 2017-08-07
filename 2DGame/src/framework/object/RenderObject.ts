module dc
{
    /**
     * 显示对象
     * @author hannibal
     * @time 2017-7-12
     */
	export class RenderObject extends GameObject
	{
		protected m_RootNode:LayaSprite = null;
		protected m_IsLoadComplete:boolean;	//是否准备完成
		protected m_Position:Vector3;
		protected m_AligeType:eAligeType;

        constructor()
        {
			super();
        }

        public Init():void
        {
			super.Init();

			this.m_IsLoadComplete = false;
           	this.m_RootNode = new LayaSprite();
			this.m_RootNode.name = "object:" + this.m_ObjectGUID;
			this.m_Position = Vector3.ZERO;
			this.m_AligeType = eAligeType.MID;
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
		protected OnLoadComplete(args:any):void
		{
			this.m_IsLoadComplete = true;
		}
		/**移除所有子节点*/
		public RemoveAllChild():void
		{
			this.m_RootNode.removeChildren();
		}
		public SetAlige(alige:eAligeType):void
		{
			this.m_AligeType = alige;
		}
		/**是否可见*/
		public SetVisible(b:boolean):void
		{
			this.m_RootNode.visible = b;
		}
		public get IsVisible():boolean
		{
			return this.m_RootNode.visible;
		}
		/**位置*/
		public SetPosition(x:number, y:number, z:number):void
		{
			this.m_RootNode.pos(x, y);
		}
		public get Position():Vector3
		{
			this.m_Position.x = this.m_RootNode.x;
			this.m_Position.y = this.m_RootNode.y;
			return this.m_Position;
		}	
		public get x():number
		{
			return this.m_RootNode.x;
		}		
		public get y():number
		{
			return this.m_RootNode.y;
		}		
		public get z():number
		{
			return 0;
		}	
		public SetSize(w:number, h:number):void
		{
			if(w<0 || h<0)return;
			this.m_RootNode.size(w, h);
		}
		public get width():number
		{
			return this.m_RootNode.width;
		}
		public get height():number
		{
			return this.m_RootNode.height;
		}
		public get RootNode():LayaSprite
		{
			return this.m_RootNode;
		}
		public get IsLoadComplete():boolean
		{
			return this.m_IsLoadComplete;
		}	
		public get AligeType():eAligeType
		{
			return this.m_AligeType;
		}
	}
}