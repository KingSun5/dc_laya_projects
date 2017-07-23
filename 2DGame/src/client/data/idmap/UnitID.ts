module dc
{
	/**
     * 单位
     * @author hannibal
     * @time 2017-7-9
     */
	export class UnitID
	{
		/**
		 * 获取敌对关系
		*/
		public static GetCampType(srcCamp:eGroupType,  destCamp:eGroupType):eUnitCampType
		{
			if (srcCamp == eGroupType.TYPE_NONE || destCamp == eGroupType.TYPE_NONE)
				return eUnitCampType.Neutral;
			if (srcCamp == eGroupType.TYPE_Enemy || destCamp == eGroupType.TYPE_Enemy)
				return eUnitCampType.Enemy;
			if (srcCamp == destCamp)
				return eUnitCampType.Friend;
			return eUnitCampType.Enemy;
		}
	}
	/**
	 * 对象类型
	*/
	export enum eObjType
	{
		INVALID = 0, //无效	
		Player,
		MainPlayer,
		Monster,
	}	
	/**
	 * 阵营
	*/
	export enum eGroupType
	{
		TYPE_Enemy = -1,//不与任何方为友军
		TYPE_NONE = 0,  //中立
		TYPE_1,
		TYPE_2,
		MAX,
	}
	export enum eUnitCampType
	{
		Enemy = -1,	//敌对
		Neutral = 0,//中立
		Friend = 1, //友军
	};	
	/**
	 * 角色状态
	*/
	export enum eObjStatus
	{
		NONE = 0,
		MOVE,           //移动
		ATTACK,         //攻击
	}
	/**
	 * 逻辑命令ID
	*/
	export enum eCommandType
	{
		NONE = 0,
		IDLE,
		MOVE,
		KEYBOARD_MOVE,
		ATTACK,
		SKILL,
		BATTACK,
		DIE,
	}	
}