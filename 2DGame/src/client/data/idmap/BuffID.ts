module dc
{
    /**
     * buff
     * @author hannibal
     * @time 2017-7-14
     */
	export class BuffID
	{

	}
	/// <summary>
	/// 叠加类型
	/// </summary>
	export enum eBuffOverlay
	{
		Add = 1,	            //时间叠加
		REPLACE,	            //替换
		IGNORE,		            //忽视
	}	
	/// <summary>
	/// 类型
	/// </summary>
	export enum eBuffType
	{
		None = 0,
		Abil_Attack = 1,		//攻击力
		Abil_Defend = 2,		//防御力
		Abil_Hp = 3,		    //HP上限
		Abil_Sp = 4,		    //SP上限
		Abil_HpAuto = 5,		//HP恢复
		Abil_SpAuto = 6,		//SP恢复
		Abil_Crit = 7,		    //穿甲率
		Abil_DeCrit = 8,		//穿甲豁免率
		Abil_MoveSpeed = 9,		//移动速度
		Abil_AttackSpeed = 10,	//攻击速度
		Abil_EyeRange = 11,	    //视野
		Abil_EyeHiden = 12,	    //视野隐蔽值
		Abil_CritDamage = 13,	//穿甲伤害

		//功能效果
		BanSpell = 50,	        //禁技				目标无法释放技能
		BanWeapon = 51,	        //禁武				目标无法使用武器
		Invincible = 52,	    //无敌				目标不受任何伤害
		Sneak = 53,	            //潜行				目标进入潜行状态
		ImmuneCrit = 54,	    //免疫暴击			目标不受暴击伤害

		HealEffect = 100,	    //治疗效果+-/%
		AddonDamage = 101,	    //伤害增减+-/%
		BeatSpAddon = 102,	    //受击Sp恢复+-/%
		ReduceDamage = 103,	    //受伤增减+-/%
		AttackSpAddon = 104,	//攻击Sp恢复+-%

	}

	/// <summary>
	/// 状态
	/// </summary>
	export enum eBufferStatus
	{
		None,
		BanSpell = 0x0001,	    //禁技				目标无法释放技能
		BanWeapon = 0x0002,	    //禁武				目标无法使用武器
		Invincible = 0x0004,	//无敌				目标不受任何伤害
		Hidden = 0x0008,	    //隐身				目标进入隐形状态
		Sneak = 0x0010,	        //潜行				目标进入潜行状态
		Blind = 0x0020,	        //致盲				目标进入致盲状态
		Protect = 0x0040,	    //护盾				目标受到伤害减少
		ImmuneCrit = 0x0080,	//免疫暴击			目标不受暴击伤害
		ImmuneBack = 0x0100,	//免疫背击			目标不受背击伤害
		BanAttack = 0x0200,     //禁攻              目标无法发动针对敌人的任何攻击
		HideScout = 0x0400,     //探测              探测一定范围内的隐形

		Max,
	}

	/// <summary>
	/// 用于机甲挂接特效等的部位
	/// </summary>
	export enum eEffectAttachPart
	{
		ROLE_CENTER = 0,	    //身上
		ROLE_HEAD,		        //头顶
		ROLE_FOOT,		        //脚下
		UI_CENTER,              //界面中心

		MAX,
	}

}