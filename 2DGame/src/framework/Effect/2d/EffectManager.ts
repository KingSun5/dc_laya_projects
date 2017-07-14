module dc
{
    /**
     * 特效管理器
     * @author hannibal
     * @time 20174-7-11
     */
	export class EffectManager extends Singleton
	{
        private m_ShareObjID:number = 0;

        private static instance:EffectManager = null;
        public static get Instance():EffectManager
        {
            if(!this.instance)this.instance = new EffectManager();
            return this.instance;
        }

        /*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～创建特效～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
        /// <summary>
        /// 定点位置创建特效
        /// </summary>
        /// <param name="file">资源文件</param>
        /// <param name="pos">位置</param>
        /// <param name="time">播放时长(秒)：
        /// 1.对于非循环特效，且未设置time，特效播放结束后，会自动销毁；
        /// 2.对于循环特效，到点之后自动销毁
        /// 3.只要这个参数大于0，不管是循环特效还是非循环特效，指定时间一到，自动销毁</param>
        /// 4.循环特效，且未指定time，则需要外部调用RemoveEffect接口销毁
        /// <returns></returns>
        public CreateEffect_Position(file:string, pos:Vector2, time:number = 0):BaseEffect
        {return null;
            // EffectBase effect = NewObject<EffectBase>(file) as EffectBase;
            // if(effect != null)
            // {
            //     effect.ObjectUID = ShareGUID();
            //     effect.transform.position = pos;
            //     effect.TotalTime = time;
            //     GameObjectUtils.SetLayer(effect.gameObject, LayerMask.NameToLayer(SceneLayerID.Layer_Effect));
            // }

            // return effect;
        }
        /// <summary>
        /// 挂节点创建特效 
        /// </summary>
        /// <param name="file"></param>
        /// <param name="parent_node">父节点</param>
        /// <param name="is_loop"></param>
        /// <param name="time">参考接口CreateEffect_Position的说明</param>
        /// <returns></returns>
        public CreateEffect_Joint(file:string, parent_node:LayaNode, time:number = 0):BaseEffect
        {return null;
            // EffectJoint effect = NewObject<EffectJoint>(file) as EffectJoint;
            // if(effect != null)
            // {
            //     effect.ObjectUID = ShareGUID();
            //     effect.transform.SetParent(parent_node, false);
            //     effect.ParentNode = parent_node;
            //     effect.TotalTime = time;
            //     GameObjectUtils.SetLayer(effect.gameObject, LayerMask.NameToLayer(SceneLayerID.Layer_Effect));
            // }

            // return effect;
        }
        /// <summary>
        /// 创建UI特效
        /// </summary>
        /// <param name="file"></param>
        /// <param name="parent_node">父节点</param>
        /// <param name="is_loop"></param>
        /// <param name="time">参考接口CreateEffect_Position的说明</param>
        /// <returns></returns>
        public CreateEffect_UI(file:string, parent_node:LayaNode, time:number = 0):BaseEffect
        {return null;
            // EffectUI effect = NewObject<EffectUI>(file) as EffectUI;
            // if (effect != null)
            // {
            //     effect.transform.SetParent(parent_node, false);
            //     effect.ParentNode = parent_node;
            //     effect.TotalTime = time;
            // }

            // return effect;
        }
        public RemoveEffect(eff:BaseEffect):void
        {
            if(eff != null)
            {
                ObjectPools.Recover(eff);
                eff.Destroy();
            }
        }
        public ShareGUID():number
        {
            return ++this.m_ShareObjID;
        }
	}
}