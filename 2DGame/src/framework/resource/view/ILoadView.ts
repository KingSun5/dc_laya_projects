module dc
{
    /**
     * 加载进度界面接口类
     * @author hannibal
     * @time 2017-7-25
     */
	export interface ILoadView
	{
		/**
		 * 打开
        */
        OnOpen(total: number): void;
        /**
		 * 加载进度
		 * @param 	cur		当前加载数量
		 * @param	total	总共需要加载的数量
        */
        SetProgress(cur: number, total: number): void;
		/**
		 * 关闭
        */
        OnClose(): void;
	}
}