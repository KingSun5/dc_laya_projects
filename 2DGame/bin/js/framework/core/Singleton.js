var dc;
(function (dc) {
    /**
     * 单列
     * @author hannibal
     * @time 2017-7-6
     */
    var Singleton = (function () {
        function Singleton() {
            var clazz = this["constructor"];
            //为空时，表示浏览器不支持这样读取构造函数
            if (!clazz) {
                dc.Log.Warning("浏览器不支持读取构造函数");
                return;
            }
            // 防止重复实例化
            if (Singleton.classKeys.indexOf(clazz) != -1)
                throw new Error(this + " 只允许实例化一次！");
            else {
                Singleton.classKeys.push(clazz);
                Singleton.classValues.push(this);
            }
        }
        Singleton.classKeys = [];
        Singleton.classValues = [];
        return Singleton;
    }());
    dc.Singleton = Singleton;
})(dc || (dc = {}));
//# sourceMappingURL=Singleton.js.map