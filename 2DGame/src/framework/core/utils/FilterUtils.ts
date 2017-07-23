module dc
{
    /**
     * 滤镜
     * @author hannibal
     * @time 2017-7-11
     */	
	export class FilterUtils
	{
        /**
         * 创建发光滤镜
         * @param	color	滤镜的颜色
         * @param	blur	边缘模糊的大小
         * @param	offX	X轴方向的偏移
         * @param	offY	Y轴方向的偏移
         */		
		public static GetGlowFilter(color: string, blur?: number, offX?: number, offY?: number):Laya.GlowFilter[]
		{
			let glow = new Laya.GlowFilter(color, blur, offX, offY);
			return [glow];
		}
        /**
         * 模糊滤镜
         * @param	strength	模糊滤镜的强度值
         */		
		public static GetBlurFilter(strength?: number):Laya.BlurFilter[]
		{
			let blur = new Laya.BlurFilter(strength);
			return [blur];
		}
        /**
         * 创建一个 <code>ColorFilter</code> 实例。
         * @param mat	（可选）由 20 个项目（排列成 4 x 5 矩阵）组成的数组，用于颜色转换。
         */		
		public static GetColorFilter(mat?: Array<any>):Laya.ColorFilter[]
		{
			let color = new Laya.ColorFilter(mat);
			return [color];
		}
	}
}