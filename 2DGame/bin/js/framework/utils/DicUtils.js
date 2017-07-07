var dc;
(function (dc) {
    /**
     * 字典工具类
     * @author hannibal
     * @time 20174-7-6
     */
    var DicUtils = (function () {
        function DicUtils() {
        }
        /**
         * 键列表
         */
        DicUtils.GetKeys = function (d) {
            var a = [];
            for (var key in d) {
                a.push(key);
            }
            return a;
        };
        /**
         * 值列表
         */
        DicUtils.GetValues = function (d) {
            var a = [];
            for (var key in d) {
                a.push(d[key]);
            }
            return a;
        };
        /**
         * 清空字典
         */
        DicUtils.ClearDic = function (dic) {
            var v;
            for (var key in dic) {
                v = dic[key];
                if (v instanceof Object) {
                    DicUtils.ClearDic(v);
                }
                delete dic[key];
            }
        };
        /**
         * 全部应用
         */
        DicUtils.ApplyEach = function (dic, fun) {
            if (fun == null)
                return;
            for (var key in dic) {
                fun(dic[key]);
            }
        };
        DicUtils.IsEmpty = function (dic) {
            if (dic == null)
                return true;
            for (var key in dic) {
                return false;
            }
            return true;
        };
        DicUtils.GetLength = function (dic) {
            if (dic == null)
                return 0;
            var count = 0;
            for (var key in dic) {
                ++count;
            }
            return count;
        };
        return DicUtils;
    }());
    dc.DicUtils = DicUtils;
})(dc || (dc = {}));
//# sourceMappingURL=DicUtils.js.map