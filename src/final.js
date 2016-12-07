var wd3;
(function (wd3) {
    (function (EPixel) {
        EPixel[EPixel["rowPx"] = 0] = "rowPx";
        EPixel[EPixel["times"] = 1] = "times";
        EPixel[EPixel["timeInterval"] = 2] = "timeInterval";
    })(wd3.EPixel || (wd3.EPixel = {}));
    var EPixel = wd3.EPixel;
    var Heatmap = (function () {
        function Heatmap(tankClassName, screenshotUrl, positionData, opts) {
            var _this = this;
            if (opts === void 0) { opts = { screenshotAlpha: 0.6, heatmapAlpha: 0.6, colorScheme: 'simple' }; }
            this.tankClassName = tankClassName;
            this.background = new Image();
            this.init();
            this.positionData = positionData;
            this.screenshotOpacity = opts.screenshotAlpha;
            this.heatmapOpacity = opts.heatmapAlpha;
            this.calculateColor = opts.colorScheme == 'simple' ? this.fiveColorGradient : this.simpleRedGradient;
            this.background.src = screenshotUrl;
            this.background.onload = function () {
                _this.canvas.width = _this.background.width;
                _this.canvas.height = _this.background.height;
                _this.canvas.style.width = _this.background.width + 'px';
                _this.canvas.style.height = _this.background.height + 'px';
                _this.canvas.style.position = 'absolute';
                _this.canvas.style.top = "0";
                _this.canvas.style.left = "0";
                // this.context.drawImage(this.background, 0, 0);
                _this.compute();
            };
            this.background.onerror = function () {
                console.log('image error');
            };
        }
        Heatmap.prototype.init = function () {
            this.canvas = document.createElement("canvas");
            this.context = this.canvas.getContext('2d');
            this.context.globalAlpha = this.screenshotOpacity;
            this.heatmapContainer = document.getElementsByClassName(this.tankClassName).item(0);
            this.heatmapContainer.style.position = 'relative';
            this.heatmapContainer.style.width = "100%";
            this.heatmapContainer.style.height = "100%";
            this.heatmapContainer.appendChild(this.canvas);
        };
        // 
        Heatmap.prototype.compute = function () {
            // // 创建高度数组
            // var data, i, maxViews, position, value, views, viewsArray,
            //     _i, _j, _k, _l, _len, _len1, _m, _n,
            //     _ref, _ref2, _ref3, _ref4, _ref5;
            var _this = this;
            // views = 0;
            // maxViews = 0;
            // viewsArray = [];
            // for (i = _m = 0, _ref4 = this.positionData[this.positionData.length - 1][EPixel.rowPx]; 0 <= _ref4 ? _m <= _ref4 : _m >= _ref4; i = 0 <= _ref4 ? ++_m : --_m) {
            //     views += this.plus[i];
            //     views -= this.minus[i];
            //     viewsArray[i] = views;
            //     maxViews = Math.max(maxViews, views);
            // }
            // this.context.globalAlpha = 1.0;
            // for (i = _n = 0, _ref5 = this.background.height; 0 <= _ref5 ? _n <= _ref5 : _n >= _ref5; i = 0 <= _ref5 ? ++_n : --_n) {
            // value = viewsArray[i] / maxViews;
            d3.json("../example/data.json", function (data) {
                var maxHeight = 0;
                var maxTimes = 0;
                var maxTimeIntervale = 0;
                data.forEach(function (value, index) {
                    if (maxHeight < value[EPixel.rowPx]) {
                        maxHeight = value[EPixel.rowPx];
                    }
                    if (maxTimes < value[EPixel.times]) {
                        maxTimes = value[EPixel.times];
                    }
                    if (maxTimeIntervale < value[EPixel.timeInterval]) {
                        maxTimeIntervale = value[EPixel.timeInterval];
                    }
                });
                var gradient = _this.context.createLinearGradient(0, 0, _this.background.width, _this.background.height);
                for (var i = 0; i < maxHeight; i++) {
                    var value = data[i][EPixel.timeInterval] / maxTimeIntervale;
                    // this.context.beginPath();
                    // this.context.moveTo(0, i);
                    // this.context.lineTo(this.background.width, i);
                    // this.context.lineWidth = 1;
                    // this.context.strokeStyle = this.calculateColor(value);
                    // this.context.stroke();
                    gradient.addColorStop(value, _this.calculateColor(value));
                }
                _this.context.fillStyle = gradient;
                _this.context.fillRect(0, 0, _this.background.width, _this.background.height);
            });
            // }
            // console.log(viewsArray);
            // console.log(maxViews);
            // console.log(views);
        };
        Heatmap.prototype.fiveColorGradient = function (value) {
            var h;
            h = (1.0 - value) * 240;
            return "hsla(" + h + ",100%,50%," + this.heatmapOpacity + ")";
        };
        Heatmap.prototype.simpleRedGradient = function (value) {
            return "rgba(255,0,0," + value * this.heatmapOpacity + ")";
        };
        return Heatmap;
    }());
    wd3.Heatmap = Heatmap;
})(wd3 || (wd3 = {}));
//# sourceMappingURL=final.js.map