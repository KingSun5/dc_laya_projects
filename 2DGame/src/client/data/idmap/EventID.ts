module dc
{
	export class EventID
	{
		//～～～～～～～～～～～～～～～～～～～～～～～UI~～～～～～～～～～～～～～～～～～～～～～～～//

		//～～～～～～～～～～～～～～～～～～～～～～～场景~～～～～～～～～～～～～～～～～～～～～～～～//
		//游戏
		public static BEGIN_GAME:string                         = "BEGIN_GAME";	
		public static STOP_GAME:string                          = "STOP_GAME";									//暂停游戏-主界面暂停按钮

		public static FIGHT_BEGIN:string                        = "FIGHT_BEGIN";
		public static FIGHT_RESULT:string                   	= "FIGHT_RESULT";

		//场景
		public static ENTER_CITY:string 						= "ENTER_CITY";                            		//进入主城
		public static LEAVE_CITY:string 						= "LEAVE_CITY";                            		//离开主城
		public static ENTER_BATTLE:string 						= "ENTER_BATTLE";                          		//进入战场
		public static LEAVE_BATTLE:string 						= "LEAVE_BATTLE";                          		//离开战场

		public static CHANGE_SCENE:string                       = "CHANGE_SCENE";								//切换场景
		//主玩家
		public static MAIN_OBJ_LEAVE:string                   	= "MAIN_OBJ_LEAVE";								//主玩家离开
		public static MAIN_OBJ_ENTER:string                     = "MAIN_OBJ_ENTER";							    //主玩家进入
		//单位
		public static UNIT_POS:string                           = "UNIT_POS";									//位置改变
		public static UNIT_HP:string                            = "UNIT_HP";									//hp改变
		public static UNIT_SP:string 							= "UNIT_SP";									//Sp改变
		public static UNIT_LEAVE:string                         = "UNIT_LEAVE";								    //玩家离开
		public static UNIT_ENTER:string                         = "UNIT_ENTER";							        //玩家进入
		public static UNIT_DIE:string                           = "UNIT_DIE";							        //玩家死亡
		public static UNIT_BUFFER_ADD:string                    = "UNIT_BUFFER_ADD";	                        //buff增加
		public static UNIT_BUFFER_DELETE:string                 = "UNIT_BUFFER_DELETE";	                        //buff移除
		public static UNIT_ENTER_AREA:string                    = "UNIT_ENTER_AREA";                            //进入区域
		public static UNIT_LEAVE_AREA:string                    = "UNIT_LEAVE_AREA";                            //离开区域
	}
}