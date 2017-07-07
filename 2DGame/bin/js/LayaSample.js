// 程序入口
var GameMain = (function () {
    function GameMain() {
        this.m_image1_url = "res/image/1.png";
        Laya.init(600, 400);
        this.m_img = new Laya.Sprite();
        this.m_img.loadImage(this.m_image1_url, 100, 50);
        this.m_img.on(Laya.Event.CLICK, this, this.OnImageClickEvt);
        Laya.stage.addChild(this.m_img);
    }
    GameMain.prototype.OnImageClickEvt = function () {
        //事件
        // dc.EventController.Instance.AddEventListener("11",this, this.callback);
        // dc.EventController.Instance.Trigger("11",  "1234567");   
        // dc.EventController.Instance.RemoveEventListener("11", this, this.callback);
        // dc.EventController.Instance.Trigger("11",  "1234567"); 
        // dc.EventController.Instance.AddEventListener("12",this,  this.callback2);
        // dc.EventController.Instance.Trigger("12", "234567");   
        //数据结构
        // var queue:dc.Queue<number> = new dc.Queue<number>();
        // queue.Enqueue(1);
        // queue.Enqueue(2);
        // queue.Enqueue(3);
        // queue.Enqueue(4);
        // while(queue.Size() > 0)
        // {
        //     dc.Log.Debug(queue.Dequeue().toString());
        // }
        // var stack:dc.Stack<number> = new dc.Stack<number>();
        // stack.Push(1);
        // stack.Push(2);
        // stack.Push(3);
        // stack.Push(4);
        // while(stack.Size() > 0)
        // {
        //     dc.Log.Debug(stack.Pop().toString());
        // }
        //net
        this.m_socket = new dc.ClientSocket();
        this.m_socket.ConnectUrl("ws://echo.websocket.org:80");
        this.m_socket.BindRecvCallback(Laya.Utils.bind(this.OnRecvData, this));
        this.m_socket.AddEventListener(dc.SocketID.SOCKET_CONNECTED, this, this.OnConnected);
    };
    GameMain.prototype.OnConnected = function (args) {
        dc.Log.Debug("连接成功");
        var by = dc.ByteArrayUtils.CreateSocketByte();
        by.writeInt32(85555555);
        by.writeUTFString("1234");
        by.writeFloat32(0.123);
        by.writeByte(111);
        this.m_socket.Send(by);
    };
    GameMain.prototype.OnRecvData = function (by) {
        dc.Log.Debug("接收数据");
    };
    GameMain.prototype.callback = function (args) {
        dc.Log.Debug(args.Type, args.Get(0));
    };
    GameMain.prototype.callback2 = function (args) {
        console.debug(args.Type, args.Get(0));
    };
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=LayaSample.js.map