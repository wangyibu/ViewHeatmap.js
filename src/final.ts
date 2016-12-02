/// <reference path="../typings/index.d.ts" />


namespace wd3 {

    interface opts {
        screenshotAlpha: number;
        heatmapAlpha: number;
        colorScheme: string;
    }

    export enum EPixel {
        rowPx,
        times,
        timeInterval
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
        public minus: any;
        public heatmapContainer: HTMLElement;
        private positionData: Array<[number, number, number]>;


        init() {
            this.canvas = document.createElement("canvas");
            this.context = this.canvas.getContext('2d');
            this.context.globalAlpha = this.screenshotOpacity;
            this.heatmapContainer = <HTMLElement>document.getElementsByClassName(this.tankClassName).item(0);
            this.heatmapContainer.style.position = 'relative';
            this.heatmapContainer.style.width = "100%";
            this.heatmapContainer.style.height = "100%";
            this.heatmapContainer.appendChild(this.canvas);

        }

        constructor(private tankClassName: string,
            screenshotUrl: string,
            positionData: Array<[number, number, number]>,
            opts: opts = { screenshotAlpha: 0.6, heatmapAlpha: 0.6, colorScheme: 'simple' }) {
            this.init();
            this.positionData = positionData;
            this.screenshotOpacity = opts.screenshotAlpha;
            this.heatmapOpacity = opts.heatmapAlpha;
            this.calculateColor = opts.colorScheme == 'simple' ? this.fiveColorGradient : this.simpleRedGradient;
            this.background.src = screenshotUrl;
            this.background.onload = () => {
                this.canvas.width = this.background.width;
                this.canvas.height = this.background.height;
                this.canvas.style.width = this.background.width + 'px';
                this.canvas.style.height = this.background.height + 'px';
                this.canvas.style.position = 'absolute';
                this.canvas.style.top = "0";
                this.canvas.style.left = "0";


                // this.context.drawImage(this.background, 0, 0);
                this.compute();
            }
            this.background.onerror = () => {
                console.log('image error');
            }
        }

        // 
        compute() {
            // // 创建高度数组
            // var data, i, maxViews, position, value, views, viewsArray,
            //     _i, _j, _k, _l, _len, _len1, _m, _n,
            //     _ref, _ref2, _ref3, _ref4, _ref5;



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

            d3.json("../example/data.json", (data) => {
                var maxHeight = 0;
                var maxTimes = 0;
                var maxTimeIntervale = 0;
                data.forEach((value, index) => {
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

                for (var i = 0; i < maxHeight; i++) {
                    var value = data[i][EPixel.times] / maxTimes;
                    this.context.beginPath();
                    this.context.moveTo(0, i);
                    this.context.lineTo(this.background.width, i);
                    this.context.lineWidth = 1;
                    this.context.strokeStyle = this.calculateColor(value);
                    this.context.stroke();

                }
            });




            // }
            // console.log(viewsArray);
            // console.log(maxViews);
            // console.log(views);
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