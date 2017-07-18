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

        public static AddEventListener(type:string, caller:any, fun:Function):void
        {
            this.m_Event.AddEventListener(type, caller, fun);
        }

        public static RemoveEventListener(type:string, caller:any, fun:Function):void
        {
            this.m_Event.RemoveEventListener(type, caller, fun);
        }

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