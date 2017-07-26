module dc
{
    /**
     * 2d视口
	 * 不同于D3D等3D引擎的视口，Viewport2D只是维护一个可见区域(客户端游戏屏幕)
     * @author hannibal
     * @time 2017-7-9
     */
	export class Viewport2D
	{
		/**客户端界面大小*/		
		private static m_clientWidth:number = 0;
		private static m_clientHeight:number = 0;

		/**
		 * 是否在视口里面 
		 * @param x
		 * @param y
		 * @return 
		 * 
		 */		
		public static isIn(x:Number, y:Number):boolean
		{
			if(x >= 0 && x <= this.m_clientWidth && y >= 0 && y <= this.m_clientHeight)
				return true;
			return false;
		}

		public static SetSize(w:number,h:number):void
		{
			this.m_clientWidth = w;
			this.m_clientHeight = h;
		}

		public static get clientWidth():number
		{
			return this.m_clientWidth;
		}
		public static get clientHeight():number
		{
			return this.m_clientHeight;
		}        
	}
}