module dc
{	
	/**
     * 缩放脚本：用于按钮按下的效果
     * @author hannibal
     * @time 2017-8-7
	 * 例：
	 * ObjectPools.Get(UIScaleScript).Setup(this.btnLogin);
     */
	export class UIScaleScript extends UIComponentScript
	{
		private m_ScaleTo:number = 1;
		private m_Time:number = 0;

		/**
		 * @param 	info	格式{scaleTo:0.8,time:0.6}
		*/
		public Setup(owner:LayaSprite, info:any):void
		{
			super.Setup(owner, info);
			if(info)
			{
				this.m_ScaleTo = info.scaleTo;
				this.m_Time = info.time;
			}
			else
			{
				this.m_ScaleTo = 0.9;
				this.m_Time = 0.6;
			}
			if(this.m_Owner)
			{//有按下效果，自动设置中心点对齐
				this.m_Owner.pivot(this.m_Owner.width*0.5, this.m_Owner.height*0.5);
			}
		}
	
        protected RegisterEvent():void
        {
			if(this.m_Owner)
			{
				this.m_Owner.on(LayaEvent.MOUSE_DOWN, this, this.OnMouseDown);
				this.m_Owner.on(LayaEvent.MOUSE_UP, this, this.OnMouseUp);
				this.m_Owner.on(LayaEvent.MOUSE_OUT, this, this.OnMouseOut);
			}
        }
        protected UnRegisterEvent():void
        {
			if(this.m_Owner)
			{
				this.m_Owner.off(LayaEvent.MOUSE_DOWN, this, this.OnMouseDown);
				this.m_Owner.off(LayaEvent.MOUSE_UP, this, this.OnMouseUp);
				this.m_Owner.off(LayaEvent.MOUSE_OUT, this, this.OnMouseOut);
			}
        }
		private OnMouseDown(evt:any):void
		{
			LayaTween.to(this.m_Owner,{scaleX:this.m_ScaleTo,scaleY:this.m_ScaleTo}, this.m_Time);
		}
		private OnMouseUp(evt:any):void
		{
			LayaTween.to(this.m_Owner,{scaleX:1,scaleY:1}, this.m_Time);
		}
		private OnMouseOut(evt:any):void
		{
			LayaTween.to(this.m_Owner,{scaleX:1,scaleY:1}, this.m_Time);
		}		
	}
}