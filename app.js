var responseData = [
    [0, 1, 0],
    [1, 2, 10],
    [2, 7, 13],
    [3, 4, 14],
    [4, 4, 16],
    [5, 3, 16],
    [6, 5, 16],
    [7, 6, 32],
    [8, 6, 43],
    [9, 7, 33],
    [10, 6, 22],
    [11, 2, 10],
    [12, 7, 13],
    [13, 4, 14],
    [14, 4, 16],
    [15, 3, 16],
    [16, 5, 16],
    [17, 6, 32],
    [18, 6, 43],
    [19, 7, 33],
    [20, 6, 22]

]

var positionData = [
    {
        height: 100,
        positions: [0, 10, 15, 20, 25, 30, 35, 40]
    }
    ,
    {
        height: 200,
        positions: [25, 30, 35, 40, 45, 50, 55, 60]
    }
    ,
    {
        height: 100,
        positions: [225, 230, 235, 240, 245, 250, 255, 260]
    }
];
new wd3.Heatmap(
    "heatmap",
    null,
    responseData,
    {
        screenshotAlpha: 0.3,
        heatmapAlpha: 0.5,
        colorScheme: 'simple'
    }
);