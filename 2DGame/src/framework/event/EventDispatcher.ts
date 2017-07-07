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

        public AddEventListener(type:string, fun:Function):void
        {
            if(this.m_DicFuns[type] == null)
                this.m_DicFuns[type] = [];
            if(ArrayUtils.ContainsValue(this.m_DicFuns[type], fun) == false)
                this.m_DicFuns[type].push(fun);
        }

        public RemoveEventListener(type:string, fun:Function):void
        {
            var arr:Function[] = this.m_DicFuns[type];
            if(arr == null)return;
            ArrayUtils.RemoveValue(arr, fun);
        }

        public TriggerEvent(type:string, args:EventArgs):void
        {
            args.Type = type;
            var arr:Function[] = this.m_DicFuns[type];
            if(arr == null)return;
            for(var fun of arr)
            {
                fun.call(type,args);
            }
        }

        public Clear():void
        {
            DicUtils.ClearDic(this.m_DicFuns);
        }
    }
}