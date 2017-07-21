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
            if(template)
            {
                this.m_DicData.Remove(template.name);
            }
            this.m_DicTemplate.Remove(url);
        }
        public static UnloadAll():void
        {
            this.m_DicData.Clear();
            this.m_DicTemplate.Clear();
        }

        /**返回表*/
        public static GetConfig(table:string):any
        {
            let data = this.m_DicData.GetValue(table);
            return data;
        }
        /**返回一行*/
        public static GetInfo(table:string, key:any):any
        {
            let data = this.m_DicData.GetValue(table);
            if(data)
            {
                let info = data[key];
                return info;
            }
            return null;
        }

        private static OnLoadComplete(url:string):void
        {
            Log.Debug("[load]加载配置表:" + url);
            let template = this.m_DicTemplate.GetValue(url);
            if(template)
            {
                let json_res = ResourceManager.Instance.GetRes(url);

                if(StringUtils.IsNullOrEmpty(template.key))
                {
                    this.m_DicData.Add(template.name, json_res);
                }
                else
                {
                    let map = {};
                    let sValue;
                    let sData;
                    let i = 0;
                    while(json_res[i])
                    {
                        sData = json_res[i];
                        sValue = sData[template.key];
                        assertNullOrNil(sValue, "配置表解析错误:" + template.url);
                        map[sValue] = sData;

                        i++;
                    }
                    this.m_DicData.Add(template.name, map);
                }
            }
        }
	}
}