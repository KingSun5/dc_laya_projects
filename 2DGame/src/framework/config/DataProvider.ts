module dc
{
    /**
     * 配置表
     * @author hannibal
     * @time 20174-7-11
     */	
	export class DataProvider extends Singleton
	{
        private static m_DicTemplate:SDictionary<ConfigTemplate> = new SDictionary<ConfigTemplate>();
        private static m_DicData:SDictionary<any> = new SDictionary<any>();

        public static Load(list:ConfigTemplate[]):void
        {
            let res:ConfigTemplate;
            for(let i = 0; i < list.length; ++i)
            {
                res = list[i];
                this.m_DicTemplate.Add(res.url, res);
                ResourceManager.Instance.AddAsync(res.url, Laya.Loader.JSON, LayaHandler.create(this, this.OnLoadComplete));
            }
        }
        public static Unload(url:string):void
        {   
            let template = this.m_DicTemplate.GetValue(url);
            if(template != null)
            {
                this.m_DicData.Remove(template.name);
            }
            this.m_DicTemplate.Remove(url);
        }

        public static Get(name:string):any
        {
            let data = this.m_DicData.GetValue(name);
            return data;
        }

        private static OnLoadComplete(url:string):void
        {
            Log.Debug("[load]加载配置表:" + url);
            let template = this.m_DicTemplate.GetValue(url);
            if(template != null)
            {
                let json_res = ResourceManager.Instance.GetRes(url);

                if(StringUtils.IsNullOrEmpty(template.key))
                {
                    this.m_DicData.Add(template.name, json_res);
                }
                else
                {
                    
                }
            }
        }
	}
}