module dc
{	
	/**
     * 战斗主界面
     * @author hannibal
     * @time 2017-8-4
     */
	export class BattleMainView extends client.gui.battle.BattleMainUI
	{
        private m_RockerScroll:UIRockerScroll = null;

        /*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～重写基类方法～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
        /**初始化*/
        protected OnCreate(args:any):void
        {
            super.OnCreate(args);

            this.m_RockerScroll = new UIRockerScroll();
            this.addChild(this.m_RockerScroll);
            this.m_RockerScroll.pos(200,UIID.DEFAULT_HEIGHT-200);
            this.m_RockerScroll.Setup(null);
        }
        /**销毁*/
        protected OnDestroy():void
        {
            if(this.m_RockerScroll)
            {
                this.m_RockerScroll.Destroy();
                this.m_RockerScroll = null;
            }
            super.OnDestroy();
        }
        /**每帧循环*/
        public Update():boolean
        {
            return super.Update();
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
            return [
            ];
        }

        /**UI按钮等注册事件列表，内部会在界面销毁时，自动反注册*/
        protected RegisterGUIEventMap():Array<any>
        {
            return [
            ];
        }
        /**自定义事件注册，用于EventController派发的事件*/
        protected RegisterEvent():void
        {
            this.m_RockerScroll.on(UIRockerScroll.ROCKER_MOVE_EVT, this, this.OnRockerMove);
            this.m_RockerScroll.on(UIRockerScroll.ROCKER_END_EVT, this, this.OnRockerStop);
        }
        protected UnRegisterEvent():void
        {
            this.m_RockerScroll.off(UIRockerScroll.ROCKER_MOVE_EVT, this, this.OnRockerMove);
            this.m_RockerScroll.off(UIRockerScroll.ROCKER_END_EVT, this, this.OnRockerStop);
        }
        /**静态缓存表*/
        protected StaticCacheUI(): any[] 
        {
            return [];
        }
        /**是否显示加载界面*/
        protected IsShowLoading():boolean
        {
            return true;
        }
        /*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～摇杆～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
		private tmpDirVec2:Vector2 = Vector2.ZERO;
        private OnRockerMove(offset_x:number, offset_y:number):void
        {
            //Log.Debug(dir_x.toString()+"," + dir_y.toString());

			if(offset_x != 0 || offset_y != 0)
			{
				Vec2Set(this.tmpDirVec2, offset_x, offset_y);
				MainObjCmdFacade.Instance.pushCommand_KeyboardMove(this.tmpDirVec2);
			}
        }

        private OnRockerStop():void
        {
            MainObjCmdFacade.Instance.pushCommand_StopMove();
        }
	}
}