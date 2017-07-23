module dc
{
    /**
     * 技能id
     * @author hannibal
     * @time 2017-7-14
     */
	export class SkillID
	{
		public static Feature_Percent:string = "%";        //是否按百分比计算

		public static Feature_Operate_Add:string = "+";    //操作数：+
		public static Feature_Operate_Sub:string = "-";    //操作数：-
	}
	/**
	 * 技能消耗
	*/
	export enum eSkillCostType
	{
		None,	        //无
		Hp,		        //Hp
		Sp,		        //SP
		Power,	        //技能能量值
	}
	/**
	 * 攻击阶段
	 */
	export enum eAttackStage
	{
		Begin = 0,
		Prepear,
		Launch,
		Continue,
		End,
	}
	/**
	 * 子弹锁定目标方式
	*/
	export enum eBulletLockType
	{
		Unguided = 0,   //非制导，直线
		Guided_Pos,     //跟踪-定点位置
		Guided_Obj,     //跟踪-目标单位
		Guided_Rect,    //区域
	}
	/**
	 * 技能目标类型
	*/
	export enum eSkillTargetType
	{
		All = 0,
		Enemy = 1,
		Friend = 2,         //友军不包括自己
		Self = 3,
		Camp = 4,           //当前阵营
	}
	/**
	 * 技能标记
	*/
	export enum eSkillFlags
	{
		None,
		HideWeapon = 0x000001,      //释放该技能时隐藏武器1
		LockTarget = 0x000002,      //需要锁定目标踩可攻击2
		LockupAttack = 0x000004,    //是否可以攻击4  
		LockupMove = 0x000008,      //是否可以移动8 
		LockupDrop = 0x000010,      //是否可以掉落16  
		LockupRotate = 0x000020,    //是否可以转身32
		LockupDragScreen = 0x000040,//是否可以旋转屏幕64
		LockupSkill = 0x000080,     //是否可以释放技能128
	}
	/**
	 * 技能效果
	*/
	export enum eSkillEffectType
	{
		None,
		Bullect = 1,		//发射子弹
		Buffer = 2,		    //给目标添加BUFF
		ActorAbil = 3,		//增益对象属性
		PrepearTime = 6,	//技能准备时间
		CostNum = 7,		//消耗值
		MinPower = 8,		//最低能量
		MaxPower = 10,	    //最高能量
		PowerTime = 11,	    //能量恢复时间间隔
		PowerTick = 12,	    //自动恢复能量数量
		MinDistance = 13,	//最小技能距离
		MaxDistance = 14,	//最大技能距离
		Range = 15,	        //技能范围		
		CDTime = 16,	    //技能CD
	}
	/**
	 * 特性叠加方式
	*/
	export enum eFeatureOverlayType
	{
		Replace = 0,                //覆盖
		Overlay,                    //叠加次数
		Ignore,		                //忽视
	}
	/**
	 * 技能特效
	*/
	export enum eFeatureType
	{
		None,

		WeaponLoadTime = 1,         //武器装弹时间 + -%
		WeaponBulletTick = 2,       //单颗子弹射击间隔 + -%
		WeaponBulletTickNum = 3,    //子弹单次发射数量 + -X
			WeaponBulletDown = 4,       //子弹向侧面多发射一颗 + -X
			WeaponBulletUp = 5,         //子弹向两边多发射一颗 + -X
			WeaponBulletForward = 6,    //子弹平行方向数量多发射一颗 + -X
			WeaponBulletForward45 = 7,  //子弹已一定角度向两边散开发射 + -X
		WeaponBulletNum = 8,        //弹药数量 + -X %

			BulletSpeed = 51,           //子弹飞行速度 + -%
			BulletAngle = 52,           //子弹的散射角度 + -%
			BulletRangeTime = 53,       //子弹的散射率 + -%
			BulletReboundWall = 54,     //子弹反弹
			BulletGuided = 55,          //子弹跟踪目标
			BulletBig2Small = 56,       //子弹变小
			BulletSmall2Big = 57,       //子弹变大

			SkillCoolDown = 100,         //技能的冷却时间 - X秒
		SkillMaxPower = 101,         //技能能量上限增加 + -%
		SkillPowerTickTime = 102,    //技能能量恢复间隔 + -%
			SkillRange = 103,            //技能作用范围 + -%
			SkillAttack = 104,           //技能伤害 + -%
		SkillPrepearTime = 105,      //技能蓄力时间 + -%
			SkillMinDist = 106,          //最小距离 + -X
			SkillMaxDist = 107,          //最大距离 + -X
		SkillLockDist = 108,         //锁定距离 + -X
		SkillPowerTickNum = 109,     //技能能量恢复值 + -%
		SkillPowerCost = 110,        //技能能量消耗速度 + -%

			AbilityDefence = 200,        //防御 + -%
			AbilityMaxHp = 201,          //hp上限 + -X
			AbilityExpUp = 202,          //增加经验值 + -%
			AbilityHPDouble = 203,       //血量获取增加 + -X
			AbilityMagnet = 204,         //吸附道具
			AbilityVampire = 205,        //攻击附带吸血 + -%，随攻击力增加
			AbilityMoveSpeed = 206,      //移动速度
			AbilityCrit = 207,           //暴击几率 + -%
			AbilityEyeRange = 208,       //视野 + -%

		BufferTimeAddon = 300,       //BUFF - 持续时间增加X秒
		BufferValueChangeTo = 301,   //BUFF - 的作用属性值变更为X
		BufferValueAddon = 302,      //BUFF - 的作用属性值增减 X %
		AddNewBuffer = 303,          //BUFF添加时, 添加新BUFF作用
		BufferDamage = 304,          //BUFF的伤害 + X %
	}
}