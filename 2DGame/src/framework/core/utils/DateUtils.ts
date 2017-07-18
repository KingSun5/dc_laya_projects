module dc
{
	/**
     * 时间
     * @author hannibal
     * @time 20174-7-11
     */
	export class DateUtils
	{
		/**从1970年以来经过的毫秒数*/
		public static get TimeSince1970():number
		{
			let base_date = new Date(1970,1,1,0,0,0,0);
			return (Date.now() - base_date.getTime());
		}
		/**从2009年以来经过的毫秒数*/
		public static get TimeSince2009():number
		{
			let base_date = new Date(2009,1,1,0,0,0,0);
			return (Date.now() - base_date.getTime());
		}
	}
}