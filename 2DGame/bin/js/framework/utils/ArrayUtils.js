var dc;
(function (dc) {
    /**
     * 数组工具类
     * @author hannibal
     * @time 20174-7-6
     */
    var ArrayUtils = (function () {
        function ArrayUtils() {
        }
        /**插入*/
        ArrayUtils.Insert = function (arr, value, index) {
            if (index > arr.length - 1) {
                arr.push(value);
            }
            else {
                arr.splice(index, 0, value);
            }
        };
        /**从数组移除元素*/
        ArrayUtils.RemoveValue = function (arr, v) {
            var i = arr.indexOf(v);
            if (i != -1) {
                arr.splice(i, 1);
            }
        };
        /**移除所有*/
        ArrayUtils.RemoveAllValue = function (arr, v) {
            var i = arr.indexOf(v);
            while (i >= 0) {
                arr.splice(i, 1);
                i = arr.indexOf(v);
            }
        };
        /**包含元素*/
        ArrayUtils.ContainsValue = function (arr, v) {
            return arr.length > 0 ? arr.indexOf(v) != -1 : false;
        };
        /**复制*/
        ArrayUtils.Copy = function (arr) {
            return arr.slice();
        };
        /**清空数组*/
        ArrayUtils.Clear = function (arr) {
            var i = 0;
            var len = arr.length;
            for (; i < len; ++i) {
                arr[i] = null;
            }
            arr.splice(0);
        };
        /**数据是否为空*/
        ArrayUtils.isArrayEmpty = function (arr) {
            if (arr == null || arr.length == 0) {
                return true;
            }
            return false;
        };
        return ArrayUtils;
    }());
    dc.ArrayUtils = ArrayUtils;
})(dc || (dc = {}));
//# sourceMappingURL=ArrayUtils.js.map