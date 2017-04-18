"use strict";
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
exports.__esModule = true;
var BaseAppender_1 = require("./BaseAppender");
var utils = require("../Utils");
var DOMAppender = (function (_super) {
    __extends(DOMAppender, _super);
    function DOMAppender(id, escape_html, buffer_size) {
        if (escape_html === void 0) { escape_html = false; }
        if (buffer_size === void 0) { buffer_size = 0; }
        var _this = _super.call(this) || this;
        _this.escape_html = escape_html;
        _this.buffer_size = buffer_size;
        _this.buffer = [];
        _this.el = document.getElementById(id);
        return _this;
    }
    DOMAppender.prototype.append = function (entry) {
        if (!this.el)
            return;
        var log = this.layout.format(entry);
        this.buffer.push((this.escape_html ? utils.escapeHtml(log) : log));
        if (this.buffer_size && this.buffer.length > this.buffer_size) {
            this.buffer.shift();
        }
        this.el.innerHTML = this.buffer.join('<br/>');
    };
    DOMAppender.prototype.clear = function () {
        this.el.innerHTML = '';
        this.buffer = [];
    };
    return DOMAppender;
}(BaseAppender_1["default"]));
exports["default"] = DOMAppender;
