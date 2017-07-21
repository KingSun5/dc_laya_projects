module dc
{	
	/**
     * 数据管理器
     * @author hannibal
     * @time 20174-7-9
     */
	export class UIShowController
	{
		/**
		 * 直接显示界面
		 * @param 	id		界面id
		 * @param 	args	创建参数，会在界面OnCreate时传入
		*/
		public static Show(id:number,...args:any[]):void
		{
			UIManager.Instance.Show(id, args);
		}
		/**
		 * 关闭界面
		 * @param 	id		界面id
		*/
		public static Close(id:number):void
		{
			UIManager.Instance.Close(id);
		}
		/**
		 * 关闭所有界面
		 * @param 	exclude_list	不需要关闭的界面id列表
		*/
		public static CloseAll(exclude_list:number[]):void
		{
			UIManager.Instance.CloseAll(exclude_list);
		}

        /*～～～～～～～～～～～～～～～～～～～～～队列方式显示界面，上一个界面关闭，才会显示下一个界面～～～～～～～～～～～～～～～～～～～～～*/
		private static m_CurShowPanelID:number = 0;
		private static m_ListPanels:Queue<sShowPanelInfo> = new Queue<sShowPanelInfo>();

		/**
		 * 直接显示界面,注：
		 * 1.通过这个接口打开的界面，UILoaderRegister设定的sUILoaderInfo.mHideDestroy必须为true。原因是显示下一个界面是通过上个界面的CLOSE事件触发
		 * @param 	id		界面id
		 * @param 	args	创建参数，会在界面OnCreate时传入
		*/
		public static ShowQueue(id:number,...args:any[]):void
		{
			let info:sShowPanelInfo = new sShowPanelInfo(id, args);
			this.m_ListPanels.Enqueue(info);
			this.CheckAlertNext();
		}

		/**
		 * 判断是否弹出下一个界面
		*/
        private static CheckAlertNext():void
        {
            if(this.m_CurShowPanelID > 0 || this.m_ListPanels.Size() <= 0)return;

            let panel_info:sShowPanelInfo = this.m_ListPanels.Dequeue();

            this.RegisterEvent();
            this.m_CurShowPanelID = panel_info.id;
            UIManager.Instance.Show(panel_info.id,panel_info.args);
        }

        private static RegisterEvent():void
        {
            EventController.AddEventListener(UIEvent.CLOSE, this, this.OnUIEvent);
        }
        private static UnRegisterEvent():void
        {
            EventController.RemoveEventListener(UIEvent.CLOSE, this, this.OnUIEvent);
        }     
        private static OnUIEvent(args:EventArgs):void
        {
            switch(args.Type)
            {
                case UIEvent.CLOSE:
					let id:number = args.Get(0);
                    if(this.m_CurShowPanelID > 0 && this.m_CurShowPanelID == id)
                    {
                        this.m_CurShowPanelID = 0;
                        this.UnRegisterEvent();
                        this.CheckAlertNext();
                    }
                break;
            }
        } 		
	}

	class sShowPanelInfo
	{
		public id:number;
		public args:any;

		constructor(id:number, args:any)
		{
			this.id = id;
			this.args = args;
		}
	}
}