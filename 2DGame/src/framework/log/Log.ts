module dc
{
    export class Log
    {
        public static Debug(...args:string[])
        {
            console.debug("debug", args.join(","));
        }
        public static Info(...args:string[])
        {
            console.info("info", args.join(","));
        }
        public static Warning(...args:string[])
        {
            console.warn("warn", args.join(","));
        }
        public static Error(...args:string[])
        {
            console.error("error", args.join(","));
        }
        public static Exception(...args:string[])
        {
            console.exception("exce", args.join(","));
        }
    }
}
    