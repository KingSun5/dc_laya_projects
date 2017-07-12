module dc
{
    /**
     * 数组工具类
     * @author hannibal
     * @time 20174-7-6
     */
    export class ArrayUtils
    {
        /**插入*/		
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
        /**移除所有*/
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
		public static isArrayEmpty(arr:any[]):Boolean
		{
			if (arr == null || arr.length == 0)
			{
				return true;
			}
			return false
		} 
    }
}