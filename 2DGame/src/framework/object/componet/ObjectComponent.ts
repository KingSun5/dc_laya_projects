module dc
{	
	/**
     * 对象组件基类
     * @author hannibal
     * @time 2017-8-2
     */
	export class ObjectComponent implements IComponent
	{
		public Start():void{}
		public OnEnable():void{}
		public OnDisable():void{}
		public Update():void{}
		public OnDestroy():void{}
	}
}