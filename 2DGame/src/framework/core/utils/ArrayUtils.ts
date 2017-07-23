module dc
{
    /**
     * 数组工具类
     * @author hannibal
     * @time 2017-7-6
     */
    export class ArrayUtils
    {
        /** 插入元素
		 * @param arr 需要操作的数组
		 * @param value 需要插入的元素
		 * @param index 插入位置
		*/
		public static Insert(arr:any[], value:any, index:number):void
		{
			if(index > arr.length-1) 
			{
				arr.push(value);
			}
			else
			{
				arr.splice(index, 0, value);
			}
			
		}
		/**从数组移除元素*/		
		public static RemoveValue(arr:any[], v:any):void
		{
			let i:number = arr.indexOf(v);
			if(i != -1)
			{
				arr.splice(i, 1);
			}
		}    
        /**移除所有值等于v的元素*/
		public static RemoveAllValue(arr:any[], v:any):void
		{
			let i:number = arr.indexOf(v);
			while(i>=0)
			{
				arr.splice(i, 1);
				i = arr.indexOf(v);
			}
		}  
        /**包含元素*/
        public static ContainsValue(arr:any[], v:any):boolean
        {
            return arr.length>0 ? arr.indexOf(v) != -1 : false;
        }
		/**复制*/
		public static Copy(arr:any[]):any[]
		{
			return arr.slice();
		}    
		/**
		 * 排序
		 * @param arr 需要排序的数组
		 * @param key 排序字段
		 * @param order 排序方式
		*/
		public static Sort(arr:any[], key:string, order:eArraySortOrder = eArraySortOrder.DESCENDING):void
		{
			if(arr == null)return;
			arr.sort(function (info1, info2)
			{
				switch(order)
				{
					case eArraySortOrder.ASCENDING:
					{
						if (info1[key] < info2[key])
							return -1;
						if (info1[key] > info2[key])
							return 1;
						else 
							return 0;
					}
					case eArraySortOrder.DESCENDING:
					{
						if (info1[key] > info2[key])
							return -1;
						if (info1[key] < info2[key])
							return 1;
						else 
							return 0;
					}
				}
			});
		} 
        /**清空数组*/		
		public static Clear(arr:any[]):void
		{
			let i:number=0;
			let len:number = arr.length;
			for(;i<len;++i)
			{
				arr[i] = null;
			}
			arr.splice(0);
		}    
        /**数据是否为空*/
		public static IsEmpty(arr:any[]):Boolean
		{
			if (arr == null || arr.length == 0)
			{
				return true;
			}
			return false
		} 
    }
}