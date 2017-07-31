module dc
{
    /**
     * 字节工具类
     * @author hannibal
     * @time 2017-7-7
     */
    export class ByteArrayUtils
    {
        public static CreateSocketByte(id:number):Laya.Byte
        {
            let by:Laya.Byte = new Laya.Byte();
            by.writeUint16(0);//协议头，预留
            by.writeUint16(id);//协议id
            return by;
        }
    }
}