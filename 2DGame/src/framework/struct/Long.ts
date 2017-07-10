module dc
{
    /**
     * 64位整形
     * @author hannibal
     * @time 20174-7-10
     */
	export class Long
	{
		private m_u0:number = 0;
		private m_u1:number = 0;


		public readExternal(input:Laya.Byte):void
		{
			this.m_u1 = input.getUint32();
			this.m_u0 = input.getUint32();
		}
		public writeExternal(output:Laya.Byte):void 
		{
			output.writeUint32(this.m_u1);
			output.writeUint32(this.m_u0);
		}
	}
}