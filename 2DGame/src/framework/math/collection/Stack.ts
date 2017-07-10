module dc
{
    /**
     * 栈：后入先出
     * @author hannibal
     * @time 20174-7-6
     */
    export class Stack<T>
    {
        private m_List:T[] = [];

        /**添加数据*/
        public Push(item:T):void
        {
            this.m_List.push(item);
        }
        /**获取栈顶元素，并删除*/
        public Pop():T
        {
            return this.m_List.pop();
        }
        /**获取栈顶元素，并不删除*/
        public Peek():T
        {
            if(this.m_List.length == 0)return null;
            return this.m_List[this.m_List.length-1];
        }
        /**转换成标准数组*/
        public ToArray():T[]
        {
            return this.m_List.slice(0, this.m_List.length);
        }
        /**是否包含指定元素*/
        public Contains(item:T):boolean
        {
            return (this.m_List.indexOf(item, 0) == -1 ? false : true);
        }
        /**清空*/
        public Clear():void
        {
            this.m_List.length = 0;
        }
        public Size():number
        {
            return this.m_List.length;
        }
    }
}