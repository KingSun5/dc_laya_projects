module dc
{
    /**
     * 字典-键为number
     * TODO:Object的键不支持泛型
     * @author hannibal
     * @time 20174-7-6
     */
    export class NDictionary<TValue>
    {
        private m_Dic:Object = {};

        public Add(key:number, value:TValue):boolean
        {
            if(this.ContainsKey(key))return false;
            this.m_Dic[key] = value;
            return true;
        }
        public Remove(key:number):void
        {
            delete this.m_Dic[key];
        }
        public ContainsKey(key:number):boolean
        {
            return (this.m_Dic[key] != null ? true : false);
        }
        public GetValue(key:number):TValue
        {
            return this.m_Dic[key];
        }
        public Clear():void
        {
            for(var key in this.m_Dic)
            {
                delete this.m_Dic[key];
            }
        }
    }
    /**
     * 字典-键为string
     * @author hannibal
     * @time 20174-7-6
     */
    export class SDictionary<TValue>
    {
        private m_Dic:Object = {};

        public Add(key:string, value:TValue):boolean
        {
            if(this.ContainsKey(key))return false;
            this.m_Dic[key] = value;
            return true;
        }
        public Remove(key:string):void
        {
            delete this.m_Dic[key];
        }
        public ContainsKey(key:string):boolean
        {
            return (this.m_Dic[key] != null ? true : false);
        }
        public GetValue(key:string):TValue
        {
            return this.m_Dic[key];
        }
        public Clear():void
        {
            for(var key in this.m_Dic)
            {
                delete this.m_Dic[key];
            }
        }
    }    
}