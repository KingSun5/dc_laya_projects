module dc
{
    /**
     * 战斗场景
     * @author hannibal
     * @time 2017-7-14
     */
	export class BattleScene extends BaseScene
	{
        private m_Terrain:Terrain = null;
        private m_Input:BattleInput = null;

        public OnEnter(type:eSceneType, scene_id:number, info:any):void
        {
            super.OnEnter(type, scene_id, info);
            Log.Info("enter battle scene");

            UIShowController.CloseAll([]);
            this.m_Terrain = new Terrain();
            this.m_Terrain.Setup(0);

            this.m_Input = new BattleInput();
            this.m_Input.Setup();

            this.BuildLoadResource();
        }

        public OnExit()
        {
            Log.Info("exit battle scene");
            if(this.m_Input)
            {
                this.m_Input.Destroy();
                this.m_Input = null;
            }
            if(this.m_Terrain)
            {
                this.m_Terrain.Destroy();
                this.m_Terrain = null;
            }
            super.OnExit();
        }

        public Update():void
        {       
            if(this.m_Input)
            {
                this.m_Input.Update();
            }       
            if(this.m_Terrain)
            {
                this.m_Terrain.Update();
            }
            super.Update();
        }

		private BuildLoadResource():void
		{
            this.OnResourceLoadComplate();
		}

        protected RegisterEvent():void
        {
			super.RegisterEvent();
        }
        protected UnRegisterEvent():void
        {
			super.UnRegisterEvent();
        }

        protected OnResourceLoadComplate():void
        {
			super.OnResourceLoadComplate();

            // //压力测试
            // //UnitAIManager.Instance.CreateTestRobot();

            this.m_Terrain.Show();
            UnitAIManager.Instance.CreateMainPlayer();
            UIShowController.Show(GUIID.BATTLE_MAIN);

            //this.Test3D();
        }

        private Test3D():void
        {
            Scene3D.Instance.Setup();
            //Scene3D.Instance.CreateScene("");
            Scene3D.Instance.CreateScene("res/scene/Arena/Arena.ls");
            Scene3D.Instance.CreateMainCamera(new Vector3(0, 5, 8), new Vector3(0, 0, 0), 0, 0.1, 100);
            Scene3D.Instance.CreateMainLight(new Vector3(1, -1, 0),new Vector3(0.6, 0.6, 0.6),new Vector3(1.6, 1.6, 1.6),new Vector3(0.6, 0.6, 0.6));
            Scene3D.Instance.SetSkybox("res/skyBox/skyBox2/skyCube.ltc");
            
            // //添加自定义模型
            // var box: Laya.MeshSprite3D = new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 1));
            // Scene3D.Instance.AddChild(box);
            // box.transform.rotate(new Vector3(0, 45, 0), false, false);
            // var material: StandardMaterial = new StandardMaterial();
            // material.diffuseTexture = Texture2D.load("res/image/1.png");
            // box.meshRender.material = material;

            // var vect:Laya.Vector3 = new Laya.Vector3(1,1,0);
            // //每10毫秒旋转一次
            // Laya.timer.loop(10,null,function(){
            //     box.transform.rotate(vect,true,false);
            // });
        }
	}
}