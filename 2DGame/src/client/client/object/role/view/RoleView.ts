module dc
{	
	/**
     * 角色表现
     * @author hannibal
     * @time 2017-8-6
     */
	export class RoleView extends LayaSprite
	{
		protected m_OwnerRole:Role = null;
		protected m_IsLoadComplete:boolean = false;		//是否准备完成
		protected m_Animation:LayaAnimation = null;		//动画
		protected m_CurPose:string = AnimationID.None;
		protected m_CurFrame:number = 0;

		constructor(role:Role)
		{
			super();
			this.m_OwnerRole = role;
		}
		
        public Setup(info:any):void
        {
			this.m_IsLoadComplete = false;
			this.m_CurFrame = 0;
			this.m_Animation = new LayaAnimation();
			this.m_Animation.interval = 150;
			if(info && info.length > 0)
			{
				for(let url of info)
				{
					this.m_Animation.loadAtlas(url, LayaHandler.create(this,this.OnLoadAnimation));
				}
			}
        }
        public Destroy():void
        {
			if(this.m_Animation != null)
			{
				this.m_Animation.removeSelf();
				this.m_Animation.destroy();
				this.m_Animation = null;
			}
			this.destroy();
        }
		        
		public Update():boolean
        {
			if(this.m_IsLoadComplete)
			{
				let change_pose:boolean = this.UpdatePose();
				this.UpdateFrame(change_pose);
			}
			return true;
        }

		private UpdatePose():boolean
		{
			let pose_name:string = AnimationID.None;
			if(this.m_OwnerRole.TestStatus(eObjStatus.MOVE))
			{
				pose_name = AnimationID.Move;
			}
			else if(this.m_OwnerRole.TestStatus(eObjStatus.ATTACK))
			{
				pose_name = AnimationID.Attack;
			}
			else if(this.m_OwnerRole.TestStatus(eObjStatus.DIE))
			{
				pose_name = AnimationID.Die;
			}
			else
			{
				pose_name = AnimationID.Idle;
			}

			if(this.m_CurPose != pose_name)
			{
				this.m_CurPose = pose_name;
				return true;
			}
			else 
			{
				return false;
			}
		}

		private UpdateFrame(force:boolean):void
		{
			let face:number = this.m_OwnerRole.RoleFace;
			if(force || face != this.m_CurFrame)
			{
				let mirror_frame:any =  AnimationID.MotionFrameMirror[face];
				if(!mirror_frame)return;
				
				this.m_Animation.play(0,true, this.m_CurPose + "_" + mirror_frame.frame);
				this.scaleX = mirror_frame.mirror ? -1 : 1;
				this.m_CurFrame = face;
			}
		}

		protected OnLoadAnimation():void
		{
			this.m_IsLoadComplete = true;
			//添加到舞台
			this.addChild(this.m_Animation);
			let rect:LayaRectangle = this.m_Animation.getBounds();
			this.size(rect.width,rect.height);
			DisplayUtils.SetAlige(this, this.m_OwnerRole.AligeType, rect.width,rect.height);
			//创建动画模板
			Laya.Animation.createFrames(this.BuildAniUrls("DJ/M111_DJ2_1_000",4),"DJ2_1");
			Laya.Animation.createFrames(this.BuildAniUrls("DJ/M111_DJ2_2_000",4),"DJ2_2");
			Laya.Animation.createFrames(this.BuildAniUrls("DJ/M111_DJ2_3_000",4),"DJ2_3");
			Laya.Animation.createFrames(this.BuildAniUrls("DJ/M111_DJ2_4_000",4),"DJ2_4");
			Laya.Animation.createFrames(this.BuildAniUrls("DJ/M111_DJ2_5_000",4),"DJ2_5");
			
			Laya.Animation.createFrames(this.BuildAniUrls("GJ/M111_GJ_1_000",3),"GJ_1");
			Laya.Animation.createFrames(this.BuildAniUrls("GJ/M111_GJ_2_000",3),"GJ_2");
			Laya.Animation.createFrames(this.BuildAniUrls("GJ/M111_GJ_3_000",3),"GJ_3");
			Laya.Animation.createFrames(this.BuildAniUrls("GJ/M111_GJ_4_000",3),"GJ_4");
			Laya.Animation.createFrames(this.BuildAniUrls("GJ/M111_GJ_5_000",3),"GJ_5");
			
			Laya.Animation.createFrames(this.BuildAniUrls("SW/M111_SW_1_000",3),"SW_1");
			Laya.Animation.createFrames(this.BuildAniUrls("SW/M111_SW_2_000",3),"SW_2");
			Laya.Animation.createFrames(this.BuildAniUrls("SW/M111_SW_3_000",3),"SW_3");
			Laya.Animation.createFrames(this.BuildAniUrls("SW/M111_SW_4_000",3),"SW_4");
			Laya.Animation.createFrames(this.BuildAniUrls("SW/M111_SW_5_000",3),"SW_5");
			
			Laya.Animation.createFrames(this.BuildAniUrls("YD/M111_YD_1_000",4),"YD_1");
			Laya.Animation.createFrames(this.BuildAniUrls("YD/M111_YD_2_000",4),"YD_2");
			Laya.Animation.createFrames(this.BuildAniUrls("YD/M111_YD_3_000",4),"YD_3");
			Laya.Animation.createFrames(this.BuildAniUrls("YD/M111_YD_4_000",4),"YD_4");
			Laya.Animation.createFrames(this.BuildAniUrls("YD/M111_YD_5_000",4),"YD_5");
			
			//播放动画
			let anims = ["DJ2_1","DJ2_2","DJ2_3","DJ2_4","DJ2_5","GJ_1","GJ_2","GJ_3","GJ_4","GJ_5","SW_1","SW_2","SW_3","SW_4","SW_5","YD_1","YD_2","YD_3","YD_4","YD_5"]
			this.m_Animation.play(0,true,"YD_1");
		}
		
		/**
		 * 创建一组动画的url数组（美术资源地址数组）
		 * aniName  动作的名称，用于生成url
		 * length   动画最后一帧的索引值，
		 */    
		private BuildAniUrls(aniName:string,length:number):any
		{
			var urls:any = [];
			for(var i:number = 1;i<=length;i++)
			{
				//动画资源路径要和动画图集打包前的资源命名对应起来
				urls.push("anim/monster/001/"+aniName+i+".png");
			}
			return urls;
		}
	}
}