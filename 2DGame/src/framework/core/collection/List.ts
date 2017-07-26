module dc
{
    /**
     * 双向循环链表
     * 实际测试100000增加和删除，发现:
     * 1.如果是在开始位置插入和删除，比Array快；基数越大，差距越大
     * 2.中间位置插入和删除，比Array慢；基数越大，差距越大
     * 3.末端操作，效率差距不大
     * 4.耗时比较多的是GetNode函数
     * @author hannibal
     * @time 2017-7-6
     */
    export class LinkList<T>
    {
        /**表头*/
        private m_linkHead:any = null;
        /**节点个数*/
        private m_size:number = 0;

        constructor()
        {
            this.m_linkHead = {Data:null, Prev:null, Next:null};//双向链表 表头为空
            this.m_linkHead.Prev = this.m_linkHead;
            this.m_linkHead.Next = this.m_linkHead;
            this.m_size = 0;
        }
        /**在链表末尾添加*/
        public Add(t:T):void
        {
            this.Append(this.m_size, t);
        }
        /**将节点插入到第index位置之前*/
        public Insert(index:number, t:T):void
        {
            if (this.m_size < 1 || index >= this.m_size)
                Log.Exception("没有可插入的点或者索引溢出了");
            if (index == 0)
                this.Append(this.m_size, t);
            else
            {
                let inode:any = this.GetNode(index);
                let tnode:any = {Data:t, Prev:inode.Prev, Next:inode};
                inode.Prev.Next = tnode;
                inode.Prev = tnode;
                this.m_size++;
            }
        }
        /**追加到index位置之后*/
        public Append(index:number, t:T):void
        {
            let inode:any;
            if (index == 0)
                inode = this.m_linkHead;
            else
            {
                index = index - 1;
                if (index < 0)
                    Log.Exception("位置不存在");
                inode = this.GetNode(index);
            }
            let tnode:any = {Data:t, Prev:inode, Next:inode.Next};
            inode.Next.Prev = tnode;
            inode.Next = tnode;
            this.m_size++;
        }
        /**
         * 删除节点，有效节点索引为[0,m_size-1]
        */
        public Del(index:number):void
        {
            let inode:any = this.GetNode(index);
            inode.Prev.Next = inode.Next;
            inode.Next.Prev = inode.Prev;
            this.m_size--;
        }
        public DelFirst():void
        {
            this.Del(0);
        }
        public DelLast():void
        {
            this.Del(this.m_size - 1);
        } 
        public Get(index:number):T
        {
            return this.GetNode(index).Data;
        }
        public GetFirst():T
        {
            return this.GetNode(0).Data;
        } 
        public GetLast():T
        {
            return this.GetNode(this.m_size - 1).Data;
        }
        /**通过索引查找*/
        private GetNode(index:number):any
        {
            if (index < 0 || index >= this.m_size)
            {
                Log.Exception("索引溢出或者链表为空");
            }
            if (index < this.m_size / 2)//正向查找
            {
                let node:any = this.m_linkHead.Next;
                for (let i = 0; i < index; i++)
                    node = node.Next;
                return node;
            }
            //反向查找
            let rnode:any = this.m_linkHead.Prev;
            let rindex = this.m_size - index - 1;
            for (let i = 0; i < rindex; i++)
                rnode = rnode.Prev;
            return rnode;
        }
        /**
         * 遍历列表，执行回调函数；注意返回值为false时，中断遍历
        */
        public Foreach(compareFn: (value: T) => boolean):void
        {                
            let node:any = this.m_linkHead.Next;
            if(!node)return;

            do
            {
                if(!compareFn.call(null, node.Data))
                    break;
                node = node.Next;
            }while(node != this.m_linkHead);
        }
        public IsEmpty():boolean
        {
            return this.m_size == 0;
        }
        public get length():number
        {
            return this.m_size;
        }
    }
}