module dc
{
	/**
     * 资源加载管理器
     * @author hannibal
     * @time 20174-7-8
     */
	export class LoaderManager extends Singleton
	{
        private static instance:LoaderManager = null;
        public static get Instance():LoaderManager
        {
            if(!this.instance)this.instance = new LoaderManager();
            return this.instance;
        }

	}
}