module dc
{
    /**
     * 管理器
     * @author hannibal
     * @time 20174-7-6
     */
    export class Framework extends Singleton
    {        
        private static instance:Framework = null;
        public static get Instance():Framework
        {
            if(!this.instance)this.instance = new Framework();
            return this.instance;
        }

        public Setup(root:LayaSprite):void
        {
            this.PrintDeviceInfo();

            Time.Start();
            LayerManager.Setup(root);
            TimerManager.Instance.Setup();
            UIManager.Instance.Setup();
            ObjectManager.Instance.Setup();
            SoundManager.Instance.Setup();
            ResourceManager.Instance.Setup();
        }

        public Destroy():void
        {
            TimerManager.Instance.Destroy();
            UIManager.Instance.Destroy();
            ObjectManager.Instance.Destroy();   
            SoundManager.Instance.Destroy();    
            ResourceManager.Instance.Destroy();  
            LayerManager.Destroy();
        }

        public Tick(elapse:number, game_frame:number):void
        {
            TimerManager.Instance.Tick(elapse, game_frame);
            UIManager.Instance.Tick(elapse, game_frame);
            ObjectManager.Instance.Tick(elapse, game_frame);
            SoundManager.Instance.Tick(elapse, game_frame);
            ResourceManager.Instance.Tick(elapse, game_frame);
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
                console.log(system, device, version);
            }
        }
    }
}