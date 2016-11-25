namespace wd3.heatmap {

    interface opts {
        screenshotAlpha: number;
        heatmapAlpha: number;
        colorScheme: string;
    }

    interface IData {
        height: number;
        positions: Array<number>;
    }

    interface IHeatmap {
        fiveColorGradient(value: number): string;
        simpleRedGradient(value: number): string;
    }

    export class Heatmap implements IHeatmap {
        public screenshotOpacity: number;
        public heatmapOpacity: number;
        public calculateColor;
        public background: HTMLImageElement = new Image();
        public canvas: HTMLCanvasElement;
        public context: CanvasRenderingContext2D;
        public data: IData;
        public plus: any;


        init() {
            this.canvas = document.createElement("canvas");
            this.context = this.canvas.getContext('2d');
            this.context.globalAlpha = this.screenshotOpacity;

            document.getElementsByClassName(this.tankClassName)[0].appendChild(this.canvas);

        }

        constructor(private tankClassName: string,
            screenshotUrl: string,
            private positionData: IData[],
            opts: opts = { screenshotAlpha: 0.6, heatmapAlpha: 0.6, colorScheme: 'simple' }) {
            this.init();
            this.screenshotOpacity = opts.screenshotAlpha;
            this.heatmapOpacity = opts.heatmapAlpha;
            this.calculateColor = opts.colorScheme == 'simple' ? this.fiveColorGradient : this.simpleRedGradient;
            this.background.src = screenshotUrl;
            this.background.onload = () => {
                // this.context.drawImage(this.background, 0, 0);
                // this.compute();
            }
            this.background.onerror = () => {
                console.log('image error');
            }
        }

        // 
        compute() {
            // 创建高度数组
            var results = [], _ref;
            for (var i = 0; _ref = parseInt(this.background.height + ''); 0 <= _ref ? i < _ref : i >= _ref;0 <= _ref ? i++ : i--){
                results.push(i);
            }
            this.plus = results.map(function() {
                return 0;
            })
        }

        fiveColorGradient(value: number): string {
            var h;
            h = (1.0 - value) * 240;
            return "hsla(" + h + ",100%,50%," + this.heatmapOpacity + ")";

        }
        simpleRedGradient(value: number): string {
            return "rgba(255,0,0," + value * this.heatmapOpacity + ")";
        }

    }

}