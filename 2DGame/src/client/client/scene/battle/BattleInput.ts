module dc
{
    /**
     * 战场输入
     * @author hannibal
     * @time 2017-7-27
     */
	export class BattleInput
	{
		public Setup():void
		{
		}
		public Destroy():void
		{
		}
		public Update():void
		{
			this.HandleKeyboard();
			this.HandleMouse();
		}

		private HandleKeyboard():void
		{		
			let Force_X:number = 1, Force_Y:number = 1;
			let offset_x:number = 0, offset_y:number = 0;
			if(Input.GetKey(eKeyCode.A))
			{
				offset_x = -Force_X;
			}
			else if(Input.GetKey(eKeyCode.D))
			{
				offset_x = Force_X;
			}
			if(Input.GetKey(eKeyCode.W))
			{
				offset_y = -Force_Y;
			}
			else if(Input.GetKey(eKeyCode.S))
			{
				offset_y = Force_Y;
			}
			if(offset_x != 0 || offset_y != 0)
			{
				Vector3.Temp.Set(offset_x, offset_y, 0);
				MainObjCmdFacade.Instance.pushCommand_KeyboardMove(Vector3.Temp);
			}
		}
		private HandleMouse():void
		{

		}
	}
}