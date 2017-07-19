module dc
{
    /**
     * ui界面接口
     * @author hannibal
     * @time 20174-7-19
     */	
	export interface UIPanelInterface
	{
		/**打开*/
        Open():void;
        /**关闭*/
        Close():void
        /**置顶*/
        SetTopMost():void;
        /**置底*/
        SetBottomMost():void;
        /**是否可见*/
        SetVisible(bVisible: boolean):void 
        /**设置界面唯一id*/
        SetScreenID(id:number):void; 
        Update():void;
	}
}