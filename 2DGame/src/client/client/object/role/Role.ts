module dc
{
	/**
     * 角色基类
     * @author hannibal
     * @time 2017-7-23
     */
	export class Role extends UnitObject
	{
		protected m_IsLogicStop:boolean = true;
		protected m_CurBaseCmd:BaseCommand = null;
		protected m_CurAttackCmd:BaseCommand = null;      	//攻击动作
		protected m_CurSpecialCmd:BaseCommand = null;     	//跳跃等
		protected m_ListLogicCmd:Array<BaseCommand> = null;

		protected m_PoseType:string = "";					//当前动作
		protected m_ListStatus:Array<eObjStatus> = null;	//角色状态

        /*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～基础方法～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
        constructor()
        {
			super();
			this.m_ListLogicCmd = [];
			this.m_ListStatus = [];
        }
        public Init():void
        {
			super.Init();
			this.m_IsLogicStop = true;
			this.m_CurBaseCmd = null;
			this.m_CurAttackCmd = null;
			this.m_CurSpecialCmd = null;
			this.m_PoseType = "";
        }

        public Setup(info:any):void
        {
            super.Setup(info);
        }
        public Destroy():void
        {
			this.m_CurBaseCmd = null;
			this.m_CurAttackCmd = null;
			this.m_CurSpecialCmd = null;
			this.DetachAllStatus();
        	this.ClearLogicCommand();

            super.Destroy();
        }
        public Update(elapse:number, game_frame:number):boolean
        {
			{
				//执行逻辑命令
				this.ProcessLogicCommand();

				//执行具体的命令
				this.Tick_Action(elapse, game_frame);
			}
            return super.Update(elapse, game_frame);
        }

		/**加载完成回调*/
		protected OnLoadComplete():void
		{
			super.OnLoadComplete();
		}
        /**加载数据*/
        public LoadData(info:UnitInfo):void
        {
            super.LoadData(info);
        }

        /**
        * 注册事件 
        */
        public RegisterEvent():void
        {
            super.RegisterEvent();
        }
        public UnRegisterEvent():void
        {
            super.UnRegisterEvent();
        }
        private OnRoleEvt(evt:EventArgs):void
        {
        }
		public SetPosition(x:number, y:number):void
		{
			super.SetPosition(x, y);
		}
		/// <summary>
		/// 是否移动中
		/// </summary>
		public IsMoving():boolean
		{
			if (this.TestStatus(eObjStatus.MOVE)) return true;

			return false;
		}
		/// <summary>
		/// 攻击中
		/// </summary>
		public IsAttacking():boolean
		{
			if (this.TestStatus(eObjStatus.ATTACK)) return true;

			return false;
		}
		/// <summary>
		/// 是否能移动
		/// </summary>
		public CanMove():boolean
		{
			if (this.TestStatus(eObjStatus.ATTACK)) 
				return false;

			return true;
		}
		/// <summary>
		/// 是否可以攻击
		/// </summary>
		public CanAttack():boolean
		{
			if (this.TestStatus(eObjStatus.ATTACK)) 
				return false;

			return true;
		}

		/*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～command～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
		/**
		* 加入逻辑指令
		*/
		public PushCommand(pLogicCmd:BaseCommand):boolean
		{
			if (this.m_IsDie || !this.m_Active)
			{
				ObjectPools.Recover(pLogicCmd);
				return false;
			}

			let ret:boolean = false;
			switch (pLogicCmd.CmdType)
			{
				case eCommandType.IDLE:
					break;

				case eCommandType.KEYBOARD_MOVE:
					ret = this.Start_KeyboardMove(pLogicCmd);
					break;

				case eCommandType.ATTACK:
					ret = this.Start_Attack(pLogicCmd);
					break;

				case eCommandType.BATTACK:
					ret = this.Start_BAttack(pLogicCmd);
					break;

				case eCommandType.DIE:
					ret = this.Start_Die(pLogicCmd);
					break;

				default:
					ret = false;
					break;
			}
			if (!ret)
			{
				ObjectPools.Recover(pLogicCmd);
			}
			return ret;
		}

		public PushLogicCommand(pLogicCmd:BaseCommand)
		{
			this.m_ListLogicCmd.push(pLogicCmd);
		}

		protected ProcessLogicCommand():boolean
		{
			if (this.m_IsLogicStop)
			{
				let ret:boolean = this.DoNextLogicCommand();
				if (!ret && this.m_CurAttackCmd == null  && this.m_CurSpecialCmd == null)
				{
					this.Start_Idle(null);
					return false;
				}
			}
			return true;
		}
		protected DoNextLogicCommand():boolean
		{
			if (this.IsLogicCommandEmpty())
			{
				return false;
			}

			let ret = false;

			let pNextCmd:BaseCommand = this.GetNextLogicCommand();
			if (pNextCmd != null)
			{
				ret = this.DoLogicCommand(pNextCmd);
				if (!ret)
				{
					this.RemoveLogicCommand(pNextCmd);
				}
			}
			return ret;
		}
		protected DoLogicCommand(pLogicCmd:BaseCommand):boolean
		{
			let ret:boolean = false;
			switch (pLogicCmd.CmdType)
			{
				case eCommandType.IDLE:
					ret = this.Start_Idle(pLogicCmd);
					break;

				case eCommandType.KEYBOARD_MOVE:
					ret = this.Start_KeyboardMove(pLogicCmd);
					break;

				case eCommandType.DIE:
					ret = this.Start_Die(pLogicCmd);
					break;
			}
			return ret;
		}

		protected GetNextLogicCommand():BaseCommand
		{
			let pCmd:BaseCommand = null;
			if (this.m_ListLogicCmd.length > 0)
			{
				pCmd = this.m_ListLogicCmd.shift();
			}
			return pCmd;
		}
		protected IsLogicCommandEmpty():boolean
		{
			return (this.m_ListLogicCmd.length == 0 ? true : false);
		}

		public DeleteGroupLogicCommand(type:eCommandType):void
		{
			if (this.m_ListLogicCmd.length == 0)
			{
				return;
			}

			let cmd:BaseCommand;
			for (let i = this.m_ListLogicCmd.length-1; i >= 0; --i)
			{
				cmd = this.m_ListLogicCmd[i];
				if (cmd.CmdType == type)
				{
					this.m_ListLogicCmd.splice(i, 1);
				}
			}
		}
		protected RemoveLogicCommand(pLogicCmd:BaseCommand):void
		{
			ArrayUtils.RemoveValue(this.m_ListLogicCmd, pLogicCmd);
		}
		protected ClearLogicCommand():void
		{
			ArrayUtils.Clear(this.m_ListLogicCmd);
		}

		protected CanBreakLogicCommand(nCmdType:eCommandType):boolean
		{
			let ret:boolean = false;
			switch (nCmdType)
			{
				case eCommandType.IDLE:
				case eCommandType.KEYBOARD_MOVE:
				case eCommandType.DIE:
					ret = true;
					break;

				default:
					ret = false;
					break;
			}
			return ret;
		}

		public get CurBaseCmd():BaseCommand
		{
			return this.m_CurBaseCmd; 
		}
		public get CurAttackCmd():BaseCommand
		{
			return this.m_CurAttackCmd; 
		}
		public get CurSpecialCmd():BaseCommand
		{
			return this.m_CurSpecialCmd; 
		}
		protected SetCurBaseCmd(pCmd:BaseCommand):void
		{
			if (this.m_CurBaseCmd != null)
			{
				ObjectPools.Recover(this.m_CurBaseCmd);
			}
			this.m_CurBaseCmd = pCmd;
		}
		protected SetCurAttackCmd(pCmd:BaseCommand):void
		{
			if (this.m_CurAttackCmd != null)
			{
				ObjectPools.Recover(this.m_CurAttackCmd);
			}
			this.m_CurAttackCmd = pCmd;
		}
		protected SetCurSpecialCmd(pCmd:BaseCommand):void
		{
			if (this.m_CurSpecialCmd != null)
			{
				ObjectPools.Recover(this.m_CurSpecialCmd);
			}
			this.m_CurSpecialCmd = pCmd;
		}
		/*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～action～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
		public Start_Idle(pCmd:BaseCommand):boolean
		{
			if (this.m_IsDie) return false;

			if (this.m_CurBaseCmd == null || this.m_CurBaseCmd.CmdType != eCommandType.IDLE)
			{
				this.PlayPose(AnimationID.Idle, false);
			}

			this.IsLogicStop = false;
			this.SetCurBaseCmd(pCmd);

			return true;
		}

		public Start_KeyboardMove(pCmd:BaseCommand):boolean
		{
			this.IsLogicStop = false;
			this.SetCurBaseCmd(pCmd);
			let cmd:KeyboardMoveCommand = pCmd as KeyboardMoveCommand;

			//动作
			if (ArrayUtils.ContainsValue(this.m_StdUnitInfo.ListMotion, AnimationID.Move))
			{
				this.PlayPose(AnimationID.Move, false);
			}

			this.AttachStatus(eObjStatus.MOVE);

			return false;
		}
		public Stop_Move():boolean
		{
			if (this.TestStatus(eObjStatus.MOVE))
			{
				this.SetCurBaseCmd(null);
				this.DetachStatus(eObjStatus.MOVE);
				this.DeleteGroupLogicCommand(eCommandType.MOVE);
				this.DeleteGroupLogicCommand(eCommandType.KEYBOARD_MOVE);
				this.Start_Idle(null);
			}

			return false;
		}

		public Start_Attack(pCmd:BaseCommand):boolean
		{
			let attackCmd:AttackCommand = pCmd as AttackCommand;
			if (attackCmd == null) return false;

			let skill_info:SkillInfo = this.m_UnitSkill.FindSkill(this.m_StdWeaponInfo.SkillId);
			if (skill_info == null)
				return false;

			this.SetCurAttackCmd(attackCmd);
			this.AttachStatus(eObjStatus.ATTACK);

			//修改朝向

			attackCmd.SkillInfo = skill_info;
			attackCmd.AttackStage = eAttackStage.Begin;
			attackCmd.StageTime = Time.timeSinceStartup;

			Log.Debug("Start_Attack:"+Time.timeSinceStartup);
			return true;
		}
		public StopAttack():void
		{
			if (this.TestStatus(eObjStatus.ATTACK))
			{
				this.SetCurAttackCmd(null);
				this.DetachStatus(eObjStatus.ATTACK);
			}
		}
		public Start_BAttack(pCmd:BaseCommand):boolean
		{
			//受攻击
			let info:sHurtInfo = new sHurtInfo();
			info.mSkillID = (pCmd as BattackCommand).SkillId;
			info.mHurt = (pCmd as BattackCommand).Hurt;
			this.HandleBAttack(info);

			return false;
		}
		public Start_Die(pCmd:BaseCommand):boolean
		{
			this.m_IsDie = true;
			this.ClearLogicCommand();

			//执行死亡行为
			this.HandleDie();

			this.IsLogicStop = true;

			return false;
		}
		/**死亡*/
		public HandleDie():void
		{
			super.HandleDie();
		}

		public Tick_Action(elapse:number, game_frame:number):void
		{
			///1.技能cmd
			if (this.m_CurAttackCmd != null)
			{
				this.m_CurAttackCmd.ElapseTime += elapse;
				let ret:boolean = true;
				switch (this.m_CurAttackCmd.CmdType)
				{
					case eCommandType.ATTACK:
						ret = this.Tick_Attack(elapse, game_frame);
						break;
				}
				if (!ret)
				{
					this.SetCurAttackCmd(null);
				}
			}

			///2.特殊cmd
			if (this.m_CurSpecialCmd != null)
			{
				this.m_CurSpecialCmd.ElapseTime += elapse;
				let ret:boolean = true;
				switch (this.m_CurSpecialCmd.CmdType)
				{
				}
				if (!ret)
				{
					this.SetCurSpecialCmd(null);
				}
			}

			///3.普通cmd
			//if (this.m_IsLogicStop)
			//{
			//    return;
			//}
			if (this.m_CurBaseCmd != null)
			{
				let ret:boolean = true;
				switch (this.m_CurBaseCmd.CmdType)
				{
					case eCommandType.IDLE:
						ret = this.Tick_Idle(elapse, game_frame);
						break;

					case eCommandType.BATTACK:
						ret = this.Tick_BAttack(elapse, game_frame);
						break;

					case eCommandType.DIE:
						ret = this.Tick_Die(elapse, game_frame);
						break;
				}
				if (!ret)
				{
					this.IsLogicStop = true;
					this.SetCurBaseCmd(null);
					//没有了
					if (this.IsLogicCommandEmpty())
					{
						this.Start_Idle(null);
					}

				}
			}
			else
			{
				this.IsLogicStop = true;
				this.SetCurBaseCmd(null);
			}
		}
		public Tick_Idle(elapse:number, game_frame:number):boolean
		{
			return false;
		}

		public Tick_Attack(elapse:number, game_frame:number):boolean
		{
			if (this.m_CurAttackCmd == null) return false;

			return true;
		}

		public Tick_BAttack(elapse:number, game_frame:number):boolean
		{
			return true;
		}
		public Tick_Die(elapse:number, game_frame:number):boolean
		{
			return true;
		}
		public HandleBAttack(info:sHurtInfo):void
		{
			super.HandleBAttack(info);
		}
		/*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～角色状态～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
		/**
		 * 附加状态 
		 */
		public AttachStatus(status:eObjStatus):void
		{
			if (!this.TestStatus(status))
			{
				this.m_ListStatus.push(status);
			}
		}
		/**
		 * 移除状态 
		 */
		public DetachStatus(status:eObjStatus):void
		{
			ArrayUtils.RemoveValue(this.m_ListStatus,status);
		}
		public DetachAllStatus():void
		{
			ArrayUtils.Clear(this.m_ListStatus);
		}
		/**
		 * 查看角色是否有这个状态 
		 */
		public TestStatus(status:eObjStatus):boolean
		{
			return ArrayUtils.ContainsValue(this.m_ListStatus,status);
		}
		/*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～pose～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
		/**
		* 播放动作接口
		* @param nPoseType 动作类型
		* @param bForce 是否强制播放动画
		*/
		public PlayPose(pose_type:string, bForce:boolean, scale:number = 1)
		{

			return true;
		}

		/*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～get/set～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
		public get IsLogicStop():boolean
		{
			return this.m_IsLogicStop; 
		}		
		public set IsLogicStop(value:boolean)
		{
			this.m_IsLogicStop = value; 
		}

		public get PoseType():string
		{
			return this.m_PoseType; 
		}	
		public set PoseType(value:string)
		{
			this.m_PoseType = value; 
		}	
	}
}