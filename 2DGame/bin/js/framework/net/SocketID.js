var dc;
(function (dc) {
    /**
     * socket id
     * @author hannibal
     * @time 2017-7-7
     */
    var SocketID = (function () {
        function SocketID() {
        }
        //包头大小
        SocketID.HEADER_SIZE = 2;
        return SocketID;
    }());
    dc.SocketID = SocketID;
    /**
     * 网络事件
    */
    var SocketEvent = (function () {
        function SocketEvent() {
        }
        SocketEvent.SOCKET_CONNECTED = "SOCKET_CONNECTED";
        SocketEvent.SOCKET_CLOSE = "SOCKET_CLOSE";
        SocketEvent.SOCKET_ERROR = "SOCKET_ERROR";
        return SocketEvent;
    }());
    dc.SocketEvent = SocketEvent;
})(dc || (dc = {}));
//# sourceMappingURL=SocketID.js.map