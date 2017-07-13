module dc
{
	/*
	A_star 运算法则   
		Grid ：本质上就是方形网格里的某一个方格
	由此可以看出，路径将会由起点节点，终点节点，还有从起点到终点经过的节点组成。  
		代价（cost） ：这是对节点优劣分级的值。代价小的节点肯定比代价大节点更好。代价由两部
	分组成：从起点到达当前点的代价和从这个点到终点的估计代价。代价一般由变量 f，g 和 h，具
	体如下。  
		f：特定节点的全部代价。由 g+h 决定。  
		g：从起点到当前点的代价。它是确定的，因为你肯定知道从起点到这一点的实际路径。  
		h：从当前点到终点的估计代价。是用估价函数（heuristic function）计算的。它只能一个
		估算，因为你不知道具体的路线——你将会找出的那一条。 
		估价函数（heuristic） ：计算从当前点到终点估计代价的公式。通常有很多这样的公式，但
	他们的运算结果，速度等都有差异（yujjj 注：估价公式计算的估计值越接近实际值，需要计算的
	节点越少；估价公式越简单，每个节点的计算速度越快）。  
		待考察表（open list） ：一组已经估价的节点。表里代价最小的节点将是下一次的计算的起
	点。  
		已考察表（closed list） ：从待考察表中取代价最小的节点作为起点，对它周围 8 个方向的
	节点进行估价，然后把它放入“已考察表”。  
		父节点（parent node）:以一个点计算周围节点时，这个点就是其它节点的父节点。当我们
	到达终点节点，你可以一个一个找出父节点直到起点节点。因为父节点总是带考察表里的小代价节
	点，这样可以确保你找出最佳路线。
	
	现在我们来看以下具体的运算方法：  
	1. 添加起点节点到待考察表  
	2. 主循环  
		a. 找到待考察表里的最小代价的节点，设为当前节点。  
		b. 如果当前点是终点节点，你已经找到路径了。跳到第四步。  
		c. 考察每一个邻节点（直角坐标网格里，有 8 个这样的节点 ）对于每一个邻节点： 
			(1).如果是不能通过的节点，或者已经在带考察表或已考察表中，跳过，继续下一节点，
				否则继续
			(2).计算它的代价  
			(3).把当前节点定义为这个点的父节点添加到待考察表  
	(4).添加当前节点到已考察表  
	3. 更新待考察表，重复第二步。  
	4. 你已经到达终点，创建路径列表并添加终点节点  
	5. 添加终点节点的父节点到路径列表  
	6. 重复添加父节点直到起点节点。路径列表就由一组节点构成了最佳路径
	*/
	export class AStarPathfinder extends Singleton
	{
		private m_max_search_count:number = PathFinderID.MAX_DEFAULT_SEARCH_COUNT;
		
		/**开启和封闭路点列表*/
		private m_array_open:PathGrid[] = [];   
		private m_array_closed:PathGrid[] = [];   
		
		/**地图障碍数据*/
		private m_grid_map:PathGridMap = null; 
		
		/**寻路起点和终点*/
		private m_start_node:PathGrid = new PathGrid(); 
		private m_end_node:PathGrid = new PathGrid();   
		private m_start_pos:LayaPoint = null;
		private m_end_pos:LayaPoint = null;
		
		/**最终寻路结果*/
		private m_array_search_path:PathGrid[] = [];   
 
		/**基础代价*/		
		private m_straight_cost:number = 1.0;   
		private m_diag_cost:number = Math.SQRT2; //1.414

        private static instance:AStarPathfinder = null;
        public static get Instance():AStarPathfinder
        {
            if(!this.instance)this.instance = new AStarPathfinder();
            return this.instance;
        }

		public Setup(grid_map:PathGridMap):void
		{
			this.m_grid_map = grid_map; 
		}
		
		public Destroy():void
		{
			this.m_grid_map = null;
			ArrayUtils.Clear(this.m_array_search_path);
			ArrayUtils.Clear(this.m_array_open);
			ArrayUtils.Clear(this.m_array_closed); 
		}
		/**
		 * 寻路接口 
		 * @param startNode 起点
		 * @param endNode 终点
		 * @return true - 寻路成功；false - 寻路失败
		 */		
		public Search(startPos:LayaPoint, endPos:LayaPoint):LayaPoint[]   
		{  
			ArrayUtils.Clear(this.m_array_search_path);
			ArrayUtils.Clear(this.m_array_open);
			ArrayUtils.Clear(this.m_array_closed);
			
			this.m_start_pos = startPos;
			this.m_end_pos = endPos;
			this.m_start_node.col = this.m_grid_map.getNodeColByPos(startPos.x);   
			this.m_start_node.row = this.m_grid_map.getNodeRowByPos(startPos.y);   
			this.m_end_node.col = this.m_grid_map.getNodeColByPos(endPos.x);     
			this.m_end_node.row = this.m_grid_map.getNodeRowByPos(endPos.y); 
			this.m_start_node.g = 0;   
			this.m_start_node.h = this.calPathCost(this.m_start_node);   
			this.m_start_node.f = this.m_start_node.g + this.m_start_node.h;  
			
			//时间
			let old_time:number = Time.timeSinceStartup;
			
			//执行寻路
			let result:eFinderResult = this.travel();
			Log.Debug("[AI]AStarPathfinder::search - 寻路总用时:", (Time.timeSinceStartup-old_time)+"ms");
			
			return this.buildResult(result);
		}

		/**************************************************************************/
		/*私有方法																  */
		/**************************************************************************/
		private travel():eFinderResult   
		{  
			if(!this.m_start_node.walkable)
			{
				Log.Error("AStarPathfinder::findPath - 角色起点在障碍里面");
				return eFinderResult.FAILED;
			}
			
			let node:PathGrid = this.m_start_node; 
			let search_count:number = 0;
			while(!node.equal(this.m_end_node) && search_count < this.m_max_search_count)   
			{  
				++search_count;
				let startX:number = Math.max(0, node.col - 1);   
				let endX:number = Math.min(this.m_grid_map.numCols - 1, node.col + 1);   
				let startY:number = Math.max(0, node.row - 1);   
				let endY:number = Math.min(this.m_grid_map.numRows - 1, node.row + 1);   
				for(let i:number = startX; i <= endX; i++)   
				{  
					for(let j:number = startY; j <= endY; j++)   
					{ 
						let test:PathGrid = this.m_grid_map.getNode(i, j);   
						if(!test || test == node ||   
							!test.walkable/* ||   
							!this.m_grid_map.getNode(node.col, test.row).walkable ||   //拐角不能通过
							!this.m_grid_map.getNode(test.col, node.row).walkable*/)   
						{  
							continue;   
						}  
						let cost:number = this.m_straight_cost;   
						if(!((node.col == test.col) || (node.row == test.row)))   
						{  
							cost = this.m_diag_cost;   
						}  
						/*
						经过前面的这些，留下的就是需要计算的节点。首先计算从开始节点到测试节点的代价（g），
						方法是当前节点的 g 值加上当前节点到测试节点的代价。简化以后就是水平、竖直方向直接加上
						_straightCost，对角加上_diagCost.h 通过估价函数计算，然后g和h 求和，得到 f（总代价）
						*/
						let g:number = node.g + cost * test.costMultiplier;   
						let h:number = this.calPathCost(test);   
						let f:number = g + h;  
						
						/*
						下面这个部分有一点小技巧，之前我们并没有谈到。开始的时候，我说过如果一个节点在待考
						察表/已考察表里，因为它已经被考察过了，所以我们不需要再考察。不过这次计算出的结果有可
						能小于你之前计算的结果（比如说，上次计算时是对角，而这次确是上下或左右关系，代价就小一
						些）。所以，就算一个节点在待考察表/已考察表里面，最好还是比较一下当前值和之前值之间的大
						小。具体做法是比较测试节点的总代价与以前计算出来的总代价。如果以前的大，我们就找到了更
						好的节点，我们就需要重新给测试点的 f，g，h 赋值，同时，我们还要把测试点的父节点设为当前
						点。这就要我们向后追溯
						*/
						if(this.isOpen(test) || this.isClosed(test))   
						{  
							if(test.f > f)   
							{  
								test.f = f;   
								test.g = g;   
								test.h = h;   
								test.parent = node;   
							}  
						}  
						else  
						{  
							/*
							如果测试节点不再待考察表/已考察表里面，我们只需要赋值给 f，g，h 和父节点。然后把测
							试点加到待考察表，然后是下一个测试点，找出最佳点
							*/
							test.f = f;   
							test.g = g;   
							test.h = h;   
							test.parent = node;   
							this.m_array_open.push(test);  
						}  
					}  
				}  
				this.m_array_closed.push(node);   
				if(this.m_array_open.length == 0)   
				{  
					Log.Debug("[AI]AStarPathfinder::findPath - no path found");   
					return eFinderResult.FAILED;
				}  
				this.m_array_open = this.m_array_open.sort(function(info1, info2)
				{
                    if (info1.f < info2.f)
                        return 1;
                    if (info1.f > info2.f)
                        return -1;
                    return 0;
				});  
				node = this.m_array_open.shift() as PathGrid;   
			} 
			if(search_count >= this.m_max_search_count)
			{
				return eFinderResult.FAILED;
			}
			this.buildPath(node);   
			return eFinderResult.SUCCEEDED;   
		}

		private buildPath(end_node:PathGrid):void   
		{   
			let node:PathGrid = end_node;   
			this.m_array_search_path.push(node);  
			while(!node.equal(this.m_start_node))   
			{  
				node = node.parent;   
				this.m_array_search_path.unshift(node);   
			}  
		} 
		
		private buildResult(result:number):LayaPoint[]
		{
			let path_count:number = this.m_array_search_path.length;
			if(result != eFinderResult.FAILED && path_count >= 2)
			{
				let arr_path:LayaPoint[] = new Array();
				let path_grid:PathGrid = null;
				let pt:LayaPoint = null;
				let i:number=1;
				let len:number = path_count;
				for(;i<len;++i)
				{
					path_grid = this.m_array_search_path[i];
					pt = new LayaPoint(path_grid.col, path_grid.row);
					arr_path.push(pt);
				}
				return arr_path;
			}
			else
				return null;
		}
		
		private isOpen(test:PathGrid):boolean
		{
			for(let t of this.m_array_open)
			{
				if(t.equal(test))
				{
					return true;
				}
			}
			return false;
		}
		
		private isClosed(test:PathGrid):boolean
		{
			for(let t of this.m_array_closed)
			{
				if(t.equal(test))
				{
					return true;
				}
			}
			return false;	
		}

		/**
		 * 寻路代价:对角线估价法 
		 */		
		private calPathCost(node:PathGrid):number  
		{  
			let dx:number = Math.abs(node.col - this.m_end_node.col);   
			let dy:number = Math.abs(node.row - this.m_end_node.row);   
			let diag:number = Math.min(dx, dy);   
			let straight:number = dx + dy;   
			return this.m_diag_cost * diag + this.m_straight_cost * (straight - 2 * diag);   
		}

		public get max_search_count():number
		{
			return this.m_max_search_count;
		}
		public set max_search_count(value:number)
		{
			this.m_max_search_count = value;
		}
	}
}