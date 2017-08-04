module dc
{	
	/**
     * 移动杆
     * @author hannibal
     * @time 2017-8-4
     */
	export class UIRockerScroll extends client.gui.common.RockerScrollUI
	{
		private m_IsDraging:boolean = false;	//是否drag
		private m_MouseX:number = 0;			//缓存触摸位置，非移动状态时需要用到
		private m_MouseY:number = 0;

		public static ROCKER_MOVE_EVT:string 	= "ROCKER_MOVE_EVT";	//移动事件
		public static ROCKER_END_EVT:string 	= "ROCKER_END_EVT";

		public Setup(info:any): void
		{
			this.RegisterEvent();
		}
		public Destroy():void
		{
			this.UnRegisterEvent();
			this.destroy();
		}

		private Update():void
		{
			if(this.m_IsDraging)
			{
				this.HandleDrag(this.m_MouseX, this.m_MouseY);
			}
		}

        private RegisterEvent():void
        {
			this.bgImg.on(LayaEvent.MOUSE_DOWN, this, this.OnMouseDown);
			Laya.stage.on(LayaEvent.MOUSE_UP, this, this.OnMouseUp);
			Laya.stage.on(LayaEvent.MOUSE_MOVE, this, this.OnMouseMove);
			Laya.stage.on(LayaEvent.RESIZE, this, this.OnLostFocus);
			Laya.stage.on(LayaEvent.FOCUS_CHANGE, this, this.OnLostFocus);
			
			Laya.timer.frameLoop(1, this, this.Update);
        }
        private UnRegisterEvent():void
        {
			this.bgImg.off(LayaEvent.MOUSE_DOWN, this, this.OnMouseDown);
			Laya.stage.off(LayaEvent.MOUSE_UP, this, this.OnMouseUp);
			Laya.stage.off(LayaEvent.MOUSE_MOVE, this, this.OnMouseMove);
			Laya.stage.off(LayaEvent.RESIZE, this, this.EndDrag);
			Laya.stage.off(LayaEvent.FOCUS_CHANGE, this, this.OnLostFocus);

			Laya.timer.clearAll(this);
        }
        
		private OnMouseDown(evt:any):void
		{
			this.m_IsDraging = true;
			this.m_MouseX = evt.stageX;
			this.m_MouseY = evt.stageY;
			this.HandleDrag(this.m_MouseX, this.m_MouseY);
		}
		private OnMouseUp(evt:any):void
		{
			if(this.m_IsDraging)
			{
				this.m_IsDraging = false;
				this.EndDrag();
			}
		}
		private OnMouseMove(evt:any):void
		{
			if(this.m_IsDraging)
			{
				this.m_MouseX = evt.stageX;
				this.m_MouseY = evt.stageY;
			}
		}
		private OnLostFocus():void
		{
			if(this.m_IsDraging)
			{
				this.m_IsDraging = false;
				this.EndDrag();
			}
		}
		private tmpPos:Vector2 = Vector2.ZERO;
		private HandleDrag(x:number, y:number):void
		{
			let origin_x:number = this.x;
			let origin_y:number = this.y;
			let bg_w:number = this.bgImg.width;
			let bg_h:number = this.bgImg.height;
			let radius:number = (bg_w+bg_h)*0.5*0.5;
			this.tmpPos.x = x - origin_x;
			this.tmpPos.y = y - origin_y;

			//防止脱离区域
			if(Vec2Magnitude(this.tmpPos) > radius)
				this.tmpPos = Vec2Mul(Vec2Normalized(this.tmpPos), radius);
			this.pushImg.pos(bg_w*0.5+this.tmpPos.x, bg_h*0.5+this.tmpPos.y);

			//修正到[-1,1]，绝对值越大，说明离中心点越远；可以用来代表力度
			this.tmpPos = Vec2ClampMagnitude(this.tmpPos, 1);

			//设置方向
			this.pointImg.rotation = Math.atan2(this.tmpPos.y, this.tmpPos.x)*MathUtils.Rad2Deg+90;

			//派发事件
			this.event(UIRockerScroll.ROCKER_MOVE_EVT, [this.tmpPos.x,this.tmpPos.y]);
		}

		private EndDrag():void
		{
			let bg_w:number = this.bgImg.width;
			let bg_h:number = this.bgImg.height;
			this.pushImg.pos(bg_w*0.5, bg_h*0.5);
			this.event(UIRockerScroll.ROCKER_END_EVT);
		}
	}
}