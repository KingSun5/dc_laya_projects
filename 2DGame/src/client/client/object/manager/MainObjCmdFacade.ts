module dc
{
	/**
     * 主对象操作接口
     * @author hannibal
     * @time 2017-7-23
     */
	export class MainObjCmdFacade extends Singleton
	{
    	private m_AttackObj:Role = null;

        private static instance:MainObjCmdFacade = null;
        public static get Instance():MainObjCmdFacade
        {
            if(!this.instance)this.instance = new MainObjCmdFacade();
            return this.instance;
        }

		/*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～cmd接口～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
		/**
		 * 移动命令
		*/
		public pushCommand_KeyboardMove(dir:Vector2):boolean
		{
			if (!this.m_AttackObj)
				return false;

			let ret = this.moveto_AI(dir);

			return ret;
		}
		/**
		 * 停止移动
		*/
		public pushCommand_StopMove():boolean
		{
			if (!this.m_AttackObj)
				return false;

			return this.m_AttackObj.Stop_Move();
		}
		/**
		 * 攻击
		*/
		public pushCommand_Attack(dir:Vector3):boolean
		{
			if (!this.m_AttackObj)
				return false;

			return this.attack_AI(dir);
		}
		/*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～逻辑处理～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
		/** 移动 */
		private moveto_AI(dir:Vector2):boolean
		{
			if (!this.m_AttackObj.CanMove()) return false;

			return this.enter_Move(dir);
		}
		private attack_AI(dir:Vector3):boolean
		{
			if (!this.m_AttackObj.CanAttack())
				return false;

			return this.enter_Attack(dir);
		}
		/*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～执行～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
		/** 移动 */
		private enter_Move(dir:Vector2):boolean
		{
			//目标位置
			let cmd:KeyboardMoveCommand = ObjectPools.Get(KeyboardMoveCommand);;
			cmd.TargetPos = new Vector3(this.m_AttackObj.x+dir.x, this.m_AttackObj.y+dir.y, 0);
			cmd.Direction = new Vector3(dir.x, dir.y, 0);
			this.m_AttackObj.PushCommand(cmd);
			return true;
		}
		private enter_Attack(dir:Vector3):boolean
		{
			//cmd
			let cmd:AttackCommand = ObjectPools.Get(AttackCommand);
			cmd.CmdType = eCommandType.ATTACK;
			cmd.Direction = dir;
			this.m_AttackObj.PushCommand(cmd);

			return true;
		}
		/*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～get/set～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
		public get AttackRole():Role
		{
			return this.m_AttackObj;
		}
		public set AttackRole(value:Role)
		{
			this.m_AttackObj = value; 
		}
	}
}