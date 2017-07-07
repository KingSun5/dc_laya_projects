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
                this.m_DicFuns[type] = [];
                this.m_DicFuns[type].push(Laya.Handler.create(context, fun, null, false));
            }
            else
            {
                var arr:Laya.Handler[] = this.m_DicFuns[type];
                for(var item of arr)
                {
                    if(item.caller == context && item.method == fun)return;
                }
                arr.push(Laya.Handler.create(context, fun, null, false));
            }
        }

        public RemoveEventListener(type:string, context:any,fun:Function):void
        {
            var arr:Laya.Handler[] = this.m_DicFuns[type];
            if(arr == null)return;
            for(var i = 0; i < arr.length; ++i)
            {
                var item = arr[i];
                if(item.caller == context && item.method == fun)
                {
                    arr.splice(i, 1);
                    break;
                }
            }
        }

        public TriggerEvent(type:string, args:EventArgs):void
        {
            args.Type = type;
            var arr:Laya.Handler[] = this.m_DicFuns[type];
            if(arr == null)return;
            for(var item of arr)
            {
                item.runWith(args);
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
}