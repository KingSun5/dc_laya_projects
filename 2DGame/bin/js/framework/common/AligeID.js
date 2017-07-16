var dc;
(function (dc) {
    ///对齐方式
    var eAligeType;
    (function (eAligeType) {
        eAligeType[eAligeType["NONE"] = 0] = "NONE";
        eAligeType[eAligeType["RIGHT"] = 1] = "RIGHT";
        eAligeType[eAligeType["RIGHT_BOTTOM"] = 2] = "RIGHT_BOTTOM";
        eAligeType[eAligeType["BOTTOM"] = 3] = "BOTTOM";
        eAligeType[eAligeType["LEFT_BOTTOM"] = 4] = "LEFT_BOTTOM";
        eAligeType[eAligeType["LEFT"] = 5] = "LEFT";
        eAligeType[eAligeType["LEFT_TOP"] = 6] = "LEFT_TOP";
        eAligeType[eAligeType["TOP"] = 7] = "TOP";
        eAligeType[eAligeType["RIGHT_TOP"] = 8] = "RIGHT_TOP";
        eAligeType[eAligeType["MID"] = 9] = "MID";
    })(eAligeType = dc.eAligeType || (dc.eAligeType = {}));
    ///水平方向
    var eHAligeType;
    (function (eHAligeType) {
        eHAligeType[eHAligeType["LEFT"] = 0] = "LEFT";
        eHAligeType[eHAligeType["CENTER"] = 1] = "CENTER";
        eHAligeType[eHAligeType["RIGHT"] = 2] = "RIGHT";
    })(eHAligeType = dc.eHAligeType || (dc.eHAligeType = {}));
    ///垂直方向
    var eVAligeType;
    (function (eVAligeType) {
        eVAligeType[eVAligeType["UP"] = 0] = "UP";
        eVAligeType[eVAligeType["MID"] = 1] = "MID";
        eVAligeType[eVAligeType["DOWN"] = 2] = "DOWN";
    })(eVAligeType = dc.eVAligeType || (dc.eVAligeType = {}));
})(dc || (dc = {}));
//# sourceMappingURL=AligeID.js.map