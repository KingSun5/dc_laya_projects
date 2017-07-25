module dc
{
	/**
     * ui 界面id
     * @author hannibal
     * @time 2017-7-19
     * 命名规则：
     * 1.大的模块之间预留100的id空间
     */	
	export class GUIID
	{
        public static readonly ALERT_VIEW:number				    = 1;	    // 弹出对话框
        
        //public static readonly LOAD_VIEW:number				    = 10;	    // 普通加载界面
        //public static readonly FULL_LOAD_VIEW:number				= 11;	    // 全屏加载界面

		public static readonly LOGIN:number						    = 1000;	    // 登陆
		public static readonly SELECT_SERVER:number				    = 1001;	    // 选服
	}

}