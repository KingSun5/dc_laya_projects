module dc
{
    /**
     * 客户端socket
     * @author hannibal
     * @time 2017-7-7
     */
    export class ClientSocket
    {
        private m_Host:string;
        private m_Port:number;
        private m_Socket:Laya.Socket;
        private m_OutBuff:Laya.Byte;
        
        private m_ReadBuff:Laya.Byte;

        private m_RecvCallback:LayaHandler;

        /**请求连接:主机*/
        public ConnectHost(host:string, port:number):void
        {
            this.m_Host = host;
            this.m_Port = port;

            this.m_Socket = new Laya.Socket();
            this.m_Socket.connect(host, port);
            this.HandleConnect();
        }
        /**请求连接:站点*/
        public ConnectUrl(url:string):void
        {
            this.m_Host = url;

            this.m_Socket = new Laya.Socket();
            this.m_Socket.connectByUrl(url);
            this.HandleConnect();
        }
        /**发数据*/
        public Send(by:Laya.Byte):number
        {
            if(!this.IsConnected() || by.length <= 0)return;

            by.pos = 0;
            by.writeUint16(by.bytesAvailable-SocketID.HEADER_SIZE);
            by.pos = 0;
            this.m_OutBuff.writeArrayBuffer(by.buffer, 0, by.bytesAvailable);
            this.m_Socket.flush();
            return 0;
        }
        private HandleConnect()
        {
            this.m_ReadBuff = new Laya.Byte();
            this.m_OutBuff = this.m_Socket.output;
            this.m_Socket.endian = Laya.Socket.LITTLE_ENDIAN;
            this.RegisterEvent();
        }  
        /**主动关闭连接*/
        public Close()
        {
            if(this.m_RecvCallback)
            {
                this.m_RecvCallback.recover();
                this.m_RecvCallback = null;
            }
            if(this.m_Socket)
            {
                this.UnRegisterEvent();
                this.m_Socket.close();
                this.m_Socket = null;
            }
        }
        /**是否连接正常*/
        public IsConnected():boolean
        {
            if(this.m_Socket && this.m_Socket.connected)
                return true;
            return false;
        }  
        public BindRecvCallback(fun:LayaHandler):void
        {
            this.m_RecvCallback = fun;
        }
        //～～～～～～～～～～～～～～～～～～～～～～～事件～～～～～～～～～～～～～～～～～～～～～～～//
        private RegisterEvent():void
        {
            this.m_Socket.on(Laya.Event.OPEN, this, this.OnSocketOpen);
			this.m_Socket.on(Laya.Event.CLOSE, this, this.OnSocketClose);
			this.m_Socket.on(Laya.Event.MESSAGE, this, this.OnMessageReveived);
			this.m_Socket.on(Laya.Event.ERROR, this, this.OnConnectError);
        }
        private UnRegisterEvent():void
        {
            this.m_Socket.off(Laya.Event.OPEN, this, this.OnSocketOpen);
			this.m_Socket.off(Laya.Event.CLOSE, this, this.OnSocketClose);
			this.m_Socket.off(Laya.Event.MESSAGE, this, this.OnMessageReveived);
			this.m_Socket.off(Laya.Event.ERROR, this, this.OnConnectError);
        }
        private OnSocketOpen(): void 
        {
			Log.Info("Socket Connected");
            EventController.DispatchEvent(SocketEvent.SOCKET_CONNECTED, this.m_Host);
		}
		private OnSocketClose(): void 
        {
			Log.Info("Socket closed");
            EventController.DispatchEvent(SocketEvent.SOCKET_CLOSE, this.m_Host);
		}
		private OnMessageReveived(msg: any): void
        {			
            if (typeof msg == "string")
            {
				console.log(msg);
                let by:LayaByte = new LayaByte();
                by.writeInt32(123456);          
                this.m_OutBuff.writeArrayBuffer(by.buffer, 0, by.length);
                //this.m_Socket.send(msg);
			    this.m_Socket.flush();
			}
			else if (msg instanceof ArrayBuffer && this.m_Socket.input.length > 0) 
            {
                this.DispatcherData();
			}
		}
		private OnConnectError(e: Event): void
        {
			Log.Info("Socket Error");
            EventController.DispatchEvent(SocketEvent.SOCKET_ERROR, this.m_Host);
		}
        private DispatcherData()
        {
            let buff:LayaByte = this.m_Socket.input;
            while(buff.bytesAvailable > SocketID.HEADER_SIZE)
            {
                let dataLen = buff.getUint16();
                if(buff.bytesAvailable < dataLen)
                {
                    buff.pos -= SocketID.HEADER_SIZE;
                    break;
                }
                
                let beginPos = buff.pos;

                this.m_ReadBuff.clear();
                this.m_ReadBuff.writeArrayBuffer(buff.buffer, buff.pos, dataLen);
                this.m_ReadBuff.pos = 0;
                //派发数据
                if(this.m_RecvCallback != null)this.m_RecvCallback.runWith(this.m_ReadBuff);

                buff.pos = beginPos + dataLen;
            }
        }
    }
}