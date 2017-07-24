module dc
{
    /**
     * json配置表
     * @author hannibal
     * @time 2017-7-11
     */	
	export class DataProvider extends Singleton
	{
        private m_DicTemplate:SDictionary<ConfigTemplate> = null;
        private m_DicData:SDictionary<any> = null;

        private static instance:DataProvider = null;
        public static get Instance():DataProvider
        {
            if(!this.instance)this.instance = new DataProvider();
            return this.instance;
        }

        public Setup():void
        {
            this.m_DicTemplate = new SDictionary<ConfigTemplate>();
            this.m_DicData = new SDictionary<any>();
        }
        public Destroy():void
        {
            this.UnloadAll();
            this.m_DicTemplate.Clear();
            this.m_DicData.Clear();
            this.m_DicTemplate = null;
            this.m_DicData = null;
        }
    
        public Load(list:ConfigTemplate[]):void
        {
            let res:ConfigTemplate;
            for(let i = 0; i < list.length; ++i)
            {
                res = list[i];
                this.m_DicTemplate.Add(res.url, res);
                ResourceManager.Instance.LoadRes(res.url, Laya.Loader.JSON, LayaHandler.create(this, this.OnLoadComplete));
            }
        }
        public Unload(url:string):void
        {   
            let template = this.m_DicTemplate.GetValue(url);
            if(template)
            {
                this.m_DicData.Remove(template.name);
            }
            ResourceManager.Instance.ClearRes(url);
            this.m_DicTemplate.Remove(url);
        }
        public UnloadAll():void
        {
            if(!this.m_DicTemplate)return;
            
            this.m_DicTemplate.Foreach(function(key, value)
            {
                this.Unload(key);
                return true;
            });
            this.m_DicData.Clear();
            this.m_DicTemplate.Clear();
        }

        /**返回表*/
        public GetConfig(table:string):any
        {
            let data = this.m_DicData.GetValue(table);
            return data;
        }
        /**返回一行*/
        public GetInfo(table:string, key:any):any
        {
            let data = this.m_DicData.GetValue(table);
            if(data)
            {
                let info = data[key];
                return info;
            }
            return null;
        }

        private OnLoadComplete(url:string):void
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