module dc
{
    /**
     * 事件参数
     * @author hannibal
     * @time 20174-7-6
     */
    export class EventArgs
    {
        private m_Type:string = "";
        private m_data:any[] = null;

        constructor(...args:any[])
        {
            if(args == null || args.length == 0)return;
            
            if(args instanceof Array)
                this.m_data = ArrayUtils.Copy(args[0]);
            else
                this.m_data = ArrayUtils.Copy(args);
        }

        public Init(...args:any[])
        {
            if(args.length == 0)return;
            if(args instanceof Array)
                this.m_data = ArrayUtils.Copy(args[0]);
            else
                this.m_data = ArrayUtils.Copy(args);
        }

        public Get(index:number):any
        {
            if(this.m_data == null || this.m_data.length == 0)return null;
            if(index < 0 || index >= this.m_data.length)return null;
            return this.m_data[index];
        }

        get Type()
        {
            return this.m_Type;
        }
        set Type(t:string)
        {
            this.m_Type = t;
        }
    }
}