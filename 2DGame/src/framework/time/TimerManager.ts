module dc
{
    /**
     * 定时器
     * @author hannibal
     * @time 20174-7-11
     */
	export class TimerManager extends Singleton
	{
        private m_idCounter:number = 0;
        private m_RemovalPending:number[] = [];
        private m_Timers:TimerEntity[] = [];

        private static instance:TimerManager = null;
        public static get Instance():TimerManager
        {
            if(!this.instance)this.instance = new TimerManager();
            return this.instance;
        }

        public Setup():void
        {
            this.m_idCounter = 0;
        }

        public Destroy():void
        {
            ArrayUtils.Clear(this.m_RemovalPending);
            ArrayUtils.Clear(this.m_Timers);
        }

        public Tick(elapse:number, game_frame:number):void
        {
            this.Remove();

            for (let i = 0; i < this.m_Timers.length; i++)
            {
                this.m_Timers[i].Update(elapse);
            }
        }
        /**
         * 定时重复执行。
         * @param	rate	间隔时间(单位毫秒)。
         * @param	ticks	执行次数
         * @param	caller	执行域(this)。
         * @param	method	定时器回调函数。
         * @param	args	回调参数。
         */
        public AddTimer(rate: number, ticks:number, caller: any, method: Function, args?: Array<any>):number
        {
            if (ticks <= 0) ticks = 0;
            let newTimer:TimerEntity = ObjectPools.Get(TimerEntity);
            newTimer.Set(++this.m_idCounter, rate, ticks, Laya.Handler.create(caller, method, args, false));
            this.m_Timers.push(newTimer);
            return newTimer.id;
        }    
        /// <summary>
        /// 移除定时器
        /// </summary>
        /// <param name="timerId">Timer GUID</param>
        public RemoveTimer(timerId:number):void
        { 
            this.m_RemovalPending.push(timerId);
        }

        /// <summary>
        /// 移除过期定时器
        /// </summary>
        private Remove():void
        {
            if (this.m_RemovalPending.length > 0)
            {
                for (let id of this.m_RemovalPending)
                {
                    for (let i = 0; i < this.m_Timers.length; i++)
                    {
                        if (this.m_Timers[i].id == id)
                        {
                            this.m_Timers.splice(i, 1);
                            break;
                        }
                    }
                }

                ArrayUtils.Clear(this.m_RemovalPending);
            }
        }  
	}

    class TimerEntity
    {
        public id:number;
        public isActive:boolean;

        public mRate:number;
        public mTicks:number;
        public mTicksElapsed:number;
        public handle:Laya.Handler;

        public mTime:IntervalTime;

        constructor()
        {
            this.mTime = new IntervalTime();
        }

        public Set(id:number, rate:number, ticks:number, handle:Laya.Handler)
        {
            this.id = id;
            this.mRate = rate < 0 ? 0 : rate;
            this.mTicks = ticks < 0 ? 0 : ticks;
            this.handle = handle;
            this.mTicksElapsed = 0;
            this.isActive = true;
            this.mTime.Init(this.mRate, false);
        }

        public Update(elapse:number):void
        {
            if (this.isActive && this.mTime.Update(elapse))
            {
                if(this.handle != null)this.handle.run();

                this.mTicksElapsed++;
                if (this.mTicks > 0 && this.mTicks == this.mTicksElapsed)
                {
                    this.isActive = false;
                    TimerManager.Instance.RemoveTimer(this.id);
                }
            }
        }
    }
}