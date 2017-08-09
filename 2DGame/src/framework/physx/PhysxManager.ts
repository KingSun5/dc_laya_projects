module dc
{
	/**
     * 物理引擎管理器
     * @author hannibal
     * @time 2017-8-9
     */
	export class PhysxManager extends Singleton
	{
        private static instance:PhysxManager = null;
        public static get Instance():PhysxManager
        {
            if(!this.instance)this.instance = new PhysxManager();
            return this.instance;
        }
		
		public Setup():void
		{
		}
		public Destroy():void
		{
			
		}
		public Tick():void
		{

		}
	}
}