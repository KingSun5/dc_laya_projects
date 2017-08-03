module dc
{	
	/**
     * 基础类
     * @author hannibal
     * @time 2017-8-2
     */
	export interface IObject
	{
        Setup(info:any):void;

        Destroy():void;

        Update():boolean;
    }
}