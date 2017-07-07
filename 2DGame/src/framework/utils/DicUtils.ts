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
			var a:any[] = [];
			for(var key in d)
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
			var a:any[] = [];

			for(var key in d)
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
            var v:any;
			for(var key in dic)
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
		public static ApplyEach(dic:Object, fun:Function):void
		{
			if(fun == null) return;
			
			for(var key in dic)
			{
				fun(dic[key]);
			}
		}
		
		public static IsEmpty(dic:Object):Boolean
		{
			if(dic == null) return true;
			
			for(var key in dic)
			{
				return false;
			}
			return true;
		}
		
		public static GetLength(dic:Object):number
		{
			if(dic == null) return 0;
			
			var count:number = 0;
			for(var key in dic)
			{
				++count;
			}
			return count;
		}
    }
}