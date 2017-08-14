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
            NetManager.Instance.RegisterPacketHandler(S2CMsg.CharacterList, this, this.OnNetEvt);
            NetManager.Instance.RegisterPacketHandler(S2CMsg.CreateCharacter, this, this.OnNetEvt);
            NetManager.Instance.RegisterPacketHandler(S2CMsg.CharacterInfo, this, this.OnNetEvt);
        }
        /**在这清空数据，尤其是列表等保存的数据*/
        public Release():void
        {
            NetManager.Instance.UnregisterPacketHandler(S2CMsg.Encrypt, this, this.OnNetEvt);
            NetManager.Instance.UnregisterPacketHandler(S2CMsg.Login, this, this.OnNetEvt);
            NetManager.Instance.UnregisterPacketHandler(S2CMsg.CharacterList, this, this.OnNetEvt);
            NetManager.Instance.UnregisterPacketHandler(S2CMsg.CreateCharacter, this, this.OnNetEvt);
            NetManager.Instance.UnregisterPacketHandler(S2CMsg.CharacterInfo, this, this.OnNetEvt);
        }

        /**握手协议*/
        public SendEncrypt():void
        {
            let by:LayaByte = ByteArrayUtils.CreateSocketByte(C2SMsg.Encrypt);
            by.writeUTFString("dc");
            by.writeInt32(1);
            ServerManager.Instance.SendGameMsg(by);
        }
        /**登陆*/
        public SendLogin(account:string, psw:string):void
        {
            let by:LayaByte = ByteArrayUtils.CreateSocketByte(C2SMsg.Login);
            by.writeUTFString(account);
            by.writeUTFString(psw);
            ServerManager.Instance.SendGameMsg(by);
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
                let result:number = by.getByte();
                this.OnRecvLogin(result);
                break;
                case S2CMsg.CharacterList:
                let count:number = by.getByte();
                this.OnCharacterList(count);
                break;
                case S2CMsg.CreateCharacter:
                result = by.getByte();
                this.OnCreateCharacter(result);
                break;
            }
        }
        /**加密协议*/
        private OnRecvEncrypt(key:string):void
        {
            Log.Info("OnRecvEncrypt:" + key);
            //显示登陆界面
            UIShowController.Show(GUIID.LOGIN, 111,1112);
        }
        /**登陆*/
        private OnRecvLogin(result:number):void
        {
            Log.Info("OnRecvLogin:" + result);
            let by:LayaByte = ByteArrayUtils.CreateSocketByte(C2SMsg.CharacterList);
            ServerManager.Instance.SendGameMsg(by);
        }
        /**角色列表*/
        private OnCharacterList(count:number):void
        {
            Log.Info("OnCharacterList:" + count);
            let by:LayaByte = ByteArrayUtils.CreateSocketByte(C2SMsg.CreateCharacter);
            by.writeUTFString("test110");//姓名
            by.writeByte(1);//性别
            ServerManager.Instance.SendGameMsg(by);  
        }
        /**创建角色*/
        private OnCreateCharacter(result:number):void
        {
            Log.Info("OnCreateCharacter:" + result);

            let by:LayaByte = ByteArrayUtils.CreateSocketByte(C2SMsg.EnterGame);
            ServerManager.Instance.SendGameMsg(by);
        }
	}
}