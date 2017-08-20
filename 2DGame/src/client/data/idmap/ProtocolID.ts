module dc
{
    /**
     * 协议id
     * @author hannibal
     * @time 2017-7-31
     */
	export class ProtocolID
	{

	    public static PROTOCOL_RESERVED_LOW:number		= 0;		//	net 保留的协议号，最小值
	    public static PROTOCOL_RESERVED_HIGH:number		= 999;		//	net 保留的协议号，最大值
	    public static MSG_APPLAYER_BASE:number			= 1000;		//	应用层协议起始号码
	    public static MSG_APPLAYER_PER_INTERVAL:number	= 1000;		//  消息起始结束间隔


	    //	内部id
	    public static MSG_BASE_INTERNAL:number	= ProtocolID.MSG_APPLAYER_BASE + 100;

	    public static MSG_BASE_C2GS:number		= ProtocolID.MSG_APPLAYER_BASE + 1000;
	    public static MSG_BASE_C2SS:number		= ProtocolID.MSG_APPLAYER_BASE + 2000;
	    public static MSG_BASE_C2WS:number		= ProtocolID.MSG_APPLAYER_BASE + 3000;

        public static MSG_BASE_GS2C:number      = ProtocolID.MSG_APPLAYER_BASE + 5000;
        public static MSG_BASE_GS2SS:number     = ProtocolID.MSG_APPLAYER_BASE + 6000;
        public static MSG_BASE_GS2WS:number     = ProtocolID.MSG_APPLAYER_BASE + 7000;

        public static MSG_BASE_SS2C:number      = ProtocolID.MSG_APPLAYER_BASE + 10000;
        public static MSG_BASE_SS2GS:number     = ProtocolID.MSG_APPLAYER_BASE + 11000;
        public static MSG_BASE_SS2WS:number     = ProtocolID.MSG_APPLAYER_BASE + 12000;

        public static MSG_BASE_WS2C:number      = ProtocolID.MSG_APPLAYER_BASE + 15000;
        public static MSG_BASE_WS2GS:number     = ProtocolID.MSG_APPLAYER_BASE + 16000;
        public static MSG_BASE_WS2SS:number     = ProtocolID.MSG_APPLAYER_BASE + 17000;
	}
	
    export enum c2gs
    {
        Begin = ProtocolID.MSG_BASE_C2GS,
        Encrypt = Begin + 1,                //加密
        Login = Begin + 2,                  //登陆
        
        CharacterList = Begin + 3,          //角色列表
        CreateCharacter = Begin + 4,        //创建角色

        RobotTest = Begin + 10,
    }

    export enum gs2c
    {
        Begin = ProtocolID.MSG_BASE_GS2C,
        Encrypt = Begin + 1,                //加密
        Login = Begin + 2,                  //登陆结果
        
        CharacterList = Begin + 3,          //角色列表
        CreateCharacter = Begin + 4,        //创建角色
        
        RobotTest = Begin + 10,
    }

    export enum c2ss
    {
        Begin = ProtocolID.MSG_BASE_C2SS,

        ResourceLoaded = Begin +1,          //资源加载完毕
        EnterScene = Begin +2,              //传送

        UnitMove = Begin +10,               //移动
    }
    
    export enum ss2c
    {
        Begin = ProtocolID.MSG_BASE_SS2C,

        CharacterInfo = Begin + 1,          //角色信息
        EnterScene = Begin + 2,             //进入场景

        UnitMove = Begin + 10,              //移动
        EnterAOI = Begin + 11,              //进入aoi
        LeaveAOI = Begin + 12,
        UnitModify = Begin + 13,            //属性改变 
    }

    export enum c2ws
    {
        Begin = ProtocolID.MSG_BASE_C2WS,

        EnterGame = Begin + 1,             //进入游戏
    }
    export enum ws2c
    {
        Begin = ProtocolID.MSG_BASE_WS2C,

        EnterGame = Begin + 1,             //进入游戏
    }
}