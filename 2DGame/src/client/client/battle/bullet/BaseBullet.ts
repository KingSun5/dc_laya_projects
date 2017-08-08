module dc
{
	/**
     * 子弹
     * @author hannibal
     * @time 2017-7-14
     */
	export class BaseBullet extends MapObject
	{
        private m_BulletSprite:LayaSprite = null;
        private m_TotalTime:number = 1;
        /*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～基础方法～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
        constructor()
        {
			super();
        }
        public Init():void
        {
			super.Init();
            this.m_TotalTime = 1;
        }

        public Setup(info:any):void
        {
            super.Setup(info);
        }
        public Update():boolean
        {
            let pos:Vector3 = this.Position;
            let offset:Vector3 = Vec3Mul(this.m_Direction, 1000*Time.deltaTime);
            pos = Vec3Add(pos, offset);
            this.SetPosition(pos.x, pos.y, pos.z);

            this.m_TotalTime -= Time.deltaTime;
            if(this.m_TotalTime <= 0)
                return false;

            return super.Update();
        }
        public Destroy():void
        {
            if(this.m_BulletSprite)
            {
                this.m_BulletSprite.destroy();
                this.m_BulletSprite = null;
            }
            super.Destroy();
            ObjectPools.Recover(this);
        }
		/**加载完成回调*/
		protected OnLoadComplete(args:any):void
		{
            this.m_BulletSprite = new LayaSprite();
			this.m_BulletSprite.loadImage(args);
            this.m_BulletSprite.rotation = MathUtils.GetPointDegree(this.m_Direction.x, this.m_Direction.y);
			this.m_RootNode.addChild(this.m_BulletSprite);

			super.OnLoadComplete(args);
		}	        
	}
}