module dc
{
	/**
     * 时间
     * @author hannibal
     * @time 2017-7-11
     */
	export class DateUtils
	{
		/**服务器时间*/
		public static serverTimeDiff:number = 0;

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
	    /**获取UNIX时间 */
		public static GetNow(): number 
		{
			let now: number = Math.floor(Date.now() / 1000);
			return now + this.serverTimeDiff;
		}

		public static IsTheSameMonth(nTime: number, nSecond: number): boolean 
		{
			let now = DateUtils.GetNow();
			let curTime = now - nSecond;
			let date = new Date(curTime * 1000);
			let defineDate: Date = new Date(date.getFullYear(), date.getMonth(), 1);
			let nextTime = Math.floor(defineDate.getTime()/1000) + nSecond;
			return nTime >= nextTime;
		}

		public static IsTheSameDayByNow(nTime: number, nSecond: number): boolean 
		{
			let date = new Date()
			let offset = date.getTimezoneOffset() * 60;
			let now = DateUtils.GetNow();
			let day1 = (nTime - offset - nSecond) / 86400;
			let day2 = (now - offset- nSecond) / 86400;
			if (Math.floor(day1) === Math.floor(day2))
			{
				return true;
			}

			return false;
		}
		
		/**计算从nTime1到nTime2过去了多少天*/
		public static PassedDays(nTime1: number, nTime2: number, nSecondOffset: number = 0): number 
		{
			let date = new Date()
			let offset = date.getTimezoneOffset() * 60;
			let day1 = (nTime1 - offset - nSecondOffset) / 86400;
			let day2 = (nTime2 - offset - nSecondOffset) / 86400;
			return Math.floor(day2) - Math.floor(day1);
		}
	}
}