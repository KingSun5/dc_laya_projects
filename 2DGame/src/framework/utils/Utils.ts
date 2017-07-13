module dc
{
    /**
     * 工具类
     * @author hannibal
     * @time 20174-7-11
     */
    export class Utils
    {
        /**获取当前地址栏参数*/
        public static GetLocationParams():SDictionary<string>
        {
            let url = window.location.href;

            let dic = new SDictionary<string>();
            let num = url.indexOf("?");
            if (num >= 0) 
            {
                url = url.substr(num + 1);
                let key, value;
                let arr = url.split("&");
                for (let i in arr) 
                {
                    let str = arr[i];
                    num = str.indexOf('=');
                    key = str.substr(0, num);
                    value = str.substr(num + 1);
                    dic.Add(key, value);
                }
            }
            return dic;
        }
    }
    /**
     * 位操作
     */
	export class FlsgUtils
	{
		public static HasFlag(a:number, b:number):boolean
		{
			return ((a & b) ==0) ? false : true;
		}

		public static InsertFlag(a:number, b:number):number
		{
			a |= b;
			return a;
		}
		public static RemoveFlag(a:number, b:number):number
		{
			a ^= b;
			return a;
		}
	}
    /**
     * 断言
     */
    export function assert(condition, msg?: string)
    {
        if (!condition) 
        {
            throw msg || "assert";
        }
    }
    export function assertNullOrNil(condition, msg?: string)
    {
        if (condition==null || condition===null || typeof condition === 'undefined') 
        {
            assert(false, msg);
        }
    }
    /**
     * 判空
     */
    export function checkNullOrNil(x):boolean
    {
        if (x == null)return true;
        if (x === null)return true;
        if (typeof x === 'undefined')return true;
        return false;
    }
}