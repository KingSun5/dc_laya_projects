module dc
{
    /**
     * ui
     * @author hannibal
     * @time 2017-7-19
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
        BACK = 0,      // 界面背景
        VIEW,          // 全屏界面，会弹出子界面的界面
        DIALOG,        // 弹出式界面
        Loader,        // 加载界面
        MASK,        	// 遮罩
        TOP,        	// 最顶层
        MAX,
    }

    /**
     * 声音事件
    */
	export class UIEvent
	{
		public static OPEN:string       = "OPEN";		//界面打开
		public static CLOSE:string      = "CLOSE";		//界面关闭
        public static Lang:string       = "LANG";       //语音设置改变
	}
}