module dc
{
    /**
     * 全局事件
     * @author hannibal
     * @time 20174-7-6
     */
    export class EventController extends Singleton
    {
        private static m_Event:EventDispatcher = new EventDispatcher();
        private static m_EvtArgs:EventArgs = new EventArgs();

        /**
         * 添加监听
         * @param type      事件类型
         * @param caller    调用者
         * @param fun       回调函数，注意回调函数的参数是共用一个，所有不要持有引用[let evt = args;（不建议这样写）]
        */
        public static AddEventListener(type:string, caller:any, fun:Function):void
        {
            this.m_Event.AddEventListener(type, caller, fun);
        }

        /**
         * 移除监听
        */
        public static RemoveEventListener(type:string, caller:any, fun:Function):void
        {
            this.m_Event.RemoveEventListener(type, caller, fun);
        }
        /**
         * 派发事件
        */
        public static DispatchEvent(type:string, ...args:any[]):void
        {
            this.m_EvtArgs.Init(args);
            this.m_Event.DispatchEvent(type, this.m_EvtArgs);
        }
        
        public static Clear():void
        {
            this.m_Event.Clear();
        }
    }
}