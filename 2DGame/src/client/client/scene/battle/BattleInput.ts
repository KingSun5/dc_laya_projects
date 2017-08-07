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

		private tmpDirVec2:Vector2 = Vector2.ZERO;
		private HandleKeyboard():void
		{		
			let Force_X:number = 1, Force_Y:number = 1;
			let offset_x:number = 0, offset_y:number = 0;
			if(Input.GetKey(eKeyCode.A))
			{
				offset_x = -Force_X;
				let script:RoleScript = MainObjCmdFacade.Instance.AttackRole.GetComponent(RoleScript);
				MainObjCmdFacade.Instance.AttackRole.RemoveComponent(RoleScript);
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
				Vec2Set(this.tmpDirVec2, offset_x, offset_y);
				MainObjCmdFacade.Instance.pushCommand_KeyboardMove(this.tmpDirVec2);
			}
			else
			{
				MainObjCmdFacade.Instance.pushCommand_StopMove();
			}
		}
		private HandleMouse():void
		{
		}
	}
}