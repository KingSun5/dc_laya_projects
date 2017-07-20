module dc
{
	/**
     * ui加载项配置
     * @author hannibal
     * @time 20174-7-9
     */	
	export class UILoaderRegister
	{
		public static Setup()
		{
			UILoaderRegister.RegisterAll();
		}
		
		public static Destroy()
		{
			UIManager.Instance.ClearLoaderInfo();
		}

		private static RegisterAll()
		{
			let list:Array<sUILoaderInfo> = UILoaderRegister.ListLoaderInfo;
			for(let info of list)
			{
				UIManager.Instance.AddLoaderInfo(info);
			}
		}

		private static get ListLoaderInfo():Array<sUILoaderInfo>
		{
			return [
				new sUILoaderInfo(GUIID.ID_LOGIN, LoginView, eUILayer.LAYER_ID_VIEW, true, eAligeType.MID),
				new sUILoaderInfo(GUIID.ID_SELECT_SERVER, SelectSeverView, eUILayer.LAYER_ID_DIALOG, true, eAligeType.MID),
			];
		}
	}
}