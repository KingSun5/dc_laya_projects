module dc
{
    /**
     * 协议id
     * @author hannibal
     * @time 2017-7-31
     */
	export class ProtocolID
	{

	}
	
    export enum C2SMsg
    {
        None = 0,
        Encrypt,        //加密
        Login,          //登陆

        EnterRoom,      //进入房间
        LeaveRoom,      //离开房间
        KickoutRoom,    //踢出房间
    }

    export enum S2CMsg
    {
        None = 0,
        Encrypt,        //加密
        Login,          //登陆结果

        EnterRoom,      //进入房间
        LeaveRoom,      //离开房间
        KickoutRoom,    //踢出房间
    }
}