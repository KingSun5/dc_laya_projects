module dc
{
	/**
     * 子弹
     * @author hannibal
     * @time 2017-7-14
     */
	export class BaseBullet extends MapObject
	{
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
	}
}