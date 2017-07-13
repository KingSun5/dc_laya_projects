module dc
{
    /**
     * 入口
     * @author hannibal
     * @time 20174-7-9
     */
    export class Main
    {   
        private static isFirstEnterGame:boolean = true;
        constructor()
        {
            this.Start();
        }

        private Start():void
        {
            if (Main.isFirstEnterGame)
            {
                Laya.init(640,960, Laya.WebGL);

                dc.Procedure.Instance.Setup();
                dc.Procedure.Instance.StartGame();
                Main.isFirstEnterGame = false;

                new GameMain();
            }
        }
    }
}
new dc.Main();