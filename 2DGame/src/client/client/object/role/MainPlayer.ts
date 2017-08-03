module dc
{
	/**
     * 主玩家
     * @author hannibal
     * @time 2017-7-23
     */
	export class MainPlayer extends Player
	{
        /*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～基础方法～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
        public Init():void
        {
			super.Init();
        }

        public Setup(info:any):void
        {
            super.Setup(info);
        }
        public Destroy():void
        {
            super.Destroy();
        }
        public Update():boolean
        {
            return super.Update();
        }
		public SetPosition(x:number, y:number, z:number):void
		{
			super.SetPosition(x, y, z);
			Scene2D.Instance.UpdateCameraPosition(this.x, this.y);
		}
	}
}