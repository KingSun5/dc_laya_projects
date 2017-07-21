module dc
{
    /**
     * 配置表
     * @author hannibal
     * @time 20174-7-11
     */
	export class ConfigTemplate
	{
		public url:string;	//资源url
		public name:string;	//名称：用于查找
		public key:string;	//表的主键

		constructor(url:string, name:string, key:string)
		{
			this.url = url;
			this.name = name;
			this.key = key;
		}
	}
}