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
                Procedure.Setup();
                Procedure.StartGame();
                Main.isFirstEnterGame = false;
            }
        }
    }
}