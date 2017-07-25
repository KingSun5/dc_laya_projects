module dc
{
    /**
     * 全局事件
     * @author hannibal
     * @time 2017-7-6
     */
    export class EventController extends Singleton
    {
        private m_Event:EventDispatcher = null;
        private m_EvtArgs:EventArgs = null;

        private static instance:EventController = null;
        public static get Instance():EventController
        {
            if(!this.instance)this.instance = new EventController();
            return this.instance;
        }

        constructor()
        {
            super();
            this.m_Event = new EventDispatcher();
            this.m_EvtArgs = new EventArgs();
        }

        /**
         * 添加监听
         * @param type      事件类型
         * @param caller    调用者
         * @param fun       回调函数，注意回调函数的参数是共用一个，所有不要持有引用[let evt = args;（不建议这样写）]
        */
        public static AddEventListener(type:string, caller:any, fun:Function):void
        {
            EventController.Instance.m_Event.AddEventListener(type, caller, fun);
        }

        /**
         * 移除监听
        */
        public static RemoveEventListener(type:string, caller:any, fun:Function):void
        {
            EventController.Instance.m_Event.RemoveEventListener(type, caller, fun);
        }
        /**
         * 派发事件
        */
        public static DispatchEvent(type:string, ...args:any[]):void
        {
            EventController.Instance.m_EvtArgs.Init(args);
            EventController.Instance.m_Event.DispatchEvent(type, EventController.Instance.m_EvtArgs);
        }
        
        public static Clear():void
        {
            EventController.Instance.m_Event.Clear();
        }
    }
}