module dc
{	
	/**
     * 基础类
     * @author hannibal
     * @time 2017-8-2
     */
    export interface IComponentObject
    {
        AddComponent(classDef:any):ComponentBase;
		RemoveComponent(classDef:any):void;
		RemoveAllComponent():void;
        GetComponent(classDef:any):ComponentBase;
    }
}