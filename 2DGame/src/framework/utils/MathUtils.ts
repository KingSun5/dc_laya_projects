module dc
{
    /**
     * 数学工具类
     * @author hannibal
     * @time 20174-7-8
     */
    export class MathUtils
    {		
        /**字节转换M*/
		public static BYTE_TO_M:number = 1/(1024*1024);
		/**字节转换K*/
		public static BYTE_TO_K:number = 1/(1024);

        public static Deg2Rad:number = 0.01745329;
        public static Rad2Deg:number = 57.29578;

        public static Sign(f:number):number
        {
            return ((f < 0) ? -1 : 1);
        }

		/**
		 * 限制范围
		 */		
		public static Clamp(n:number, min:number, max:number):number
		{
			if(min > max)
			{
				let i:number = min;
				min = max;
				max = i;
			}
			return (n < min ? min : (n > max ? max : n));
		}
		public static Clamp01(value:number):number
        {
            if (value < 0)
            {
                return 0;
            }
            if (value > 1)
            {
                return 1;
            }
            return value;
        }

        public static Lerp(from:number, to:number, t:number):number
        {
            return (from + ((to - from) * MathUtils.Clamp01(t)));
        }
        public static LerpAngle(a:number, b:number, t:number):number
        {
            let num:number = MathUtils.Repeat(b - a, 360);
            if (num > 180)
            {
                num -= 360;
            }
            return (a + (num * MathUtils.Clamp01(t)));
        }

        public static Repeat(t:number, length:number):number
        {
            return (t - (Math.floor(t / length) * length));
        }

		/**
		 * 产生随机数
		 * 结果：x>=param1 && x<param2
		 */		
		public static RandRange(param1:number, param2:number) : number
		{
			let loc:number = Math.random() * (param2 - param1) + param1;
			return loc;
		}
		/**
		 * 产生随机数
		 * 结果：x>=param1 && x<=param2
		 */	
		public static RandRange_Int(param1:number, param2:number) : number
		{
			let loc:number = Math.random() * (param2 - param1 + 1) + param1;
			return Math.floor(loc);
		}
		/**
		 * 从数组中产生随机数[-1,1,2]
		 * 结果：-1/1/2中的一个
		 */	
		public static RandRange_Array(arr:any[]) : number
		{
			if(arr.length == 0)
				return -1;
			let loc:number = arr[MathUtils.RandRange_Int(0, arr.length-1)];
			return loc;
		}
		/**
		 * 转换为360度角度
		 */		
		public static ClampDegrees(degrees:number):number
		{
			while(degrees < 0)
			{
				degrees = degrees + 360;
			}
			
			while(degrees >= 360)
			{
				degrees = degrees - 360;
			}
			
			return degrees;
		}
		/**
		 * 转换为360度弧度
		 * @param degrees
		 * @return 
		 */
		public static ClampRadians(radians:number):number
		{
			while (radians < 0)
			{
				radians = radians + 2 * Math.PI;
			}
			while (radians >= 2 * Math.PI)
			{
				radians = radians - 2 * Math.PI;
			}
			return radians;
		}
		/**
		 * 两点间的距离
		 * @param _p1
		 * @param _p2
		 * @return 
		 */		
		public static GetDistance(x1:number, y1:number, x2:number, y2:number):number
		{
			return Math.sqrt(Math.pow(y2-y1,2) + Math.pow(x2-x1,2));
		}
		public static GetSquareDistance(x1:number, y1:number, x2:number, y2:number):number
		{
			return Math.pow(y2-y1,2) + Math.pow(x2-x1,2);
		}	
		/**
		 * 两点间的弧度：x正方形为0，顺时针为正
		 * @param p1
		 * @param p2
		 * @return 
		 * 
		 */		
		public static GetLineRadians(x1:number, y1:number, x2:number, y2:number):number
		{
			return Math.atan2(y2 - y1,x2 - x1);
		}
		public static GetLineDegree(x1:number, y1:number, x2:number, y2:number):number
		{
			let degree:number = MathUtils.ToDegree(MathUtils.GetLineRadians(x1, y1, x2, y2));
			return MathUtils.ClampDegrees(degree);
		}	
		/**
		 * 弧度转化为度 
		 * @param radian
		 * @return 
		 * 
		 */		
		public static ToDegree(radian:number):number
		{
			return radian * (180.0/Math.PI);
		}
		/**
		 * 度转化为弧度 
		 * @param radian
		 * @return 
		 * 
		 */		
		public static ToRadian(degree:number):number
		{
			return degree * (Math.PI/180.0);
		}	
        public static MoveTowards(current:number, target:number, maxDelta:number):number
        {
            if (Math.abs(target - current) <= maxDelta)
            {
                return target;
            }
            return (current + (MathUtils.Sign(target - current) * maxDelta));
        }
	
    }
}