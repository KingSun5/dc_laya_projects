module dc
{	
	/**
     * 朝向
     * @author hannibal
     * @time 2017-8-6
     */
	export class FaceID
	{

		public static FACE8_PER_ANGLE:number		= 45;		//每个区间角度 值
		
		public static DEFAULT_MAX:number			= 8;		//最大值
		public static PLAYER_MAX:number				= 8;		//玩家最大值
		public static MONSTER_MAX:number			= 8;		//怪物最大值
	}
	/**
	 * 角色朝向 :16个朝向
	 */	
	export enum eFace16
	{
		NONE = 0,
		DOWN,				//下方
		RIGHT_DOWN_1,		//右下方
		RIGHT_DOWN_2,		//右下方
		RIGHT_DOWN_3,		//右下方
		RIGHT,				//正右方
		RIGHT_UP_1,			//右上
		RIGHT_UP_2,			//右上
		RIGHT_UP_3,			//右上
		UP,					//上
		LEFT_UP_1,			//左上
		LEFT_UP_2,			//左上
		LEFT_UP_3,			//左上
		LEFT,				//左
		LEFT_DOWN_1,		//左下方
		LEFT_DOWN_2,		//左下方
		LEFT_DOWN_3,		//左下方
		MAX=16,				//最大值
	}
	/**
	 * 角色朝向 :8个朝向
	 */	
	export enum eFace8
	{
		NONE = 0,
		DOWN,				//下方
		RIGHT_DOWN,			//右下方
		RIGHT,				//正右方
		RIGHT_UP,			//右上
		UP,					//上
		LEFT_UP,			//左上
		LEFT,				//左
		LEFT_DOWN,			//左下方
		MAX=8,				//最大值
	}	
}