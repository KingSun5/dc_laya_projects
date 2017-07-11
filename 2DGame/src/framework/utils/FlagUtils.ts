module dc
{
    /**
     * 位操作
     * @author hannibal
     * @time 20174-7-11
     */
	export class FlagUtils
	{
		public static HasFlag(a:number, b:number):boolean
		{
			return ((a & b) ==0) ? false : true;
		}

		public static InsertFlag(a:number, b:number):number
		{
			a |= b;
			return a;
		}
		public static RemoveFlag(a:number, b:number):number
		{
			a ^= b;
			return a;
		}
	}
}