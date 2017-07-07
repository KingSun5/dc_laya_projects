module dc
{
    /**
     * 单列
     * @author hannibal
     * @time 20174-7-6
     */
    export class Singleton
    {
        private static classKeys:Function[] = [];
        private static classValues:any[] = [];

        constructor()
        {
            var clazz: any = this["constructor"];
            //为空时，表示浏览器不支持这样读取构造函数
            if (!clazz)
                return;
            // 防止重复实例化
            if (Singleton.classKeys.indexOf(clazz) != -1)
                throw new Error(this + " 只允许实例化一次！");
            else
            {
                Singleton.classKeys.push(clazz);
                Singleton.classValues.push(this);
            }
        }
    }
}