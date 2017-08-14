module dc
{
    /**
     * 登陆数据管理器
     * @author hannibal
     * @time 2017-7-20
     */
	export class LoginDataMgr extends Singleton
	{
        private static instance:LoginDataMgr = null;
        public static get Instance():LoginDataMgr
        {
            if(!this.instance)this.instance = new LoginDataMgr();
            return this.instance;
        }
        
        /**在这做数据初始化*/
		public Init():void
        {
            NetManager.Instance.RegisterPacketHandler(S2CMsg.Encrypt, this, this.OnNetEvt);
            NetManager.Instance.RegisterPacketHandler(S2CMsg.Login, this, this.OnNetEvt);
        }
        /**在这清空数据，尤其是列表等保存的数据*/
        public Release():void
        {
            NetManager.Instance.UnregisterPacketHandler(S2CMsg.Encrypt, this, this.OnNetEvt);
            NetManager.Instance.UnregisterPacketHandler(S2CMsg.Login, this, this.OnNetEvt);
        }

        /**握手协议*/
        public SendEncrypt():void
        {
            let by:LayaByte = ByteArrayUtils.CreateSocketByte(C2SMsg.Encrypt);
            by.writeUTFString("dc");
            by.writeInt32(1);
            ServerManager.Instance.SendGameMsg(C2SMsg.Encrypt, by);
        }
        /**登陆*/
        public SendLogin(account:string, psw:string):void
        {
            let by:LayaByte = ByteArrayUtils.CreateSocketByte(C2SMsg.Login);
            by.writeUTFString("dc");
            by.writeUTFString("123456");
            ServerManager.Instance.SendGameMsg(C2SMsg.Login,by);
        }

        private OnNetEvt(msg_id:number, by:LayaByte):void
        {
            switch(msg_id)
            {
                case S2CMsg.Encrypt:
                let key:number = by.getInt32();
                this.OnRecvEncrypt("");
                break;
                case S2CMsg.Login:
                let result = by.getByte();
                this.OnRecvLogin();
                break;
            }
        }
        private OnRecvEncrypt(key:string):void
        {
            //显示登陆界面
            UIShowController.Show(GUIID.LOGIN, 111,1112);
        }
        private OnRecvLogin():void
        {
            let info:SceneTransmitInfo = new SceneTransmitInfo();
            info.sceneId = 1000;
            EventController.DispatchEvent(EventID.CHANGE_SCENE, info);
        }
	}
}