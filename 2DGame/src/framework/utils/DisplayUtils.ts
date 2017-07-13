module dc
{
    /**
     * 显示对象
     * @author hannibal
     * @time 20174-7-13
     */
	export class DisplayUtils
	{
		/**
		 * 移除全部子对象
		 * @param container
		 * @param StopAll：停止播放
		 */	
		public static RemoveAllChild(container:LayaSprite):void
		{
			if(!container) return;
			if(container.numChildren <= 0) return;
			
			while(container.numChildren > 0)
			{
				container.removeChildAt(0)
			}
		}
	}
}