module dc
{
    /**
     * 动作
     * @author hannibal
     * @time 2017-7-23
     */
    export class AnimationID
    {
        public static None:string = "";
        public static Idle:string = "DJ2";
        public static Move:string = "YD";
        public static Attack:string = "GJ";
        public static Die:string = "SW";

        /**
         * 玩家朝向对应的帧
         */	
        public static MotionFrameMirror:Array<any> = [
                {},	//占位
                {frame:eFace8.DOWN, 		mirror:false},	//DOWN
                {frame:eFace8.RIGHT_DOWN, 	mirror:false},	//RIGHT_DOWN
                {frame:eFace8.RIGHT, 		mirror:false},	//RIGHT
                {frame:eFace8.RIGHT_UP,  	mirror:false},	//RIGHT_UP
                {frame:eFace8.UP, 		mirror:false},	//UP
                {frame:eFace8.RIGHT_UP, 	mirror:true},	//LEFT_UP
                {frame:eFace8.RIGHT, 		mirror:true},	//LEFT
                {frame:eFace8.RIGHT_DOWN, 	mirror:true}	//LEFT_DOWN
        ];
    }
}