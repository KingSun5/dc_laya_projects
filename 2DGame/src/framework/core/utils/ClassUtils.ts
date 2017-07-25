module dc
{
    /**
     * 工具类
     * @author hannibal
     * @time 2017-7-11
     */
	export class ClassUtils
	{
        /**
         * 根据名称创建实例
         * @param objectName    类名，包括命名空间
         * @param args          参数
        */
        public static CreateObject<T>(objectName: string, ...args: any[]): T 
        {
            if (StringUtils.IsNullOrEmpty(objectName)) 
            {
                assert(false, "create a object with null string");
            }

            let objectNames = objectName.split(".");
            let length = objectNames.length;

            let oObject: any = window;
            let i = 0;
            while (i < length)
            {
                oObject = oObject[objectNames[i]];
                ++i;
            }

            let newInstance = Object.create(oObject.prototype);
            newInstance.constructor.apply(newInstance, args);
            return newInstance;
        }
        /**深复制一个对象*/
        public static CopyObject(obj:any):any
        {
            let js = JSON.stringify(obj);
            return JSON.parse(js);
        }
        /**获取一个对象里的值*/
        public static GetObjectValue(obj: any, key: string, defVal?: any): any 
        {
            if (obj[key]) 
            {
                return obj[key];
            }
            return defVal;
        }
        //TODO
        public static CallClassMethod(className: string, funName: string, data?: any) 
        {
            let thisClass = dc[className];
            let fun: Function = thisClass[funName];
            if (!data || !data.unshift) 
                return fun.call(thisClass, data);
            else 
                return fun.apply(thisClass, data);
        } 
	}
}