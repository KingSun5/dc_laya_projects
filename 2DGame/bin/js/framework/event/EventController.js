var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var dc;
(function (dc) {
    /**
     * 全局事件
     * @author hannibal
     * @time 20174-7-6
     */
    var EventController = (function (_super) {
        __extends(EventController, _super);
        function EventController() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.m_Event = new dc.EventDispatcher();
            _this.m_EvtArgs = new dc.EventArgs();
            return _this;
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
        EventController.prototype.AddEventListener = function (type, fun) {
            this.m_Event.AddEventListener(type, fun);
        };
        EventController.prototype.RemoveEventListener = function (type, fun) {
            this.m_Event.RemoveEventListener(type, fun);
        };
        EventController.prototype.TriggerEvent = function (type) {
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
    }(dc.Singleton));
    EventController.instance = null;
    dc.EventController = EventController;
})(dc || (dc = {}));
//# sourceMappingURL=EventController.js.map