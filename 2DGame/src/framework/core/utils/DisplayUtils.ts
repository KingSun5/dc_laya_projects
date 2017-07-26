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
		public static DestroyUINode(node:LayaNode):void
		{
			if(node)
			{
				node.removeSelf();
				node.destroy();
				node = null;
			}
		}
		/**获得子节点*/
		public static GetChildByName(parent:LayaNode, name:string):LayaNode
		{
			if(!parent)return null;
			if(parent.name === name)return parent;
			let child:LayaNode = null;
			let num:number = parent.numChildren;
			for(let i = 0; i < num; ++i)
			{
				child = DisplayUtils.GetChildByName(parent.getChildAt(i), name);
				if(child) return child;
			}
			return null;
		}
		/**
		 * 设置对齐方式
		 * @param alige 对齐方式
		*/
		public static SetAlige(node:LayaSprite, alige:eAligeType, w:number=0, h:number=0)
		{
			if(!node)return;
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

		/*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～滤镜～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
        /**
         * 创建发光滤镜
         * @param	color	滤镜的颜色
         * @param	blur	边缘模糊的大小
         * @param	offX	X轴方向的偏移
         * @param	offY	Y轴方向的偏移
         */		
		public static GetGlowFilter(color: string, blur?: number, offX?: number, offY?: number):Laya.GlowFilter[]
		{
			let glow = new Laya.GlowFilter(color, blur, offX, offY);
			return [glow];
		}
        /**
         * 模糊滤镜
         * @param	strength	模糊滤镜的强度值
         */		
		public static GetBlurFilter(strength?: number):Laya.BlurFilter[]
		{
			let blur = new Laya.BlurFilter(strength);
			return [blur];
		}
        /**
         * 创建一个 <code>ColorFilter</code> 实例。
         * @param mat	（可选）由 20 个项目（排列成 4 x 5 矩阵）组成的数组，用于颜色转换。
         */		
		public static GetColorFilter(mat?: Array<any>):Laya.ColorFilter[]
		{
			let color = new Laya.ColorFilter(mat);
			return [color];
		}		
	}
}