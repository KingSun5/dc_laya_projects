var dc;
(function (dc) {
    /**
     * 游戏对象基类
     * @author hannibal
     * @time 2017-7-6
     */
    var GameObject // extends DCObject
     = (function () {
        function GameObject() {
            this.m_Observer = null;
            //super();
            this.m_ObjectGUID = 0;
            this.m_Observer = new dc.EventDispatcher();
        }
        GameObject.prototype.Init = function () {
            //super.Init();
            this.m_Active = true;
            this.m_ObjectType = "";
            this.m_ObjectServerID = "";
        };
        GameObject.prototype.Setup = function (info) {
            //super.Setup(info);
            this.RegisterEvent();
        };
        GameObject.prototype.Destroy = function () {
            this.m_Active = false;
            this.m_Observer.Clear();
            this.UnRegisterEvent();
            //super.Destroy();
        };
        GameObject.prototype.Update = function () {
            if (this.m_Active) {
                //super.Update();
            }
            return true;
        };
        /**注册事件*/
        GameObject.prototype.RegisterEvent = function () {
        };
        GameObject.prototype.UnRegisterEvent = function () {
        };
        GameObject.prototype.SetActive = function (b) {
            this.m_Active = b;
        };
        Object.defineProperty(GameObject.prototype, "Active", {
            //～～～～～～～～～～～～～～～～～～～～～～～get/set～～～～～～～～～～～～～～～～～～～～～～～//
            get: function () {
                return this.m_Active;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "ObjectGUID", {
            get: function () {
                return this.m_ObjectGUID;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "ObjectServerID", {
            get: function () {
                return this.m_ObjectServerID;
            },
            set: function (id) {
                this.m_ObjectServerID = id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "ObjectType", {
            get: function () {
                return this.m_ObjectType;
            },
            set: function (type) {
                this.ObjectType = type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "Observer", {
            get: function () {
                return this.m_Observer;
            },
            enumerable: true,
            configurable: true
        });
        return GameObject;
    }());
    dc.GameObject = GameObject;
})(dc || (dc = {}));
//# sourceMappingURL=GameObject.js.map