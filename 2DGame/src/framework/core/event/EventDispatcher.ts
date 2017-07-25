module dc
{
    /**
     * 事件
     * @author hannibal
     * @time 2017-7-6
     */
    export class EventDispatcher
    {
        private m_DicFuns:Object = {};
        private m_EvtArgs:EventArgs = null;

        constructor()
        {
            this.m_EvtArgs = new EventArgs();
        }
        /**
         * 添加监听
         * @param type      事件类型
         * @param caller    调用者
         * @param fun       回调函数，注意回调函数的参数是共用一个，所有不要持有引用[let evt = args;（不建议这样写）]
        */
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
        /**
         * 移除监听
        */
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
        /**
         * 派发事件，注意参数类型为EventArgs
        */
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
        /**
         * 派发事件
        */
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