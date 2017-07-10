module dc
{
	export class LoaderAsset
	{
		public ID:number;
		public Url:string;   		//路径
		public Type:string;   		//资源类型
		public Priority: number;	//优先级，0-4，5个优先级，0优先级最高，默认为1。
		public Cache: boolean;		//是否缓存加载结果。
		public Group: string;		//分组，方便对资源进行管理。
		public IgnoreCache: boolean;//是否忽略缓存，强制重新加载
		public Stage:eResLoadStage; //加载状态
		public StartTime:number; 	//放入加载队列时间   
		public Complete:Laya.Handler;

		constructor(url:string, type:string, complete?: Laya.Handler, priority?: number, cache?: boolean, group?: string, ignoreCache?: boolean)
		{
			this.ID = 0;
			this.Url = url;
			this.Type = type;
			this.Priority = priority;
			this.Cache = cache;
			this.Group = group;
			this.IgnoreCache = ignoreCache;
			this.Complete = complete;
			this.Stage = eResLoadStage.UNLOAD;
			this.StartTime = Time.realtimeSinceStartup;
		}
	}
}