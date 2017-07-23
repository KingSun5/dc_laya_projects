module dc
{
    /**
     * 二维数组
     * @author hannibal
     * @time 2017-7-8
     */
    export class DoubleArray
    {
        private m_Array:any[] = [];

        constructor(rows:number, cols:number, value:any)
        {
            if(rows > 0 && cols > 0)
            {
                for(let row = 0; row < rows; ++row)
                {
                    for(let col = 0; col < cols; ++col)
                    {
                        this.Set(row, col, value);
                    }
                }
            }
        }

        public Set(row:number, col:number, value:any):void
        {
            if(this.m_Array[row] == null)
                this.m_Array[row] = [];
            this.m_Array[row][col] = value;
        }
        public Get(row:number, col:number):any
        {
            if(this.m_Array[row] == null)
                return null;
            return this.m_Array[row][col];
        }
        public Clear():void
        {
            ArrayUtils.Clear(this.m_Array);
        }
    }
}