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
		protected m_IsVisible:boolean;		//是否可见
		protected m_IsLoadComplete:boolean;	//是否准备完成

        constructor()
        {
			super();
        }

        public Init():void
        {
			super.Init();

			this.m_IsVisible = true;
			this.m_IsLoadComplete = false;
           	this.m_RootNode = new LayaSprite();
        }

        public Setup(info:any):void
        {
			super.Setup(info);
        }

        public Destroy():void
        {
			if(this.m_RootNode)
			{
				this.m_RootNode.removeSelf();
				this.m_RootNode.destroy();
				this.m_RootNode = null;
			}
			super.Destroy();
        }

        public Update(elapse:number, game_frame:number):boolean
        {
            return super.Update(elapse, game_frame);     
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
			this.m_RootNode.pos(x, y);
		}
		/**是否可见*/
		public SetVisible(b:boolean):void
		{
			this.m_RootNode.visible = b;
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
			return this.m_IsVisible;
		}
		public get IsLoadComplete():boolean
		{
			return this.m_IsLoadComplete;
		}	
		public get Position():Vector3
		{
			return new Vector3(this.m_RootNode.x, this.m_RootNode.y, 0);
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
		public get RootNode():LayaSprite
		{
			return this.m_RootNode;
		}
	}
}