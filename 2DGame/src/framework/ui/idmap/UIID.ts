module dc
{
    /**
     * ui
     * @author hannibal
     * @time 20174-7-19
     */
	export class UIID
	{    
		public static DEFAULT_WIDTH:number = 1334;  //标准界面大小
		public static DEFAULT_HEIGHT:number = 750;
	}

	/**
	 * UI层级
	*/
    export enum eUILayer
    {
        LAYER_ID_BACK = 0,      // 界面背景
        LAYER_ID_VIEW,          // 全屏界面，会弹出子界面的界面
        LAYER_ID_DIALOG,        // 弹出式界面
        LAYER_ID_Loader,        // 加载界面
        LAYER_ID_MASK,        	// 遮罩
        LAYER_ID_TOP,        	// 最顶层
        LAYER_ID_MAX,
    }
}