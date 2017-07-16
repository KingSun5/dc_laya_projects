var dc;
(function (dc) {
    /**
     * socket id
     * @author hannibal
     * @time 20174-7-7
     */
    var SocketID = (function () {
        function SocketID() {
        }
        ///网络事件
        SocketID.SOCKET_CONNECTED = "SOCKET_CONNECTED";
        SocketID.SOCKET_CLOSE = "SOCKET_CLOSE";
        SocketID.SOCKET_ERROR = "SOCKET_ERROR";
        //包头大小
        SocketID.HEADER_SIZE = 2;
        return SocketID;
    }());
    dc.SocketID = SocketID;
})(dc || (dc = {}));
//# sourceMappingURL=SocketID.js.map