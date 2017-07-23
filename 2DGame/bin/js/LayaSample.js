var dc;
(function (dc) {
    // 程序入口
    var GameMain = (function () {
        function GameMain() {
            this.m_image1_url = "res/image/1.png";
            this.ii = 1;
            this.aa = 0;
            this.m_img = new LayaSprite();
            this.m_img.loadImage(this.m_image1_url, 100, 50);
            this.m_img.on(Laya.Event.CLICK, this, this.OnImageClickEvt);
            Laya.stage.addChild(this.m_img);
            // //配置表
            // let list = [
            //     new ConfigTemplate("data/serverList.json", "serverList", ""),
            //     new ConfigTemplate("data/configs/global.json", "global", "Name"),
            // ];
            // DataProvider.Load(list);
            var handle = LayaHandler.create(this, this.OnEnd);
            Laya.loader.load(["res/image/1.png", "res/image/2.png"], LayaHandler.create(this, this.OnEnd, [handle, "res/image/1.png", "res/image/2.png"]));
            //dc.ResourceManager.Instance.AddAsync("res/image/1.png", Laya.Loader.IMAGE);
            //dc.ResourceManager.Instance.AddAsync("res/image/2.png", Laya.Loader.IMAGE);
            //dc.ResourceManager.Instance.AddAsync("res/image/3.png", Laya.Loader.IMAGE);
            //dc.TimerManager.Instance.AddTimer(1000, 3, this, this.OnTime, [11]);
        }
        GameMain.prototype.OnEnd = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        GameMain.prototype.OnTime = function (timer_id, args1) {
            dc.ResourceManager.Instance.AddAsync("res/image/" + this.ii + ".png", LayaLoader.IMAGE);
            this.ii++;
        };
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
            // this.m_dic = new SDictionary<number>();
            // this.m_dic.Add("1", 1);
            // this.m_dic.Add("2", 2);
            // this.m_dic.Add("3", 3);
            // this.m_dic.Foreach(function(key, value)
            // {
            //     Log.Debug(value.toString());
            //     if(value == 2)return false;
            //     return true;
            // });
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
            // dc.ResourceManager.Instance.AddAsync("res/image/1.png", Laya.Loader.IMAGE, Laya.Handler.create(this, this.OnAsyncComplete));
            // dc.ResourceManager.Instance.AddAsync("res/image/2.png", Laya.Loader.IMAGE, Laya.Handler.create(this, this.OnAsyncComplete));
            // dc.ResourceManager.Instance.AddAsync("res/image/3.png", Laya.Loader.IMAGE, Laya.Handler.create(this, this.OnAsyncComplete));
            // let assets = [];
            // assets.push({url:"res/image/1.png", type:Laya.Loader.IMAGE});
            // assets.push({url:"res/image/2.png", type:Laya.Loader.IMAGE});
            // assets.push({url:"res/image/3.png", type:Laya.Loader.IMAGE});
            // dc.ResourceManager.Instance.AddSync(assets, this, this.OnSyncComplete, this.OnSyncProgress);
            //释放
            //dc.ResourceManager.Instance.ClearUnusedAssets(eClearStrategy.FIFO);
            //时间
            //Log.Debug(TimeUtils.TimeSince2009.toString());
            //TimerManager.Instance.AddTimer(1000, 10, this, this.OnTimerEvt, [123,12]);
            //utils
            // let sound = ClassUtils.CreateObject<dc.Sound>("dc.Sound");
            // sound.Setup("",1);
            // let a = Utils.GetLocationParams();
            //配置表
            // let conf = DataProvider.GetConfig("serverList");
            // let s = conf[0].serverId;
            // let n = conf[0].name;
            // let info = DataProvider.GetInfo("global","nResetTime");
            // s = info.IntegerValue;
            // n = info.DoubleValue;
            //effect
            //EffectManager.Instance.CreateEffect_Position("res/effect/actEffect.json", SceneLayerUtils.effectLevelContainer,100,100, 0);
            //缓存
            // LocalValue.SetGlobalKey("123456789");
            // LocalValue.Set("name", "test");
            // LocalValue.Set("psw","123456");
            // Log.Debug(LocalValue.Get("name"));
            //proxy
            // let sp:LayaSprite = new LayaSprite();
            // Laya.stage.addChild(sp);
            // // let proxy:PictureProxy = new PictureProxy();
            // // proxy.Show("res/image/3.png", null, eAligeType.MID, DisplayProxy.GetProxy("res/effect/actEffect.json"));
            // // sp.addChild(proxy.RootNode);
            // let proxy:AnimationProxy = new AnimationProxy();
            // proxy.Show("res/effect/actEffefct.json", null, eAligeType.MID, DisplayProxy.GetProxy("res/image/1.png"));
            // sp.addChild(proxy.RootNode);
            //md5
            //Log.Debug(Utils.MD5Encrypt("12424"));
            //flags
            // let a = FlagUtils.InsertFlag(1,2);
            // Log.Debug(a.toString());
            // a = FlagUtils.RemoveFlag(a,2);
            // Log.Debug(a.toString());
            // let b = FlagUtils.HasFlag(a,2);
            // Log.Debug(a.toString());
            //界面显示
            // var testui:LoginView = new LoginView();
            // testui.OnLoadComplete();
            // LayerManager.uiLayer.addChild(testui);
            //UIManager.Instance.Show(GUIID.ID_LOGIN);
            //测试删除
            // let objs:Object = {};
            // objs[1] = 1;
            // objs[2] = 2;
            // objs[3] = 3;
            // objs[4] = 4;
            // objs[5] = 5;
            // for(let key in objs)
            // {
            //     if(objs[key] == 2 || objs[key] == 4)
            //     delete objs[key];
            // }
            // for(let key in objs)
            // {
            //     Log.Debug(objs[key]);
            // }
            //数字组件
            // let image_number:UIImageNumber = new UIImageNumber("ui/main/clip_num.png", 29, 33);
            // image_number.SetNum(123456789);
            // image_number.pos(200,300);
            // UILayerUtils.top.addChild(image_number);
        };
        GameMain.prototype.Add = function (a) {
            return a + 10;
        };
        GameMain.prototype.OnTimerEvt = function (args) {
            dc.Log.Debug("定时器触发:" + dc.Time.timeSinceStartup);
        };
        GameMain.prototype.OnAsyncComplete = function (url) {
            dc.Log.Debug("加载完成:" + url);
        };
        GameMain.prototype.OnSyncComplete = function () {
            dc.Log.Debug("同步加载完成");
        };
        GameMain.prototype.OnSyncProgress = function (cur, total) {
            dc.Log.Debug("同步加载进度:" + cur + ", " + total);
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