module dc
{
	/**
     * 技能
     * @author hannibal
     * @time 2017-7-14
     */
	export class SkillController
	{
		private m_OwnerUnit:UnitObject;
		private m_DicID2Skill:NDictionary<SkillInfo>;          //技能列表--技能id索引

		constructor(obj:UnitObject)
		{
			this.m_OwnerUnit = obj;
			this.m_DicID2Skill = new NDictionary<SkillInfo>();
		}

		public Update():void
		{
			this.m_DicID2Skill.Foreach(function(key, value)
			{
				value.Update();
				return true;
			});
		}

		public Clear():void
		{
			this.m_DicID2Skill.Clear();
		}

		public AddSkillInfo(skillInfo:SkillInfo):void
		{
			if (this.FindSkill(skillInfo.SkillId) != null)
				return;
			this.m_DicID2Skill.Add(skillInfo.SkillId, skillInfo);
		}
		public AddSkill(skillId:number):SkillInfo
		{
			let skillInfo = this.FindSkill(skillId);
			if (skillInfo != null)
				return skillInfo;
			skillInfo = new SkillInfo(skillId, this.m_OwnerUnit);
			this.AddSkillInfo(skillInfo);
			return skillInfo;
		}
		public FindSkill(skillId:number):SkillInfo
		{
			let skillInfo = this.m_DicID2Skill.GetValue(skillId);
			return skillInfo;
		}
		/**是否可射击*/
		public CheckWeaponShoot(weaponId:number):boolean
		{
			let stdWeaponInfo = DataProvider.Instance.GetInfo("WeaponInfo", weaponId);
			if (stdWeaponInfo == null)
				return false;
			let skillInfo = this.FindSkill(stdWeaponInfo.SkillId);
			if (skillInfo == null)
				return false;
			let stdBullet = DataProvider.Instance.GetInfo("BulletInfo", skillInfo.BulletId);
			if (stdBullet == null)
				return false;
			if (this.GetSkillCoolDown(stdWeaponInfo.SkillId) > 0)
			{//CD中
				return false;
			}
			if (skillInfo.FillBulletCDTime > Time.timeSinceStartup)
			{//装弹中
				return false; 
			}
			return true;
		}
		public LaunchWeaponShoot(weaponId:number, dir:Vector3, target_id:number, target_pos:Vector3):void
		{
			let stdWeaponInfo = DataProvider.Instance.GetInfo("WeaponInfo", weaponId);
			if (stdWeaponInfo == null)
				return;
			let skillInfo = this.FindSkill(stdWeaponInfo.SkillId);
			if (skillInfo == null)
				return;
			let stdBullet = DataProvider.Instance.GetInfo("BulletInfo", skillInfo.BulletId);
			if (stdBullet == null)
				return;
			if (skillInfo.StdSkillInfo.BulletPart.Count == 0)
				return;

			//发射子弹
			///SkillEffect.LaunchShotBullet(this.m_OwnerUnit, this.m_OwnerUnit.WeaponID, skillInfo, dir, target_id, target_pos);

			//音效：子弹音效在子弹射出时播放

			//震屏
		}

		public CoolDownSkill(skillId:number, cdTime:number):void
		{
			let skillInfo = this.FindSkill(skillId);
			if (skillInfo == null)
				return;

			skillInfo.ShotCDTime = Time.timeSinceStartup + cdTime;
		}
		public GetSkillCoolDown(skillId:number):number
		{
			let skillInfo = this.FindSkill(skillId);
			if (skillInfo == null) return 0;

			if (skillInfo.ShotCDTime == 0) return 0;

			let time = skillInfo.ShotCDTime - Time.timeSinceStartup;
			if (time <= 0)
			{//cd结束
				skillInfo.ShotCDTime = 0;
				time = 0;
			}
			return time;
		}

		public static CheckSkillTargetValid(skill_id:number, src_unit_id:number, dst_unit_id:number, src_group:eGroupType, dst_group:eGroupType):boolean
		{
			let info = DataProvider.Instance.GetInfo("SkillInfo", skill_id);
			if (info == null) return false;

			let campType:eUnitCampType = UnitID.GetCampType(src_group, dst_group);
			switch (info.TargetType)
			{
				case eSkillTargetType.Enemy:
					if (campType != eUnitCampType.Enemy)
						return false;
					break;
				case eSkillTargetType.Friend:
					if (campType != eUnitCampType.Friend)
						return false;
					if (src_unit_id == dst_unit_id)
						return false;	//该目标类型不包含自己
					break;
				case eSkillTargetType.Self:
					if (src_unit_id != dst_unit_id)
						return false;	//该目标类型不包含自己
					break;
				case eSkillTargetType.Camp:
					if (campType != eUnitCampType.Friend)
						return false;
					break;
				default:
					break;
			}
			return true;
		}
		/// <summary>
		/// 武器射程
		/// </summary>
		public GetCurWeaponRange():number
		{
			let max_distance = 0;
			let skill_info = this.GetCurWeaponSkill();
			if (skill_info != null)
			{
				max_distance = skill_info.MaxDist;
			}
			return max_distance;
		}
		/// <summary>
		/// 获得当前武器对应的技能信息
		/// </summary>
		public GetCurWeaponSkill():SkillInfo
		{
			if (this.m_OwnerUnit.WeaponInfo == null) return null;

			return this.FindSkill(this.m_OwnerUnit.WeaponInfo.SkillId);
		}		
	}
}