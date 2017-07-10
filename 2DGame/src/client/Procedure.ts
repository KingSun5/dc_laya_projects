module dc
{
    /**
     * 游戏主逻辑
     * @author hannibal
     * @time 20174-7-9
     */
    export class Procedure
    {
        public static Setup():void
        {
            Procedure.InitGameManager();
        }

        public static Destroy():void
        {
            Procedure.ReleaseGameManager();
        }

        public static StartGame():void
        {
            GameApp.Instance.StartGame();    
        }

        public static MainLoop():void
        {
            Procedure.Tick(Time.deltaTime,Time.frameCount);
        }

        private static InitGameManager():void
        {
            Framework.Instance.Setup();
            
            GameApp.Instance.Setup();
        }
        private static ReleaseGameManager():void
        {
            GameApp.Instance.Destroy();

            Framework.Instance.Destroy();
        }

        private static Tick(elapse:number, game_frame:number):void
        {
            Framework.Instance.Tick(elapse, game_frame);

            GameApp.Instance.Tick(elapse, game_frame);
        }
    }
}