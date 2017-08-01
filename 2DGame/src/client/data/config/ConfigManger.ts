module dc
{	
	/**
     * 配置表管理器
     * @author hannibal
     * @time 2017-7-9
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
        public Init():void
        {
            this.m_ListTables =  [
                new ConfigTemplate("data/serverList.json", ConfigTable.serverList, ""),
                new ConfigTemplate("data/configs/global.json", ConfigTable.global, "Name"),
                // new ConfigTemplate("data/configs/BuffInfo.json", ConfigTable.BuffInfo, "Name"),
                // new ConfigTemplate("data/configs/FeatureInfo.json", ConfigTable.FeatureInfo, "Name"),
                // new ConfigTemplate("data/configs/WeaponInfo.json", ConfigTable.WeaponInfo, "Name"),
                // new ConfigTemplate("data/configs/BulletInfo.json", ConfigTable.BulletInfo, "Name"),
                // new ConfigTemplate("data/configs/SkillInfo.json", ConfigTable.SkillInfo, "Name"),
                new ConfigTemplate("data/configs/UnitInfo.json", ConfigTable.UnitInfo, "id"),
            ];
        }
		/**释放数据*/
        public Release():void
        {
            if(!this.m_ListTables)return;

            for(let info of this.m_ListTables)
            {
                DataProvider.Instance.Unload(info.url);
            }
            ArrayUtils.Clear(this.m_ListTables);
            this.m_ListTables = null;
        }
        /**开始加载*/
		public LoadAll():void
		{
            if(this.m_ListTables.length > 0)
                DataProvider.Instance.Load(this.m_ListTables);
		}

        public GetInfo(table:string, key:any):any
        {
            let info = DataProvider.Instance.GetInfo(table, key);
            return info;
        }
        /**定义需要前期加载的资源*/
        public get PreLoadRes():Array<{url:string, type:string}>
        {
            return [
                {url:"data/serverList.json", type:LayaLoader.JSON},
                {url:"data/configs/global.json", type:LayaLoader.JSON},
                {url:"data/configs/UnitInfo.json", type:LayaLoader.JSON}
            ];
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

        public static BuffInfo:string = "BuffInfo";
        public static FeatureInfo:string = "FeatureInfo";
        public static WeaponInfo:string = "WeaponInfo";
        public static BulletInfo:string = "BulletInfo";
        public static SkillInfo:string = "SkillInfo";
        public static UnitInfo:string = "UnitInfo";
    }
}