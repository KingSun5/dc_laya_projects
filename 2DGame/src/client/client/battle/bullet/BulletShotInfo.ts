module dc
{
	/**
     * 子弹数据缓存
     * @author hannibal
     * @time 2017-7-23
     */
	export class BulletShotInfo
	{
		private m_OwnerID:number;
		private m_Group:eGroupType;     //射击者阵营
		private m_SkillID:number;   	//技能ID
		private m_WeaponID:number;  	//武器ID
		private m_BulletStartPos:Vector3;
		private m_BulletStartDir:Vector3;
		private m_TargetId:number;
		private m_TargetPos:Vector3;
		private m_AttackPoint:LayaNode; //攻击点
		private m_Speed:number;
		private m_Range:number;
		private m_Attack:number;
		private m_MinDist:number;
		private m_MaxDist:number;

		private m_CurrBulletNum:number; //当前子弹数量
		private m_BulletShotTime:number; //子弹发射时间
		private m_BulletTick:number;    //每颗子弹间隔
		private m_BulletRangeTime:number;
		private m_LockType:eBulletLockType; //锁定类型

		private m_SkillInfo:SkillInfo;  //子弹的来源技能
		private m_StdBulletInfo:any;
		private m_StdSkillInfo:any;

		public get OwnerID():number
		{
			return this.m_OwnerID;
		}
		public set OwnerID(value:number)
		{
			this.m_OwnerID = value;
		}
		public get Group():eGroupType
		{
			return this.m_Group;
		}
		public set Group(value:eGroupType)
		{
			this.m_Group = value;
		}
		public get SkillId():number
		{
			return this.m_SkillID;
		}
		public set SkillId(value:number)
		{
			this.m_SkillID = value;
			this.m_StdSkillInfo = ConfigManger.Instance.GetInfo(ConfigTable.SkillInfo, this.m_SkillID);
			if(this.m_StdSkillInfo.BulletId > 0)this.m_StdBulletInfo = ConfigManger.Instance.GetInfo(ConfigTable.BulletInfo, this.m_StdSkillInfo.BulletId);
		}
		public get WeaponID():number
		{
			return this.m_WeaponID;
		}
		public set WeaponID(value:number)
		{
			this.m_WeaponID = value;
		}
		public get BulletStartPos():Vector3
		{
			return this.m_BulletStartPos;
		}
		public set BulletStartPos(value:Vector3)
		{
			this.m_BulletStartPos = value;
		}
		public get BulletStartDir():Vector3
		{
			return this.m_BulletStartDir;
		}
		public set BulletStartDir(value:Vector3)
		{
			this.m_BulletStartDir = value;
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
		public get Speed():number
		{
			return this.m_Speed;
		}
		public set Speed(value:number)
		{
			this.m_Speed = value;
		}
		public get Range():number
		{
			return this.m_Range;
		}
		public set Range(value:number)
		{
			this.m_Range = value;
		}
		public get Attack():number
		{
			return this.m_Attack;
		}
		public set Attack(value:number)
		{
			this.m_Attack = value;
		}
		public get MinDist():number
		{
			return this.m_MinDist;
		}
		public set MinDist(value:number)
		{
			this.m_MinDist = value;
		}
		public get MaxDist():number
		{
			return this.m_MaxDist;
		}
		public set MaxDist(value:number)
		{
			this.m_MaxDist = value;
		}

		public get CurrBulletNum():number
		{
			return this.m_CurrBulletNum;
		}
		public set CurrBulletNum(value:number)
		{
			this.m_CurrBulletNum = value;
		}
		public get NextShotTime():number
		{
			return this.m_BulletShotTime;
		}
		public set NextShotTime(value:number)
		{
			this.m_BulletShotTime = value;
		}
		public get BulletTick():number
		{
			return this.m_BulletTick;
		}
		public set BulletTick(value:number)
		{
			this.m_BulletTick = value;
		}
		public get BulletRangeTime():number
		{
			return this.m_BulletRangeTime;
		}
		public set BulletRangeTime(value:number)
		{
			this.m_BulletRangeTime = value;
		}
		public get LockType():eBulletLockType
		{
			return this.m_LockType;
		}
		public set LockType(value:eBulletLockType)
		{
			this.m_LockType = value;
		}
		public get SkillInfo():SkillInfo
		{
			return this.m_SkillInfo;
		}
		public set SkillInfo(value:SkillInfo)
		{
			this.m_SkillInfo = value;
		}
		public StdBulletInfo():any
		{
			return this.m_StdBulletInfo;
		}
		public StdSkillInfo():any
		{
			return this.m_StdSkillInfo;
		}
		public get AttackPoint():LayaNode
		{
			return this.m_AttackPoint;
		}
		public set AttackPoint(value:LayaNode)
		{
			this.m_AttackPoint= value;
		}
	}
}