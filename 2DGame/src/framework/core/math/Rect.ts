module dc
{
    /**
     * 四边形
     * @author hannibal
     * @time 2017-7-8
     */
    export class Rect
    {
        private m_XMin:number;
        private m_YMin:number;
        private m_Width:number;
        private m_Height:number;
        
        constructor(left?:number, top?:number, width?:number, height?:number)
        {
            this.m_XMin = left;
            this.m_YMin = top;
            this.m_Width = width;
            this.m_Height = height;
        }

        public Set(left:number, top:number, width:number, height:number):void
        {
            this.m_XMin = left;
            this.m_YMin = top;
            this.m_Width = width;
            this.m_Height = height;
        }

        public SetPos(left:number, top:number):void
        {
            this.m_XMin = left;
            this.m_YMin = top;
        }
        public SetWH(width:number, height:number):void
        {
            this.m_Width = width;
            this.m_Height = height;
        }
         
        public get x():number
        {
            return this.m_XMin;
        }
         
        public set x(value:number)
        {
            this.m_XMin = value;
        }        
        public get y():number
        {
            return this.m_YMin;
        }
         
        public set y(value:number)
        {
            this.m_YMin = value;
        } 
        public get center():Vector2
        {
            return new Vector2(this.x + (this.m_Width / 2), this.y + (this.m_Height / 2));
        }
        public set center(value:Vector2)
        {
            this.m_XMin = value.x - (this.m_Width / 2);
            this.m_YMin = value.y - (this.m_Height / 2);
        }   

        public get width():number
        {
            return this.m_Width;
        }
        public set width(value:number)
        {
            this.m_Width = value;
        } 
        public get height():number
        {
            return this.m_Height;
        }
        public set height(value:number)
        {
            this.m_Height = value;
        }
        
        public get left():number
        {
            return this.m_XMin;
        }
        
        public get right():number
        {
            return (this.m_XMin + this.m_Width);
        }
        
        public get top():number
        {
            return this.m_YMin;
        }
        
        public get bottom():number
        {
            return (this.m_YMin + this.m_Height);
        }  
        public Contains(point:Vector2):boolean
        {
            return ((((point.x >= this.m_XMin) && (point.x < this.right)) && (point.y >= this.m_YMin)) && (point.y < this.bottom));
        }
        public Equals(rect:Rect):boolean
        {
            return ((((this.x == rect.x) && (this.y == rect.y)) && (this.width == rect.width)) && (this.height == rect.height));
        }
        public ToString():string
        {
            return StringUtils.format("(x:{0}, y:{1}, width:{2}, height:{3})", this.x, this.y, this.width, this.height);
        }   
    }
}