module dc
{
    /**
     * 登陆界面
     * @author hannibal
     * @time 20174-7-19
     */
	export class SelectSeverView extends client.gui.login.SelectServerPanelUI
	{
        /*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～重写基类方法～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
        /**初始化，和onDestroy是一对*/
        protected OnCreate():void
        {
            super.OnCreate();
        }
        /**销毁*/
        protected OnDestroy():void
        {
            super.OnDestroy();
        }
        /**每帧循环*/
        public Update():void
        {
            super.Update();
        }
        protected OnEnable():void
        {
            this.RegisterEvent();
            super.OnEnable();
        }
        protected OnDisable():void
        {
            super.OnDisable();
            this.UnRegisterEvent();
        }
        /**资源加载结束*/
        public OnLoadComplete():void
        {
            super.OnLoadComplete();
        }

        /**多语言;初始化，或语音设定改变时触发*/
        protected OnLangChange():void
        {
            super.OnLangChange();
        }

        /**需要提前加载的资源*/
        protected PreLoaderRes():Array<any>
        {
            return null;
        }

        /**UI按钮等注册事件列表，内部会在界面销毁时，自动反注册*/
        protected RegisterGUIEventMap():Array<any>
        {
            return [
                [this.btnClose, laya.events.Event.CLICK, this.OnPressClose],
            ];
        }
        /**自定义事件注册，用于EventController派发的事件*/
        protected RegisterEvent():void
        {
            super.RegisterEvent();
        }
        protected UnRegisterEvent():void
        {
            super.UnRegisterEvent();
        }

        /**是否显示加载界面*/
        protected IsShowLoading():boolean
        {
            return false;
        }
        /*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～内部方法～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
        /**关闭选服*/
        private OnPressClose(event: LayaEvent)
        {
            Log.Debug("OnPressClose");
            UIManager.Instance.Close(GUIID.ID_SELECT_SERVER);
            //UIManager.Instance.Show(GUIID.ID_LOGIN);
        }
	}
}