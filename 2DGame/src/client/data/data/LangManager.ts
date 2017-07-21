module dc
{
	/**
     * 多语言
     * @author hannibal
     * @time 20174-7-9
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
    
		public Setup():void
        {
            this.m_ListTables =  [
                new ConfigTemplate("data/lang/text/lang.json", "lang", "key"),
            ];
        }
        public Destroy():void
        {

        }
        /**开始加载*/
		public LoadAll():void
		{
            DataProvider.Load(this.m_ListTables);
		}
        /**清空*/
        public UnloadAll():void
        {
        } 
        public get ListTables():Array<ConfigTemplate>
        {
            return this.m_ListTables;
        }   

        public SetLang(type:eLangType):void
        {
            if(type == this.m_CurLangType)return;

            this.m_CurLangType = type;
            EventController.DispatchEvent(UIEvent.Lang, this.m_CurLangType);
        }
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
            }
        }
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