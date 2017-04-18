"use strict";
exports.__esModule = true;
var BaseAppender = (function () {
    function BaseAppender() {
    }
    BaseAppender.prototype.setLayout = function (layout) {
        this.layout = layout;
    };
    BaseAppender.prototype.setLayoutFunction = function (layout) {
        this.layout = {
            format: layout
        };
    };
    return BaseAppender;
}());
exports["default"] = BaseAppender;
