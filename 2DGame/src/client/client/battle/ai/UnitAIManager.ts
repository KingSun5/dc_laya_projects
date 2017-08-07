module dc
{
	/**
     * 对象创建
     * @author hannibal
     * @time 2017-7-23
     */
	export class UnitAIManager extends Singleton
	{

        private static instance:UnitAIManager = null;
        public static get Instance():UnitAIManager
        {
            if(!this.instance)this.instance = new UnitAIManager();
            return this.instance;
        }

        public CreateTestRobot()
        {
            for(let row = 0; row < 10; ++row)
            {
                for(let col = 0; col < 10; ++col)
                {
                    let unit_info:UnitInfo = new UnitInfo(1);
                    unit_info.Group = eGroupType.TYPE_1;
                    unit_info.Pos = new Vector3(col*60,row*100,0);
                    unit_info.Dir = Vector3.ForwardRH;
                    ObjectCreateController.CreatePlayer(unit_info);
                }
            }
        }
        /**创建主玩家*/
		public CreateMainPlayer():Role
		{
			let unit_info:UnitInfo = new UnitInfo(1);
            unit_info.Group = eGroupType.TYPE_1;
            unit_info.Pos = new Vector3(Laya.stage.width*0.5,Laya.stage.height*0.5,0);
            unit_info.Dir = Vector3.ForwardRH;
			let role:Role = ObjectCreateController.CreatePlayer(unit_info);

			return role;
		}
	}
}