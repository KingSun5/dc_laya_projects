module dc
{
    /**
     * 玩家数据管理器
     * @author hannibal
     * @time 2017-8-1
     */
	export class PlayerDataMgr extends Singleton
	{
		private m_MainPlayerID:number = 0;	//主玩家id
		private m_DicUnitInfo:NDictionary<UnitInfo> = null;	//所有单位信息集合

        private static instance:PlayerDataMgr = null;
        public static get Instance():PlayerDataMgr
        {
            if(!this.instance)this.instance = new PlayerDataMgr();
            return this.instance;
        }

		constructor()
		{
			super();
			this.m_DicUnitInfo = new NDictionary<UnitInfo>();
		}

		/**在这做数据初始化*/
		public Init():void
        {
        }
        /**在这清空数据，尤其是列表等保存的数据*/
        public Release():void
        {
			this.m_DicUnitInfo.Clear();
        }
        private OnNetEvt(msg_id:number, by:LayaByte):void
        {
        }

		public get MainPlayerID():number
		{
			return this.m_MainPlayerID;
		}
	}
}