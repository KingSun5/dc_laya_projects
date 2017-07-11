var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var dc;
(function (dc) {
    /**
     * 客户端socket
     * @author hannibal
     * @time 20174-7-7
     */
    var ClientSocket = (function (_super) {
        __extends(ClientSocket, _super);
        function ClientSocket() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.m_IsReadHead = true;
            _this.m_DataLength = 0;
            return _this;
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
            if (!this.IsConnected())
                return;
            by.pos = 0;
            by.writeUint16(14);
            this.m_OutBuff.writeArrayBuffer(by.buffer, 0, by.length);
            this.m_Socket.flush();
            return 0;
        };
        ClientSocket.prototype.HandleConnect = function () {
            this.m_ReadBuff = new Laya.Byte();
            this.m_WriteBuff = new Laya.Byte();
            this.m_TempBuff = new Laya.Byte();
            this.m_OutBuff = this.m_Socket.output;
            this.m_OutBuff.endian = Laya.Socket.LITTLE_ENDIAN;
            this.m_Socket.on(Laya.Event.OPEN, this, this.OnSocketOpen);
            this.m_Socket.on(Laya.Event.CLOSE, this, this.OnSocketClose);
            this.m_Socket.on(Laya.Event.MESSAGE, this, this.OnMessageReveived);
            this.m_Socket.on(Laya.Event.ERROR, this, this.OnConnectError);
        };
        ClientSocket.prototype.OnSocketOpen = function () {
            dc.Log.Info("Socket Connected");
            this.Dispatch(dc.SocketID.SOCKET_CONNECTED);
        };
        ClientSocket.prototype.OnSocketClose = function () {
            dc.Log.Info("Socket closed");
            this.Dispatch(dc.SocketID.SOCKET_CLOSE);
        };
        ClientSocket.prototype.OnMessageReveived = function (msg) {
            if (msg instanceof ArrayBuffer) {
                this.m_ReadBuff.writeArrayBuffer(msg);
                this.m_ReadBuff.pos = 0;
                this.DispatcherData();
            }
            this.m_Socket.input.clear();
        };
        ClientSocket.prototype.OnConnectError = function (e) {
            dc.Log.Info("Socket Error");
            this.Dispatch(dc.SocketID.SOCKET_ERROR);
        };
        ClientSocket.prototype.DispatcherData = function () {
            while (this.m_ReadBuff.bytesAvailable > 0) {
                if (this.m_IsReadHead) {
                    if (this.m_ReadBuff.bytesAvailable >= dc.SocketID.HEADER_SIZE) {
                        this.m_DataLength = this.m_ReadBuff.getUint16();
                        this.m_IsReadHead = false;
                    }
                    else {
                        this.CacheUnreadByte();
                        break;
                    }
                }
                else {
                    if (this.m_ReadBuff.bytesAvailable >= this.m_DataLength) {
                        this.m_TempBuff.clear();
                        this.m_TempBuff.writeArrayBuffer(this.m_ReadBuff, this.m_ReadBuff.pos, this.m_DataLength);
                        this.m_TempBuff.pos = 0;
                        //派发数据
                        if (this.m_RecvCallback != null)
                            this.m_RecvCallback.runWith(this.m_TempBuff);
                        this.m_ReadBuff.pos += this.m_DataLength;
                        this.m_IsReadHead = true;
                    }
                    else {
                        this.CacheUnreadByte();
                        break;
                    }
                }
            }
        };
        /**把剩余未读的移到前面*/
        ClientSocket.prototype.CacheUnreadByte = function () {
            if (this.m_ReadBuff.bytesAvailable > 0) {
                this.m_TempBuff.clear();
                this.m_TempBuff.writeArrayBuffer(this.m_ReadBuff, this.m_ReadBuff.pos, this.m_ReadBuff.bytesAvailable);
                this.m_TempBuff.pos = 0;
                this.m_ReadBuff.clear();
                this.m_ReadBuff.writeArrayBuffer(this.m_TempBuff, this.m_TempBuff.pos, this.m_TempBuff.bytesAvailable);
            }
        };
        /**主动关闭连接*/
        ClientSocket.prototype.Close = function () {
            if (this.m_Socket != null) {
                this.m_Socket.close();
                this.m_Socket = null;
            }
        };
        /**是否连接正常*/
        ClientSocket.prototype.IsConnected = function () {
            if (this.m_Socket != null && this.m_Socket.connected)
                return true;
            return false;
        };
        ClientSocket.prototype.BindRecvCallback = function (fun) {
            this.m_RecvCallback = fun;
        };
        return ClientSocket;
    }(dc.EventDispatcher));
    dc.ClientSocket = ClientSocket;
})(dc || (dc = {}));
//# sourceMappingURL=ClientSocket.js.map