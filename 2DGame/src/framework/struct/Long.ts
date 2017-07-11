module dc
{
    /**
     * 64位整形
     * @author hannibal
     * @time 20174-7-10
     */
	export class Long
	{
		private m_low:number = 0;
		private m_high:number = 0;

		constructor(low:number, high:number)
		{
			this.m_low = low;
			this.m_high = high;
		}
		//TODO
		public Add(b:any):Long
		{
			return this;
		}	
		public Sub(b:any):Long
		{
			return this;
		}	
		public Mul(b:any):Long
		{
			return this;
		}
		public Div(b:any):Long
		{
			return this;
		}
		public Equal(b:any):boolean
		{
			return true;
		}
		public ToString():string
		{
			return (this.m_high.toString() + this.m_low.toString());
		}

		public ReadExternal(input:Laya.Byte):void
		{
			this.m_high = input.getUint32();
			this.m_low = input.getUint32();
		}
		public WriteExternal(output:Laya.Byte):void 
		{
			output.writeUint32(this.m_high);
			output.writeUint32(this.m_low);
		}
	}
}