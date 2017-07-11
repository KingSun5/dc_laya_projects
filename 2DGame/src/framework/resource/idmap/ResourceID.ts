module dc
{    
	/**
     * 字符串
     * @author hannibal
     * @time 20174-7-11
     */
	export class ResourceID
	{

	}
	export enum eClearStrategy
	{
		FIFO = 0,   //先进先出
		FILO,       //先进后出
		LRU,		//最近最少使用
		UN_USED,	//未使用
		ALL,		//清理所有
	}
}