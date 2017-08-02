module dc
{	
	/**
     * 组件接口
     * @author hannibal
     * @time 2017-8-2
     */
	export interface IComponent
	{
		Start():void;
		OnEnable():void;
		OnDisable():void;
		Update():void;
		OnDestroy():void;
	}
}