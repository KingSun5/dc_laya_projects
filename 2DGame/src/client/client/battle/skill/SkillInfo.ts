module dc
{
	/**
     * 技能信息
     * @author hannibal
     * @time 20174-7-14
     */
	export class SkillInfo
	{
        private m_OwnerUnit:UnitObject;
        private m_SkillID:number;      //技能ID
        private m_StdSkillInfo:any;
        private m_StdWeaponInfo:any;
        private m_StdBulletInfo:any;

        private m_ShotCDTime:number = 0;	        //武器、技能冷却时间  毫秒级
        private m_FillBulletCDTime:number = 0;	    //装弹冷却时间  毫秒级

        /*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～基础方法～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
        constructor(skill_id:number, obj:UnitObject)
        {
            this.m_OwnerUnit = obj;
            this.m_SkillID = skill_id;
            this.m_StdSkillInfo = DataProvider.GetInfo("SkillInfo", this.m_SkillID);
            if (this.m_StdSkillInfo.WeaponId > 0)
            {
                this.m_StdWeaponInfo = DataProvider.GetInfo("WeaponInfo",this.m_StdSkillInfo.WeaponId);
            }
            if(this.m_StdSkillInfo.BulletId > 0)
            {
                this.m_StdBulletInfo = DataProvider.GetInfo("BulletInfo",this.m_StdSkillInfo.BulletId);
            }
        }

        public Update(elapse:number, game_frame:number):void
        {

        }
        /// <summary>
        /// 伤害
        /// </summary>
        public ResolveDamage(target:UnitObject):number
        {
            if (target == null || this.m_OwnerUnit == null)
                return 0.0;
            if (target.UnitBuff.TestBuffStatus(eBufferStatus.Invincible))
                return 0.0;
            //攻击
            let nAttack = this.Attack + this.m_OwnerUnit.UnitInfo.AbilInfo.Get(eAbilType.Attack);
            nAttack = this.m_OwnerUnit.UnitBuff.ResolveBufferValue(eBuffType.Abil_Attack, nAttack);
            //防御
            let deDamageRate = target.UnitInfo.AbilInfo[eAbilType.Defend] / (10000.0 + target.UnitInfo.AbilInfo.Get(eAbilType.Defend));
            let damage = nAttack * (1.0 - deDamageRate);
            //穿甲
            let nCrit = (this.m_OwnerUnit.UnitInfo.AbilInfo[eAbilType.Crit] - target.UnitInfo.AbilInfo.Get(eAbilType.DeCrit));
            if (MathUtils.RandRange(0, 10000) < nCrit)
            {
                damage *= (this.m_OwnerUnit.UnitInfo.AbilInfo.Get(eAbilType.CritDamage) / 100.0);
                let reduceCritDamage = target.UnitBuff.ResolveBufferValue(eBuffType.Abil_CritDamage, damage) - damage;
                damage -= reduceCritDamage;
            }
            //BUFF加成
            let addonDamage = this.m_OwnerUnit.UnitBuff.ResolveBufferValue(eBuffType.AddonDamage, damage) - damage;
            let reduceDamage = target.UnitBuff.ResolveBufferValue(eBuffType.ReduceDamage, damage) - damage;
            damage += addonDamage;
            damage -= reduceDamage;

            return damage;
        }

        /*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～get/set～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
        public get SkillId():number
        {
            return this.m_SkillID; 
        }
        public get StdSkillInfo():any
        {
            return this.m_StdSkillInfo;
        }
        public get StdWeaponInfo():any
        {
            return this.m_StdWeaponInfo; 
        }
        public get StdBulletInfo():any
        {
            return this.m_StdBulletInfo; 
        }
        public get ShotCDTime():number
        {
            return this.m_ShotCDTime; 
        }
        public set ShotCDTime(value:number)
        {
            this.m_ShotCDTime = value; 
        }
        public get FillBulletCDTime():number
        {
            return this.m_FillBulletCDTime; 
        }
        public set FillBulletCDTime(value:number)
        {
            this.m_FillBulletCDTime = value; 
        }

        //攻击力
        private m_Attack:number;
        public get Attack():number
        {
            return this.m_Attack; 
        }
        public set Attack(value:number)
        {
            this.m_Attack = value; 
        }
        //速度    
        private m_Speed:number;
        public get Speed():number
        {
            return this.m_Speed; 
        }
        public set Speed(value:number)
        {
            this.m_Speed = value; 
        }
        //子弹id
        public get BulletId():number
        {
            return this.m_StdSkillInfo.BulletId;
        }
        //每颗子弹间隔
        private m_BulletTick:number;
        public get BulletTick():number
        {
            return this.m_BulletTick; 
        }
        public set BulletTick(value:number)
        {
            this.m_BulletTick = value; 
        } 
        //每轮发射数量
        private m_BulletTickNum:number;
        public get BulletTickNum():number
        {
            return this.m_BulletTickNum; 
        }
        public set BulletTickNum(value:number)
        {
            this.m_BulletTickNum = value; 
        }
        //子弹数量上限
        private m_MaxBulletNum:number;
        public get MaxBulletNum():number
        {
            return this.m_MaxBulletNum; 
        }
        public set MaxBulletNum(value:number)
        {
            this.m_MaxBulletNum = value; 
        }
        
        //随机方向
        private m_BulletRangeDir:number;
        public get BulletRangeDir():number
        {
            return this.m_BulletRangeDir; 
        }
        public set BulletRangeDir(value:number)
        {
            this.m_BulletRangeDir = value; 
        }
        //随机时间   
        private m_BulletRangeTime:number;
        public get BulletRangeTime():number
        {
            return this.m_BulletRangeTime; 
        }
        public set BulletRangeTime(value:number)
        {
            this.m_BulletRangeTime = value; 
        }
        //反弹次数
        private m_BulletReboundCount:number;
        public get BulletReboundCount():number
        {
            return this.m_BulletReboundCount; 
        }
        public set BulletReboundCount(value:number)
        {
            this.m_BulletReboundCount = value; 
        }
        //是否跟踪目标
        private m_BulletGuided:boolean;
        public get BulletGuided():boolean
        {
            return this.m_BulletGuided; 
        }
        public set BulletGuided(value:boolean)
        {
            this.m_BulletGuided = value; 
        }
        //子弹缩放 
        private m_BulletScale:number = 1;
        public get BulletScale():number
        {
            return this.m_BulletScale; 
        }
        public set BulletScale(value:number)
        {
            this.m_BulletScale = value; 
        }
        private m_CD:number;
        public get CD():number
        {
            return this.m_CD; 
        }
        public set CD(value:number)
        {
            this.m_CD = value; 
        }
        //最低能量
        public get MinPower():number
        {
            return this.m_StdSkillInfo.MinPower; 
        }
        //最大能量
        private m_MaxPower:number;
        public get MaxPower():number
        {
            return this.m_MaxPower; 
        }
        public set MaxPower(value:number)
        {
            this.m_MaxPower = value; 
        }
        //每次恢复数量
        private m_PowerTickNum:number;
        public get PowerTickNum():number
        {
            return this.m_PowerTickNum; 
        }
        public set PowerTickNum(value:number)
        {
            this.m_PowerTickNum = value; 
        }
        //能量消耗
        private m_CostPower:number;
        public get CostPower():number
        {
            return this.m_CostPower; 
        }
        public set CostPower(value:number)
        {
            this.m_CostPower = value; 
        }
        //能量恢复间隔
        private m_PowerTime:number;
        public get PowerTime():number
        {
            return this.m_PowerTime; 
        }
        public set PowerTime(value:number)
        {
            this.m_PowerTime = value; 
        }
        //范围
        private m_Range:number;
        public get Range():number
        {
            return this.m_Range; 
        }
        public set Range(value:number)
        {
            this.m_Range = value; 
        }
        //蓄力时间
        private m_PrepearTime:number;
        public get PrepearTime():number
        {
            return this.m_PrepearTime; 
        }
        public set PrepearTime(value:number)
        {
            this.m_PrepearTime = value; 
        }
        //最小距离
        private m_MinDist:number;
        public get MinDist():number
        {
            return this.m_MinDist; 
        }
        public set MinDist(value:number)
        {
            this.m_MinDist = value; 
        }
        //最大距离
        private m_MaxDist:number;
        public get MaxDist():number
        {
            return this.m_MaxDist; 
        }
        public set MaxDist(value:number)
        {
            this.m_MaxDist = value; 
        }
        //锁定距离
        private m_LockDist:number;
        public get LockDist():number
        {
            return this.m_LockDist; 
        }
        public set LockDist(value:number)
        {
            this.m_LockDist = value; 
        }
	}
}