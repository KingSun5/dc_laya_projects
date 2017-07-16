module dc
{
    /**
     * 2d向量
     * @author hannibal
     * @time 20174-7-8
     */
    export class Vector2
    {
        public x:number;
        public y:number;

        constructor(x?:number, y?:number)
        {
            this.x = x;
            this.y = y;
        }
        public Set(new_x:number, new_y:number):void
        {
            this.x = new_x;
            this.y = new_y;
        }
        public static Add(a:Vector2, b:Vector2):Vector2
        {
            return new Vector2(a.x + b.x, a.y + b.y);
        }
        public Add(a:Vector2):Vector2
        {
            this.Set(this.x + a.x, this.y + a.y);
            return this;
        }
        public static Sub(a:Vector2, b:Vector2):Vector2
        {
            return new Vector2(a.x - b.x, a.y - b.y);
        }
        public Sub(a:Vector2):Vector2
        {
            this.Set(this.x - a.x, this.y - a.y);
            return this;
        }
        public static Mul(a:Vector2, d:number):Vector2
        {
            return new Vector2(a.x * d, a.y * d);
        }
        public Mul(d:number):Vector2
        {
            this.Set(this.x * d, this.y * d);
            return this;
        }
        public static Div(a:Vector2, d:number):Vector2
        {
            return new Vector2(a.x / d, a.y / d);
        }
        public Div(d:number):Vector2
        {
            this.Set(this.x / d, this.y / d);
            return this;
        }
        public static Scale(a:Vector2, b:Vector2):Vector2
        {
            return new Vector2(a.x * b.x, a.y * b.y);
        }

        public Scale(scale:Vector2):Vector2
        {
            this.x *= scale.x;
            this.y *= scale.y;
            return this;
        }

        public static Dot(lhs:Vector2, rhs:Vector2):number
        {
            return ((lhs.x * rhs.x) + (lhs.y * rhs.y));
        }
        public Dot(v:Vector2):number
        {
            return ((this.x * v.x) + (this.y * v.y));
        }

        public static Min(lhs:Vector2, rhs:Vector2):Vector2
        {
            return new Vector2(Math.min(lhs.x, rhs.x), Math.min(lhs.y, rhs.y));
        }
        public static Max(lhs:Vector2, rhs:Vector2):Vector2
        {
            return new Vector2(Math.max(lhs.x, rhs.x), Math.max(lhs.y, rhs.y));
        }
 
        public Normalize():void
        {
            let magnitude:number = this.magnitude;
            if (magnitude > 1E-05)
            {
                let v:Vector2 = Vector2.Div(this, this.magnitude);
                this.Set(v.x, v.y);
            }
            else
            {
                this.Set(0, 0);
            }
        }
        public get normalized():Vector2
        {
            let vector:Vector2 = new Vector2(this.x, this.y);
            vector.Normalize();
            return vector;
        }

        public static Angle(from:Vector2, to:Vector2):number
        {
            return (Math.acos(MathUtils.Clamp(Vector2.Dot(from.normalized, to.normalized), -1, 1)) * 57.29578);
        }

        public static Distance(a:Vector2, b:Vector2):number
        {
            let vector:Vector2 = Vector2.Sub(a, b);
            return vector.magnitude;
        }

        public Equals(other:Vector2):boolean
        {
            return (this.x == other.x && this.y == other.y);
        }
       
        public get magnitude():number
        {
            return Math.sqrt((this.x * this.x) + (this.y * this.y));
        }
        public get sqrMagnitude():number
        {
            return ((this.x * this.x) + (this.y * this.y));
        }
        public static ClampMagnitude(vector:Vector2, maxLength):Vector2
        {
            if (vector.sqrMagnitude > (maxLength * maxLength))
            {
                return (Vector2.Mul(vector.normalized, maxLength));
            }
            return vector;
        }
        public static SqrMagnitude(a:Vector2):number
        {
            return ((a.x * a.x) + (a.y * a.y));
        }
        public SqrMagnitude():number
        {
            return ((this.x * this.x) + (this.y * this.y));
        }

        public static Lerp(from:Vector2, to:Vector2, t:number):Vector2
        {
            t = MathUtils.Clamp(t, 0, 1);
            return new Vector2(from.x + ((to.x - from.x) * t), from.y + ((to.y - from.y) * t));
        }
        public static MoveTowards(current:Vector2, target:Vector2, maxDistanceDelta:number):Vector2
        {
            let vector:Vector2 = Vector2.Sub(target, current);
            let magnitude:number = vector.magnitude;
            if ((magnitude > maxDistanceDelta) && (magnitude != 0))
            {
                return Vector2.Add(current, (Vector2.Mul(Vector2.Div(vector, magnitude), maxDistanceDelta)));
            }
            return target;
        }

        public static get zero():Vector2
        {
            return new Vector2(0, 0);
        }
        public static get one():Vector2
        {
            return new Vector2(1, 1);
        }
        public static get up():Vector2
        {
            return new Vector2(0, 1);
        }
        public static get right():Vector2
        {
            return new Vector2(1, 0);
        }
        public ToString():string
        {
            return StringUtils.format("({0}, {1})", this.x, this.y);
        }
    }
}