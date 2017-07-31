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
    }

    export enum S2CMsg
    {
        None = 0,
        Encrypt,        //加密
        Login,          //登陆结果
    }
}