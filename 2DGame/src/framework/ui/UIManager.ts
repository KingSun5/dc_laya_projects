module dc
{
    /**
     * UI管理器
     * @author hannibal
     * @time 2017-7-9
     */	
	export class UIManager extends Singleton
	{
        private m_DicLoaderInfo:NDictionary<sUILoaderInfo> = null;
        private m_DicUIView:NDictionary<UIPanelInterface> = null;

        private static instance:UIManager = null;
        public static get Instance():UIManager
        {
            if(!this.instance)this.instance = new UIManager();
            return this.instance;
        }

        constructor()
        {
            super();
            this.m_DicLoaderInfo = new NDictionary<sUILoaderInfo>();
            this.m_DicUIView = new NDictionary<UIPanelInterface>();
        }
   
        public Setup():void
        {
            UILayerUtils.Setup();
        }

        public Destroy():void
        {
            this.CloseAll();
            this.ClearLoaderInfo();
            UILayerUtils.Destroy();
        }

        public Tick(elapse:number, game_frame:number):void
        {
            this.m_DicUIView.Foreach(function(key, value)
            {
                value.Update();
                return true;
            });
        }
	    //～～～～～～～～～～～～～～～～～～～～～～～显示~～～～～～～～～～～～～～～～～～～～～～～～//
        /**
         * 显示界面
         * @param id        界面id
         * @param args      参数
        */
        public Show(id:number,args:any=[]):UIPanelInterface
        {
            //从缓存中查找
            let obj:UIPanelInterface = this.m_DicUIView.GetValue(id);
            if(obj != null)
            {
                obj.SetVisible(true);
                return obj;
            }

            //获取数据
            let loader_info:sUILoaderInfo = this.m_DicLoaderInfo.GetValue(id);
            assert(loader_info != null, "UIManager::Show - not find id:"+loader_info.mID);

            //构建界面
            let panel = new loader_info.classDef;
            assert(panel != null,"UIManager::Show - cannot create ui:" + id);

            //执行初始操作
            panel.SetScreenID(id);
            panel.Open(args.slice(0));

            let layer:LayaSprite = UILayerUtils.GetLayer(loader_info.mLayer);
            layer.addChild(panel);
            this.m_DicUIView.Add(id, panel);

            return panel;
        }
        /**
         * 关闭界面
         * @param id    界面id
        */
        public Close(id:number):boolean
        {
            //获取数据
            let loader_info:sUILoaderInfo = this.m_DicLoaderInfo.GetValue(id);
            assert(loader_info != null, "UIManager::Close - not find id:"+loader_info.mID);

            let panel:UIPanelInterface = this.m_DicUIView.GetValue(id);
            if(!panel)return;
          
            //销毁或隐藏
            if(loader_info.mHideDestroy)
            {
                this.m_DicUIView.Remove(id);
                panel.Close();
                return true;
            }
            else
            {
                panel.SetVisible(false);
                return false
            }
        }
        /**
         * 关闭所有界面
         * @param   exclude_list    需要排除关闭的列表
        */
        public CloseAll(exclude_list:Array<number>=null):void
        {
            this.m_DicUIView.Foreach(function(key, value)
            {
                if (exclude_list && ArrayUtils.ContainsValue(exclude_list, key)) return true;
                this.Close(key);
                return true;
            });
        }
        /**查找界面*/
        public FindPanel(id:number):UIPanelInterface
        {
            let panel:UIPanelInterface = this.m_DicUIView.GetValue(id);
            return panel;
        }
        /**界面是否打开*/
        public IsPanelOpen(id:number):boolean
        {
            let panel:UIPanelInterface = this.m_DicUIView.GetValue(id);
            if(panel)
                return true;
            else
                return false;
        }
        //～～～～～～～～～～～～～～～～～～～～～～～加载~～～～～～～～～～～～～～～～～～～～～～～～//
        public AddLoaderInfo(info:sUILoaderInfo):void
        {
            if(this.m_DicLoaderInfo.ContainsKey(info.mID))
            {
                Log.Error("UIManager::PushLoaderInfo - same id is register:"+info.mID);
                return;
            }
            this.m_DicLoaderInfo.Add(info.mID, info);
        }
        public ClearLoaderInfo():void
        {
            this.m_DicLoaderInfo.Clear();
        }

        public GetLoaderInfo(id:number):sUILoaderInfo
        {
            return this.m_DicLoaderInfo.GetValue(id);;
        }

        public GetUILayerID(id:number)
        {
            let info:sUILoaderInfo = this.m_DicLoaderInfo.GetValue(id);
            if (!info)
            {
                return -1;
            }
            return info.mLayer;
        }
	}

    export class sUILoaderInfo
    {
        public mID:number;
        /**ui类*/
        public classDef:any;
        /**层级*/
        public mLayer:number;
        /**隐藏销毁*/
        public mHideDestroy:boolean;
        /**对齐*/
        public mAlige:eAligeType;

        constructor(id:number, classDef:any, layer:number, destroy:boolean, alige:eAligeType)
        {
            this.mID = id;
            this.classDef = classDef;
            this.mLayer = layer;
            this.mHideDestroy = destroy;
            this.mAlige = alige;
        }
    }    
}