module dc
{
	/**
     * 对象创建
     * @author hannibal
     * @time 2017-7-23
     */
	export class ObjectCreateController
	{
		/*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～创建方法～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
		public static CreatePlayer(unit_info:UnitInfo):Role
		{
			let info = ConfigManger.Instance.GetInfo(ConfigTable.UnitInfo, unit_info.UnitID);
			if (info == null)
			{
				Log.Error("CreatePlayer - not find unit id:" + unit_info.UnitID);
				return null;
			}
			let obj:Role = new MainPlayer();
			obj.Init();
			obj.ObjectServerID = "";
			obj.UnitTypeID = unit_info.UnitID;
			obj.Setup(null);
			obj.LoadData(unit_info);
			obj.LoadResource([{url:"res/atlas/anim/monster/001/DJ.atlas", type:LayaLoader.ATLAS},
								{url:"res/atlas/anim/monster/001/YD.atlas", type:LayaLoader.ATLAS},
								{url:"res/atlas/anim/monster/001/SW.atlas", type:LayaLoader.ATLAS},
								{url:"res/atlas/anim/monster/001/GJ.atlas", type:LayaLoader.ATLAS}]);
			SceneLayers.role.addChild(obj.RootNode);
			ObjectManager.Instance.AttachObject(obj);
			MainObjCmdFacade.Instance.AttackRole = obj;

			return obj;
		}
	}

	export class RoleScript  extends ComponentBase
	{
		/**添加成功执行：当前帧*/
		public Start():void
		{
			Log.Debug("Start");
		}
		/**激活执行：当前帧*/
		public OnEnable():void
		{
			Log.Debug("OnEnable");
		}
		/**失效*/
		public OnDisable():void
		{
			Log.Debug("OnDisable");
		}
		/**每帧执行*/
		public Update():void
		{
			let role:Role = this.Owner as Role;
			role.SetPosition(role.x+1, role.y, role.z);
		}
		/**销毁执行*/
		public OnDestroy():void
		{
			Log.Debug("OnDestroy");
		}
	}
}