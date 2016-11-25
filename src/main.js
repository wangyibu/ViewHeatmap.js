var heatmap = (function () {
    function heatmap(targetId, screenshotUrl, positionData, opts) {
        if (opts === void 0) { opts = { screenshotAlpha: 0, heatmapAlpha: 0, colorScheme: 'simple' }; }
        this.screenshotOpacity = 0.6;
        this.heatmapOpacity = 0.6;
        this.target = document.getElementById(targetId);
        this.screenshotOpacity = opts.screenshotAlpha;
        this.heatmapOpacity = opts.heatmapAlpha;
        this.calculateColor = opts.colorScheme == 'simple' ? this.fiveColorGradient : this.simpleRedGradient;
    }
    return heatmap;
}());
