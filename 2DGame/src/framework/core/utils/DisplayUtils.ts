module dc
{
    /**
     * 显示对象
     * @author hannibal
     * @time 2017-7-13
     */
	export class DisplayUtils
	{
		/**
		 * 移除全部子对象
		 */	
		public static RemoveAllChild(container:LayaSprite):void
		{
			if(!container) return;
			if(container.numChildren <= 0) return;
			
			while(container.numChildren > 0)
			{
				container.removeChildAt(0)
			}
		}
		/**获得子节点*/
		public static GetChildWithName(parent:LayaNode, name:string):LayaNode
		{
			if(parent == null)return null;
			if(parent.name == name)return parent;
			let child:LayaNode = null;
			for(let i = 0; i < parent.numChildren; ++i)
			{
				child = DisplayUtils.GetChildWithName(parent.getChildAt(i), name);
				if(child != null) 
					return child;
			}
			return null;
		}
		/**
		 * 设置对齐方式
		 * @param alige 对齐方式
		*/
		public static SetAlige(node:LayaSprite, alige:eAligeType, w:number=0, h:number=0)
		{
			if(node == null)return;
			let rect:LayaRectangle;
			if(w <= 0 || h  <= 0)rect = node.getBounds();
			let width:number = w > 0 ? w : rect.width;
			let heigth:number = h > 0 ? h : rect.height;
			switch(alige)
			{
				case eAligeType.LEFT_TOP:		node.pivot(0, 0);break;
				case eAligeType.LEFT:			node.pivot(0, heigth*0.5);break;
				case eAligeType.LEFT_BOTTOM:	node.pivot(0, heigth);break;
				case eAligeType.TOP:			node.pivot(width*0.5, 0);break;
				case eAligeType.MID:			node.pivot(width*0.5, heigth*0.5);break;
				case eAligeType.BOTTOM:			node.pivot(width*0.5, heigth);break;
				case eAligeType.RIGHT_TOP:		node.pivot(width, 0);break;
				case eAligeType.RIGHT:			node.pivot(width, heigth*0.5);break;
				case eAligeType.RIGHT_BOTTOM:	node.pivot(width, heigth);break;
			}
		}
	}
}