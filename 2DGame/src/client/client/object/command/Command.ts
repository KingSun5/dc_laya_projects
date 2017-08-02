module dc
{
	/**
     * 角色基类
     * @author hannibal
     * @time 2017-7-23
     */
	export class BaseCommand implements IPoolsObject
	{
		/**命令类型*/
		protected m_CmdType:eCommandType;
		/**触发时间*/
		protected m_StartTime:number = 0;
		protected m_ElapseTime:number = 0;

		public Init():void
		{
			this.m_StartTime = Time.timeSinceStartup;
			this.m_ElapseTime = 0;
		}

		public get CmdType():eCommandType
		{
			return this.m_CmdType;
		}
		public set CmdType(value:eCommandType)
		{
			this.m_CmdType = value; 
		}

		public get StartTime():number
		{
			return this.m_StartTime;
		}
		public set StartTime(value:number)
		{
			this.m_StartTime = value; 
		}

		public get ElapseTime():number
		{
			return this.m_ElapseTime;
		}
		public set ElapseTime(value:number)
		{
			this.m_ElapseTime = value; 
		}
	}
	/**任意cmd*/
	export class VarCommand extends BaseCommand
	{
		protected m_Param:any = null;
		public Init():void
		{
			super.Init();
			this.m_Param = Object;
		}

		public get Param():Object
		{
			return this.m_Param;
		}
		public set Param(value:Object)
		{
			this.m_Param = value; 
		}
	}
	/**攻击cmd*/
	export class AttackCommand extends BaseCommand
	{
		protected m_SkillInfo:SkillInfo;
		protected m_Direction:Vector3;     	//方向
		protected m_TargetId:number;       	//目标id
		protected m_TargetPos:Vector3;     	//目标位置

		protected m_AttackStage:eAttackStage; 	//攻击阶段
		protected m_StageTime:number;			//进入下阶段时间

		public Init():void
		{
			super.Init();
			this.m_SkillInfo = null;
			this.m_Direction = Vector3.ZERO;     //方向
			this.m_TargetId = 0;                 //目标id
			this.m_TargetPos = Vector3.ZERO;     //目标位置
			this.m_AttackStage = eAttackStage.Begin; //攻击阶段
			this.m_StageTime = 0;	
        	this.m_CmdType = eCommandType.ATTACK;
		}
		
		public get SkillInfo():SkillInfo
		{
			return this.m_SkillInfo;
		}
		public set SkillInfo(value:SkillInfo)
		{
			this.m_SkillInfo = value; 
		}
		
		public get Direction():Vector3
		{
			return this.m_Direction;
		}
		public set Direction(value:Vector3)
		{
			this.m_Direction = value; 
		}
		
		public get TargetId():number
		{
			return this.m_TargetId;
		}
		public set TargetId(value:number)
		{
			this.m_TargetId = value; 
		}
		
		public get TargetPos():Vector3
		{
			return this.m_TargetPos;
		}
		public set TargetPos(value:Vector3)
		{
			this.m_TargetPos = value; 
		}
		
		public get AttackStage():eAttackStage
		{
			return this.m_AttackStage;
		}
		public set AttackStage(value:eAttackStage)
		{
			this.m_AttackStage = value; 
		}
		
		public get StageTime():number
		{
			return this.m_StageTime;
		}
		public set StageTime(value:number)
		{
			this.m_StageTime = value; 
		}
	}
	/**键盘移动*/
	export class KeyboardMoveCommand extends BaseCommand
	{
		protected m_Direction:Vector3;     	//方向
		protected m_TargetPos:Vector3;	

		public Init():void
		{
			super.Init();
			this.m_Direction = Vector3.ZERO;     //方向
			this.m_TargetPos = Vector3.ZERO;     //目标位置
        	this.m_CmdType = eCommandType.KEYBOARD_MOVE;
		}
		public get Direction():Vector3
		{
			return this.m_Direction;
		}
		public set Direction(value:Vector3)
		{
			this.m_Direction = value; 
		}

		public get TargetPos():Vector3
		{
			return this.m_TargetPos;
		}
		public set TargetPos(value:Vector3)
		{
			this.m_TargetPos = value; 
		}
		
	}
	/**ai寻路移动*/
	export class MoveCommand extends BaseCommand
	{
		protected m_TargetPos:Vector3;		
		
		public Init():void
		{
			super.Init();
			this.m_TargetPos = Vector3.ZERO;     //目标位置
        	this.m_CmdType = eCommandType.MOVE;
		}
		
		public get TargetPos():Vector3
		{
			return this.m_TargetPos;
		}
		public set TargetPos(value:Vector3)
		{
			this.m_TargetPos = value; 
		}
	}
	/**受击*/
	export class BattackCommand extends BaseCommand
	{
		protected m_SkillId:number;	
		protected m_Hurt:number;
		
		public Init():void
		{
			super.Init();
			this.m_SkillId = 0;
			this.m_Hurt = 0;
        	this.m_CmdType = eCommandType.BATTACK;
		}
				
		public get SkillId():number
		{
			return this.m_SkillId;
		}
		public set SkillId(value:number)
		{
			this.m_SkillId = value; 
		}
				
		public get Hurt():number
		{
			return this.m_Hurt;
		}
		public set Hurt(value:number)
		{
			this.m_Hurt = value; 
		}
	}
}