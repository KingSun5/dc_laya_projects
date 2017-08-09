module dc
{
    /**
     * 管理器
     * @author hannibal
     * @time 2017-7-6
     */
    export class Framework extends Singleton
    {        
        private m_MainloopHandle:LayaHandler = null;

        private static instance:Framework = null;
        public static get Instance():Framework
        {
            if(!this.instance)this.instance = new Framework();
            return this.instance;
        }

        constructor()
        {
            super();
            Time.Start();
        }
        /**
         * 初始化
         * @param	root	根节点，可以是stage
         */
        public Setup(root:LayaSprite, main_loop:LayaHandler):void
        {
            this.PrintDeviceInfo();

            this.m_MainloopHandle = main_loop;
            Laya.timer.frameLoop(1, this, this.MainLoop);

            Input.Setup();
            LayerManager.Setup(root);
            TimerManager.Instance.Setup();
            UIManager.Instance.Setup();
            ObjectManager.Instance.Setup();
            SoundManager.Instance.Setup();
            ResourceManager.Instance.Setup();
            DataProvider.Instance.Setup();
            NetManager.Instance.Setup();
            PhysxManager.Instance.Setup();
        }

        public Destroy():void
        {
            Laya.timer.clearAll(this);
            
            TimerManager.Instance.Destroy();
            UIManager.Instance.Destroy();
            ObjectManager.Instance.Destroy();   
            SoundManager.Instance.Destroy();    
            ResourceManager.Instance.Destroy();  
            DataProvider.Instance.Destroy();
            NetManager.Instance.Destroy();
            PhysxManager.Instance.Destroy();
            LayerManager.Destroy();
            Input.Destroy();
        }
        /**
         * 游戏主循环
        */
        private MainLoop():void
        {
            this.PreTick();
            this.Tick();
            this.EndTick();
        }
        public PreTick():void
        {
            TimerManager.Instance.Tick();
            PhysxManager.Instance.Tick();
            UIManager.Instance.Tick();
            ObjectManager.Instance.Tick();
            SoundManager.Instance.Tick();
            ResourceManager.Instance.Tick();
            NetManager.Instance.Tick();
        }
        public Tick():void
        {
            if(this.m_MainloopHandle)
            {
                this.m_MainloopHandle.runWith([]);
            }
        }
        public EndTick():void
        {
            Input.Tick();//放最后
        }
        /**打印设备信息*/
        private PrintDeviceInfo() 
        {
            if (navigator) 
            {
                let agentStr = navigator.userAgent;

                let start = agentStr.indexOf("(");
                let end = agentStr.indexOf(")");

                if (start < 0 || end < 0 || end < start)
                {
                    return;
                }

                let infoStr = agentStr.substring(start + 1, end);
                console.log(infoStr);

                let device:string, system:string, version:string;
                let infos = infoStr.split(";");
                if (infos.length == 3) 
                {
                    //如果是三个的话， 可能是android的， 那么第三个是设备号
                    device = infos[2];
                    //第二个是系统号和版本
                    let system_info = infos[1].split(" ");
                    if (system_info.length >= 2) 
                    {
                        system = system_info[1];
                        version = system_info[2];
                    }
                }
                else if (infos.length == 2) 
                {
                    system = infos[0];
                    device = infos[0];
                    version = infos[1];
                }
                else 
                {
                    system = navigator.platform;
                    device = navigator.platform;
                    version = infoStr;
                }
                Log.Info(system, device, version);
            }
        }
    }
}