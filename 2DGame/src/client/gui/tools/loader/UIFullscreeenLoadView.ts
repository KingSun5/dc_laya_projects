module dc
{
    /**
     * 全屏加载界面
     * @author hannibal
     * @time 2017-7-25
     */
	export class UIFullscreeenLoadView implements ILoadView
	{
		/**
		 * 打开
        */
        public OnOpen(total: number): void
        {            
        }  
        /**
		 * 加载进度
		 * @param 	cur		当前加载数量
		 * @param	total	总共需要加载的数量
        */
        public SetProgress(cur: number, total: number): void
        {
        }
		/**
		 * 加载完成
        */
        public OnClose(): void
        {
        } 
	}
}