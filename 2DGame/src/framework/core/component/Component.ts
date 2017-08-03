module dc
{	
	/**
     * 组件接口
     * @author hannibal
     * @time 2017-8-2
     */
	export class ComponentBase
	{
		/**组件持有者，外部使用时，不要set*/
		public Owner:IObject = null;

		/**添加成功执行：当前帧*/
		public Start():void{}
		/**激活执行：当前帧*/
		public OnEnable():void{}
		/**失效*/
		public OnDisable():void{}
		/**每帧执行*/
		public Update():void{}
		/**销毁执行*/
		public OnDestroy():void{}
	}
}