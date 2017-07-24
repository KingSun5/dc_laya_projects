module dc
{
	export class CommonID
	{
		/**显示加载资源日志*/
		public static LOG_LOAD_RES:boolean = false;
	}

    /**对齐方式*/
    export enum eAligeType
    {
        NONE = 0,
		RIGHT,
		RIGHT_BOTTOM,
		BOTTOM,
		LEFT_BOTTOM,
		LEFT,
		LEFT_TOP,
		TOP,
		RIGHT_TOP,
		MID,
    }
    /**水平方向*/
    export enum eHAligeType
	{
		LEFT,
		CENTER,
		RIGHT,
	}
    /**垂直方向*/
    export enum eVAligeType
	{
		UP,
		MID,
		DOWN,
	}
	/**数组排序方式*/
	export enum eArraySortOrder
	{
		ASCENDING,	//升序
		DESCENDING,	//降序
	}
}
