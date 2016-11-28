var wd3;
(function (wd3) {
    var Heatmap = (function () {
        function Heatmap(tankClassName, screenshotUrl, positionData, opts) {
            var _this = this;
            if (opts === void 0) { opts = { screenshotAlpha: 0.6, heatmapAlpha: 0.6, colorScheme: 'simple' }; }
            this.tankClassName = tankClassName;
            this.positionData = positionData;
            this.background = new Image();
            this.init();
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
            // 创建高度数组
            var data, i, maxViews, position, value, views, viewsArray, _i, _j, _k, _l, _len, _len1, _m, _n, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _results1, _results2;
            function createHeightPixelArray() {
                var _results = [];
                for (var _i = 0, _ref = this.background.height; 0 <= _ref ? _i <= _ref : _i >= _ref; 0 <= _ref ? _i++ : _i--) {
                    _results.push(_i);
                }
                return _results;
            }
            this.plus = createHeightPixelArray.call(this).map(function () {
                return 0;
            });
            this.minus = createHeightPixelArray.call(this).map(function () {
                return 0;
            });
            for (_k = 0; _k < this.positionData.length; _k++) {
                data = this.positionData[_k];
                _ref3 = data.positions;
                for (_l = 0, _len1 = _ref3.length; _l < _len1; _l++) {
                    position = _ref3[_l];
                    ++this.plus[position];
                    ++this.minus[position + data.height];
                }
            }
            views = 0;
            maxViews = 0;
            viewsArray = [];
            for (i = _m = 0, _ref4 = this.background.height; 0 <= _ref4 ? _m <= _ref4 : _m >= _ref4; i = 0 <= _ref4 ? ++_m : --_m) {
                views += this.plus[i];
                views -= this.minus[i];
                viewsArray[i] = views;
                maxViews = Math.max(maxViews, views);
            }
            this.context.globalAlpha = 1.0;
            _results2 = [];
            for (i = _n = 0,
                _ref5 = this.background.height; 0 <= _ref5 ? _n <= _ref5 : _n >= _ref5; i = 0 <= _ref5 ? ++_n : --_n) {
                value = viewsArray[i] / maxViews;
                this.context.beginPath();
                this.context.moveTo(0, i);
                this.context.lineTo(this.background.width, i);
                this.context.lineWidth = 1;
                this.context.strokeStyle = this.calculateColor(value);
                _results2.push(this.context.stroke());
            }
            return _results2;
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
