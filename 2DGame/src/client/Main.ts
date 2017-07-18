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
        /**游戏执行入口*/
        private Start():void
        {
            if (Main.isFirstEnterGame)
            {
                dc.Procedure.Instance.Setup();
                dc.Procedure.Instance.StartGame();
                Main.isFirstEnterGame = false;
            }
        }
    }
}
new dc.Main();