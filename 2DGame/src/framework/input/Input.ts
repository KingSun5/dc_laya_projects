module dc
{
    /**
     * 输入管理器
     * @author hannibal
     * @time 2017-7-27
     */
	export class Input
	{
		private static m_ListKeyDown:Array<boolean> = [];
		private static m_ListKeyUp:Array<boolean> = [];
		private static m_ListKeyPress:Array<boolean> = [];
		
		public static Setup():void
		{
			this.RegisterEvent();	
			this.Clear();
		}
		public static Destroy():void
		{
			this.Clear();
			this.UnRegisterEvent();
		}
		public static Tick():void
		{
			this.Reset();
		}
		public static Reset():void
		{
			for(let i = 0; i < eKeyCode.MAX; ++i)
			{
				this.m_ListKeyDown[i] = false;
			}
			for(let i = 0; i < eKeyCode.MAX; ++i)
			{
				this.m_ListKeyUp[i] = false;
			}
		}
		public static Clear():void
		{
			this.Reset();
			for(let i = 0; i < eKeyCode.MAX; ++i)
			{
				this.m_ListKeyPress[i] = false;
			}
		}
        //～～～～～～～～～～～～～～～～～～～～～～～查询键盘操作~～～～～～～～～～～～～～～～～～～～～～～～// 
		/**任意键按下着*/
		public static get anyKey():boolean
		{
			for(let i = 0; i < eKeyCode.MAX; ++i)
			{
				if(this.m_ListKeyPress[i])return true;
			}
			return false;
		}
		/**任意键按下*/
		public static get anyKeyDown():boolean
		{
			for(let i = 0; i < eKeyCode.MAX; ++i)
			{
				if(this.m_ListKeyDown[i])return true;
			}
			return false;
		}
        /**获取键是否按下着*/
        public static GetKey(key:eKeyCode):boolean
		{
			assert(key >= 0 && key < eKeyCode.MAX);
			return this.m_ListKeyPress[key];
		}
        /**获取键是否按下*/
        public static GetKeyDown(key:eKeyCode):boolean
		{
			assert(key >= 0 && key < eKeyCode.MAX);
			return this.m_ListKeyDown[key];
		}
        /**获取键是否松开*/
        public static GetKeyUp(key:eKeyCode):boolean
		{
			assert(key >= 0 && key < eKeyCode.MAX);
			return this.m_ListKeyUp[key];
		}
        //～～～～～～～～～～～～～～～～～～～～～～～事件~～～～～～～～～～～～～～～～～～～～～～～～// 
        private static RegisterEvent():void
        {
			Laya.stage.on(LayaEvent.KEY_DOWN, this, this.OnKeyDownEvt);
			Laya.stage.on(LayaEvent.KEY_UP, this, this.OnKeyUpEvt);
			Laya.stage.on(LayaEvent.FOCUS_CHANGE, this, this.OnFocusChange);
			
			Laya.stage.on(LayaEvent.MOUSE_DOWN, this, this.OnMouseDown);
			Laya.stage.on(LayaEvent.MOUSE_UP, this, this.OnMouseUp);
			Laya.stage.on(LayaEvent.CLICK, this, this.OnMouseClick);
        }
        private static UnRegisterEvent():void
        {
			Laya.stage.off(LayaEvent.KEY_DOWN, this, this.OnKeyDownEvt);
			Laya.stage.off(LayaEvent.KEY_UP, this, this.OnKeyUpEvt);
			Laya.stage.off(LayaEvent.FOCUS_CHANGE, this, this.OnFocusChange);
			
			Laya.stage.off(LayaEvent.MOUSE_DOWN, this, this.OnMouseDown);
			Laya.stage.off(LayaEvent.MOUSE_UP, this, this.OnMouseUp);
			Laya.stage.off(LayaEvent.CLICK, this, this.OnMouseClick);
        }		
		/**
		 * 按下事件
		*/
		private static OnKeyDownEvt(evt:Event):void
		{
			var keyCode: number = evt["keyCode"];
            if(!this.m_ListKeyPress[keyCode])
			{
				//Log.Debug("按下:" + keyCode + ", frame:" + Time.frameCount);
				this.m_ListKeyDown[keyCode] = true;
				this.m_ListKeyPress[keyCode] = true;
			}
		}	
		private static OnKeyUpEvt(evt:Event):void
		{      
			var keyCode: number = evt["keyCode"];  
			//Log.Debug("松开:" + keyCode + ", frame:" + Time.frameCount);
			this.m_ListKeyUp[keyCode] = true;
			this.m_ListKeyPress[keyCode] = false;  
		}	
		/**
		 * 焦点改变
		*/
		private static OnFocusChange(evt:Event):void
		{
			Log.Info("OnFocusChange");
			this.Clear();
		}
		
		/**
		 * 触摸
		*/
		private static OnMouseDown(evt:any):void
		{
			//TODO:触摸
		}
		private static OnMouseUp(evt:any):void
		{
			//TODO:触摸
		}
		private static OnMouseClick(evt:any):void
		{
			//TODO:触摸
		}
	}
}