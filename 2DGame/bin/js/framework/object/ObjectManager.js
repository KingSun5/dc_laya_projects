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
     * 对象管理
     * @author hannibal
     * @time 2017-7-6
     */
    var ObjectManager = (function (_super) {
        __extends(ObjectManager, _super);
        function ObjectManager() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.m_shareObjID = 0;
            _this.m_DicObject = {};
            _this.m_DicServerObject = {};
            _this.m_ListReleaseObject = [];
            return _this;
        }
        Object.defineProperty(ObjectManager, "Instance", {
            get: function () {
                if (!this.instance)
                    this.instance = new ObjectManager();
                return this.instance;
            },
            enumerable: true,
            configurable: true
        });
        ObjectManager.prototype.Setup = function () {
        };
        ObjectManager.prototype.Destroy = function () {
            this.RemoveAll();
        };
        ObjectManager.prototype.Tick = function (elapse, game_frame) {
            for (var key in this.m_DicObject) {
                var obj = this.m_DicObject[key];
                if (obj != null && obj.Active && obj.Update(elapse, game_frame)) {
                }
                else {
                    this.m_ListReleaseObject.push(obj);
                }
            }
            this.ProcessReleaseObject();
        };
        /*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～对象集合～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
        /**移除对象*/
        ObjectManager.prototype.RemoveObject = function (obj, force) {
            if (obj == null)
                return;
            if (force) {
                this.ReleaseObject(obj);
            }
            else {
                obj.SetActive(false);
            }
        };
        /**移除所有对象*/
        ObjectManager.prototype.RemoveAll = function () {
            for (var key in this.m_DicObject) {
                this.ReleaseObject(this.m_DicObject[key]);
            }
            this.m_ListReleaseObject.length = 0;
        };
        /**释放对象*/
        ObjectManager.prototype.ReleaseObject = function (obj) {
            if (obj == null)
                return;
            this.DetachObject(obj);
            obj.Destroy();
            obj = null;
        };
        /**加入对象管理器*/
        ObjectManager.prototype.AttachObject = function (obj) {
            if (obj == null)
                return;
            if (this.m_DicObject[obj.ObjectGUID] != null)
                return;
            this.m_DicObject[obj.ObjectGUID] = obj;
            if (obj.ObjectServerID != "") {
                this.m_DicServerObject[obj.ObjectServerID] = obj;
            }
        };
        ObjectManager.prototype.DetachObject = function (obj) {
            if (obj == null)
                return;
            if (this.m_DicObject[obj.ObjectGUID] != null)
                delete this.m_DicObject[obj.ObjectGUID];
            if (this.m_DicServerObject[obj.ObjectServerID] != null)
                delete this.m_DicServerObject[obj.ObjectServerID];
        };
        ObjectManager.prototype.ProcessReleaseObject = function () {
            if (this.m_ListReleaseObject.length == 0)
                return;
            for (var _i = 0, _a = this.m_ListReleaseObject; _i < _a.length; _i++) {
                var obj = _a[_i];
                this.ReleaseObject(obj);
            }
            this.m_ListReleaseObject.length = 0;
        };
        /*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～get/set～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
        ObjectManager.prototype.GetObjectByID = function (id) {
            return this.m_DicObject[id];
        };
        ObjectManager.prototype.GetServerObjectByID = function (id) {
            return this.m_DicServerObject[id];
        };
        ObjectManager.prototype.ShareObjectGUID = function () {
            return ++this.m_shareObjID;
        };
        ObjectManager.instance = null;
        return ObjectManager;
    }(dc.Singleton));
    dc.ObjectManager = ObjectManager;
})(dc || (dc = {}));
//# sourceMappingURL=ObjectManager.js.map