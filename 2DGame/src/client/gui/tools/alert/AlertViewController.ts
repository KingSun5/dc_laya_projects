module dc
{
	/**
     * 弹出框管理器
     * @author hannibal
     * @time 2017-7-21
     */	
	export class AlertViewController
	{
        private static m_IsShowing:boolean = false;
        private static m_ListAlert:Queue<sAlertViewInfo> = new Queue<sAlertViewInfo>();

        /** 
            显示带确认的弹出框
            @param caller           代理对象
            @param sTitle           标题，默认是“温馨提示”
            @param sContent         提示内容
            @param sBottomTip       内容文本的一个底部tip文本，不需要可以传null
            @param sCancelLB        取消按钮的label，不需要显示取消按钮可以传null，默认“取消”可以传default
            @param sOkLB            确定按钮的label，不需要显示确定按钮可以传null，默认“确定”可以传default
            @param param            调用方预设的参数，保存在alertView对象中，可以通过getParam方法获取
            @param color_str        默认文本颜色，不传或者传null默认成白色
        */
        public static ShowConfirm(caller: AlertView_Delegate,
                            sTitle:string="",
                            sContent:string,
                            sBottomTip:string = "",
                            sCancelLB:string = "",
                            sOkLB:string = "",
                            param:any = null, 
                            color_str:string = "" ): void 
        {
            let alert_info:sAlertViewInfo = new sAlertViewInfo(caller,sTitle,sContent,sBottomTip,sCancelLB,sOkLB,param,color_str);
            this.m_ListAlert.Enqueue(alert_info);
            this.CheckAlertNext();
        }
        /** 
          *  弹出提示框
        */
        public static ShowAlert(sTitle:string="",
                            sContent:string,
                            sBottomTip:string = "",
                            sOkLB:string = "",
                            param:any = null, 
                            color_str:string = "" ): void 
        {
            this.ShowConfirm(null,sTitle,sContent,sBottomTip,"",sOkLB,param,color_str);
        }        

        private static CheckAlertNext():void
        {
            if(this.m_IsShowing || this.m_ListAlert.length <= 0)return;

            let alert_info:sAlertViewInfo = this.m_ListAlert.Dequeue();
            if(!alert_info)return;

            this.m_IsShowing = true;
            this.RegisterEvent();
            UIAlertView.Show(alert_info.caller,
                            alert_info.sTitle,
                            alert_info.sContent,
                            alert_info.sBottomTip,
                            alert_info.sCancelLB,
                            alert_info.sOkLB,
                            alert_info.param,
                            alert_info.color_str);
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
                    if(this.m_IsShowing)
                    {
                        this.m_IsShowing = false;
                        this.UnRegisterEvent();
                        this.CheckAlertNext();
                    }
                break;
            }
        }   
	}
    /**
     * 弹出框信息
     */
    class sAlertViewInfo
    {
        public caller:AlertView_Delegate;
        public sTitle:string="";
        public sContent:string;
        public sBottomTip:string = "";
        public sCancelLB:string = "";
        public sOkLB:string = "";
        public param:any = null; 
        public color_str:string = "";

        constructor(caller: AlertView_Delegate,
                            sTitle:string="",
                            sContent:string,
                            sBottomTip:string = "",
                            sCancelLB:string = "",
                            sOkLB:string = "",
                            param:any = null, 
                            color_str:string = "" )
        {
            this.caller = caller;
            this.sTitle = sTitle;
            this.sContent = sContent;
            this.sBottomTip = sBottomTip;
            this.sCancelLB = sCancelLB;
            this.sOkLB = sOkLB;
            this.param = param;
            this.color_str = color_str; 
        }
    }
}