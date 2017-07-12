let dc;
(function (dc) {
    /**
     * 栈：后入先出
     * @author hannibal
     * @time 20174-7-6
     */
    let Stack = (function () {
        function Stack() {
            this.m_List = [];
        }
        /**添加数据*/
        Stack.prototype.Push = function (item) {
            this.m_List.push(item);
        };
        /**获取栈顶元素，并删除*/
        Stack.prototype.Pop = function () {
            return this.m_List.pop();
        };
        /**获取栈顶元素，并不删除*/
        Stack.prototype.Peek = function () {
            if (this.m_List.length == 0)
                return null;
            return this.m_List[this.m_List.length - 1];
        };
        /**转换成标准数组*/
        Stack.prototype.ToArray = function () {
            return this.m_List.slice(0, this.m_List.length);
        };
        /**是否包含指定元素*/
        Stack.prototype.Contains = function (item) {
            return (this.m_List.indexOf(item, 0) == -1 ? false : true);
        };
        /**清空*/
        Stack.prototype.Clear = function () {
            this.m_List.length = 0;
        };
        Stack.prototype.Size = function () {
            return this.m_List.length;
        };
        return Stack;
    }());
    dc.Stack = Stack;
})(dc || (dc = {}));
//# sourceMappingURL=Stack.js.map