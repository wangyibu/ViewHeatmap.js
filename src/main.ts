interface opts {
    screenshotAlpha: number;
    heatmapAlpha: number;
    colorScheme: string;
}

class heatmap {
    public target
    public screenshotOpacity = 0.6;
    public heatmapOpacity = 0.6
    public calculateColor
    public simpleRedGradient
    public fiveColorGradient

    constructor(targetId: string, screenshotUrl, positionData,
        opts: opts = { screenshotAlpha: 0, heatmapAlpha: 0, colorScheme: 'simple' }) {
        this.target = document.getElementById(targetId);
        this.screenshotOpacity = opts.screenshotAlpha;
        this.heatmapOpacity = opts.heatmapAlpha;
        this.calculateColor = opts.colorScheme == 'simple' ?  this.fiveColorGradient:this.simpleRedGradient;

    }

}