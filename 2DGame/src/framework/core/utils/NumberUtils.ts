module dc
{
    /**
     * 字符串
     * @author hannibal
     * @time 20174-7-8
     */
    export class NumberUtils
    {
        /**
         * 保留小数点后几位
        */
        public static toFixed(value:number, p:number):number
        {
          return StringUtils.toNumber(value.toFixed(p));
        }
        public static toInt(value:number):number
        {
          return Math.floor(value);
        }  
        public static isInt(value:number):boolean
        {
          return Math.ceil(value) != value ? false : true;
        }        
    }
}