module dc
{
    /**
     * ui界面接口
     * @author hannibal
     * @time 2017-7-19
     */	
	export interface UIPanelInterface
	{
		/**打开*/
        Open(...args:any[]):void;
        /**关闭：如果是用UIManager打开的，则关闭一定要通过UIManager关闭*/
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