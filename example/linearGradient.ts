onload = function () {
    draw();
};
function draw() {
    var canvas = <HTMLCanvasElement>document.getElementById('c1');
    if (!canvas || !canvas.getContext) { return false; }
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    /* 指定渐变区域                      x0 y0  x1 y1 */ 
    var grad = ctx.createLinearGradient(0, 0, 0, 300);
    /* 指定几个颜色 */
    grad.addColorStop(0, 'rgb(192, 80, 77)');    // 红
    grad.addColorStop(0.5, 'rgb(155, 187, 89)'); // 绿
    grad.addColorStop(1, 'rgb(128, 100, 162)');  // 紫
    /* 将这个渐变设置为fillStyle */
    ctx.fillStyle = grad;
    /* 绘制矩形 */
    ctx.rect(0, 0, 300, 300);
    ctx.fill();
    // ctx.fillRect(0,0, 140,140);
}