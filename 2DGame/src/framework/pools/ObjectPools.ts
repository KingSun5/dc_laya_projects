module dc
{
	 /**
     * 对象缓存
     * @author hannibal
     * @time 20174-7-11
     */
	export class ObjectPools
	{
        public static Get(classDef: any):any
        {
            let sign:string = "dc." + classDef.name;
            let obj:any = Laya.Pool.getItem(sign);
            if(obj == null)
            {
                if(Laya.ClassUtils.getRegClass(sign) == null)
                {
                    Log.Debug("[pools]注册对象池:" + sign);
                    Laya.ClassUtils.regClass(sign, classDef);
                }
                obj = Laya.ClassUtils.getInstance(sign);
            }
            return obj;
        }

        public static Recover(obj: any):void
        {
            if(obj == null)return;

            let proto:any = Object.getPrototypeOf(obj);
            let clazz: any = proto["constructor"];
            let sign:string = "dc." + clazz.name;
            Laya.Pool.recover(sign, obj);
        }
	}
}