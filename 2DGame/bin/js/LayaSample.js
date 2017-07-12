var dc;
(function (dc) {
    // 程序入口
    var GameMain = (function () {
        function GameMain() {
            this.m_image1_url = "res/image/1.png";
            this.aa = 0;
            this.m_img = new LayaSprite();
            this.m_img.loadImage(this.m_image1_url, 100, 50);
            this.m_img.on(Laya.Event.CLICK, this, this.OnImageClickEvt);
            Laya.stage.addChild(this.m_img);
        }
        GameMain.prototype.OnImageClickEvt = function () {
            //事件
            // dc.EventController.AddEventListener("11",this, this.callback);
            // dc.EventController.DispatchEvent("11",  "1234567");   
            // dc.EventController.RemoveEventListener("11", this, this.callback);
            // dc.EventController.DispatchEvent("11",  "1234567"); 
            // dc.EventController.AddEventListener("12",this,  this.callback2);
            // dc.EventController.DispatchEvent("12", "234567");   
            //数据结构
            // let queue:dc.Queue<number> = new dc.Queue<number>();
            // queue.Enqueue(1);
            // queue.Enqueue(2);
            // queue.Enqueue(3);
            // queue.Enqueue(4);
            // while(queue.Size() > 0)
            // {
            //     dc.Log.Debug(queue.Dequeue().toString());
            // }
            // let darr:dc.DoubleArray = new dc.DoubleArray(1,1,0);
            // darr.Set(0,1,10);
            // dc.Log.Debug(darr.Get(0,1));
            // dc.Log.Debug(darr.Get(0,0));
            // let stack:dc.Stack<number> = new dc.Stack<number>();
            // stack.Push(1);
            // stack.Push(2);
            // stack.Push(3);
            // stack.Push(4);
            // while(stack.Size() > 0)
            // {
            //     dc.Log.Debug(stack.Pop().toString());
            // }
            //dc.Log.Debug(dc.StringUtils.minuteFormat(123));
            //dc.Log.Debug(dc.StringUtils.formate("杰卫，这里有{0}个苹果，和{1}个香蕉！", 5,10));
            //dc.Log.Debug(dc.NumberUtils.toFixed(100.01111, 3).toString());
            //随机数
            // for(let i = 0; i < 50; ++i)
            // {
            //     let n:number = dc.MathUtils.randRange(10, 15);
            //     dc.Log.Debug(n.toString());
            // }
            //dc.Log.Debug(dc.MathUtils.Repeat(5,10).toString());
            //vector2
            // let vec1:dc.Vector3 = new dc.Vector3(0,1,0);
            // let vec2:dc.Vector3 = new dc.Vector3(1,1,0);
            // dc.Log.Debug(dc.Vector3.Project(vec1, vec2).ToString());
            //net
            // this.m_socket = new dc.ClientSocket();
            // this.m_socket.ConnectUrl("ws://echo.websocket.org:80");
            // this.m_socket.BindRecvCallback(Laya.Handler.create(this, this.OnRecvData, null, false));
            // this.m_socket.AddEventListener(dc.SocketID.SOCKET_CONNECTED, this, this.OnConnected);
            //声音
            //SoundManager.Instance.PlaySoundEffect("res/sound/hit.mp3", 3);
            //加载
            // dc.ResourceManager.Instance.AddAsync("res/image/1.png", Laya.Loader.IMAGE, Laya.Handler.create(this, this.OnComplete));
            // dc.ResourceManager.Instance.AddAsync("res/image/2.png", Laya.Loader.IMAGE, Laya.Handler.create(this, this.OnComplete));
            // dc.ResourceManager.Instance.AddAsync("res/image/3.png", Laya.Loader.IMAGE, Laya.Handler.create(this, this.OnComplete));
            // dc.ResourceManager.Instance.AddSync("res/image/1.png", Laya.Loader.IMAGE);
            // dc.ResourceManager.Instance.AddSync("res/image/2.png", Laya.Loader.IMAGE);
            // dc.ResourceManager.Instance.AddSync("res/image/3.png", Laya.Loader.IMAGE);
            // dc.ResourceManager.Instance.StartSync();
            //时间
            //Log.Debug(TimeUtils.TimeSince2009.toString());
            //TimerManager.Instance.AddTimer(1000, 10, this, this.OnTimerEvt, [123,12]);
            //utils
            var sound = dc.ClassUtils.CreateObject("dc.Sound");
            sound.Setup("", 1);
            var a = dc.Utils.GetLocationParams();
        };
        GameMain.prototype.Add = function (a) {
            return a + 10;
        };
        GameMain.prototype.OnTimerEvt = function (args) {
            dc.Log.Debug("定时器触发:" + dc.Time.timeSinceStartup);
        };
        GameMain.prototype.OnComplete = function (url) {
            dc.Log.Debug("加载完成:" + url);
        };
        GameMain.prototype.OnConnected = function (args) {
            dc.Log.Debug("连接成功");
            var by = dc.ByteArrayUtils.CreateSocketByte();
            by.writeInt32(85555555);
            by.writeUTFString("1234");
            by.writeFloat32(0.123);
            this.m_socket.Send(by);
        };
        GameMain.prototype.OnRecvData = function (by) {
            dc.Log.Debug("接收数据:" + this.aa.toString());
            this.aa++;
        };
        GameMain.prototype.callback = function (args) {
            dc.Log.Debug(args.Type, args.Get(0));
        };
        GameMain.prototype.callback2 = function (args) {
            console.debug(args.Type, args.Get(0));
        };
        return GameMain;
    }());
    dc.GameMain = GameMain;
})(dc || (dc = {}));
//# sourceMappingURL=LayaSample.js.map