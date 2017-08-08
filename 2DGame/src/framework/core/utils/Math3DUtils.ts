module dc
{	
	/**
     * 3d数学工具类
     * @author hannibal
     * @time 2017-8-2
     */
	export class Math3DUtils
	{
		private static _Vec2Temp:Vector2 = null;
		private static _Vec3Temp:Vector3 = null;
		private static _Vec4Temp:Vector4 = null;

		public static get TempVec2():Vector2
		{
			if(!Math3DUtils._Vec2Temp)Math3DUtils._Vec2Temp = new Vector2(0,0);
			return Math3DUtils._Vec2Temp;
		}
		public static get TempVec3():Vector3
		{
			if(!Math3DUtils._Vec3Temp)Math3DUtils._Vec3Temp = new Vector3(0,0,0);
			return Math3DUtils._Vec3Temp;
		}
		public static get TempVec4():Vector4
		{
			if(!Math3DUtils._Vec4Temp)Math3DUtils._Vec4Temp = new Vector4(0,0,0,0);
			return Math3DUtils._Vec4Temp;
		}

		/**转换为水平方向*/
		public static ToHorizontal(vec:Vector3):Vector3
		{
			vec.y = 0;
			return vec;
		}
		/**水平距离*/
		public static HorizontalDistance(vec1:Vector3, vec2:Vector3):number
		{
			vec1.y = 0;
			vec2.y = 0;
			return Vector3.scalarLength(Vec3Sub(vec1, vec2));
		}		

		/**射线上的一点*/
		public static GetRayPoint(ray:Ray, distance:number):Vector3
		{
			return Vec3Add(ray.origin, Vec3Mul(ray.direction, distance));
		}	
	}
	
	//～～～～～～～～～～～～～～～～～～～～～～～vec2～～～～～～～～～～～～～～～～～～～～～～～//
	export function Vec2Add(a:Vector2, b:Vector2):Vector2
	{
		return new Vector2(a.x + b.x, a.y + b.y);
	}
	export function Vec2Sub(a:Vector2, b:Vector2):Vector2
	{
		return new Vector2(a.x - b.x, a.y - b.y);
	}
	export function Vec2Multiply(a:Vector2, b:Vector2):Vector2
	{
		return new Vector2(a.x * b.x, a.y * b.y);
	}
	export function Vec2Mul(a:Vector2, d:number):Vector2
	{
		return new Vector2(a.x * d, a.y * d);
	}
	export function Vec2Div(a:Vector2, d:number):Vector2
	{
		return new Vector2(a.x / d, a.y / d);
	}
	export function Vec2Dot(lhs:Vector2, rhs:Vector2):number
	{
		return ((lhs.x * rhs.x) + (lhs.y * rhs.y));
	}
	export function Vec2Project(vector:Vector2, onNormal:Vector2):Vector2
	{
		let num:number = Vec2Dot(onNormal, onNormal);
		if (num < 1E-05)
		{
			return Vector2.ZERO;
		}
		return (Vec2Div(Vec2Mul(onNormal, Vec2Dot(vector, onNormal)), num));
	}
	export function Vec2Min(lhs:Vector2, rhs:Vector2):Vector2
	{
		return new Vector2(Math.min(lhs.x, rhs.x), Math.min(lhs.y, rhs.y));
	}
	export function Vec2Max(lhs:Vector2, rhs:Vector2):Vector2
	{
		return new Vector2(Math.max(lhs.x, rhs.x), Math.max(lhs.y, rhs.y));
	}
	export function Vec2Magnitude(vec:Vector2):number
	{
		return Math.sqrt((vec.x * vec.x) + (vec.y * vec.y));
	}		
	export function Vec2SqrMagnitude(vec:Vector2):number
	{
		return (vec.x * vec.x) + (vec.y * vec.y);
	}	
	export function Vec2Normalized(vec:Vector2):Vector2
	{
		let magnitude:number = Vec2Magnitude(vec);
		let v:Vector2;
		if (magnitude > 1E-05)
			v = Vec2Div(vec, magnitude);
		else
			v = new Vector2(0, 0);
		return v;
	}        
	export function Vec2Normal(vec:Vector2):void
	{
		let magnitude:number = Vec2Magnitude(vec);
		if (magnitude > 1E-05)
		{
			let v:Vector2 = Vec2Div(vec, magnitude);
			Vec2Set(vec,v.x, v.y);
		}
		else
			Vec2Set(vec,0, 0);
	}            
	export function Vec2Set(v:Vector2, x:number,y:number):Vector2
	{
		v.x = x; v.y = y;;
		return v;
	}
	export function Vec2Angle(from:Vector2, to:Vector2):number
	{
		return (Math.acos(MathUtils.Clamp(Vec2Dot(Vec2Normalized(from), Vec2Normalized(to)), -1, 1)) * 57.29578);
	}
	export function Vec2ClampMagnitude(vector:Vector2, maxLength):Vector2
	{
		if (Vec2SqrMagnitude(vector) > (maxLength * maxLength))
		{
			return (Vec2Mul(Vec2Normalized(vector), maxLength));
		}
		return vector;
	}
	export function Vec2Lerp(from:Vector2, to:Vector2, t:number):Vector2
	{
		t = MathUtils.Clamp(t, 0, 1);
		return new Vector2(from.x + ((to.x - from.x) * t), from.y + ((to.y - from.y) * t));
	}
	export function Vec2MoveTowards(current:Vector2, target:Vector2, maxDistanceDelta:number):Vector2
	{
		let vector:Vector2 = Vec2Sub(target, current);
		let magnitude:number = Vec2Magnitude(vector);
		if ((magnitude > maxDistanceDelta) && (magnitude != 0))
		{
			return Vec2Add(current, (Vec2Mul(Vec2Div(vector, magnitude), maxDistanceDelta)));
		}
		return target;
	}
	export function Vec2ToString(vec:Vector2):string
	{
		return StringUtils.format("({0}, {1})", vec.x, vec.y);
	}

    //～～～～～～～～～～～～～～～～～～～～～～～vec3～～～～～～～～～～～～～～～～～～～～～～～//
	export function Vec3Add(a:Vector3, b:Vector3):Vector3
	{
		return new Vector3(a.x + b.x, a.y + b.y, a.z + b.z);
	}
	export function Vec3Sub(a:Vector3, b:Vector3):Vector3
	{
		return new Vector3(a.x - b.x, a.y - b.y, a.z - b.z);
	}
	export function Vec3Multiply(a:Vector3, b:Vector3):Vector3
	{
		return new Vector3(a.x * b.x, a.y * b.y, a.z * b.z);
	}
	export function Vec3Mul(a:Vector3, d:number):Vector3
	{
		return new Vector3(a.x * d, a.y * d, a.z * d);
	}
	export function Vec3Div(a:Vector3, d:number):Vector3
	{
		return new Vector3(a.x / d, a.y / d, a.z / d);
	}
	export function Vec3Cross(lhs:Vector3, rhs:Vector3):Vector3
	{
		return new Vector3((lhs.y * rhs.z) - (lhs.z * rhs.y), (lhs.z * rhs.x) - (lhs.x * rhs.z), (lhs.x * rhs.y) - (lhs.y * rhs.x));
	}
	export function Vec3Project(vector:Vector3, onNormal:Vector3):Vector3
	{
		let num:number = Vector3.dot(onNormal, onNormal);
		if (num < 1E-05)
		{
			return new Vector3();
		}
		return (Vec3Div(Vec3Mul(onNormal, Vector3.dot(vector, onNormal)), num));
	}
	export function Vec3Min(lhs:Vector3, rhs:Vector3):Vector3
	{
		return new Vector3(Math.min(lhs.x, rhs.x), Math.min(lhs.y, rhs.y), Math.min(lhs.z, rhs.z));
	}
	export function Vec3Max(lhs:Vector3, rhs:Vector3):Vector3
	{
		return new Vector3(Math.max(lhs.x, rhs.x), Math.max(lhs.y, rhs.y), Math.max(lhs.z, rhs.z));
	}
	export function Vec3Magnitude(vec:Vector3):number
	{
		return Math.sqrt((vec.x * vec.x) + (vec.y * vec.y) + (vec.z * vec.z));
	}		
	export function Vec3SqrMagnitude(vec:Vector3):number
	{
		return (vec.x * vec.x) + (vec.y * vec.y) + (vec.z * vec.z);
	}
	export function Vec3Normalized(vec:Vector3):Vector3
	{
		let magnitude:number = Vector3.scalarLength(vec);
		let v:Vector3;
		if (magnitude > 1E-05)
			v = Vec3Div(vec, magnitude);
		else
			v = new Vector3(0, 0, 0);
		return v;
	}        
	export function Vec3Normal(vec:Vector3):void
	{
		let magnitude:number = Vector3.scalarLength(vec);
		if (magnitude > 1E-05)
		{
			let v:Vector3 = Vec3Div(vec, magnitude);
			Vec3Set(vec,v.x, v.y, v.z);
		}
		else
			Vec3Set(vec,0, 0, 0);
	}            
	export function Vec3Set(v:Vector3, x:number,y:number,z:number):Vector3
	{
		v.x = x; v.y = y; v.z = z;
		return v;
	}
	export function Vec3Angle(from:Vector3, to:Vector3):number
	{
		return (Math.acos(MathUtils.Clamp(Vector3.dot(Vec3Normalized(from), Vec3Normalized(to)), -1, 1)) * 57.29578);
	}
	export function Vec3ClampMagnitude(vector:Vector3, maxLength):Vector3
	{
		if (Vector3.scalarLengthSquared(vector) > (maxLength * maxLength))
		{
			return (Vec3Mul(Vec3Normalized(vector), maxLength));
		}
		return vector;
	}
	export function Vec3Lerp(from:Vector3, to:Vector3, t:number):Vector3
	{
		t = MathUtils.Clamp(t, 0, 1);
		return new Vector3(from.x + ((to.x - from.x) * t), from.y + ((to.y - from.y) * t), from.z + ((to.z - from.z) * t));
	}
	export function Vec3MoveTowards(current:Vector3, target:Vector3, maxDistanceDelta:number):Vector3
	{
		let vector:Vector3 = Vec3Sub(target, current);
		let magnitude:number = Vector3.scalarLength(vector);
		if ((magnitude > maxDistanceDelta) && (magnitude != 0))
		{
			return Vec3Add(current, (Vec3Mul(Vec3Div(vector, magnitude), maxDistanceDelta)));
		}
		return target;
	}
	export function Vec3ToString(vec:Vector3):string
	{
		return StringUtils.format("({0}, {1}, {2})", vec.x, vec.y, vec.z);
	}
}