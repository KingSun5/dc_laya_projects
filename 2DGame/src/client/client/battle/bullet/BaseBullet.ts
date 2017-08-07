module dc
{
	/**
     * 子弹
     * @author hannibal
     * @time 2017-7-14
     */
	export class BaseBullet extends MapObject
	{
        private m_Image:LayaSprite = null;
        /*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～基础方法～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
        constructor()
        {
			super();
        }
        public Init():void
        {
			super.Init();
        }

        public Setup(info:any):void
        {
            super.Setup(info);
        }
        public Update():boolean
        {
            return super.Update();
        }
        public Destroy():void
        {
            super.Destroy();
        }
		/**加载完成回调*/
		protected OnLoadComplete(args:any):void
		{
            this.m_Image = new LayaSprite();
			this.m_Image.loadImage(args);
			this.m_RootNode.addChild(this.m_Image);

			super.OnLoadComplete(args);
		}	        
	}
}