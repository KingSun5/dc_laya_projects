module dc
{
	export class SceneID
	{
		//场景id范围
		public static LOADER_START:number  = 1;
		public static LOADER_END:number    = 9;
		public static CITY_START:number    = 100;
		public static CITY_PLAYGUIDE:number= 101;
		public static CITY_END:number      = 999;
		public static BATTLE_START:number  = 1000;
		public static BATTLE_END:number    = 9999;

		//场景名
		public static IDMAP_SCENE_NAME_NONE:string   = "";
		public static IDMAP_SCENE_NAME_LOADER:string = "Loader";
		public static IDMAP_SCENE_NAME_CITY:string   = "City";
		public static IDMAP_SCENE_NAME_Battle:string = "Battle";

		public static ListSceneName:string[] = 
		[
			SceneID.IDMAP_SCENE_NAME_NONE,
			SceneID.IDMAP_SCENE_NAME_LOADER,
			SceneID.IDMAP_SCENE_NAME_CITY,
			SceneID.IDMAP_SCENE_NAME_Battle,
		];

		public static GetSceneTypeByID(scene_id:number):eSceneType
		{
			if (scene_id >= SceneID.LOADER_START && scene_id <= SceneID.LOADER_END)
				return eSceneType.LOADER;
			else if (scene_id >= SceneID.CITY_START && scene_id <= SceneID.CITY_END)
				return eSceneType.CITY;
			else if (scene_id >= SceneID.BATTLE_START && scene_id <= SceneID.BATTLE_END)
				return eSceneType.BATTLE;
			return eSceneType.NONE;
		}
	}
	/// <summary>
	/// 场景类型
	/// </summary>
	export enum eSceneType
	{
		NONE = 0,
		LOADER,
		CITY,
		BATTLE,

		MAX,
	}
}
