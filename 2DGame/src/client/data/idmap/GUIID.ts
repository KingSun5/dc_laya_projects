module dc
{
	/**
     * ui 界面id
     * @author hannibal
     * @time 20174-7-19
     * 命名规则：
     * 1.大的模块之间预留100的id空间
     */	
	export class GUIID
	{
		public static readonly ID_LOGIN:number						= 1000;	// 登陆
	}

    export enum eUILayer
    {
        LAYER_ID_BACK = 0,      // 界面背景
        LAYER_ID_VIEW,          // 全屏界面，会弹出子界面的界面
        LAYER_ID_DIALOG,        // 弹出式界面
        LAYER_ID_TOP,           // 对话框等界面
        LAYER_ID_MAX,
    }
}