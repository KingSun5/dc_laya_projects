let dc;
(function (dc) {
    /**
     * 字典-键为number
     * TODO:Object的键不支持泛型
     * @author hannibal
     * @time 2017-7-6
     */
    let NDictionary = (function () {
        function NDictionary() {
            this.m_Dic = {};
        }
        NDictionary.prototype.Add = function (key, value) {
            this.m_Dic[key] = value;
        };
        NDictionary.prototype.Remove = function (key) {
            Laya.MathUtil.lerp;
            delete this.m_Dic[key];
        };
        NDictionary.prototype.ContainsKey = function (key) {
            return (this.m_Dic[key] != null ? true : false);
        };
        NDictionary.prototype.GetValue = function (key) {
            return this.m_Dic[key];
        };
        NDictionary.prototype.Clear = function () {
            for (let key in this.m_Dic) {
                delete this.m_Dic[key];
            }
        };
        return NDictionary;
    }());
    dc.NDictionary = NDictionary;
    /**
     * 字典-键为string
     * @author hannibal
     * @time 2017-7-6
     */
    let SDictionary = (function () {
        function SDictionary() {
            this.m_Dic = {};
        }
        SDictionary.prototype.Add = function (key, value) {
            this.m_Dic[key] = value;
        };
        SDictionary.prototype.Remove = function (key) {
            delete this.m_Dic[key];
        };
        SDictionary.prototype.ContainsKey = function (key) {
            return (this.m_Dic[key] != null ? true : false);
        };
        SDictionary.prototype.GetValue = function (key) {
            return this.m_Dic[key];
        };
        SDictionary.prototype.Clear = function () {
            for (let key in this.m_Dic) {
                delete this.m_Dic[key];
            }
        };
        return SDictionary;
    }());
    dc.SDictionary = SDictionary;
})(dc || (dc = {}));
//# sourceMappingURL=Dictionary.js.map