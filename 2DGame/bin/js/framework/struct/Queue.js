let dc;
(function (dc) {
    /**
     * 队列：先入先出
     * @author hannibal
     * @time 20174-7-6
     */
    let Queue = (function () {
        function Queue() {
            this.m_List = [];
        }
        /**添加到队列尾*/
        Queue.prototype.Enqueue = function (item) {
            this.m_List.push(item);
        };
        /**获取队列头，并删除*/
        Queue.prototype.Dequeue = function () {
            return this.m_List.shift();
        };
        /**获取队列头，并不删除*/
        Queue.prototype.Peek = function () {
            if (this.m_List.length == 0)
                return null;
            return this.m_List[0];
        };
        /**转换成标准数组*/
        Queue.prototype.ToArray = function () {
            return this.m_List.slice(0, this.m_List.length);
        };
        /**是否包含指定元素*/
        Queue.prototype.Contains = function (item) {
            return (this.m_List.indexOf(item, 0) == -1 ? false : true);
        };
        /**清空*/
        Queue.prototype.Clear = function () {
            this.m_List.length = 0;
        };
        Queue.prototype.Size = function () {
            return this.m_List.length;
        };
        return Queue;
    }());
    dc.Queue = Queue;
})(dc || (dc = {}));
//# sourceMappingURL=Queue.js.map