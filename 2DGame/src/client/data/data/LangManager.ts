module dc
{
	/**
     * 多语言
     * @author hannibal
     * @time 2017-7-9
     */
	export class LangManager extends Singleton
	{
        private m_CurLangType:eLangType = eLangType.zh_cn;
        private m_ListTables:Array<ConfigTemplate>;

        private static instance:LangManager = null;
        public static get Instance():LangManager
        {
            if(!this.instance)this.instance = new LangManager();
            return this.instance;
        }
    
		public Init():void
        {
            this.m_ListTables =  [
                new ConfigTemplate("data/lang/text/lang.json", "lang", "key"),
            ];
        }
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
            DataProvider.Instance.Load(this.m_ListTables);
		}

        public get ListTables():Array<ConfigTemplate>
        {
            return this.m_ListTables;
        }   
        /**定义需要前期加载的资源*/
        public get PreLoadRes():Array<{url:string, type:string}>
        {
            return [
                {url:"data/lang/text/lang.json", type:LayaLoader.JSON}
            ];
        }
        /**
         * 切换语言
         * @param type  语言类型
        */
        public SwitchLang(type:eLangType):void
        {
            if(type == this.m_CurLangType)return;

            this.m_CurLangType = type;
            EventController.DispatchEvent(UIEvent.Lang, this.m_CurLangType);
        }
        /**
         * 获取语言包
         * @param   idx     位置
        */
        public GetText(idx:number):string
        {
            let info = DataProvider.Instance.GetInfo("lang", idx);
            let key = this.GetLangFlagByType(this.m_CurLangType);
            return info[key];
        }
        /**当前语言类型*/
        public GetCurLang():eLangType
        {
            return this.m_CurLangType;
        }
        public GetLangFlagByType(type:eLangType):string
        {
            switch(type)
            {
                case eLangType.zh_cn:   return "zh-cn";
                case eLangType.zh_tw:   return "zh-tw";
                case eLangType.en:      return "en";
                default:                return "en";
            }
        }
	}
    /**提供简易获取语言包的方式*/
    export function GetLangText(idx:number):string
    {
        return LangManager.Instance.GetText(idx);
    }

    /**
     * 语音类型
    */
    export enum eLangType
    {
        zh_cn,
        zh_tw,
        en,
    }
}