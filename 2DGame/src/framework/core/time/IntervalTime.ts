module dc
{
    /**
     * 定时执行
     * @author hannibal
     * @time 2017-7-11
     */	
	export class IntervalTime
	{
		private m_interval_time:number;//毫秒
		private m_now_time:number;

		constructor()
		{
			this.m_now_time = 0;
		}
         /**
         * 初始化定时器
         * @param	interval	触发间隔
         * @param	first_frame	是否第一帧开始执行
         */
		public Init(interval:number, first_frame:boolean):void
		{
			this.m_interval_time = interval;
			if (first_frame) this.m_now_time = this.m_interval_time;
		}

		public Reset():void
		{
			this.m_now_time = 0;
		}

		public Update(elapse_time:number):boolean
		{
			this.m_now_time += elapse_time;
			if (this.m_now_time >= this.m_interval_time)
			{
				this.m_now_time -= this.m_interval_time;
				return true;
			}
			return false;
		}
	}
}