module dc
{
    // 程序入口
    export class GameMain
    {
        private m_image1_url:string = "res/image/1.png";
        private m_img:LayaSprite;
        private m_socket:dc.ClientSocket;
        private m_dic:SDictionary<number>;
        constructor()
        {

            this.m_img = new LayaSprite();
            this.m_img.loadImage(this.m_image1_url, 100, 300);   
            this.m_img.on(Laya.Event.CLICK, this, this.OnImageClickEvt);
            Laya.stage.addChild(this.m_img);

            // //配置表
            // let list = [
            //     new ConfigTemplate("data/serverList.json", "serverList", ""),
            //     new ConfigTemplate("data/configs/global.json", "global", "Name"),
            // ];
            // DataProvider.Load(list);
            //let handle:LayaHandler = LayaHandler.create(this, this.OnEnd);
            //Laya.loader.load(["res/image/1.png","res/image/2.png"], LayaHandler.create(this, this.OnEnd, [handle,"res/image/1.png","res/image/2.png"]));
            //dc.ResourceManager.Instance.AddAsync("res/image/1.png", Laya.Loader.IMAGE);
            //dc.ResourceManager.Instance.AddAsync("res/image/2.png", Laya.Loader.IMAGE);
            //dc.ResourceManager.Instance.AddAsync("res/image/3.png", Laya.Loader.IMAGE);

            dc.TimerManager.Instance.AddLoop(1000, 3, this, this.OnTime, [11]);
        }
        private OnEnd(...args:any[]):void
        {
            
        }
        private ii = 1;
        private OnTime(timer_id:number, args1:any):void
        {
            dc.ResourceManager.Instance.LoadRes("res/image/"+this.ii+".png", LayaLoader.IMAGE);
            this.ii++;
        }
        private OnImageClickEvt():void
        {
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

            let list:LinkList<number> = new LinkList<number>();
            // list.Add(1);
            // list.Add(2);
            // list.Del(0);
            // list.Add(3);
            // list.Add(4);
            // list.Del(1);
            // list.Foreach(function(value)
            // {
            //     Log.Debug(value.toString());
            //     return true;
            // });
            // Log.Debug(DateUtils.GetNow().toString());
            // for(let i = 0; i < 1000000; ++i)
            // {
            //     list.Append(list.length, i);//每次在中间插入
            // }
            // while(list.length > 2)
            // {
            //     list.Del(list.length-1);//每次在中间插入
            // }
            // Log.Debug(DateUtils.GetNow().toString());

            // let arr:Array<number> = [];
            // Log.Debug(DateUtils.GetNow().toString());
            // for(let i = 0; i < 1000000; ++i)
            // {
            //     arr.splice(arr.length-1, 0, i);//每次在中间插入
            // }
            // while(list.length > 2)
            // {
            //     arr.splice(arr.length-1, 1);//每次在中间插入
            // }
            // Log.Debug(DateUtils.GetNow().toString());

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
            this.m_socket = new dc.ClientSocket();
            this.m_socket.ConnectUrl("ws://127.0.0.1:8181");//ws://echo.websocket.org:80
            this.m_socket.BindRecvCallback(Laya.Handler.create(this, this.OnRecvData, null, false));
            this.m_socket.AddEventListener(SocketEvent.SOCKET_CONNECTED, this, this.OnConnected);

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
            //EffectManager.Instance.CreateEffect_Position("res/effect/actEffect.json", SceneLayerUtils.effect,100,100, 0);
            
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
        }
        public Add(a:number):number
        {
            return a+10;
        }
        private OnTimerEvt(args:any[])
        {
            Log.Debug("定时器触发:" + Time.timeSinceStartup);
        }
        private OnAsyncComplete(url:string):void
        {
            Log.Debug("加载完成:" + url);
        }
        private OnSyncComplete():void
        {
            Log.Debug("同步加载完成");
        }
        private OnSyncProgress(cur:number, total:number):void
        {
            Log.Debug("同步加载进度:" + cur + ", " + total);
        }
        private OnConnected(args:dc.EventArgs):void
        {
            dc.Log.Debug("连接成功");
            let by:Laya.Byte = dc.ByteArrayUtils.CreateSocketByte();
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
}