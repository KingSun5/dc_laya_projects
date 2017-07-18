module dc
{
	/**
     * 特性
     * @author hannibal
     * @time 20174-7-14
     */
	export class FeatureController
	{
		private m_OwnerUnit:UnitObject;
		private m_FeatureList:NDictionary<number> = null;

		constructor(obj:UnitObject)
		{
			this.m_OwnerUnit = obj;
			this.m_FeatureList = new NDictionary<number>();
		}

		/**增加特性*/
		public AddFeature(feature_id:number):void
		{
			let stdFeatureInfo = DataProvider.GetInfo("FeatureInfo",feature_id);
			if (stdFeatureInfo == null)
				return;

			//互斥特性
			if (stdFeatureInfo.Exclusion != null && stdFeatureInfo.Exclusion.Count > 0)
			{
				for (let obj of stdFeatureInfo.Exclusion)
				{
					this.RemoveFeature(obj);
				}
			}

			//增加
			if (this.m_FeatureList.ContainsKey(feature_id))
			{
				switch (stdFeatureInfo.Overlay)
				{
					case eFeatureOverlayType.Ignore:
						break;

					case eFeatureOverlayType.Replace:
						this.m_FeatureList.Remove(feature_id);
						this.m_FeatureList.Add(feature_id, 1);
						break;

					case eFeatureOverlayType.Overlay:
						let count = this.m_FeatureList.GetValue(feature_id);
						this.m_FeatureList.Set(feature_id, ++count);
						break;
				}
			}
			else
			{
				this.m_FeatureList.Add(feature_id, 1);
			}
			this.Resolve();
			this.m_OwnerUnit.Observer.DispatchEvent(EventID.UNIT_FEATURE, stdFeatureInfo.Type);
		}
		/**清除特性*/
		public RemoveFeature(feature_id:number):void
		{
			this.m_FeatureList.Remove(feature_id);
		}
		public RemoveAllFeature():void
		{
			this.m_FeatureList.Clear();
		}
		public GetFeature(feature_id:number):number
		{
			let count = this.m_FeatureList.GetValue(feature_id);
			if(count != null && count > 0)
			{
				return count;
			}
			return 0;
		}
		/**计算特效值*/
		public ResolveFeatureAbils(abil:number, type:eFeatureType):number
		{
			let result:number = abil;
			this.m_FeatureList.Foreach(function(key, value)
			{
				for (let i = 0; i < value; ++i)
					result = this.ResolveFeatureAbil(type, key, result);
				return true;
			});
			return result;
		}
		private ResolveFeatureAbil(type:eFeatureType, feature_id:number, value:number):number
		{
			let result = value;
			let stdFeatureInfo = DataProvider.GetInfo("FeatureInfo",feature_id);
			if (stdFeatureInfo == null || stdFeatureInfo.Type != type)
				return result;
			switch (type)
			{
				default://默认对一个参数做操作
					let value1 = stdFeatureInfo.P1;
					if (stdFeatureInfo.Percent == SkillID.Feature_Percent)
					{
						switch (stdFeatureInfo.Operate)
						{
							case SkillID.Feature_Operate_Add:
								result = (value * (1 + value1 * 0.01));
								break;

							case SkillID.Feature_Operate_Sub:
								result = (value * (1 - value1 * 0.01));
								break;
						}
					}
					else
					{
						switch (stdFeatureInfo.Operate)
						{
							case SkillID.Feature_Operate_Add:
								result = (value + value1);
								break;

							case SkillID.Feature_Operate_Sub:
								result = (value - value1);
								break;
						}
					}
					break;
			}
			return result;
		}
		public Resolve():void
		{
			this.ResolveSkillInfo();
			this.ResolveRoleAbil();
		}
		private ResolveSkillInfo():void
		{
			//当前武器
			if (this.m_OwnerUnit.WeaponInfo != null)
			{
				let skill_info = this.m_OwnerUnit.UnitSkill.FindSkill(this.m_OwnerUnit.WeaponInfo.SkillId);
				if (skill_info == null) return;

				skill_info.BulletTick = this.ResolveFeatureAbils(skill_info.StdSkillInfo.BulletTick, eFeatureType.WeaponBulletTick);
				skill_info.BulletTickNum = this.ResolveFeatureAbils(skill_info.StdSkillInfo.BulletNum, eFeatureType.WeaponBulletTickNum);
				skill_info.MaxBulletNum = skill_info.StdWeaponInfo != null ? this.ResolveFeatureAbils(skill_info.StdWeaponInfo.BulletNum, eFeatureType.WeaponBulletNum) : 0;

				skill_info.Speed = this.ResolveFeatureAbils(skill_info.StdSkillInfo.Speed, eFeatureType.BulletSpeed);
				skill_info.BulletRangeDir = this.ResolveFeatureAbils(skill_info.StdSkillInfo.BulletRangeDir, eFeatureType.BulletAngle);
				skill_info.BulletRangeTime = this.ResolveFeatureAbils(skill_info.StdSkillInfo.BulletRangeTime, eFeatureType.BulletRangeTime);
				skill_info.BulletReboundCount = skill_info.StdBulletInfo != null ? this.ResolveFeatureAbils(skill_info.StdBulletInfo.ReboundCount, eFeatureType.BulletReboundWall) : 0;
				skill_info.BulletGuided = this.m_FeatureList.ContainsKey(eFeatureType.BulletGuided) ? true : false;
				skill_info.BulletScale = this.ResolveFeatureAbils(skill_info.BulletScale, eFeatureType.BulletBig2Small);
				skill_info.BulletScale = this.ResolveFeatureAbils(skill_info.BulletScale, eFeatureType.BulletSmall2Big);

				skill_info.CD = this.ResolveFeatureAbils(skill_info.StdSkillInfo.CD, eFeatureType.SkillCoolDown);
				skill_info.MaxPower = this.ResolveFeatureAbils(skill_info.StdSkillInfo.MaxPower, eFeatureType.SkillMaxPower);
				skill_info.PowerTime = this.ResolveFeatureAbils(skill_info.StdSkillInfo.PowerTime, eFeatureType.SkillPowerTickTime);
				skill_info.PowerTickNum = this.ResolveFeatureAbils(skill_info.StdSkillInfo.PowerTickNum, eFeatureType.SkillPowerTickNum);
				skill_info.CostPower = this.ResolveFeatureAbils(skill_info.StdSkillInfo.CostPower, eFeatureType.SkillPowerCost);
				skill_info.Range = this.ResolveFeatureAbils(skill_info.StdSkillInfo.Range, eFeatureType.SkillRange);
				skill_info.Attack = this.ResolveFeatureAbils(skill_info.StdSkillInfo.Attack, eFeatureType.SkillAttack);
				skill_info.PrepearTime = this.ResolveFeatureAbils(skill_info.StdSkillInfo.PrepearTime, eFeatureType.SkillPrepearTime);
				skill_info.MinDist = this.ResolveFeatureAbils(skill_info.StdSkillInfo.MinDist, eFeatureType.SkillMinDist);
				skill_info.MaxDist = this.ResolveFeatureAbils(skill_info.StdSkillInfo.MaxDist, eFeatureType.SkillMaxDist);
				skill_info.LockDist = this.ResolveFeatureAbils(skill_info.StdSkillInfo.LockDist, eFeatureType.SkillLockDist);

				this.PrintSkillFeature(skill_info);
			}
		}
		private ResolveRoleAbil()
		{
			if (this.m_OwnerUnit.UnitInfo != null && this.m_OwnerUnit.UnitInfo.AbilInfo != null)
			{
				let abil_info = this.m_OwnerUnit.UnitInfo.AbilInfo;
				abil_info[eAbilType.Defend] = this.ResolveFeatureAbils(abil_info[eAbilType.Defend], eFeatureType.AbilityDefence);
				abil_info[eAbilType.Hp] = this.ResolveFeatureAbils(abil_info[eAbilType.Hp], eFeatureType.AbilityMaxHp);
				abil_info[eAbilType.Sp] = this.ResolveFeatureAbils(abil_info[eAbilType.Sp], eFeatureType.AbilityExpUp);
				abil_info[eAbilType.HpAuto] = this.ResolveFeatureAbils(abil_info[eAbilType.HpAuto], eFeatureType.AbilityHPDouble);
				abil_info[eAbilType.MoveSpeed] = this.ResolveFeatureAbils(abil_info[eAbilType.MoveSpeed], eFeatureType.AbilityMoveSpeed);
				abil_info[eAbilType.Crit] = this.ResolveFeatureAbils(abil_info[eAbilType.Crit], eFeatureType.AbilityCrit);
				abil_info[eAbilType.EyeRange] = this.ResolveFeatureAbils(abil_info[eAbilType.EyeRange], eFeatureType.AbilityEyeRange);

				this.PrintAbilFeature(abil_info);
			}
		}
		private PrintSkillFeature(skill_info:SkillInfo):void
		{
			Log.Debug("BulletTick:" + skill_info.BulletTick);
			Log.Debug("BulletNum:" + skill_info.BulletTickNum);
			Log.Debug("MaxBulletNum:" + skill_info.MaxBulletNum);
			Log.Debug("Speed:" + skill_info.Speed);
			Log.Debug("BulletRangeDir:" + skill_info.BulletRangeDir);
			Log.Debug("BulletRangeTime:" + skill_info.BulletRangeTime);
			Log.Debug("BulletReboundCount:" + skill_info.BulletReboundCount);
			Log.Debug("BulletGuided:" + skill_info.BulletGuided);
			Log.Debug("BulletScale:" + skill_info.BulletScale);
			Log.Debug("CD:" + skill_info.CD);
			Log.Debug("MaxPower:" + skill_info.MaxPower);
			Log.Debug("PowerTime:" + skill_info.PowerTime);
			Log.Debug("PowerTickNum:" + skill_info.PowerTickNum);
			Log.Debug("CostPower:" + skill_info.CostPower);
			Log.Debug("Range:" + skill_info.Range);
			Log.Debug("Attack:" + skill_info.Attack);
			Log.Debug("PrepearTime:" + skill_info.PrepearTime);
			Log.Debug("MinDist:" + skill_info.MinDist);
			Log.Debug("MaxDist:" + skill_info.MaxDist);
			Log.Debug("LockDist:" + skill_info.LockDist);
		}
		private PrintAbilFeature (abil_info:UnitAbil):void
		{
			Log.Debug("Defend:" + abil_info[eAbilType.Defend]);
			Log.Debug("Hp:" + abil_info[eAbilType.Hp]);
			Log.Debug("Sp:" + abil_info[eAbilType.Sp]);
			Log.Debug("HpAuto:" + abil_info[eAbilType.HpAuto]);
			Log.Debug("MoveSpeed:" + abil_info[eAbilType.MoveSpeed]);
			Log.Debug("Crit:" + abil_info[eAbilType.Crit]);
			Log.Debug("EyeRange:" + abil_info[eAbilType.EyeRange]);
		}
	}
}