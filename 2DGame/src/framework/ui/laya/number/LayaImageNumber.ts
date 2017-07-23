import Box = laya.ui.Box;
import Clip = laya.ui.Clip;

var path: string;
var clipWidth: number;
var clipHeight: number;
var totalClip: number;
module dc
{
    /**
     * 数字排列组件
     * @author hannibal
     * @time 2017-7-20
     */	
	export class LayaImageNumber extends Box
	{
        private clipContainer = [];
        private box: Box;
        constructor() 
		{
            super();
            this.box = new Box();
            this.addChild(this.box);
        }
        /**设置值*/
        public SetNum(num: number) 
		{
            let count = 1;
            let nums = [];
            let bNegative = false;
            if (num < 0) {
                num = -num;
                bNegative = true;
            } 

            let divTen = Math.floor(num / 10);
            nums[nums.length] = num % 10;
            while (divTen > 0) 
			{
                ++count;
                nums[nums.length] = divTen % 10;
                divTen = Math.floor(divTen / 10);
            }

            if (bNegative) 
			{
                ++count;
                nums[nums.length] = 10;
            }

            let newCount = count - this.clipContainer.length;
            if (newCount > 0) 
			{              
                for (let i = 1; i <= newCount; ++i) 
				{
                    let clip = new Clip(path, totalClip);
                    this.addChild(clip);
                    clip.clipWidth = clipWidth;
                    clip.clipHeight = clipHeight;
                    clip.size(clipWidth, clipHeight);
                    this.clipContainer[this.clipContainer.length] = clip;
                }
            }

            for (let i = (nums.length - 1), j = 0; i >= 0; --i, ++j) 
			{
                let clip: Clip = this.clipContainer[i];
                clip.index = nums[i];
                clip.pos(j * clipWidth, 0);
                clip.visible = true;
            }

            for (let i = nums.length ; i < this.clipContainer.length; ++i)
			{
                let clip: Clip = this.clipContainer[i];
                clip.visible = false;
            }

            this.box.size(count * clipWidth, clipHeight);
            this.size(count * clipWidth, clipHeight);
        }
	}
}