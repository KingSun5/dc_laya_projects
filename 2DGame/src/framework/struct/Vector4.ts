module dc
{
    /**
     * 4d向量
     * @author hannibal
     * @time 20174-7-8
     */
    export class Vector4
    {
        public x:number;
        public y:number;
        public z:number;
        public w:number;

        constructor(x?:number, y?:number, z?:number, w?:number)
        {
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }
        public Set(new_x:number, new_y:number, new_z:number, new_w:number):void
        {
            this.x = new_x;
            this.y = new_y;
            this.z = new_z;
            this.w = new_w;
        }
        public static Add(a:Vector4, b:Vector4):Vector4
        {
            return new Vector4(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w);
        }
        public Add(a:Vector4):Vector4
        {
            this.Set(this.x + a.x, this.y + a.y, this.z + a.z, this.w + a.w);
            return this;
        }
        public static Sub(a:Vector4, b:Vector4):Vector4
        {
            return new Vector4(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w);
        }
        public Sub(a:Vector4):Vector4
        {
            this.Set(this.x - a.x, this.y - a.y, this.z - a.z, this.w - a.w);
            return this;
        }
        public static Mul(a:Vector4, d:number):Vector4
        {
            return new Vector4(a.x * d, a.y * d, a.z * d, a.w * d);
        }
        public Mul(d:number):Vector4
        {
            this.Set(this.x * d, this.y * d, this.z * d, this.w * d);
            return this;
        }
        
        public static Div(a:Vector4, d:number):Vector4
        {
            return new Vector4(a.x / d, a.y / d, a.z / d, a.w / d);
        }
        public Div(d:number):Vector4
        {
            this.Set(this.x / d, this.y / d, this.z / d, this.w / d);
            return this;
        }

        public static Scale(a:Vector4, b:Vector4):Vector4
        {
            return new Vector4(a.x * b.x, a.y * b.y, a.z * b.z, a.w * b.w);
        }
        public Scale(scale:Vector4):Vector4
        {
            this.x *= scale.x;
            this.y *= scale.y;
            this.z *= scale.z;
            this.w *= scale.w;
            return this;
        }

        public static Dot(lhs:Vector4, rhs:Vector4):number
        {
            return ((lhs.x * rhs.x) + (lhs.y * rhs.y) + (lhs.z * rhs.z)+ (lhs.w * rhs.w));
        }
        public Dot(v:Vector4):number
        {
            return ((this.x * v.x) + (this.y * v.y) + (this.z * v.z)+ (this.w * v.w));
        }

        public static Min(lhs:Vector4, rhs:Vector4):Vector4
        {
            return new Vector4(Math.min(lhs.x, rhs.x), Math.min(lhs.y, rhs.y), Math.min(lhs.z, rhs.z), Math.min(lhs.w, rhs.w));
        }
        public static Max(lhs:Vector4, rhs:Vector4):Vector4
        {
            return new Vector4(Math.max(lhs.x, rhs.x), Math.max(lhs.y, rhs.y), Math.max(lhs.z, rhs.z), Math.max(lhs.w, rhs.w));
        }
 
        public Normalize():void
        {
            var magnitude:number = this.magnitude;
            if (magnitude > 1E-05)
            {
                var v:Vector4 = Vector4.Div(this, this.magnitude);
                this.Set(v.x, v.y, v.z, v.w);
            }
            else
            {
                this.Set(0, 0, 0, 0);
            }
        }
        public get normalized():Vector4
        {
            var vector:Vector4 = new Vector4(this.x, this.y, this.z, this.w);
            vector.Normalize();
            return vector;
        }

        public static Distance(a:Vector4, b:Vector4):number
        {
            var vector:Vector4 = Vector4.Sub(a, b);
            return vector.magnitude;
        }

        public Equals(other:Vector4):boolean
        {
            return (this.x == other.x && this.y == other.y && this.z == other.z && this.w == other.w);
        }
       
        public get magnitude():number
        {
            return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z) + (this.w * this.w));
        }
        public get sqrMagnitude():number
        {
            return ((this.x * this.x) + (this.y * this.y) + (this.z * this.z) + (this.w * this.w));
        }
        public static ClampMagnitude(vector:Vector4, maxLength):Vector4
        {
            if (vector.sqrMagnitude > (maxLength * maxLength))
            {
                return (Vector4.Mul(vector.normalized, maxLength));
            }
            return vector;
        }
        public static SqrMagnitude(a:Vector4):number
        {
            return ((a.x * a.x) + (a.y * a.y)+ (a.z * a.z) + (a.w * a.w));
        }
        public SqrMagnitude():number
        {
            return ((this.x * this.x) + (this.y * this.y) + (this.z * this.z) + (this.w * this.w));
        }

        public static Lerp(from:Vector4, to:Vector4, t:number):Vector4
        {
            t = MathUtils.Clamp(t, 0, 1);
            return new Vector4(from.x + ((to.x - from.x) * t), from.y + ((to.y - from.y) * t), from.z + ((to.z - from.z) * t) + ((to.w - from.w) * t));
        }
        public static MoveTowards(current:Vector4, target:Vector4, maxDistanceDelta:number):Vector4
        {
            var vector:Vector4 = Vector4.Sub(target, current);
            var magnitude:number = vector.magnitude;
            if ((magnitude > maxDistanceDelta) && (magnitude != 0))
            {
                return Vector4.Add(current, (Vector4.Mul(Vector4.Div(vector, magnitude), maxDistanceDelta)));
            }
            return target;
        }
        public static get zero():Vector4
        {
            return new Vector4(0, 0, 0, 0);
        }
        public static get one():Vector4
        {
            return new Vector4(1, 1, 1, 1);
        }
        public ToString():string
        {
            return StringUtils.format("({0}, {1}, {2}, {3})", this.x, this.y, this.z, this.w);
        }
    }
}