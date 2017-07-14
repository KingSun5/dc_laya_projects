module dc
{
    /**
     * 特效
     * @author hannibal
     * @time 20174-7-11
     */	
	export class BaseEffect
	{
        public Setup():void
        {
            
        }

        public Destroy():void
        {
            
        }

        public Update(elapse:number, game_frame:number):boolean
        {
            return true;
        }
	}
}