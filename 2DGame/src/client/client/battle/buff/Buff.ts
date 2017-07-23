module dc
{
	/**
     * Buff
     * @author hannibal
     * @time 2017-7-14
     */
	export class Buff implements IPoolsObject
	{
        private m_Active:boolean;
        private m_OwnerUnit:UnitObject;
        private m_BufferType:eBuffType;
        private m_BufferValue:number;
        private m_StdBuffInfo:any;
        private m_LeaveTime:number;

        private m_ListEffect:Array<number> = [];

        public Init():void
        {
        }

        public Setup(obj:UnitObject, type:eBuffType):void
        {
            this.m_OwnerUnit = obj;
            this.m_StdBuffInfo = DataProvider.Instance.GetInfo("BuffInfo",type);
            this.m_BufferType = type;
            this.m_LeaveTime = this.m_StdBuffInfo.Time;
            this.m_Active = true;

            this.SetupEffect();
        }

        public Destroy():void
        {
            this.m_Active = false;
            this.RemoveEffect();
            if (this.m_StdBuffInfo.EndEffect != null)
            {
                this.AddEffect(this.m_StdBuffInfo.EndEffect.part, this.m_StdBuffInfo.EndEffect.res, false);
            }
        }

        public Update(elapse:number, game_frame:number):boolean
        {
            if(this.m_Active)
            {
                this.m_LeaveTime -= elapse;
                if(this.m_LeaveTime > 0)
                {
                    return true;
                }
                else
                {
                    this.m_Active = false;
                }
            }
            return false;
        }
        public ResolveBufferValue(value:number):number
        {
            switch (this.m_BufferType)
            {
                case eBuffType.HealEffect:
                case eBuffType.AddonDamage:
                case eBuffType.BeatSpAddon:
                case eBuffType.ReduceDamage:
                case eBuffType.AttackSpAddon:
                    if (!this.m_StdBuffInfo.P2.ToBool())
                        value += this.m_BufferValue;
                    else
                        value *= (100 + this.m_BufferValue) / 100;
                    break;
                case eBuffType.BanSpell:
                case eBuffType.BanWeapon:
                case eBuffType.Invincible:
                case eBuffType.Sneak:
                case eBuffType.ImmuneCrit:
                    value = this.m_BufferValue;
                    break;
                default:
                    if (!this.m_StdBuffInfo.P2.ToBool())
                        value += this.m_BufferValue;
                    else
                        value *= (100 + this.m_BufferValue) / 100;
                    break;
            }
            return value;
        }

        public SetupEffect():void
        {
            this.RemoveEffect();
            if (!StringUtils.IsNullOrEmpty(this.m_StdBuffInfo.UIEffect))
            {
                this.AddEffect(eEffectAttachPart.UI_CENTER, this.m_StdBuffInfo.UIEffect, false);
            }
            if (!StringUtils.IsNullOrEmpty(this.m_StdBuffInfo.StartEffect.res))
            {
                this.AddEffect(this.m_StdBuffInfo.StartEffect.part, this.m_StdBuffInfo.StartEffect.res, false);
            }
            if (this.m_StdBuffInfo.Effect != null)
            {
                let effect:number = this.AddEffect(this.m_StdBuffInfo.Effect.part, this.m_StdBuffInfo.Effect.res, true);
                if (effect > 0)
                {
                    this.m_ListEffect.push(effect);
                }
            }
        }

        private AddEffect(part:eEffectAttachPart, effect_path:string, loop:boolean):number
        {
            if (StringUtils.IsNullOrEmpty(effect_path)) return null;

            let effect:number = 0;
            if (part == eEffectAttachPart.UI_CENTER)
            {
                // if (this.m_OwnerUnit.ObjectGUID == PlayerDataManager.Instance.MainPlayerUID)
                // {//界面特效针对自己播放
                //     effect = EffectManager.Instance.CreateEffect_UI(effect_path, UILayerManager.Instance.RootLayer.transform, loop ? float.MaxValue : 0);
                // }
            }
            else
            {
                let node = this.m_OwnerUnit.GetEffectPoint(part);
                assertNullOrNil(node);
                effect = EffectManager.Instance.CreateEffect_Joint(effect_path, node, loop ? Number.MAX_VALUE : 0);
            }
            return effect;
        }
        private RemoveEffect():void
        {
            for (let i = 0; i < this.m_ListEffect.length; ++i)
            {
                EffectManager.Instance.RemoveEffect(this.m_ListEffect[i]);
            }
            ArrayUtils.Clear(this.m_ListEffect);
        }

        public get BufferType():eBuffType
        {
            return this.m_BufferType;
        }
        public get BufferValue():number
        {
            return this.m_BufferValue;
        }
        public set BufferValue(value:number)
        {
            this.m_BufferValue = value; 
        }
        public get StdBuffInfo():any
        {
            return this.m_StdBuffInfo; 
        }
        public get LeaveTime():number
        {
            return this.m_LeaveTime;
        }
        public set LeaveTime(value:number)
        {
            this.m_LeaveTime = value; 
        }
        public get Active():boolean
        {
            return this.m_Active; 
        }
	}
}