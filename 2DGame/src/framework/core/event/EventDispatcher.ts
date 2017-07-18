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

        public AddEventListener(type:string, caller:any, fun:Function):void
        {
            if(this.m_DicFuns[type] == null)
            {
                this.m_DicFuns[type] = [];
                this.m_DicFuns[type].push(LayaHandler.create(caller, fun, null, false));
            }
            else
            {
                let arr:LayaHandler[] = this.m_DicFuns[type];
                for(let item of arr)
                {
                    if(item.caller == caller && item.method == fun)return;
                }
                arr.push(LayaHandler.create(caller, fun, null, false));
            }
        }

        public RemoveEventListener(type:string, caller:any,fun:Function):void
        {
            let arr:LayaHandler[] = this.m_DicFuns[type];
            if(arr == null)return;
            for(let i = 0; i < arr.length; ++i)
            {
                let item:LayaHandler = arr[i];
                if(item.caller == caller && item.method == fun)
                {
                    item.recover();
                    arr.splice(i, 1);
                    break;
                }
            }
        }

        public DispatchEvent(type:string, args:EventArgs):void
        {
            args.Type = type;
            let arr:LayaHandler[] = this.m_DicFuns[type];
            if(arr == null)return;
            for(let item of arr)
            {
                item.runWith(args);
            }
        }

        public Dispatch(type:string, ...args:any[]):void
        {
            this.m_EvtArgs.Init(args);
            this.DispatchEvent(type, this.m_EvtArgs);
        }

        public Clear():void
        {
            DicUtils.ClearDic(this.m_DicFuns);
        }
    }
}