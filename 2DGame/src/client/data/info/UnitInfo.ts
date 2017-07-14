module dc
{
    /**
     * 单位信息
     * @author hannibal
     * @time 20174-7-14
     */
	export class UnitInfo
	{
		private m_UnitID:number = 0;
		private m_Pos:Vector3;
		private m_Dir:Vector3;
		private m_Group:eGroupType;
		private m_UnitAbil:UnitAbil = null;

		constructor(unit_id:number)
		{
			this.m_UnitID = unit_id;
			this.m_UnitAbil = new UnitAbil();
			this.CopyAbil();
		}

		private CopyAbil():void
		{
			let info = DataProvider.GetInfo("UnitInfo", this.m_UnitID);
			if (info == null) return;

			this.m_UnitAbil.Set(eAbilType.Attack, info.Attack);
			this.m_UnitAbil.Set(eAbilType.Defend, info.DefVal);
			this.m_UnitAbil.Set(eAbilType.Hp, info.Hp);
			this.m_UnitAbil.Set(eAbilType.Sp, info.Sp);
			this.m_UnitAbil.Set(eAbilType.HpAuto, info.HpSpeed);
			this.m_UnitAbil.Set(eAbilType.SpAuto, info.SpSpeed);
			this.m_UnitAbil.Set(eAbilType.Crit, info.Crit);
			this.m_UnitAbil.Set(eAbilType.DeCrit, info.Decrit);
			this.m_UnitAbil.Set(eAbilType.MoveSpeed, info.MoveSpeed);
			this.m_UnitAbil.Set(eAbilType.EyeRange, info.EyeRange);
			this.m_UnitAbil.Set(eAbilType.EyeHiden, info.EyeHide);
			this.m_UnitAbil.Set(eAbilType.CritDamage, info.CritDmg);
		}

		public get UnitID():number
		{
			return this.m_UnitID;
		}
		public set UnitID(value:number)
		{
			this.m_UnitID = value; 
		}
		public get Pos():Vector3
		{
			return this.m_Pos;
		}
		public set Pos(value:Vector3)
		{
			this.m_Pos = value;
		}
		public get Dir():Vector3
		{
			return this.m_Dir;
		}
		public set Dir(value:Vector3)
		{
			this.m_Dir = value; 
		}
		public get Group():eGroupType
		{
			return this.m_Group; 
		}
		public set Group(value:eGroupType)
		{
			this.m_Group = value; 
		}
		public get AbilInfo():UnitAbil
		{
			return this.m_UnitAbil;
		}
	}
}