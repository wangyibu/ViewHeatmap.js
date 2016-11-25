var wd3;
(function (wd3) {
    var heatmap;
    (function (heatmap) {
        var Heatmap = (function () {
            function Heatmap(tankClassName, screenshotUrl, positionData, opts) {
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
                    // this.context.drawImage(this.background, 0, 0);
                    // this.compute();
                };
                this.background.onerror = function () {
                    console.log('image error');
                };
            }
            Heatmap.prototype.init = function () {
                this.canvas = document.createElement("canvas");
                this.context = this.canvas.getContext('2d');
                this.context.globalAlpha = this.screenshotOpacity;
                document.getElementsByClassName(this.tankClassName)[0].appendChild(this.canvas);
            };
            // 
            Heatmap.prototype.compute = function () {
                // 创建高度数组
                var results = [], _ref;
                for (var i = 0; _ref = parseInt(this.background.height + ''); 0 <= _ref ? i < _ref : i >= _ref)
                    ;
                0 <= _ref ? i++ : i--;
                {
                    results.push(i);
                }
                this.plus = results.map(function () {
                    return 0;
                });
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
        heatmap.Heatmap = Heatmap;
    })(heatmap = wd3.heatmap || (wd3.heatmap = {}));
})(wd3 || (wd3 = {}));
