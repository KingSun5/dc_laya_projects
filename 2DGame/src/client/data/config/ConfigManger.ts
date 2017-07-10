module dc
{	
	/**
     * 配置表管理器
     * @author hannibal
     * @time 20174-7-9
     */
	export class ConfigManger extends Singleton
	{
        private static instance:ConfigManger = null;
        public static get Instance():ConfigManger
        {
            if(!this.instance)this.instance = new ConfigManger();
            return this.instance;
        }

		/**初始化数据*/
        public Setup():void
        {

        }
		/**释放数据*/
        public Destroy():void
        {

        }

		public LoadAll():void
		{
			
		}
	}
}