module dc
{
    /**
     * 本地数据
     * @author hannibal
     * @time 20174-7-15
     */
	export class LocalValue
	{
		private static m_GlobalKey:string = "";
		public static SetGlobalKey(key:string):void
		{
			this.m_GlobalKey = key;
		}
		public static Get(key: string):string
		{
			return Laya.LocalStorage.getItem(this.GetFullKey(key));
		}		
		public static Set(key: string, value: string):void
		{
			Laya.LocalStorage.setItem(this.GetFullKey(key), value);
		}
		public static Remove(key:string)
		{
			Laya.LocalStorage.removeItem(this.GetFullKey(key));
		}
		public static Clear():void
		{
			Laya.LocalStorage.clear();
		}
		private static GetFullKey(key:string):string
		{
			return this.m_GlobalKey+"_"+key;
		}
	}
}