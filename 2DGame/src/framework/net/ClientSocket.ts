module dc
{
    /**
     * 客户端socket
     * @author hannibal
     * @time 20174-7-7
     */
    export class ClientSocket extends EventDispatcher
    {
        private m_Host:string;
        private m_Port:number;
        private m_Socket:Laya.Socket;
        private m_OutBuff:Laya.Byte;
        
        private m_ReadBuff:Laya.Byte;
        private m_WriteBuff:Laya.Byte;
        private m_TempBuff:Laya.Byte;

        private m_RecvCallback:Function;

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
            if(!this.IsConnected())return;

            by.pos = 0;
            by.writeUint16(14);
            this.m_OutBuff.writeArrayBuffer(by.buffer, 0, by.length);
            this.m_Socket.flush();
            return 0;
        }
        private HandleConnect()
        {
            this.m_ReadBuff = new Laya.Byte();
            this.m_WriteBuff = new Laya.Byte();
            this.m_TempBuff = new Laya.Byte();

            this.m_OutBuff = this.m_Socket.output;
            this.m_OutBuff.endian = Laya.Socket.LITTLE_ENDIAN;
            this.m_Socket.on(Laya.Event.OPEN, this, this.OnSocketOpen);
			this.m_Socket.on(Laya.Event.CLOSE, this, this.OnSocketClose);
			this.m_Socket.on(Laya.Event.MESSAGE, this, this.OnMessageReveived);
			this.m_Socket.on(Laya.Event.ERROR, this, this.OnConnectError);
        }  
        private OnSocketOpen(): void 
        {
			Log.Info("Socket Connected");
            this.Trigger(SocketID.SOCKET_CONNECTED);
		}
		private OnSocketClose(): void 
        {
			Log.Info("Socket closed");
            this.Trigger(SocketID.SOCKET_CLOSE);
		}
		private OnMessageReveived(msg: any): void
        {
			if (msg instanceof ArrayBuffer) 
            {
                this.m_ReadBuff.writeArrayBuffer(msg);
                this.m_ReadBuff.pos = 0;
                this.DispatcherData();
			}
			this.m_Socket.input.clear();
		}
		private OnConnectError(e: Event): void
        {
			Log.Info("Socket Error");
            this.Trigger(SocketID.SOCKET_ERROR);
		}
        private m_IsReadHead:boolean = true;
        private m_DataLength:number = 0;
        private DispatcherData()
        {
            while(this.m_ReadBuff.bytesAvailable > 0)
            {
                if(this.m_IsReadHead)
                {//读包头
                    if(this.m_ReadBuff.bytesAvailable >= SocketID.HEADER_SIZE)
                    {
                        this.m_DataLength = this.m_ReadBuff.getUint16();
                        this.m_IsReadHead = false;
                    }
                    else
                    {//数据接收不全，等待。。。
                        this.CacheUnreadByte();
                        break;
                    }
                }
                else
                {//读包体
                    if(this.m_ReadBuff.bytesAvailable >= this.m_DataLength)
                    {
                        this.m_TempBuff.clear();
                        this.m_TempBuff.writeArrayBuffer(this.m_ReadBuff, this.m_ReadBuff.pos, this.m_DataLength);
                        this.m_TempBuff.pos = 0;

                        //派发数据
                        //if(this.m_RecvCallback != null)this.m_RecvCallback.call(this.m_RecvCallback.apply, this.m_TempBuff);

                        this.m_ReadBuff.pos += this.m_DataLength;
                        this.m_IsReadHead = true;
                    }
                    else
                    {//数据接收不全，等待。。。
                        this.CacheUnreadByte();
                        break;
                    }
                }
            }
        }
        /**把剩余未读的移到前面*/
        private CacheUnreadByte():void
        {
            if(this.m_ReadBuff.bytesAvailable > 0)
            {
                this.m_TempBuff.clear();
                this.m_TempBuff.writeArrayBuffer(this.m_ReadBuff, this.m_ReadBuff.pos, this.m_ReadBuff.bytesAvailable);
                this.m_TempBuff.pos = 0;
                this.m_ReadBuff.clear();
                this.m_ReadBuff.writeArrayBuffer(this.m_TempBuff, this.m_TempBuff.pos, this.m_TempBuff.bytesAvailable);
            }
        }
        /**主动关闭连接*/
        public Close()
        {
            if(this.m_Socket != null)
            {
                this.m_Socket.close();
                this.m_Socket = null;
            }
        }
        /**是否连接正常*/
        public IsConnected():boolean
        {
            if(this.m_Socket != null && this.m_Socket.connected)
                return true;
            return false;
        }  
        public BindRecvCallback(fun:Function):void
        {
            this.m_RecvCallback = fun;
        }
    }
}