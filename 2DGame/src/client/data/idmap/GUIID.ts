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

		public static readonly LOGIN:number						    = 1000;	    // 登陆
		public static readonly SELECT_SERVER:number				    = 1001;	    // 选服
	}

}