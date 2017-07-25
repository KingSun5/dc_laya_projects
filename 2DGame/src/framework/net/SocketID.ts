module dc
{
    /**
     * socket id
     * @author hannibal
     * @time 2017-7-7
     */
    export class SocketID
    {
        //包头大小
        public static HEADER_SIZE:number = 2;
    }
    /**
     * 网络事件
    */
    export class SocketEvent
    {
        public static SOCKET_CONNECTED:string = "SOCKET_CONNECTED";
        public static SOCKET_CLOSE:string = "SOCKET_CLOSE";
        public static SOCKET_ERROR:string = "SOCKET_ERROR";
    }
}