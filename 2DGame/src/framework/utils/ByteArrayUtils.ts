module dc
{
    /**
     * 字节工具类
     * @author hannibal
     * @time 20174-7-7
     */
    export class ByteArrayUtils
    {
        public static CreateSocketByte():Laya.Byte
        {
            var by:Laya.Byte = new Laya.Byte();
            by.writeUint16(0);
            return by;
        }
    }
}