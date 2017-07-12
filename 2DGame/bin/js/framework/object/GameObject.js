let dc;
(function (dc) {
    /**
     * 游戏对象基类
     * @author hannibal
     * @time 20174-7-6
     */
    let GameObject = (function () {
        function GameObject() {
            this.m_Active = true;
            this.m_ObjectGUID = 0;
            this.m_ObjectServerID = "";
        }
        GameObject.prototype.Init = function () {
        };
        GameObject.prototype.Setup = function (info) {
        };
        GameObject.prototype.Destroy = function () {
        };
        GameObject.prototype.Update = function (elapse, game_frame) {
            return true;
        };
        Object.defineProperty(GameObject.prototype, "Active", {
            get: function () {
                return this.m_Active;
            },
            set: function (b) {
                this.m_Active = b;
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
            enumerable: true,
            configurable: true
        });
        return GameObject;
    }());
    dc.GameObject = GameObject;
})(dc || (dc = {}));
//# sourceMappingURL=GameObject.js.map