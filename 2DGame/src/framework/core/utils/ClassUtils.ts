module dc
{
    /**
     * 工具类
     * @author hannibal
     * @time 20174-7-11
     */
	export class ClassUtils
	{
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