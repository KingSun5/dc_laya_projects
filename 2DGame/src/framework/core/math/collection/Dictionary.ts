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
        public Set(key:number, value:TValue)
        {
            this.m_Dic[key] = value;
        }
        public ContainsKey(key:number):boolean
        {
            return (this.m_Dic[key] != null ? true : false);
        }
        public GetValue(key:number):TValue
        {
            if(!this.ContainsKey(key))return null;
            return this.m_Dic[key];
        }
        public Clear():void
        {
            for(let key in this.m_Dic)
            {
                delete this.m_Dic[key];
            }
        }
        public Getkeys():Array<number>
        {
            let list:Array<number> = [];
            for(let key in this.m_Dic)
            {
                list.push(StringUtils.toNumber(key));
            }
            return list;
        }
        public GetValues():Array<TValue>
        {
            let list:Array<TValue> = [];
            for(let key in this.m_Dic)
            {
                list.push(this.m_Dic[key]);
            }
            return list;
        }
        /**
         * 遍历列表，执行回调函数；注意返回值为false时，中断遍历
        */
        public Foreach(compareFn: (key:number, value: TValue) => boolean):void
        {
            for(let key in this.m_Dic)
            {
                if(!compareFn.call(null, key, this.m_Dic[key]))
                    break;
            }
        }
        public get Length():number
        {
            return DicUtils.GetLength(this.m_Dic);
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
            if(!this.ContainsKey(key))return null;
            return this.m_Dic[key];
        }
        public Getkeys():Array<string>
        {
            let list:Array<string> = [];
            for(let key in this.m_Dic)
            {
                list.push(key);
            }
            return list;
        }
        public GetValues():Array<TValue>
        {
            let list:Array<TValue> = [];
            for(let key in this.m_Dic)
            {
                list.push(this.m_Dic[key]);
            }
            return list;
        }
        public Clear():void
        {
            for(let key in this.m_Dic)
            {
                delete this.m_Dic[key];
            }
        }
        /**
         * 遍历列表，执行回调函数；注意返回值为false时，中断遍历
        */
        public Foreach(compareFn: (key:string, value: TValue) => boolean):void
        {
            for(let key in this.m_Dic)
            {
                if(!compareFn.call(null, key, this.m_Dic[key]))
                    break;
            }
        }
        public get Length():number
        {
            return DicUtils.GetLength(this.m_Dic);
        }
    }    
}