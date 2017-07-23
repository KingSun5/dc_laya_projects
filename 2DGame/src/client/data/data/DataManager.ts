module dc
{
	/**
     * 数据管理器
     * @author hannibal
     * @time 2017-7-9
     */
	export class DataManager extends Singleton
	{
        private static instance:DataManager = null;
        public static get Instance():DataManager
        {
            if(!this.instance)this.instance = new DataManager();
            return this.instance;
        }

        public Setup():void
        {
        }
        public Destroy():void
        {
        }

        /**在这做数据初始化*/
        public Init():void
        {
            LoginDataMgr.Instance.Init();
        }
        /**在这清空数据*/
        public Release():void
        {
            LoginDataMgr.Instance.Release();
        }
	}
}