module dc
{
	 /**
     * 对象缓存
     * 1.如果继承IPoolsObject，并实现Init接口函数；创建时会自动调用Init函数
     * @author hannibal
     * @time 2017-7-11
     */
	export class ObjectPools
	{
        /**
         * 获取一个对象，不存在则创建
         * @param classDef  类名
         */
        public static Get(classDef: any):any
        {
            let sign:string = "dc." + classDef.name;
            let obj:any = Laya.Pool.getItem(sign);
            if(!obj)
            {
                if(!Laya.ClassUtils.getRegClass(sign))
                {
                    Log.Debug("[pools]注册对象池:" + sign);
                    Laya.ClassUtils.regClass(sign, classDef);
                }
                obj = Laya.ClassUtils.getInstance(sign);
            }
            if(obj && obj["Init"])obj.Init();
            return obj;
        }

        /**
         * 回收对象
         * @param obj  对象实例
         */
        public static Recover(obj: any):void
        {
            if(!obj)return;

            let proto:any = Object.getPrototypeOf(obj);
            let clazz: any = proto["constructor"];
            let sign:string = "dc." + clazz.name;
            Laya.Pool.recover(sign, obj);
        }
	}
    /**对象池基类*/
    export interface IPoolsObject
    {
        Init();
    }
}