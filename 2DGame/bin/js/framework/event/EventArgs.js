var dc;
(function (dc) {
    /**
     * 事件参数
     * @author hannibal
     * @time 20174-7-6
     */
    var EventArgs = (function () {
        function EventArgs() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.m_Type = "";
            this.m_data = null;
            if (args.length == 0)
                return;
            if (args instanceof Array)
                this.m_data = dc.ArrayUtils.Copy(args[0]);
            else
                this.m_data = dc.ArrayUtils.Copy(args);
        }
        EventArgs.prototype.Init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (args.length == 0)
                return;
            if (args instanceof Array)
                this.m_data = dc.ArrayUtils.Copy(args[0]);
            else
                this.m_data = dc.ArrayUtils.Copy(args);
        };
        EventArgs.prototype.Get = function (index) {
            if (this.m_data.length == 0)
                return null;
            if (index < 0 || index >= this.m_data.length)
                return null;
            return this.m_data[index];
        };
        Object.defineProperty(EventArgs.prototype, "Type", {
            get: function () {
                return this.m_Type;
            },
            set: function (t) {
                this.m_Type = t;
            },
            enumerable: true,
            configurable: true
        });
        return EventArgs;
    }());
    dc.EventArgs = EventArgs;
})(dc || (dc = {}));
//# sourceMappingURL=EventArgs.js.map