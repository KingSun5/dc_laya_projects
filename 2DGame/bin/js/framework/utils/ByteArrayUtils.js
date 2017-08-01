var dc;
(function (dc) {
    /**
     * 字节工具类
     * @author hannibal
     * @time 2017-7-7
     */
    var ByteArrayUtils = (function () {
        function ByteArrayUtils() {
        }
        ByteArrayUtils.CreateSocketByte = function () {
            var by = new LayaByte();
            by.writeUint16(0);
            return by;
        };
        return ByteArrayUtils;
    }());
    dc.ByteArrayUtils = ByteArrayUtils;
})(dc || (dc = {}));
//# sourceMappingURL=ByteArrayUtils.js.map