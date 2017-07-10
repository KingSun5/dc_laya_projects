module dc
{
    /**
     * 字符串
     * @author hannibal
     * @time 20174-7-8
     */
    export class StringUtils
    {
        public static toInt(str:string):number
		{
			if(!str || str.length == 0)return 0;
			return parseInt(str);
		}
		public static toNumber(str:string):number
		{
			if(!str || str.length == 0)return 0;
			return parseFloat(str);
		}
        /**
		 * 补零
		 * @param str
		 * @param len
		 * @param dir 0-后；1-前
		 * @return 
		 */		
		public static addZero(str:string, len:number, dir:number = 0):string
		{
			var _str:string = "";
			var _len:number = str.length;
			var str_pre_zero:string = "";
			var str_end_zero:string = "";
			if(dir == 0)
				str_end_zero = "0";
			else
				str_pre_zero = "0";
			
			if(_len < len)
			{
				var i:number = 0;
				while(i < len - _len)
				{
					_str = str_pre_zero + _str + str_end_zero;
					++i;
				}
				
				return _str + str;
			}
			
			return str;
		}
		/**
		 * 去除左右空格
		 * @param input
		 * @return 
		 */		
		public static trim(input:string):string
		{
			if (input == null)
			{
				return "";
			}
			return input.replace(/^\s+|\s+$""^\s+|\s+$/g, "");
		} 
        		/**
		 * 去除左侧空格
		 * @param input
		 * @return 
		 */		
		public static leftTrim(input:string):string
		{
			if (input == null)
			{
				return "";
			}
			return input.replace(/^\s+""^\s+/, "");
		}
		
		/**
		 * 去除右侧空格
		 * @param input
		 * @return 
		 */
		public static rightTrim(input:string):string
		{
			if (input == null)
			{
				return "";
			}
			return input.replace(/\s+$""\s+$/, "");
		}      
        /**
		 * 分钟与秒格式(如-> 40:15)
		 * @param seconds 秒数
		 * @return 
		 */		
		public static minuteFormat(seconds:number):string
		{
			var min:number = Math.floor(seconds / 60);
			var sec:number = Math.floor(seconds % 60);
			
			var min_str:string = min < 10 ? ("0" + min.toString()) : (min.toString());
			var sec_str:string = sec < 10 ? ("0" + sec.toString()) : (sec.toString());
			
			return min_str + ":" + sec_str;
		} 
		
		/**
		 * 时分秒格式(如-> 05:32:20)
		 * @param seconds(秒)
		 * @return 
		 */
		public static hourFormat(seconds:number):string
		{
			var hour:number = Math.floor(seconds / 3600);
			var hour_str:String = hour < 10 ? ("0" + hour.toString()) : (hour.toString());
			return hour_str + ":" + StringUtils.minuteFormat(seconds % 3600);
		}
	    /**
		 * 格式化字符串 
		 * @param str 需要格式化的字符串，【"杰卫，这里有{0}个苹果，和{1}个香蕉！", 5,10】
		 * @param args 参数列表
		 */
		public static format(str:string, ...args):string
		{  
			for(var i = 0; i<args.length; i++)
            {  
				str = str.replace(new RegExp("\\{" + i + "\\}", "gm"), args[i]);  
			}  
			return str;  
		}  
        /**
		 * 以指定字符开始
		 */		
		public static beginsWith(input:string, prefix:string):boolean
		{
			return prefix == input.substring(0, prefix.length);
		}
		
		/**
		 * 以指定字符结束
		 */		
		public static endsWith(input:string, suffix:string):boolean
		{
			return suffix == input.substring(input.length - suffix.length);
		}
		/**
		 * 字符串是否有值
		 */		
		public static IsNullOrEmpty(s:string):boolean
		{
			return (s != null && s.length > 0) ? false : true;
		}
    }
}