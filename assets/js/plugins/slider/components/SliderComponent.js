"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SliderComponent = (function () {
    function SliderComponent(html, data) {
        var _this = this;
        this.__node = null;
        this.first = null;
        this.__data = data;
        this.__html = html;
        this.__data.forEach(function (dataFile) {
            _this.addNode(dataFile);
        });
    }
    SliderComponent.prototype.addNode = function (data) {
        var newNode = { data: data, next: this.__node, back: this.__node };
        newNode.data = data;
        if (this.__node == null && this.first == null) {
            this.__node = this.first = newNode;
        }
        else {
            this.first.back = this.__node.next = newNode;
        }
        newNode.back = this.__node;
        newNode.next = this.first;
        this.__node = newNode;
    };
    Object.defineProperty(SliderComponent.prototype, "html", {
        get: function () {
            return this.__html;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "data", {
        get: function () {
            return this.__data;
        },
        enumerable: false,
        configurable: true
    });
    SliderComponent.prototype.setData = function (file) {
        this.__data.push(file);
        this.addNode(file);
    };
    SliderComponent.prototype.activeTransition = function (time, callback) {
        var _this = this;
        this.__node = this.__node.next;
        var inSection = this.createSection(this.__node.data.img, function (html) { return _this.createInfoTag(html); });
        this.__html.appendChild(inSection);
        setInterval(function () {
            _this.__node = _this.__node.next;
            var afterSection = _this.createSection(_this.__node.data.img);
            _this.__html.appendChild(afterSection);
            _this.activateClass(inSection, "cont in");
            _this.activateClass(afterSection, "cont after");
            callback(inSection, afterSection);
        }, time);
    };
    SliderComponent.prototype.createInfoTag = function (html) {
        var infoDiv = document.createElement("div");
        infoDiv.className = 'info';
        infoDiv.innerHTML = "\n      <p> " + this.__node.data.description + " </p>\n      <a class='" + (this.__node.data.url == "" ? "btn b-red difum" : "btn b-red") + "' href='" + this.__node.data.url + "'> Ver mas </a>\n    ";
        html.appendChild(infoDiv);
    };
    SliderComponent.prototype.createSection = function (img, callback) {
        var section = document.createElement('div');
        var imgTag = document.createElement('img');
        imgTag.setAttribute('src', img);
        imgTag.className = "img";
        section.appendChild(imgTag);
        if (callback) {
            callback(section);
        }
        return section;
    };
    SliderComponent.prototype.activateClass = function (tag, className) {
        tag.className = className;
    };
    return SliderComponent;
}());
exports.default = SliderComponent;
//# sourceMappingURL=SliderComponent.js.map