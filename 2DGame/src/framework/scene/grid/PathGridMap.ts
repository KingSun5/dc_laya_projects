module dc
{
    /**
     * 地图格子信息
     * @author hannibal
     * @time 2017-7-12
     */
	export class PathGridMap extends Singleton
	{
		private m_startNode:PathGrid = null; 
		private m_endNode:PathGrid = null; 
		private m_nodes:DoubleArray;
		private m_alige:eAligeType = eAligeType.LEFT_BOTTOM;
		/**单个格子大小*/
		private m_gridWidth:number = 1;
		private m_gridHeight:number = 1;
		private m_numCols:number = 0; 
		private m_numRows:number = 0; 
		
		/**拾取物品格子大小*/
		private m_gridPickWidth:number = 1;
		private m_gridPickHeight:number = 1;
		private m_numPickCols:number = 0; 
		private m_numPickRows:number = 0; 

        private static instance:PathGridMap = null;
        public static get Instance():PathGridMap
        {
            if(!this.instance)this.instance = new PathGridMap();
            return this.instance;
        }

		public setup(numRows:number, numCols:number, gridW:number = 1, gridH:number = 1, pickW:number = 1, pickH:number = 1, alige:eAligeType = eAligeType.LEFT_BOTTOM):void
		{
			this.m_numRows = numRows; 
			this.m_numCols = numCols; 
			this.m_gridWidth = gridW;
			this.m_gridHeight = gridH;
			this.m_gridPickWidth = pickW;
			this.m_gridPickHeight = pickH;
			this.m_numPickCols = NumberUtils.toInt((this.m_numCols*this.m_gridWidth) / this.m_gridPickWidth);
			this.m_numPickRows = NumberUtils.toInt((this.m_numRows*this.m_gridHeight) / this.m_gridPickHeight);
			this.m_alige = alige;

			this.m_nodes = new PathGrid[this.m_numRows,this.m_numCols];
			for(let row = 0; row < this.m_numRows; row++) 
			{ 
				for(let col = 0; col < this.m_numCols; col++) 
				{ 
					this.m_nodes.Set(row,col, new PathGrid(row, col, this.m_gridWidth, this.m_gridHeight));
					switch(this.m_alige)
					{
					case eAligeType.LEFT_BOTTOM:
						this.m_nodes.Get(row,col).rect_collide.x = -(numCols*gridW)*0.5 + this.m_nodes.Get(row,col).rect_collide.x;
						this.m_nodes.Get(row,col).rect_collide.y = -(numRows*gridH)*0.5 + this.m_nodes.Get(row,col).rect_collide.y;
						break;
					}
				}
			}
		}
		
		public destroy():void
		{
			this.m_startNode = null;
			this.m_endNode = null;
			if(this.m_nodes != null)
			{
				this.m_nodes.Clear();
				this.m_nodes = null;
			}
		}

		public getNode(row:number, col:number):PathGrid
		{ 
			if(this.isValidRowCol(row, col))
				return this.m_nodes.Get(row,col) as PathGrid; 
			return null;
		}
		public setEndNode(row:number, col:number):void
		{ 
			if(!this.isValidRowCol(row, col))
				return;
			this.m_endNode = this.m_nodes.Get(row,col) as PathGrid; 
		} 
		public setStartNode(row:number, col:number):void 
		{ 
			if(!this.isValidRowCol(row, col))
				return;
			this.m_startNode = this.m_nodes.Get(row,col) as PathGrid; 
		} 
		public setCostMultiplier(row:number, col:number, cost:number):void 
		{ 
			if(!this.isValidRowCol(row, col) || this.m_nodes.Get(row,col) == null)
				return;
			this.m_nodes.Get(row,col).costMultiplier = cost; 
		}
		
		public setAlpha(row:number, col:number, alpha:number):void
		{ 
			if(!this.isValidRowCol(row, col) || this.m_nodes.Get(row,col) == null)
				return;
			this.m_nodes.Get(row,col).alpha = alpha; 
		}
		public getAlpha(row:number, col:number):number
		{ 
			if(this.m_nodes == null || !this.isValidRowCol(row, col) || this.m_nodes.Get(row,col) == null)
				return 1;
			return this.m_nodes.Get(row,col).alpha; 
		}
		public isValidPos(x:number, y:number):boolean
		{
			switch(this.m_alige)
			{
			case eAligeType.LEFT_BOTTOM:
				x += this.m_gridWidth*this.m_numCols*0.5;
				y += this.m_gridHeight*this.m_numRows*0.5;
				break;
			}
			if(x < 0 || y < 0 || y > this.m_numRows*this.m_gridHeight || x > this.m_numCols*this.m_gridWidth)
				return false;
			return true;
		}
		public isValidRowCol(row:number, col:number):boolean
		{
			if(row>=0 && row<this.m_numRows && col>=0 && col<this.m_numCols)
				return true;
			return false;
		}

		/**
		 * 根据位置获得寻路格子
		 */		
		public getNodeColByPos(x:number):number
		{
			switch(this.m_alige)
			{
			case eAligeType.LEFT_BOTTOM:
				x += this.m_gridWidth*this.m_numCols*0.5;
				break;
			}
			return NumberUtils.toInt(x / this.m_gridWidth);
		}
		public getNodeRowByPos(y:number):number
		{
			switch(this.m_alige)
			{
			case eAligeType.LEFT_BOTTOM:
				y += this.m_gridHeight*this.m_numRows*0.5;
				break;
			}
			return NumberUtils.toInt(y / this.m_gridHeight);
		}
		/**
		 * 根据格子获得位置 
		 */		
		public getPosXByGridCol(col:number)
		{
			let x:number = this.m_gridWidth * col;
			switch(this.m_alige)
			{
			case eAligeType.LEFT_BOTTOM:
				x -= this.m_gridWidth*this.m_numCols*0.5;
				break;
			}
			return x;
		}
		public getPosYByGridRow(row:number):number
		{
			let y:number = this.m_gridHeight * row;
			switch(this.m_alige)
			{
			case eAligeType.LEFT_BOTTOM:
				y -= this.m_gridHeight*this.m_numRows*0.5;
				break;
			}
			return y;
		}
		public getNodeByPostion(x:number, y:number):PathGrid
		{
			if(!this.isValidPos(x, y))return null;

			let row:number = this.getNodeRowByPos(y);
			let col:number = this.getNodeColByPos(x);
			if(this.isValidRowCol(row, col))
				return this.m_nodes.Get(row,col);

			return null;
		}
		
		public getPickNodeColByPos(x:number):number
		{
			switch(this.m_alige)
			{
				case eAligeType.LEFT_BOTTOM:
					x += this.m_gridWidth*this.m_numCols*0.5;
				break;
			}
			return NumberUtils.toInt((x) / this.m_gridPickWidth);
		}
		public getPickNodeRowByPos(y:number):number
		{
			switch(this.m_alige)
			{
				case eAligeType.LEFT_BOTTOM:
					y += this.m_gridHeight*this.m_numRows*0.5;
				break;
			}
			return NumberUtils.toInt((y) / this.m_gridPickHeight);
		}
	
		public getColor(node:PathGrid):number   
		{  
			if(node == null || !node.walkable)
				return 0;  
			return 0xffffff;   
		}

		public get endNode():PathGrid
		{ 
			return this.m_endNode;
		} 

		public get numCols():number
		{ 
			return this.m_numCols;
		} 
		public get numRows():number
		{ 
			return this.m_numRows;
		} 
		public get startNode():PathGrid
		{ 
			return this.m_startNode;
		} 
		
		public get gridWidth():number 
		{ 
			return this.m_gridWidth;
		} 
		public get gridHeight():number 
		{ 
			return this.m_gridHeight;
		} 
		public get width():number 
		{ 
			return this.m_gridWidth * this.m_numCols;
		} 
		public get height():number
		{ 
			return this.m_gridHeight * this.m_numRows;
		} 
		public get numPickCols():number
		{
			return this.m_numPickCols;
		}
		public set numPickCols(value:number)
		{
			this.m_numPickCols = value;
		}
		public get numPickRows():number
		{
			return this.m_numPickRows;
		}
		public set numPickRows(value:number)
		{
			this.m_numPickRows = value;
		}
		
		public get nodes():DoubleArray
		{
			return this.m_nodes;
		}
	}
}