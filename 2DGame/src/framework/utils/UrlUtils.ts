module dc
{
    /**
     * url工具类
     * @author hannibal
     * @time 2017-7-16
     */	
	export class UrlUtils
	{
		/**扩展名*/
		public static GetFileExte(url:string):string
		{
			if(StringUtils.IsNullOrEmpty(url))return "";
			
			let i:number = url.lastIndexOf(".");
			if(i >= 0)
			{
				return url.substr(i+1);
			}
			return "";
		}
	}
}