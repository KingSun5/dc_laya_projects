// 程序入口
class GameMain
{
    private m_image1_url:string = "res/image/1.png";
    private m_img:Laya.Sprite;
    private m_socket:dc.ClientSocket;
    constructor()
    {
        Laya.init(600,400);
        
        this.m_img = new Laya.Sprite();
        this.m_img.loadImage(this.m_image1_url, 100, 50);   
        this.m_img.on(Laya.Event.CLICK, this, this.OnImageClickEvt);
        Laya.stage.addChild(this.m_img);
        
    }
    private OnImageClickEvt():void
    {
        //事件
        dc.EventController.Instance.AddEventListener("11",this, this.callback);
        dc.EventController.Instance.Trigger("11",  "1234567");   
        dc.EventController.Instance.RemoveEventListener("11", this, this.callback);
        dc.EventController.Instance.Trigger("11",  "1234567"); 
        dc.EventController.Instance.AddEventListener("12",this,  this.callback2);
        dc.EventController.Instance.Trigger("12", "234567");   

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
        this.m_socket.BindRecvCallback(Laya.Handler.create(this, this.OnRecvData, null, false));
        this.m_socket.AddEventListener(dc.SocketID.SOCKET_CONNECTED, this, this.OnConnected)
    }
    private OnConnected(args:dc.EventArgs):void
    {
        dc.Log.Debug("连接成功");
        var by:Laya.Byte = dc.ByteArrayUtils.CreateSocketByte();
        by.writeInt32(85555555);
        by.writeUTFString("1234");
        by.writeFloat32(0.123);
        this.m_socket.Send(by);
    }
    private aa:number = 0;
    private OnRecvData(by:Laya.Byte):void
    {
        dc.Log.Debug("接收数据:" + this.aa.toString());
        this.aa++;
    }
    private callback(args:dc.EventArgs):void
    {
        dc.Log.Debug(args.Type, args.Get(0));
    }
    private callback2(args:dc.EventArgs):void
    {
        console.debug(args.Type, args.Get(0));
    }
}
new GameMain();