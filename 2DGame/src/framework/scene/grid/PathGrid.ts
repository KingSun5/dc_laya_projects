module dc
{
    /**
     * 地图格子
     * @author hannibal
     * @time 2017-7-12
     */
	export class PathGrid
	{
		public col:number = 0;   
		public row:number = 0;  
		public rect:Rect = null;
		
		public f:number = 0;   
		public g:number = 0;   
		public h:number = 0;    
		public parent:PathGrid = null;   

		/**土路节点肯定比高速公路的代价大，沼泽或是高山节点代价可能大很多。不一样的代价可以通过引用附加的属性来添加 */		
		private m_costMultiplier:number = 1; 
		private m_walkable:boolean = true;
		
		private m_alpha:number = 1;

		/**格子上的对象列表*/
		private m_arr_grid_obj:any[] = [];

		constructor(row:number = 0, col:number = 0, w:number = 0, h:number = 0)   
		{     
			this.row = row;
			this.col = col; 
			this.rect = new Rect(col*w,row*h,w,h);
		} 
		
		public reset():void
		{
			this.col = this.row = 0;
			this.f = this.g = this.h = 0;
			this.parent = null;
			this.costMultiplier = 1;
			this.rect.Set(0,0,0,0);
			this.m_arr_grid_obj.length = 0;
		}
		
		public equal(g:PathGrid):boolean
		{
			return ((this.col === g.col && this.row === g.row) ? true : false);
		}
		
		public get costMultiplier():number
		{
			return this.m_costMultiplier;
		}
		public set costMultiplier(value:number)
		{
			this.m_costMultiplier = value;
			if(this.m_costMultiplier < 1)this.m_costMultiplier = 1;
			this.m_walkable = this.m_costMultiplier >= PathFinderID.OBSTACLE ? false : true;
		}

		public get walkable():boolean
		{
			return this.m_walkable;
		}
		
		public get alpha():number
		{
			return this.m_alpha;
		}
		public set alpha(value:number)
		{
			this.m_alpha = value;
		}
		/*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～grid obj～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
		public get arr_grid_obj():any[]
		{
			return this.m_arr_grid_obj;
		}
		public addObject(obj:any):void
		{
			if(!obj)return;
			if(ArrayUtils.ContainsValue(this.m_arr_grid_obj, obj))return;
			this.m_arr_grid_obj.push(obj);
		}
		public removeObject(obj:any):void
		{
			if(!obj)return;
			ArrayUtils.RemoveValue(this.m_arr_grid_obj, obj);
		}
	}
}