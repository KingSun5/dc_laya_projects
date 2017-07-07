module dc
{
    /**
     * 游戏对象基类
     * @author hannibal
     * @time 20174-7-6
     */
    export class GameObject
    {
        private m_Active:boolean
        private m_ObjectGUID:number;
        private m_ObjectServerID:string;

        constructor()
        {
             this.m_Active = true;
             this.m_ObjectGUID = 0;
             this.m_ObjectServerID = "";   
        }

        public Init():void
        {

        }

        public Setup(info:any):void
        {

        }

        public Destroy():void
        {

        }

        public Update(elapse:number, game_frame:number):boolean
        {
            return true;     
        }

        get Active():boolean
        {
            return this.m_Active;
        }
        set Active(b:boolean)
        {
            this.m_Active = b;
        }
        get ObjectGUID():number
        {
            return this.m_ObjectGUID;
        }
        get ObjectServerID():string
        {
            return this.m_ObjectServerID;
        }
    }
}