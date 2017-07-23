module dc
{
    /**
     * 寻路
     * @author hannibal
     * @time 2017-7-12
     */
	export class PathFinderID
	{		
		/**默认最大搜索次数*/
		public static MAX_DEFAULT_SEARCH_COUNT:number = 1000;
		/**
		* 节点类型：也是寻路代价
		*/	
		public static DEFAULT:number = 0;	//默认   可走，陆地
		public static GRASS:number = 5;		//权重5  可走，草地
		public static OBSTACLE:number = 10;	//不可走
	}
	/**
	 * 寻路结果 
	 */		
	export enum eFinderResult
	{
		FAILED,				//失败
		SUCCEEDED,			//成功
		SUCCEEDED_NEAREST,	//没有找到目标点，而是比较靠近目标的点
	}
}