module dc
{	
	/**
     * 负责管理客户端多个连接
     * @author hannibal
     * @time 2017-8-14
     */
	export class ServerManager extends Singleton
	{
		private m_GameServerHost:string = "";

        private static instance:ServerManager = null;
        public static get Instance():ServerManager
        {
            if(!this.instance)this.instance = new ServerManager();
            return this.instance;
        }
        
		constructor()
		{
			super();
		}
		
        public Setup():void
        {
            this.RegisterEvent();
        }

        public Destroy():void
        {
            this.UnRegisterEvent();
        }

        public Tick():void
        {
        }
		//逻辑服务器
		public SendGameMsg(by:LayaByte):void
		{
			if(StringUtils.IsNullOrEmpty(this.m_GameServerHost))return;
			by.pos = 2;
			let msg_id:number = by.getUint16();
			NetManager.Instance.Send(msg_id, this.m_GameServerHost, by);
		}

        //请求连接
        public ConnectGameServer(ip:string, port:number)
        {
            //NetManager.Instance.ConnectUrl("ws://127.0.0.1:8181");
            NetManager.Instance.ConnectHost("127.0.0.1", 7000);
        }
		
        private RegisterEvent():void
        {
            EventController.AddEventListener(NetEvent.CONNECTED, this, this.OnNetConnected);
            EventController.AddEventListener(NetEvent.CLOSED, this, this.OnNetDisconnect);
        }
        private UnRegisterEvent():void
        {
            EventController.RemoveEventListener(NetEvent.CONNECTED, this, this.OnNetConnected);
            EventController.RemoveEventListener(NetEvent.CLOSED, this, this.OnNetDisconnect);
        }
        
        /**网络连接成功*/
        private OnNetConnected(evt:EventArgs):void
        {
			this.m_GameServerHost = evt.Get(0);
            LoginDataMgr.Instance.SendEncrypt();
        }
        private OnNetDisconnect(evt:EventArgs):void
        {
			this.m_GameServerHost = "";
        }
	}
}