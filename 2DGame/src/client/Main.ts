module dc
{
    /**
     * 入口
     * @author hannibal
     * @time 2017-7-9
     */
    export class Main extends Singleton
    {   
        private static isFirstEnterGame:boolean = true;
        constructor()
        {
            super();
            this.Start();
        }
        /**游戏执行入口*/
        private Start():void
        {
            if (Main.isFirstEnterGame)
            {
                Procedure.Instance.Setup();
                Procedure.Instance.Start();
                Main.isFirstEnterGame = false;
            }
        }
    }
}
new dc.Main();