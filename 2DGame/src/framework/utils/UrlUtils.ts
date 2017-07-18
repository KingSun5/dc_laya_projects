module dc
{
    /**
     * url工具类
     * @author hannibal
     * @time 2017-7-16
     */	
	export class UrlUtils
	{
		/**获取文件扩展名*/
		public static GetFileExte(url:string):string
		{
			if(StringUtils.IsNullOrEmpty(url))return StringUtils.Empty;
			
			let idx:number = url.lastIndexOf(".");
			if(idx >= 0)
			{
				return url.substr(idx+1);
			}
			return StringUtils.Empty;
		}
		/**获取不含扩展名的路径*/
		public static GetPathWithNoExtend(url:string):string
		{
			if(StringUtils.IsNullOrEmpty(url))return StringUtils.Empty;
			
			let idx:number = url.lastIndexOf(".");
			if(idx >= 0)
			{
				return url.substr(0, idx);
			}
			return StringUtils.Empty;
		}
	}
}