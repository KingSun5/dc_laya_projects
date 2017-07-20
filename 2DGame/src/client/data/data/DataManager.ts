module dc
{
	/**
     * 数据管理器
     * @author hannibal
     * @time 20174-7-9
     */
	export class DataManager extends Singleton
	{
        private static instance:DataManager = null;
        public static get Instance():DataManager
        {
            if(!this.instance)this.instance = new DataManager();
            return this.instance;
        }

		/**初始化数据*/
        public Setup():void
        {
            LangManager.Instance.Setup();
            LoginDataMgr.Instance.Setup();
        }
		/**释放数据*/
        public Destroy():void
        {
            LangManager.Instance.Destroy();
            LoginDataMgr.Instance.Destroy();
        }
	}
}