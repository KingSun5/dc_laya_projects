module dc
{
	/**
     * 多语言
     * @author hannibal
     * @time 20174-7-9
     */
	export class LangManager
	{
        private static instance:LangManager = null;
        public static get Instance():LangManager
        {
            if(!this.instance)this.instance = new LangManager();
            return this.instance;
        }

	}
}