module dc
{	
	/**
     * 配置表管理器
     * @author hannibal
     * @time 20174-7-9
     */
	export class ConfigManger extends Singleton
	{
        private m_ListTables:Array<ConfigTemplate>;

        private static instance:ConfigManger = null;
        public static get Instance():ConfigManger
        {
            if(!this.instance)this.instance = new ConfigManger();
            return this.instance;
        }

		/**初始化数据*/
        public Setup():void
        {
            this.m_ListTables =  [
                new ConfigTemplate("data/serverList.json", ConfigTable.serverList, ""),
                new ConfigTemplate("data/configs/global.json", ConfigTable.global, "Name"),
            ];
        }
		/**释放数据*/
        public Destroy():void
        {
            this.UnloadAll();
        }
        /**开始加载*/
		public LoadAll():void
		{
            if(this.m_ListTables.length > 0)
                DataProvider.Load(this.m_ListTables);
		}
        /**清空*/
        public UnloadAll():void
        {
            if(!this.m_ListTables)return;

            for(let info of this.m_ListTables)
            {
                DataProvider.Unload(info.url);
            }
            ArrayUtils.Clear(this.m_ListTables);
        }

        public get ListTables():Array<ConfigTemplate>
        {
            return this.m_ListTables;
        }
	}
    /**
     * 定义所有需要加载的配置表
    */
    export class ConfigTable
    {
        public static global:string = "global";
        public static serverList:string = "serverList";
    }
}