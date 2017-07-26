module dc
{
    /**
     * 加载界面
     * @author hannibal
     * @time 2017-7-25
     */
	export class UILoaderView extends UIBaseView implements ILoadView
	{
        private m_imgBg: LayaImage;
        private m_bgSp: LayaSprite;
        private m_valueText :LayaLabel;
           
        private m_totalNum: number; //总共需要加载数量
        private m_curNum: number;   //已经加载数量
        /*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～重写方法～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
        /**初始化，和onDestroy是一对*/
        protected OnCreate(args:any):void
        {
            super.OnCreate(args);

            this.width = this.stage.width;
            this.height = this.stage.height;
            if (!this.m_imgBg) 
            {
                this.m_imgBg = new LayaImage();
            }
            if (!this.m_bgSp) 
            {
                this.m_bgSp = new LayaSprite();
                this.m_bgSp.graphics.drawRect(0, 0, this.stage.width, this.stage.height, "#000000");
                this.m_bgSp.alpha = 0.7;
            }
            if (!this.m_valueText) 
            {
                this.m_valueText = new LayaLabel();
                this.m_valueText.color = "#dbdbdb";
                this.m_valueText.width = 70;
                this.m_valueText.height = 18;
                this.m_valueText.align = "center";
                this.m_valueText.fontSize = 18;
                this.m_valueText.centerX = 0;
                this.m_valueText.centerY = 0;
            }
            this.mouseEnabled = true;
            this.m_bgSp.width = this.stage.width;
            this.m_bgSp.height = this.stage.height;
            this.addChild(this.m_bgSp);
          
            this.m_imgBg.width = 83;
            this.m_imgBg.height = 83;
            this.m_imgBg.pivot(42.5, 42.5);
            this.m_imgBg.centerX = 0;
            this.m_imgBg.centerY = 0;
            this.addChild(this.m_imgBg);

            this.addChild(this.m_valueText);            
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
            super.OnEnable();
            this.RegisterEvent();
        }
        protected OnDisable():void
        {
            this.UnRegisterEvent();
            super.OnDisable();
        }
        /**资源加载结束*/
        protected OnLoadComplete():void
        {
            super.OnLoadComplete();
            this.m_imgBg.skin = "ui/common/preloading.png";
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
                ["res/atlas/ui/common.json", LayaLoader.ATLAS],
            ];
        }

        /**UI按钮等注册事件列表，内部会在界面销毁时，自动反注册*/
        protected RegisterGUIEventMap():Array<any>
        {
            return null;
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
        /** 是否优化界面显示*/
        protected StaticCacheUI(): any[] 
        {
            return null;
        }
        /**是否显示加载界面*/
        protected IsShowLoading():boolean
        {
            return false;//这里必须设置为false，否则会导致逻辑错误
        }
        /*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～重写方法～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
		/**
		 * 打开
        */
        public OnOpen(total: number): void
        {
            this.m_valueText.text = "0%";
            this.m_totalNum = total;
            this.m_curNum = 0;
            Laya.timer.clear(this, this.OnAnimate);
            Laya.timer.loop(100, this, this.OnAnimate);            
        }  
        /**
		 * 加载进度
		 * @param 	cur		当前加载数量
		 * @param	total	总共需要加载的数量
        */
        public SetProgress(cur: number, total: number): void
        {
            this.m_curNum = cur;
            this.m_totalNum = total;
        }
		/**
		 * 加载完成
        */
        public OnClose(): void
        {
            Laya.timer.clear(this, this.OnAnimate);
        }    
        /*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～内部方法～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
        private OnAnimate(e)
        {
            // 旋转
            this.m_imgBg.rotation +=24;
            if (this.m_valueText) 
            {
                this.m_valueText.text = this.m_curNum.toString() + "/" + this.m_totalNum.toString();
            }
        }        
	}
}