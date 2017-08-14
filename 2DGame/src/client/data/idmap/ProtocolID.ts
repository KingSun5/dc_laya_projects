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
        Encrypt,                //加密
        Login,                  //登陆
        
        CharacterList,          //角色列表
        CreateCharacter,        //创建角色

        EnterGame,              //进入游戏；成功后，服务器会发送EnterScene，告诉进入的场景id
        ResourceLoaded,         //资源加载完毕
        SceneTransmit,          //传送

        UnitMove,               //移动

        EnterRoom,              //进入房间
        LeaveRoom,              //离开房间
        KickoutRoom,            //踢出房间
    }

    export enum S2CMsg
    {
        None = 0,
        Encrypt,                //加密
        Login,                  //登陆结果
        
        CharacterList,          //角色列表
        CreateCharacter,        //创建角色
        CharacterInfo,          //角色信息

        EnterScene,             //进入场景

        UnitMove,               //移动
        EnterAOI,               //进入aoi
        LeaveAOI,      
        UnitModify,             //属性改变 

        EnterRoom,              //进入房间
        LeaveRoom,              //离开房间
        KickoutRoom,            //踢出房间
    }
}