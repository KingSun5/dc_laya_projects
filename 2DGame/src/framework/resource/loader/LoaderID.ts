module dc
{
	export class LoaderID
	{
		//加载事件
		public static RESOURCE_LOAD_COMPLATE:string      	= "RESOURCE_LOAD_COMPLATE";                     //资源加载完成
		public static RESOURCE_LOAD_PROGRESS:string      	= "RESOURCE_LOAD_PROGRESS";                     //资源加载进度
		public static RESOURCE_LOAD_FAILED:string        	= "RESOURCE_LOAD_FAILED";                       //资源加载失败
	}
	///加载线程作用方式
	export enum eResLoadThreadType
	{
		SYNC = 0,       //同步
		ASYNC,          //异步
	}
	///资源加载策略
	export enum eResLoadStrategy
	{
		FIFO = 0,       //先进先出
		FILO,           //先进后出
		PRIORITY,       //按照优先级加载: eResPriority 
	}
	///加载状态
	export enum eResLoadStage
	{
		UNLOAD = 0,     //未加载
		LOADING,        //加载中
		LOADED,         //完成
	}
	/// 资源优先级
	export enum eResLoadPriority
	{
		LOWEST = 0,
		LOW,
		NORMAL,
		HIGH,
		HIGHEST,
	}	
}