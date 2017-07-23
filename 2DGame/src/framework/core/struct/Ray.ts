module dc
{
    /**
     * 射线
     * @author hannibal
     * @time 2017-7-9
     */
    export class Ray
    {
        private m_Origin:Vector3;
        private m_Direction:Vector3;

        constructor(origin:Vector3, direction:Vector3)
        {
            this.m_Origin = origin;
            this.m_Direction = direction.normalized;
        }

        public get origin():Vector3
        {
            return this.m_Origin;
        }
        public set origin(o:Vector3)
        {
            this.m_Origin = o;
        }
        public get direction():Vector3
        {
            return this.m_Direction;
        }
        public set direction(d:Vector3)
        {
            this.m_Direction = d;
        }

        public GetPoint(distance:number):Vector3
        {
            return Vector3.Add(this.m_Origin, Vector3.Mul(this.m_Direction, distance));
        }

        public ToString():string
        {
            return StringUtils.format("Origin: {0}, Dir: {1}", this.m_Origin.ToString(), this.m_Direction.ToString());
        }
    }
}