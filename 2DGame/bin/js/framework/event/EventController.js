var dc;
(function (dc) {
    /**
     * 全局事件
     * @author hannibal
     * @time 20174-7-6
     */
    var EventController = (function () {
        function EventController() {
            this.m_Event = new dc.EventDispatcher();
            this.m_EvtArgs = new dc.EventArgs();
        }
        Object.defineProperty(EventController, "Instance", {
            get: function () {
                if (!this.instance)
                    this.instance = new EventController();
                return this.instance;
            },
            enumerable: true,
            configurable: true
        });
        EventController.prototype.AddEventListener = function (type, context, fun) {
            this.m_Event.AddEventListener(type, context, fun);
        };
        EventController.prototype.RemoveEventListener = function (type, context, fun) {
            this.m_Event.RemoveEventListener(type, context, fun);
        };
        EventController.prototype.Trigger = function (type) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            this.m_EvtArgs.Init(args);
            this.m_Event.TriggerEvent(type, this.m_EvtArgs);
        };
        EventController.prototype.Clear = function () {
            this.m_Event.Clear();
        };
        return EventController;
    }());
    EventController.instance = null;
    dc.EventController = EventController;
})(dc || (dc = {}));
//# sourceMappingURL=EventController.js.map