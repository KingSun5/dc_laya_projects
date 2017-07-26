module dc
{
    /**
     * 全屏加载界面
     * @author hannibal
     * @time 2017-7-25
     */
	export class UIFullscreeenLoadView extends UIBaseView implements ILoadView
	{
        private m_imgBg: LayaImage = null;
        private m_progressBar: LayaProgressBar = null;
        /*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～重写方法～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
        /**初始化，和onDestroy是一对*/
        protected OnCreate(args:any):void
        {
            super.OnCreate(args);  
            this.ShowLoadingBg();
            this.ShowProgressBar();      
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
            this.width = this.stage.width;
            this.height = this.stage.height;
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
            this.m_progressBar.value = 0;         
        }  
        /**
		 * 加载进度
		 * @param 	cur		当前加载数量
		 * @param	total	总共需要加载的数量
        */
        public SetProgress(cur: number, total: number): void
        {
            this.m_progressBar.value = cur/total;
        }
		/**
		 * 加载完成
        */
        public OnClose(): void
        {
        }  

        /*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～内部方法～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
        private ShowLoadingBg() 
        {
            this.m_imgBg = new LayaImage();
            this.m_imgBg.loadImage("data/bg/image_loading_bg.jpg");
            this.addChild(this.m_imgBg);
            this.m_imgBg.top = 0;
            this.m_imgBg.bottom = 0;
            this.m_imgBg.left = 0;
            this.m_imgBg.right = 0;
        }

        private ShowProgressBar() 
        {
            //进度条
            this.m_progressBar = new laya.ui.ProgressBar("ui/common/progress.png");
            this.m_progressBar.centerX = 0;
            this.m_progressBar.bottom = 100;
            this.m_progressBar.width = 400;
            this.m_progressBar.sizeGrid = "13,23,13,23";
            this.m_progressBar.value = 0;

            this.addChild(this.m_progressBar);
        }          
	}
}