module dc
{
    /**
     * 字典工具类
     * @author hannibal
     * @time 20174-7-6
     */
    export class DicUtils
    {
		/**
		 * 键列表
		 */		
		public static GetKeys(d:Object):any[]
		{
			let a:any[] = [];
			for(let key in d)
			{
				a.push(key);
			} 
			
			return a;
		}
						
		/**
		 * 值列表
		 */		
		public static GetValues(d:Object):any[]
		{
			let a:any[] = [];

			for(let key in d)
			{
				a.push(d[key]);
			}
			
			return a;
		}
		
		/**
		 * 清空字典
		 */
		public static ClearDic(dic:Object):void
		{
            let v:any;
			for(let key in dic)
			{
                v = dic[key];
				if(v instanceof Object)
				{
					DicUtils.ClearDic(v);
				}
				delete dic[key];
			}
		}

		/**
		 * 全部应用
		 */		
		public static Foreach(dic:Object, compareFn: (key:any, value: any) => boolean):void
		{
			for(let key in dic)
			{
				if(!compareFn.call(null, key, dic[key]))
                    break;
			}
		}
		
		public static IsEmpty(dic:Object):Boolean
		{
			if(dic == null) return true;
			
			for(let key in dic)
			{
				return false;
			}
			return true;
		}
		
		public static GetLength(dic:Object):number
		{
			if(dic == null) return 0;
			
			let count:number = 0;
			for(let key in dic)
			{
				++count;
			}
			return count;
		}
    }
}