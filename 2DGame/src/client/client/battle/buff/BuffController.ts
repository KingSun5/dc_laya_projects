module dc
{
	/**
     * buff管理
     * @author hannibal
     * @time 2017-7-14
     */
	export class BuffController
	{
		private m_OwnerUnit:UnitObject;

		private m_DicBuff:NDictionary<Buff>;
		private m_DicBuffValue:NDictionary<number>;//buff数值加成
		private m_ListBuffStatus:eBufferStatus[] = [];

		constructor(obj:UnitObject)
		{
			this.m_OwnerUnit = obj;
			this.m_DicBuff = new NDictionary<Buff>();
			this.m_DicBuffValue = new NDictionary<number>();
		}

		public Setup():void
		{

		}
		public Destroy():void
		{
			this.m_DicBuffValue.Clear();
			this.ClearAllBuff();
			this.DetachAllBuffStatus();
		}

		/*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～buff～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
		/**
		 * 增加buff
		*/
		public AddBuff(buffId:number):void
		{
			if (this.m_OwnerUnit.IsDead)
				return;

			let info:any = DataProvider.Instance.GetInfo("BuffInfo",buffId);
			if (info == null) return;

			//添加
			let buff:Buff = this.m_DicBuff.GetValue(info.Type);
			if (buff != null)
			{
				switch (info.Overlay)
				{
					case eBuffOverlay.Add:
						buff.LeaveTime += info.Time;
						break;

					case eBuffOverlay.REPLACE:
						buff.LeaveTime = info.Time;
						break;
					case eBuffOverlay.IGNORE:
						return;
				}
			}
			else
			{
				buff = ObjectPools.Get(Buff);
				buff.Setup(this.m_OwnerUnit, info.Type);
				this.m_DicBuff.Add(info.Type, buff);
			}

			this.AttachBuffStatus(info.Status);

			//颜色
			// if (buff.StdBuffInfo.Color.Length > 0)
			// {
			// 	int r, g, b, a;
			// 	ColorUtils.GetRGBA(buff.StdBuffInfo.Color, out r, out g, out b, out a);
			// 	this.m_OwnerUnit.SetColor(r, g, b, a);
			// }
		}
		/**
		 * 移除buff
		*/
		public RemoveBuff(type:eBuffType):void
		{
			let buff:Buff = this.m_DicBuff.GetValue(type);
			if (buff == null)
			{
				return;
			}

			this.DetachBuffStatus(buff.StdBuffInfo.Status);
			this.m_DicBuff.Remove(type);
			buff.Destroy();
			ObjectPools.Recover(buff);
		}
		/**
		 * 移除所有buff
		*/
		public ClearAllBuff():void
		{
			this.m_DicBuff.Foreach(function(key, value)
			{
				value.Destroy();
				ObjectPools.Recover(value);
				return true;
			});
			this.m_DicBuff.Clear();
			this.DetachAllBuffStatus();
		}
		public ProcessBuff(elapse:number, game_frame:number):void
		{
			this.m_DicBuff.Foreach(function(key, value)
			{
				if (value.Active)
					value.Update(elapse, game_frame);
				return true;
			});
			//删除无效的
			let has_del:boolean = false;
			do
			{
				has_del = false;
				this.m_DicBuff.Foreach(function(key, value)
				{
					if (value.Active == false)
					{
						this.RemoveBuff(value.BufferType);
						has_del = true;
						return false;
					}
					return true;
				});
			} while (has_del);
		}
		/**
		 * buff属性计算
		*/
		public ResolveBufferValue(type:eBuffType, value:number):number
		{
			let buff:Buff = this.m_DicBuff.GetValue(type);
			if(buff != null)
			{
				value = buff.ResolveBufferValue(value);
			}
			return value;
		}
		/*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～状态～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
		/**
		 * 附加状态 
		 */
		public AttachBuffStatus(status:eBufferStatus):void
		{
			if (status == eBufferStatus.None) return;
			if (ArrayUtils.ContainsValue(this.m_ListBuffStatus,status) == false)
			{
				this.m_ListBuffStatus.push(status);
			}
		}
		/**
		 * 移除状态 
		 */
		public DetachBuffStatus(status:eBufferStatus):void
		{
			if (status == eBufferStatus.None) return;
			ArrayUtils.RemoveValue(this.m_ListBuffStatus, status);
		}
		public DetachAllBuffStatus():void
		{
			ArrayUtils.Clear(this.m_ListBuffStatus);
		}
		/**
		 * 查看角色是否有这个状态 
		 */
		public TestBuffStatus(status:eBufferStatus):boolean
		{
			return ArrayUtils.ContainsValue(this.m_ListBuffStatus,status);
		}
	}
}