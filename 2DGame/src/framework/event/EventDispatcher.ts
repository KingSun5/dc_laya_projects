module dc
{
    /**
     * 事件
     * @author hannibal
     * @time 20174-7-6
     */
    export class EventDispatcher
    {
        private m_DicFuns:Object = {};
        private m_EvtArgs:EventArgs = new EventArgs();

        public AddEventListener(type:string, context:any, fun:Function):void
        {
            if(this.m_DicFuns[type] == null)
            {
                this.m_DicFuns[type] = new Array<EventItem>();
                this.m_DicFuns[type].push(new EventItem(context, fun));
            }
            else
            {
                var arr:EventItem[] = this.m_DicFuns[type];
                for(var item of arr)
                {
                    if(item.context == context && item.callback == fun)return;
                }
                arr.push(new EventItem(context, fun));
            }
        }

        public RemoveEventListener(type:string, context:any,fun:Function):void
        {
            var arr:EventItem[] = this.m_DicFuns[type];
            if(arr == null)return;
            for(var i = 0; i < arr.length; ++i)
            {
                var item = arr[i];
                if(item.context == context && item.callback == fun)
                {
                    arr.splice(i, 1);
                    break;
                }
            }
        }

        public TriggerEvent(type:string, args:EventArgs):void
        {
            args.Type = type;
            var arr:EventItem[] = this.m_DicFuns[type];
            if(arr == null)return;
            for(var item of arr)
            {
                item.callback.call(item.context,args);
            }
        }

        public Trigger(type:string, ...args:any[]):void
        {
            this.m_EvtArgs.Init(args);
            this.TriggerEvent(type, this.m_EvtArgs);
        }

        public Clear():void
        {
            DicUtils.ClearDic(this.m_DicFuns);
        }
    }
    class EventItem
    {
        public context:any = null;//上下文，也就是调用者。。。
        public callback:Function = null;

        constructor(c:any, fun:Function)
        {
            this.context = c;
            this.callback = fun;
        }
    }
}