module dc
{	
	/**
     * 大小
     * @author hannibal
     * @time 2017-8-3
     */
	export class Size
	{
		private m_Width:number;
		private m_Height:number;

		constructor(w:number = 0, h:number = 0)
		{
			this.m_Width = w;
			this.m_Height = h;
		}
		public Set(w:number, h:number)
		{
			this.m_Width = w;
			this.m_Height = h;
		}
		public get width():number
		{
			return this.m_Width;
		}
		public get height():number
		{
			return this.m_Height;
		}
	}
}