module dc
{
    /**
     * 特效管理器
     * @author hannibal
     * @time 2017-7-11
     */
	export class EffectManager extends Singleton
	{
        private m_ShareObjID:number = 0;
        private m_DicEffect:NDictionary<BaseEffect> = null;

        private static instance:EffectManager = null;
        public static get Instance():EffectManager
        {
            if(!this.instance)this.instance = new EffectManager();
            return this.instance;
        }

        constructor()
        {
            super();
            this.m_DicEffect = new NDictionary<BaseEffect>();
        }

        public Setup():void
        {
        }

        public Destroy():void
        {
            this.m_DicEffect.Foreach(function(key, value)
            {
                value.Destroy();
                ObjectPools.Recover(value);
                return true;
            });
            this.m_DicEffect.Clear();
        }

        public Tick():void
        {
        }
        
        /**暂停游戏*/
        public PauseGame():void
        {
            this.m_DicEffect.Foreach(function(key, value)
            {
                value.OnPauseEnter();
                return true;
            });
        }
		/**结束暂停*/
		public ResumeGame():void
        {
            this.m_DicEffect.Foreach(function(key, value)
            {
                value.OnPauseExit();
                return true;
            });
        }
        
        /*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～创建特效～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
        /**
         * 定点位置创建特效
         * @param	file	    资源文件
         * @param	parent_node	父节点
         * @param	x	        位置x
         * @param	y	        位置y
         * @param	time	    播放时长
         *          1.对于非循环特效，且未设置time，特效播放结束后，会自动销毁；
                    2.对于循环特效，到点之后自动销毁
                    3.只要这个参数大于0，不管是循环特效还是非循环特效，指定时间一到，自动销毁</param>
                    4.循环特效，且未指定time，则需要外部调用RemoveEffect接口销毁
         */
        public CreateEffect_Position(file:string, parent_node:LayaNode, x:number=0, y:number=0, time:number = 0):number
        {
            let effect:BaseEffect = ObjectPools.Get(BaseEffect);
            effect.ObjectUID = this.ShareGUID();
            effect.SetParent(parent_node);
            effect.SetPos(x, y);
            effect.TotalTime = time;
            effect.Setup(file);
            this.m_DicEffect.Add(effect.ObjectUID, effect);
            return effect.ObjectUID;
        }
        /**
         * 挂节点创建特效
         * @param	file	    资源文件
         * @param	parent_node	父节点
         * @param	x	        位置偏移x
         * @param	y	        位置偏移y
         * @param	time	    播放时长,参考接口CreateEffect_Position的说明
         */        
        public CreateEffect_Joint(file:string, parent_node:LayaNode, offset_x:number=0, offset_y:number=0, time:number = 0):number
        {
            let effect:JoinEffect = ObjectPools.Get(JoinEffect);
            effect.ObjectUID = this.ShareGUID();
            effect.SetParent(parent_node);
            effect.SetOffset(offset_x, offset_y);
            effect.TotalTime = time;
            effect.Setup(file);
            this.m_DicEffect.Add(effect.ObjectUID, effect);
            return effect.ObjectUID;
        }
        /**
         * 创建UI特效
         * @param	file	    资源文件
         * @param	parent_node	父节点
         * @param	x	        位置偏移x
         * @param	y	        位置偏移y
         * @param	time	    播放时长,参考接口CreateEffect_Position的说明
         */   
        public CreateEffect_UI(file:string, parent_node:LayaNode, offset_x:number=0, offset_y:number=0, time:number = 0):number
        {
            let effect:UIEffect = ObjectPools.Get(UIEffect);
            effect.ObjectUID = this.ShareGUID();
            effect.SetParent(parent_node);
            effect.SetOffset(offset_x, offset_y);
            effect.TotalTime = time;
            effect.Setup(file);
            this.m_DicEffect.Add(effect.ObjectUID, effect);
            return effect.ObjectUID;
        }
        public RemoveEffect(eff_id:number):void
        {
            let eff:BaseEffect = this.m_DicEffect.GetValue(eff_id);
            if(eff)
            {
                eff.Destroy();
                ObjectPools.Recover(eff);
            }
            this.m_DicEffect.Remove(eff_id);
        }
        public GetEffect(id:number):BaseEffect
        {
            return this.m_DicEffect.GetValue(id);
        }
        public ShareGUID():number
        {
            return ++this.m_ShareObjID;
        }
	}
}