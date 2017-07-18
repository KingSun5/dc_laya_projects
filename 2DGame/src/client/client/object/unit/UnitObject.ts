module dc
{
	/**
     * 单位
     * @author hannibal
     * @time 20174-7-14
     */
	export class UnitObject extends MapObject
	{
        protected m_IsDie:boolean = false;          //是否死亡
        protected m_GroupType:eGroupType = eGroupType.TYPE_NONE;//阵营
        protected m_UnitTypeID:number = 0;          //单位类型
        protected m_Hp:number = 0;
        protected m_HpMax:number = 1;
        protected m_WeaponID:number = 0;

        protected m_UnitInfo:UnitInfo = null;       //玩家数据缓存
        protected m_StdUnitInfo:any = null;
        protected m_StdWeaponInfo:any = null;

        /**战斗*/
        protected m_UnitSkill:SkillController;      //技能+武器
        protected m_UnitFeature:FeatureController;  //特性
        protected m_UnitBuff:BuffController;        //buff
        protected m_UnitWeapon:Weapon;              //武器

        /*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～基础方法～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
        constructor()
        {
			super();
            this.m_UnitFeature = new FeatureController(this);
            this.m_UnitSkill = new SkillController(this);
            this.m_UnitBuff = new BuffController(this);
            this.m_UnitWeapon = new Weapon(this);
        }
        public Init():void
        {
			super.Init();
        }

        public Setup(info:any):void
        {
            super.Setup(info);
            EventController.DispatchEvent(EventID.UNIT_ENTER, this.m_ObjectGUID);
        }
        public Update(elapse:number, game_frame:number):boolean
        {
            if (!this.m_IsDie)
            {
                this.m_UnitBuff.ProcessBuff(elapse, game_frame);
            }
            return super.Update(elapse, game_frame);
        }
        public Destroy():void
        {
            this.m_UnitBuff.Destroy();

            EventController.DispatchEvent(EventID.UNIT_LEAVE, this.m_ObjectGUID);

            super.Destroy();
        }
        /**加载数据*/
        public LoadData(info:UnitInfo):void
        {
            this.m_UnitInfo = info;

            //初始数据
            this.m_StdUnitInfo = DataProvider.GetInfo("UnitInfo",this.m_UnitTypeID);
            this.m_GroupType = this.m_UnitInfo.Group;
            this.HpMax = this.m_StdUnitInfo.Hp;
            this.WeaponID = this.m_StdUnitInfo.WeaponID;
            this.SetSpeed(this.m_UnitInfo.AbilInfo.Get(eAbilType.MoveSpeed));
            this.SetPosition(this.m_UnitInfo.Pos.x, this.m_UnitInfo.Pos.y);
            //朝向
            //TODO

            //技能
            this.m_UnitSkill.AddSkill(this.m_StdWeaponInfo.SkillId);

            //特性
            this.m_UnitFeature.Resolve();
            this.m_UnitFeature.AddFeature(1);
        }

        /**
        * 注册事件 
        */
        public RegisterEvent():void
        {
            super.RegisterEvent();
        }
        public UnRegisterEvent():void
        {
            super.UnRegisterEvent();
        }
        private OnRoleEvt(evt:EventArgs):void
        {
            switch (evt.Type)
            {
                case EventID.UNIT_FEATURE:
                    {
                        let type:eFeatureType = evt.Get(0);
                        switch (type)
                        {
                            case eFeatureType.AbilityMoveSpeed:
                                let s = this.m_UnitInfo.AbilInfo.Get(eAbilType.MoveSpeed);
                                this.SetSpeed(s);
                                break;

                            case eFeatureType.AbilityMaxHp:
                                this.HpMax = this.m_UnitInfo.AbilInfo.Get(eAbilType.Hp);
                                break;
                        }
                    }
                    break;
            }
        }
        /**死亡*/
        public HandleDie():void
        {
            this.m_UnitBuff.ClearAllBuff();
            EventController.DispatchEvent(EventID.UNIT_DIE, this.m_ObjectGUID);
            ObjectManager.Instance.RemoveObject(this, false);

        }
        public ModifyHP(hp:number):void
        {
            hp = hp < 0 ? 0 : hp;
            this.Hp = hp;
            EventController.DispatchEvent(EventID.UNIT_HP, this.m_ObjectGUID, this.m_Hp, this.m_HpMax);
        }
        /// <summary>
        /// 是否友方
        /// </summary>
        public IsFriend(obj:UnitObject):boolean
        {
            if (obj == null) return false;

            //自己
            if (this.m_ObjectGUID == obj.ObjectGUID) return true;

            //队友
            if (this.m_GroupType == obj.GroupType && this.m_GroupType > eGroupType.TYPE_NONE) return true;

            return false;
        }
        /// <summary>
        /// 获取特效挂点
        /// </summary>
        public GetEffectPoint(part:eEffectAttachPart):LayaNode
        {
            return null;
        }
        public get IsDead():boolean
        {
            return this.m_IsDie;
        }
        public set IsDead(value:boolean)
        {
            this.m_IsDie = value;
        }
        public get GroupType():eGroupType
        {
            return this.m_GroupType;
        }
        public set GroupType(value:eGroupType)
        {
            this.m_GroupType = value;
        }
        public get UnitInfo():UnitInfo
        {
            return this.m_UnitInfo;
        }

        public get UnitTypeID():number
        {
            return this.m_UnitTypeID;
        }
        public set UnitTypeID(value:number)
        {
            this.m_UnitTypeID = value;
        }
        public StdUnitInfo():any
        {
            return this.m_StdUnitInfo;
        }
        public get Hp():number
        {
            return this.m_Hp;
        }
        public set Hp(value:number)
        {
            this.m_Hp = value;
            this.m_Hp = this.m_Hp < 0 ? 0 : this.m_Hp;
        }

        public get HpMax():number
        {
            return this.m_HpMax;
        }
        public set HpMax(value:number)
        {
            this.m_HpMax = value;
            this.Hp = value;
        }

        public get WeaponID():number
        {
            return this.m_WeaponID;
        }
        public set WeaponID(value:number)
        {
            this.m_WeaponID = value;
            this.m_StdWeaponInfo = DataProvider.GetInfo("WeaponInfo", this.m_WeaponID);
        }

        public get WeaponInfo():any
        {
            return this.m_StdWeaponInfo;
        }

        public get UnitSkill():SkillController
        {
            return this.m_UnitSkill; 
        }
        public get UnitFeature():FeatureController
        {
            return this.m_UnitFeature; 
        }
        public get UnitBuff():BuffController
        {
            return this.m_UnitBuff; 
        }
	}
}