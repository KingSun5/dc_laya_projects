module dc
{
    /**
     * 弹出式对话框
     * @author hannibal
     * @time 2017-7-20
     * 例：
        UIAlertView.Show(this, "提示", "这是内容", "bottomTip", "", "确定", null);
        public OnAlertViewClick(alertView: UIAlertView, btnIndex: eAlertViewButtonIndex): void
        {
            if (eAlertViewButtonIndex.Ok == btnIndex) 
            {
                Log.Debug("点击“确定”按钮");
            }
        }
     */	
	export class UIAlertView extends client.gui.common.AlertViewUI
    {
        /** 内容文本框，使用时请引用其getter方法:htmlTextField */
        private m_htmlTextField: LayaHTMLDivElement = null;
        /** 底部文本框，使用时请引用其getter方法:htmlTextField */
        private m_bottomText: LayaHTMLDivElement = null;

        private m_caller: AlertView_Delegate = null;
        private m_param: any = null;
        private m_content:string = "";

        /*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～重写基类方法～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
        protected OnCreate(args:any):void
        {
            super.OnCreate(args);
        }
        protected OnDestroy() 
        {
            this.m_caller = null;
            super.OnDestroy();
        }

        //所有东西都加载完成
        protected OnLoadComplete() 
        {
            super.OnLoadComplete();
        }

        //事件映射表
        protected RegisterGUIEventMap():Array<any>
        {
            return [
                [this.btnClose, LayaEvent.CLICK, this.OnPressAnyBtn, eAlertViewButtonIndex.Close],
                [this.btnCancel, LayaEvent.CLICK, this.OnPressAnyBtn, eAlertViewButtonIndex.Cancel],
                [this.btnConfirm, LayaEvent.CLICK, this.OnPressAnyBtn, eAlertViewButtonIndex.Ok],
            ];
        }

        /*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～公共方法～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
        /** 
            显示弹出框
            @param caller           代理对象
            @param sTitle           标题，默认是“温馨提示”
            @param sContent         提示内容
            @param sBottomTip       内容文本的一个底部tip文本，不需要可以传null
            @param sCancelLB        取消按钮的label，不需要显示取消按钮可以传null，默认“取消”可以传default
            @param sOkLB            确定按钮的label，不需要显示确定按钮可以传null，默认“确定”可以传default
            @param param            调用方预设的参数，保存在alertView对象中，可以通过getParam方法获取
            @param color_str        默认文本颜色，不传或者传null默认成白色
        */
        public static Show(caller: AlertView_Delegate,
                            sTitle:string="",
                            sContent:string,
                            sBottomTip:string = "",
                            sCancelLB:string = "",
                            sOkLB:string = "",
                            param:any = null, 
                            color_str:string = "" ): UIAlertView 
                            {
            let panel: UIAlertView = UIManager.Instance.Show(GUIID.ALERT_VIEW) as UIAlertView;
            //标题
            panel.lbTitle.text = StringUtils.IsNullOrEmpty(sTitle) ? "Title" : GetLangText(3);
            if (!StringUtils.IsNullOrEmpty(color_str)) 
            {
                panel.htmlTextField.style.color = color_str;
                panel.bottomText.style.color = color_str;
            } else
            {
                panel.htmlTextField.style.color = "#ffffff";
                panel.bottomText.style.color = "#ffffff";
            }
            //内容
            panel.SetContentText(sContent);
            //底部文本
            panel.SetBottomText(sBottomTip);
            //按钮，支持“取消”和“确认”两种按钮
            panel.SetButtons(sCancelLB, sOkLB);
            panel.m_param = param;
            panel.m_caller = caller;
            panel.m_content = sContent;

            return panel;
        }
        /** 设置内容align */
        public SetHAlign(type: eHAligeType): void 
        {
            let sAlign:string = "center";
            switch(type)
            {
                case eHAligeType.LEFT:  sAlign = "left";break;
                case eHAligeType.CENTER:sAlign = "center";break;
                case eHAligeType.RIGHT: sAlign = "right";break;
            }
            this.htmlTextField.style.align = sAlign;
            this.htmlTextField.innerHTML = this.m_content;
        }
        public SetVAlign(type: eVAligeType): void 
        {
            let sAlign:string = "center";
            switch(type)
            {
                case eVAligeType.UP:    sAlign = "top";break;
                case eVAligeType.MID:   sAlign = "middle";break;
                case eVAligeType.DOWN:  sAlign = "bottom";break;
            }
            this.htmlTextField.style.valign = sAlign;
            this.htmlTextField.innerHTML = this.m_content;
        }
        /** 获取预设的参数param */
        public GetParam(): any
        {
            return this.m_param;
        }

        /*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～内部方法～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
        /** 设置内容文本 */
        private SetContentText(sContent: string): void
         {
            if (StringUtils.IsNullOrEmpty(sContent)) 
            {
                this.htmlTextField.innerHTML = "";
                return;
            }
           
            this.htmlTextField.style.align = this.CheckAlign(sContent);
            this.htmlTextField.innerHTML = sContent;
            
        }
        /** 设置底部tip文本 */
        private SetBottomText(sTip: string): void 
        {
            if (StringUtils.IsNullOrEmpty(sTip)) 
            {
                this.bottomText.innerHTML = "";
                return;
            }
            this.bottomText.style.align = this.CheckAlign(sTip);
            this.bottomText.innerHTML = sTip;
        }
        /**如果内容自带对齐方式，在此设置*/
        private CheckAlign(sContent: string): string 
        {
            let tIndex = sContent.indexOf("text-align:");
            if (tIndex != -1) 
            {
                let tAlign = sContent.charAt(tIndex + 11);
                if ("c" == tAlign) 
                {
                    return "center";
                }
                else if ("l" == tAlign) 
                {
                    return "left";
                }
                else if ("r" == tAlign) 
                {
                    return "right";
                }
            }
            return "center";
        }

        /** 设置按钮 */
        private SetButtons(sCancelBtnLb: string, sOkBtnLb: string): void 
        {
            let arrBtns = [];
            if (!StringUtils.IsNullOrEmpty(sCancelBtnLb)) 
            {
                this.btnCancel.label = "default" == sCancelBtnLb ? GetLangText(2) : sCancelBtnLb;
                arrBtns.push(this.btnCancel);
            }
            this.btnCancel.visible = !StringUtils.IsNullOrEmpty(sCancelBtnLb);

            if (!StringUtils.IsNullOrEmpty(sOkBtnLb)) 
            {
                this.btnConfirm.label = "default" == sOkBtnLb ? GetLangText(1) : sOkBtnLb;
                arrBtns.push(this.btnConfirm);
            }
            this.btnConfirm.visible = !StringUtils.IsNullOrEmpty(sOkBtnLb);

            let len = arrBtns.length;
            if (len > 0) 
            {
                let btnWidth = 134;
                let gap = (this.mainBox.width - btnWidth * len) / (len - 1 + 4);
                let left = gap * 2;
                for (let i in arrBtns) 
                {
                    let tBtn = arrBtns[i];
                    tBtn.x = left;
                    left += btnWidth + gap;
                }
            }
        }

        /** 内容框 */
        private get htmlTextField(): LayaHTMLDivElement 
        {
            if (!this.m_htmlTextField) 
            {
                this.m_htmlTextField = HtmlUtils.CreateHTML(20, "#ffffff", 350, 176);
                this.m_htmlTextField.style.lineHeight = 28;
                this.m_htmlTextField.pos(64, 108);
                this.mainBox.addChild(this.m_htmlTextField);
            }
            return this.m_htmlTextField;
        }
        /** 底部文本框 */
        private get bottomText(): LayaHTMLDivElement 
        {
            if (!this.m_bottomText) 
            {
                this.m_bottomText = HtmlUtils.CreateHTML(18, "#ffffff", this.contentBg.width, 28, this.contentBg.x, this.contentBg.y + this.contentBg.height - 35);
                this.m_bottomText.style.font = "黑体";
                this.m_bottomText.style.bold = false;
                //this.m_bottomText.style.align = "center";
                this.contentBg.parent.addChild(this.m_bottomText);
            }
            return this.m_bottomText;
        }

        /** 所有按钮点击事件 */
        private OnPressAnyBtn(nIndex: eAlertViewButtonIndex): void 
        {
            if (this.m_caller) 
            {
                this.m_caller.OnAlertViewClick(this, nIndex);
            }
            UIManager.Instance.Close(GUIID.ALERT_VIEW);
        }
	}
    /** 
        1、使用方法：首先必须实现接口：AlertView_Delegate（包括实现接口中所有方法）
        2、调用：
        public static show(m_caller: AlertView_Delegate,
                            sTitle=null,
                            sContent: string,
                            sBottomTip = null,
                            sCancelLB = null,
                            sOkLB = null): UIAlertView

            m_caller        代理对象，实现了AlertView_Delegate接口的对象
            sTitle          标题，传null会默认是“温馨提示”
            sContent        提示内容，不能为空
            sBottomTip      内容文本的一个底部tip文本，不需要可以传null
            sCancelLB       取消按钮的label，不需要显示取消按钮可以传null，默认“取消”可以传default
            sOkLB           确定按钮的label，不需要显示确定按钮可以传null，默认“确定”可以传default
     */
    export enum eAlertViewButtonIndex 
    {
        Close = 0,   //关闭按钮
        Cancel = 1,  //取消按钮
        Ok = 2       //确定按钮
    }

    export interface AlertView_Delegate 
    {
        /** 
            所有按钮点击回调
            点击的按钮类型请参考枚举类型 AlertViewButtonIndex
        */
        OnAlertViewClick(alertView: UIAlertView, btnIndex: eAlertViewButtonIndex): void;
    }
}