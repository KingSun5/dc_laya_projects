// 程序入口
class GameMain
{
    private m_image1_url:string = "res/image/1.png";
    private m_img:Laya.Sprite;

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
        // var evt:dc.EventDispatcher = new dc.EventDispatcher();
        // evt.AddEventListener("11", this.callback);
        // evt.TriggerEvent("11", "1234567");

        // dc.EventController.Instance.AddEventListener("11", this.callback);
        // dc.EventController.Instance.TriggerEvent("11", "1234567");   
        // dc.EventController.Instance.RemoveEventListener("11", this.callback);
        // dc.EventController.Instance.TriggerEvent("11", "1234567"); 
        // dc.EventController.Instance.AddEventListener("12", this.callback2);
        // dc.EventController.Instance.TriggerEvent("12", "234567");   

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