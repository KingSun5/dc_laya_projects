var dc;
(function (dc) {
    /**
     * 客户端socket
     * @author hannibal
     * @time 2017-7-7
     */
    var ClientSocket = (function () {
        function ClientSocket() {
        }
        /**请求连接:主机*/
        ClientSocket.prototype.ConnectHost = function (host, port) {
            this.m_Host = host;
            this.m_Port = port;
            this.m_Socket = new Laya.Socket();
            this.m_Socket.connect(host, port);
            this.HandleConnect();
        };
        /**请求连接:站点*/
        ClientSocket.prototype.ConnectUrl = function (url) {
            this.m_Host = url;
            this.m_Socket = new Laya.Socket();
            this.m_Socket.connectByUrl(url);
            this.HandleConnect();
        };
        /**发数据*/
        ClientSocket.prototype.Send = function (by) {
            if (!this.IsConnected() || by.length <= 0)
                return;
            by.pos = 0;
            by.writeUint16(by.bytesAvailable - dc.SocketID.HEADER_SIZE);
            by.pos = 0;
            this.m_OutBuff.writeArrayBuffer(by.buffer, 0, by.bytesAvailable);
            this.m_Socket.flush();
            return 0;
        };
        ClientSocket.prototype.HandleConnect = function () {
            this.m_ReadBuff = new LayaByte();
            this.m_OutBuff = this.m_Socket.output;
            this.m_Socket.endian = Laya.Socket.LITTLE_ENDIAN;
            this.RegisterEvent();
        };
        /**主动关闭连接*/
        ClientSocket.prototype.Close = function () {
            if (this.m_RecvCallback) {
                this.m_RecvCallback.recover();
                this.m_RecvCallback = null;
            }
            if (this.m_Socket) {
                this.UnRegisterEvent();
                this.m_Socket.close();
                this.m_Socket = null;
            }
        };
        /**是否连接正常*/
        ClientSocket.prototype.IsConnected = function () {
            if (this.m_Socket && this.m_Socket.connected)
                return true;
            return false;
        };
        ClientSocket.prototype.BindRecvCallback = function (fun) {
            this.m_RecvCallback = fun;
        };
        //～～～～～～～～～～～～～～～～～～～～～～～事件～～～～～～～～～～～～～～～～～～～～～～～//
        ClientSocket.prototype.RegisterEvent = function () {
            this.m_Socket.on(Laya.Event.OPEN, this, this.OnSocketOpen);
            this.m_Socket.on(Laya.Event.CLOSE, this, this.OnSocketClose);
            this.m_Socket.on(Laya.Event.MESSAGE, this, this.OnMessageReveived);
            this.m_Socket.on(Laya.Event.ERROR, this, this.OnConnectError);
        };
        ClientSocket.prototype.UnRegisterEvent = function () {
            this.m_Socket.off(Laya.Event.OPEN, this, this.OnSocketOpen);
            this.m_Socket.off(Laya.Event.CLOSE, this, this.OnSocketClose);
            this.m_Socket.off(Laya.Event.MESSAGE, this, this.OnMessageReveived);
            this.m_Socket.off(Laya.Event.ERROR, this, this.OnConnectError);
        };
        ClientSocket.prototype.OnSocketOpen = function () {
            dc.Log.Info("Socket Connected");
            dc.EventController.DispatchEvent(dc.SocketEvent.SOCKET_CONNECTED, this.m_Host);
        };
        ClientSocket.prototype.OnSocketClose = function () {
            dc.Log.Info("Socket closed");
            dc.EventController.DispatchEvent(dc.SocketEvent.SOCKET_CLOSE, this.m_Host);
        };
        ClientSocket.prototype.OnMessageReveived = function (msg) {
            if (typeof msg == "string") {
                console.log(msg);
                var by = new LayaByte();
                by.writeInt32(123456);
                this.m_OutBuff.writeArrayBuffer(by.buffer, 0, by.length);
                //this.m_Socket.send(msg);
                this.m_Socket.flush();
            }
            else if (msg instanceof ArrayBuffer && this.m_Socket.input.length > 0) {
                this.DispatcherData();
            }
        };
        ClientSocket.prototype.OnConnectError = function (e) {
            dc.Log.Info("Socket Error");
            dc.EventController.DispatchEvent(dc.SocketEvent.SOCKET_ERROR, this.m_Host);
        };
        ClientSocket.prototype.DispatcherData = function () {
            var buff = this.m_Socket.input;
            while (buff.bytesAvailable > dc.SocketID.HEADER_SIZE) {
                var dataLen = buff.getUint16();
                if (buff.bytesAvailable < dataLen) {
                    buff.pos -= dc.SocketID.HEADER_SIZE;
                    break;
                }
                var beginPos = buff.pos;
                this.m_ReadBuff.clear();
                this.m_ReadBuff.writeArrayBuffer(buff.buffer, buff.pos, dataLen);
                this.m_ReadBuff.pos = 0;
                //派发数据
                if (this.m_RecvCallback != null)
                    this.m_RecvCallback.runWith(this.m_ReadBuff);
                buff.pos = beginPos + dataLen;
            }
        };
        return ClientSocket;
    }());
    dc.ClientSocket = ClientSocket;
})(dc || (dc = {}));
//# sourceMappingURL=ClientSocket.js.map