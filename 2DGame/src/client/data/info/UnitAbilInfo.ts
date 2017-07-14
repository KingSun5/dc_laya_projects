module dc
{
    /**
     * 角色属性
     * @author hannibal
     * @time 20174-7-14
     */
	export class UnitAbil
	{
		public m_AbilValue:NDictionary<number> = null;
		public constructor() 
		{ 
			this.m_AbilValue = new NDictionary<number>();
		}
		public Reset():void
		{
			this.m_AbilValue.Clear();
		}
		public Get(i:number):number
		{
			return this.m_AbilValue.GetValue(i);
		}
		public Set(i:number, value:number)
		{
			this.m_AbilValue.Set(i, value);
		}
	}
	/// <summary>
	/// 角色属性类型
	/// </summary>
	export enum eAbilType
	{
		Null = 0,
		
		Attack,		    //攻击力
		Defend,		    //防御力
		Hp,			    //HP上限
		Sp,			    //SP上限
		HpAuto,		    //HP恢复
		SpAuto,		    //SP恢复
		Crit,			//穿甲率
		DeCrit,		    //穿甲豁免率
		MoveSpeed,	    //移动速度
		EyeRange,	    //视野
		EyeHiden,		//视野隐蔽值
		CritDamage,	    //穿甲伤害
		
		Max,
	}
}