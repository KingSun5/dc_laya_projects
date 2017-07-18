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
        /** 插入元素
         * @param arr 需要操作的数组
         * @param value 需要插入的元素
         * @param index 插入位置
        */
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
        /**移除所有值等于v的元素*/
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
        /**
         * 排序
         * @param arr 需要排序的数组
         * @param key 排序字段
         * @param order 排序方式
        */
        ArrayUtils.Sort = function (arr, key, order) {
            if (order === void 0) { order = dc.eArraySortOrder.DESCENDING; }
            if (arr == null)
                return;
            arr.sort(function (info1, info2) {
                switch (order) {
                    case dc.eArraySortOrder.ASCENDING:
                        {
                            if (info1[key] < info2[key])
                                return -1;
                            if (info1[key] > info2[key])
                                return 1;
                            else
                                return 0;
                        }
                    case dc.eArraySortOrder.DESCENDING:
                        {
                            if (info1[key] > info2[key])
                                return -1;
                            if (info1[key] < info2[key])
                                return 1;
                            else
                                return 0;
                        }
                }
            });
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
        ArrayUtils.IsEmpty = function (arr) {
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