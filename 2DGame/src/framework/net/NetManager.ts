module dc
{
    /**
     * 客户端socket管理器
     * @author hannibal
     * @time 2017-7-31
     */
	export class NetManager extends Singleton
	{
		private m_DicSockets:SDictionary<ClientSocket> = null;//连接列表，支持多服务器同时连接
        private m_PacketHandles:{ [msg_id: number]: Array<sNetPacketHandler> } = {};

        private static instance:NetManager = null;
        public static get Instance():NetManager
        {
            if(!this.instance)this.instance = new NetManager();
            return this.instance;
        }

		constructor()
		{
			super();
			this.m_DicSockets = new SDictionary<ClientSocket>();
		}

        public Setup():void
        {
			this.RegisterEvent();
        }
        public Destroy():void
        {
			this.m_DicSockets.Foreach(function(key, value)
			{
				value.Close();
				return true;
			});
			this.m_DicSockets.Clear();
			DicUtils.ClearDic(this.m_PacketHandles);
			this.UnRegisterEvent();
        }
		public Tick():void
		{
			
		}
        //～～～～～～～～～～～～～～～～～～～～～～～连接～～～～～～～～～～～～～～～～～～～～～～～//
        /**请求连接:主机*/
        public ConnectHost(host:string, port:number):void
        {
			if(this.m_DicSockets.ContainsKey(host))
			{
				Log.Warning("已经连接到了服务器，不需要重新连接:" + host);
				return;
			}
			let socket:ClientSocket = new ClientSocket();
			socket.ConnectHost(host, port);
			socket.BindRecvCallback(Laya.Handler.create(this, this.OnRecvData, null, false));
			this.m_DicSockets.Add(host, socket);
        }
        /**请求连接:站点*/
        public ConnectUrl(url:string):void
        {
			if(this.m_DicSockets.ContainsKey(url))
			{
				Log.Warning("已经连接到了服务器，不需要重新连接:" + url);
				return;
			}
			let socket:ClientSocket = new ClientSocket();
			socket.ConnectUrl(url);
			socket.BindRecvCallback(Laya.Handler.create(this, this.OnRecvData, null, false));
			this.m_DicSockets.Add(url, socket);
        }
		/**关闭连接*/
		public Close(host:string)
		{
			if(this.m_DicSockets.ContainsKey(host))
			{
				let socket:ClientSocket = this.m_DicSockets.GetValue(host);
				if(socket)socket.Close();
				this.m_DicSockets.Remove(host);
			}
		}
		/**数据到达*/
        private OnRecvData(by:LayaByte):void
        {
            let msg_id:number = by.getUint16();
            Log.Debug("接收数据,id:" + msg_id.toString());
			let handles: Array<sNetPacketHandler> = this.m_PacketHandles[msg_id];
			if (handles) 
			{
				let rec: sNetPacketHandler;
				for (let i = 0; i < handles.length; ++i) 
				{
					rec = handles[i];
					rec.fun.call(rec.caller, msg_id, by);
				}
			}
        }
        //～～～～～～～～～～～～～～～～～～～～～～～发送～～～～～～～～～～～～～～～～～～～～～～～//
		private tmpSocket:ClientSocket = null;
		public Send(id:number, host:string, by:LayaByte):number
		{
			this.tmpSocket = this.m_DicSockets.GetValue(host);
			if(!this.tmpSocket)return 0;
			return this.tmpSocket.Send(by);
		}

        //～～～～～～～～～～～～～～～～～～～～～～～事件～～～～～～～～～～～～～～～～～～～～～～～//
        private RegisterEvent():void
        {
			EventController.AddEventListener(SocketEvent.SOCKET_CONNECTED, this, this.OnSocketEvt);
			EventController.AddEventListener(SocketEvent.SOCKET_CLOSE, this, this.OnSocketEvt);
			EventController.AddEventListener(SocketEvent.SOCKET_ERROR, this, this.OnSocketEvt);
        }
        private UnRegisterEvent():void
        {
			EventController.RemoveEventListener(SocketEvent.SOCKET_CONNECTED, this, this.OnSocketEvt);
			EventController.RemoveEventListener(SocketEvent.SOCKET_CLOSE, this, this.OnSocketEvt);
			EventController.RemoveEventListener(SocketEvent.SOCKET_ERROR, this, this.OnSocketEvt);
        }
        private OnSocketEvt(evt:EventArgs):void
		{
			switch(evt.Type)
			{
				case SocketEvent.SOCKET_CONNECTED:
				{
					let host:string = evt.Get(0);
					Log.Info("连接成功:" + host);

					EventController.DispatchEvent(NetEvent.CONNECTED, host);
				}
				break;
				case SocketEvent.SOCKET_CLOSE:
				case SocketEvent.SOCKET_ERROR:
				{
					let host:string = evt.Get(0);
					if(this.m_DicSockets.ContainsKey(host))
					{
						let socket:ClientSocket = this.m_DicSockets.GetValue(host);
						if(socket)socket.Close();
						this.m_DicSockets.Remove(host);
					}
					Log.Error("连接关闭:" + host);
					EventController.DispatchEvent(NetEvent.CLOSED, host);
				}
				break;
			}
		}
        //～～～～～～～～～～～～～～～～～～～～～～～消息处理～～～～～～～～～～～～～～～～～～～～～～～//
        public RegisterPacketHandler(msg_id: number, caller: any, fun: Function) 
		{
            let handles: Array<sNetPacketHandler> = this.m_PacketHandles[msg_id];
            if (!handles) 
			{
                handles = new Array<sNetPacketHandler>();
                this.m_PacketHandles[msg_id] = handles;
            }

            let rec = new sNetPacketHandler;
            rec.fun = fun;
            rec.caller = caller;
            handles.push(rec);
        }

        public UnregisterPacketHandler(msg_id: number, caller: any, fun: Function) 
		{
            let handles: Array<sNetPacketHandler> = this.m_PacketHandles[msg_id];
            if (!handles) 
			{
                return;
            }
            let rec: sNetPacketHandler;
            let l = handles.length;
            for (let i = l - 1; i >= 0; --i) 
			{
                rec = handles[i];
                if (rec.caller == caller && rec.fun == fun) 
				{
                    if (handles.length == 1) 
					{
                        delete this.m_PacketHandles[msg_id];
                    } else 
					{
                        handles.splice(i, 1);
                    }
                    break;
                }
            }
        }		
	}
	/**
	 * 消息处理结构
	 */
	class sNetPacketHandler
	{
        fun: Function;
        caller: any;
    }
}