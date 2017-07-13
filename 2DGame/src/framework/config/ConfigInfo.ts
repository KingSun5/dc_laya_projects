module dc
{
    /**
     * 配置表
     * @author hannibal
     * @time 20174-7-11
     */
	export class ConfigTemplate
	{
		public url:string;
		public name:string;
		public key:string;

		constructor(url:string, name:string, key:string)
		{
			this.url = url;
			this.name = name;
			this.key = key;
		}
	}
}