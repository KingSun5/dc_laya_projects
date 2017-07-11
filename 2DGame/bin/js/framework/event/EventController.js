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
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EventController.AddEventListener = function (type, context, fun) {
            this.m_Event.AddEventListener(type, context, fun);
        };
        EventController.RemoveEventListener = function (type, context, fun) {
            this.m_Event.RemoveEventListener(type, context, fun);
        };
        EventController.DispatchEvent = function (type) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            this.m_EvtArgs.Init(args);
            this.m_Event.DispatchEvent(type, this.m_EvtArgs);
        };
        EventController.Clear = function () {
            this.m_Event.Clear();
        };
        return EventController;
    }(dc.Singleton));
    EventController.m_Event = new dc.EventDispatcher();
    EventController.m_EvtArgs = new dc.EventArgs();
    dc.EventController = EventController;
})(dc || (dc = {}));
//# sourceMappingURL=EventController.js.map