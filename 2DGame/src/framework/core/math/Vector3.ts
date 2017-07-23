module dc
{
    /**
     * 3d向量
     * @author hannibal
     * @time 2017-7-8
     */
    export class Vector3
    {
        public x:number;
        public y:number;
        public z:number;

        public static Temp:Vector3 = new Vector3(0,0,0);

        constructor(x?:number, y?:number, z?:number)
        {
            this.x = x;
            this.y = y;
            this.z = z;
        }
        public Set(new_x:number, new_y:number, new_z:number):void
        {
            this.x = new_x;
            this.y = new_y;
            this.z = new_z;
        }
        public static Add(a:Vector3, b:Vector3):Vector3
        {
            return new Vector3(a.x + b.x, a.y + b.y, a.z + b.z);
        }
        public Add(a:Vector3):Vector3
        {
            this.Set(this.x + a.x, this.y + a.y, this.z + a.z);
            return this;
        }
        public static Sub(a:Vector3, b:Vector3):Vector3
        {
            return new Vector3(a.x - b.x, a.y - b.y, a.z - b.z);
        }
        public Sub(a:Vector3):Vector3
        {
            this.Set(this.x - a.x, this.y - a.y, this.z - a.z);
            return this;
        }
        public static Mul(a:Vector3, d:number):Vector3
        {
            return new Vector3(a.x * d, a.y * d, a.z * d);
        }
        public Mul(d:number):Vector3
        {
            this.Set(this.x * d, this.y * d, this.z * d);
            return this;
        }
        
        public static Div(a:Vector3, d:number):Vector3
        {
            return new Vector3(a.x / d, a.y / d, a.z / d);
        }
        public Div(d:number):Vector3
        {
            this.Set(this.x / d, this.y / d, this.z / d);
            return this;
        }

        public static Scale(a:Vector3, b:Vector3):Vector3
        {
            return new Vector3(a.x * b.x, a.y * b.y, a.z * b.z);
        }
        public Scale(scale:Vector3):Vector3
        {
            this.x *= scale.x;
            this.y *= scale.y;
            this.z *= scale.z;
            return this;
        }

        public static Dot(lhs:Vector3, rhs:Vector3):number
        {
            return ((lhs.x * rhs.x) + (lhs.y * rhs.y) + (lhs.z * rhs.z));
        }
        public Dot(v:Vector3):number
        {
            return ((this.x * v.x) + (this.y * v.y) + (this.z * v.z));
        }

        public static Cross(lhs:Vector3, rhs:Vector3):Vector3
        {
            return new Vector3((lhs.y * rhs.z) - (lhs.z * rhs.y), (lhs.z * rhs.x) - (lhs.x * rhs.z), (lhs.x * rhs.y) - (lhs.y * rhs.x));
        }

        public static Project(vector:Vector3, onNormal:Vector3):Vector3
        {
            let num:number = Vector3.Dot(onNormal, onNormal);
            if (num < 1E-05)
            {
                return Vector3.zero;
            }
            return (Vector3.Div(Vector3.Mul(onNormal, Vector3.Dot(vector, onNormal)), num));
        }

        public static Min(lhs:Vector3, rhs:Vector3):Vector3
        {
            return new Vector3(Math.min(lhs.x, rhs.x), Math.min(lhs.y, rhs.y), Math.min(lhs.z, rhs.z));
        }
        public static Max(lhs:Vector3, rhs:Vector3):Vector3
        {
            return new Vector3(Math.max(lhs.x, rhs.x), Math.max(lhs.y, rhs.y), Math.max(lhs.z, rhs.z));
        }
 
        public Normalize():void
        {
            let magnitude:number = this.magnitude;
            if (magnitude > 1E-05)
            {
                let v:Vector3 = Vector3.Div(this, this.magnitude);
                this.Set(v.x, v.y, v.z);
            }
            else
            {
                this.Set(0, 0, 0);
            }
        }
        public get normalized():Vector3
        {
            let vector:Vector3 = new Vector3(this.x, this.y, this.z);
            vector.Normalize();
            return vector;
        }

        public static Angle(from:Vector3, to:Vector3):number
        {
            return (Math.acos(MathUtils.Clamp(Vector3.Dot(from.normalized, to.normalized), -1, 1)) * 57.29578);
        }

        public static Distance(a:Vector3, b:Vector3):number
        {
            let vector:Vector3 = Vector3.Sub(a, b);
            return vector.magnitude;
        }

        public Equals(other:Vector3):boolean
        {
            return (this.x == other.x && this.y == other.y && this.z == other.z);
        }
       
        public get magnitude():number
        {
            return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
        }
        public get sqrMagnitude():number
        {
            return ((this.x * this.x) + (this.y * this.y)+ (this.z * this.z));
        }
        public static ClampMagnitude(vector:Vector3, maxLength):Vector3
        {
            if (vector.sqrMagnitude > (maxLength * maxLength))
            {
                return (Vector3.Mul(vector.normalized, maxLength));
            }
            return vector;
        }
        public static SqrMagnitude(a:Vector3):number
        {
            return ((a.x * a.x) + (a.y * a.y)+ (a.z * a.z));
        }
        public SqrMagnitude():number
        {
            return ((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
        }

        public static Lerp(from:Vector3, to:Vector3, t:number):Vector3
        {
            t = MathUtils.Clamp(t, 0, 1);
            return new Vector3(from.x + ((to.x - from.x) * t), from.y + ((to.y - from.y) * t), from.z + ((to.z - from.z) * t));
        }
        public static MoveTowards(current:Vector3, target:Vector3, maxDistanceDelta:number):Vector3
        {
            let vector:Vector3 = Vector3.Sub(target, current);
            let magnitude:number = vector.magnitude;
            if ((magnitude > maxDistanceDelta) && (magnitude != 0))
            {
                return Vector3.Add(current, (Vector3.Mul(Vector3.Div(vector, magnitude), maxDistanceDelta)));
            }
            return target;
        }
        public static get zero():Vector3
        {
            return new Vector3(0, 0, 0);
        }
        public static get one():Vector3
        {
            return new Vector3(1, 1, 1);
        }
        public static get up():Vector3
        {
            return new Vector3(0, 1, 0);
        }
        public static get down():Vector3
        {
            return new Vector3(0, -1, 0);
        }
        public static get forward():Vector3
        {
            return new Vector3(0, 0, 1);
        }
        public static get back():Vector3
        {
            return new Vector3(0, 0, -1);
        }
        public static get left():Vector3
        {
            return new Vector3(-1, 0, 0);
        }
        public static get right():Vector3
        {
            return new Vector3(1, 0, 0);
        }
        public ToString():string
        {
            return StringUtils.format("({0}, {1}, {2})", this.x, this.y, this.z);
        }
    }
}