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

		public CreateMainPlayer():Role
		{
			let unit_info:UnitInfo = new UnitInfo(1);
			let role:Role = ObjectCreateController.CreateMainPlayer(unit_info);

			return role;
		}
	}
}