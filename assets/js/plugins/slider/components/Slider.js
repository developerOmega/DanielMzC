"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var SliderComponent_1 = __importDefault(require("./SliderComponent"));
var Slider = (function (_super) {
    __extends(Slider, _super);
    function Slider(html, data) {
        var _this = _super.call(this, html, data) || this;
        _this.url = document.createElement('div');
        _this.image = document.createElement('img');
        _this.description = document.createElement('div');
        return _this;
    }
    Slider.prototype.active = function (time) {
        var _this = this;
        this.activeTransition(time, function (inSection, afterSection) {
            _this.url = inSection.children[1].children[1];
            _this.image = inSection.children[0];
            _this.description = inSection.children[1].children[0];
            _this.activateClass(_this.url, _this.__node.back.data.url == "" ? "btn b-red difum" : "btn b-red difum blur");
            setTimeout(function () { return _this.changeData(inSection, afterSection); }, 2000);
            setTimeout(function () { return _this.activateClass(inSection, "cont"); }, 3000);
        });
    };
    Slider.prototype.changeData = function (inSection, afterSection) {
        this.image.setAttribute('src', this.__node.data.img);
        this.description.innerHTML = this.__node.data.description;
        this.url.setAttribute('href', this.__node.data.url);
        if (this.__node.data.url != "") {
            this.activateClass(this.url, "btn b-red focus");
        }
        this.__html.removeChild(afterSection);
    };
    return Slider;
}(SliderComponent_1.default));
exports.default = Slider;
//# sourceMappingURL=Slider.js.map