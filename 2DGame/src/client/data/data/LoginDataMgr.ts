module dc
{
    /**
     * 登陆数据管理器
     * @author hannibal
     * @time 2017-7-20
     */
	export class LoginDataMgr extends Singleton
	{
        private static instance:LoginDataMgr = null;
        public static get Instance():LoginDataMgr
        {
            if(!this.instance)this.instance = new LoginDataMgr();
            return this.instance;
        }
        
        /**在这做数据初始化*/
		public Init():void
        {
            NetManager.Instance.RegisterPacketHandler(S2CMsg.Encrypt, this, this.OnNetEvt);
            NetManager.Instance.RegisterPacketHandler(S2CMsg.Login, this, this.OnNetEvt);
        }
        /**在这清空数据，尤其是列表等保存的数据*/
        public Release():void
        {
            NetManager.Instance.UnregisterPacketHandler(S2CMsg.Encrypt, this, this.OnNetEvt);
            NetManager.Instance.UnregisterPacketHandler(S2CMsg.Login, this, this.OnNetEvt);
        }
        private OnNetEvt(msg_id:number, by:LayaByte):void
        {
            switch(msg_id)
            {
                case S2CMsg.Encrypt:

                break;
                case S2CMsg.Login:

                break;
            }
        }
	}
}