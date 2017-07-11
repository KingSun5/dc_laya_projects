module dc
{
	 /**
     * 对象缓存
     * @author hannibal
     * @time 20174-7-11
     */
	export class ObjectPools
	{
        public static Get(sign:string):any
        {
            return Laya.Pool.getItem(sign);
        }

        public static Recover(sign: string, item: any):void
        {
            Laya.Pool.recover(sign, item);
        }
	}
}