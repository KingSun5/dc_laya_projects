module dc
{
    /**
     * 字节工具类
     * @author hannibal
     * @time 2017-7-7
     */
    export class ByteArrayUtils
    {
        private static m_WriteStream:LayaByte = null;
        /**
         * 协议用byte，注意逻辑层不要保存应用
        */
        public static CreateSocketByte(id:number):LayaByte
        {
            if(!this.m_WriteStream)this.m_WriteStream = new LayaByte();
            this.m_WriteStream.clear();
            this.m_WriteStream.writeUint16(0);//协议头，预留
            this.m_WriteStream.writeUint16(id);//协议id
            return this.m_WriteStream;
        }
    }
}