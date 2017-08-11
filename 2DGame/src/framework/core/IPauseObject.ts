module dc
{	
	/**
     * 暂停接口
     * @author hannibal
     * @time 2017-8-11
     */
	export interface IPauseObject
	{
		/**暂停开始时会调用该方法*/
		OnPauseEnter():void;

		/**暂停结束时会调用该方法*/
		OnPauseExit():void;
	}
}