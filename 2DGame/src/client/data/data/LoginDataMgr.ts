module dc
{
    /**
     * 登陆数据管理器
     * @author hannibal
     * @time 20174-7-20
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

        }
        /**在这清空数据，尤其是列表等保存的数据*/
        public Release():void
        {

        }
	}
}