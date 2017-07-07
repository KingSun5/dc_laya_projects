var dc;
(function (dc) {
    /**
     * 事件
     * @author hannibal
     * @time 20174-7-6
     */
    var EventDispatcher = (function () {
        function EventDispatcher() {
            this.m_DicFuns = {};
        }
        EventDispatcher.prototype.AddEventListener = function (type, fun) {
            if (this.m_DicFuns[type] == null)
                this.m_DicFuns[type] = [];
            if (dc.ArrayUtils.ContainsValue(this.m_DicFuns[type], fun) == false)
                this.m_DicFuns[type].push(fun);
        };
        EventDispatcher.prototype.RemoveEventListener = function (type, fun) {
            var arr = this.m_DicFuns[type];
            if (arr == null)
                return;
            dc.ArrayUtils.RemoveValue(arr, fun);
        };
        EventDispatcher.prototype.TriggerEvent = function (type, args) {
            args.Type = type;
            var arr = this.m_DicFuns[type];
            if (arr == null)
                return;
            for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                var fun = arr_1[_i];
                fun.call(type, args);
            }
        };
        EventDispatcher.prototype.Clear = function () {
            dc.DicUtils.ClearDic(this.m_DicFuns);
        };
        return EventDispatcher;
    }());
    dc.EventDispatcher = EventDispatcher;
})(dc || (dc = {}));
//# sourceMappingURL=EventDispatcher.js.map