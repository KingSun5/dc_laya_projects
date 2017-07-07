var dc;
(function (dc) {
    var Log = (function () {
        function Log() {
        }
        Log.Debug = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.debug("[debug]", args.join(","));
        };
        Log.Info = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.info("[info]", args.join(","));
        };
        Log.Warning = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.warn("[warn]", args.join(","));
        };
        Log.Error = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.error("[error]", args.join(","));
        };
        Log.Exception = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.exception("[exce]", args.join(","));
        };
        return Log;
    }());
    dc.Log = Log;
})(dc || (dc = {}));
//# sourceMappingURL=Log.js.map