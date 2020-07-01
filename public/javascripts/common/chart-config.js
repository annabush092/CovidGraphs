const _colorArr = [
    'rgb(240,163,255)', 
    'rgb(0,117,220)', 
    'rgb(153,63,0)', 
    'rgb(76,0,92)', 
    'rgb(25,25,25)', 
    'rgb(0,92,49)', 
    'rgb(43,206,72)', 
    'rgb(255,204,153)', 
    'rgb(128,128,128)', 
    'rgb(148,255,181)', 
    'rgb(143,124,0)', 
    'rgb(157,204,0)', 
    'rgb(194,0,136)', 
    'rgb(0,51,128)', 
    'rgb(255,164,5)', 
    'rgb(255,168,187)', 
    'rgb(66,102,0)', 
    'rgb(255,0,16)', 
    'rgb(94,241,242)', 
    'rgb(0,153,143)', 
    'rgb(224,255,102)', 
    'rgb(116,10,255)', 
    'rgb(153,0,0)', 
    'rgb(255,255,128)', 
    'rgb(255,255,0)', 
    'rgb(255,80,5)'
]

// const _colorArr = [
//     'rgba(0, 188, 241, 1)', 
//     'rgba(178, 210, 53, 1)', // Southern Light Green
//     'rgba(11, 59, 93, 1)', // Southern Dark Blue

//     'rgba(0, 181, 175, 1)', // Southern Teal
//     'rgba(0, 125, 185, 1)', // Southern Blue
//     'rgba(0, 116, 109, 1)', // Southern Medium Teal
//     'rgba(82, 151, 54, 1)', // Southern Medium Green
// ];
const _translucentColors = [
    'rgba(240,163,255,0.5)', 
    'rgba(0,117,220,0.5)', 
    'rgba(153,63,0,0.5)', 
    'rgba(76,0,92,0.5)', 
    'rgba(25,25,25,0.5)', 
    'rgba(0,92,49,0.5)', 
    'rgba(43,206,72,0.5)', 
    'rgba(255,204,153,0.5)', 
    'rgba(128,128,128,0.5)', 
    'rgba(148,255,181,0.5)', 
    'rgba(143,124,0,0.5)', 
    'rgba(157,204,0,0.5)', 
    'rgba(194,0,136,0.5)', 
    'rgba(0,51,128,0.5)', 
    'rgba(255,164,5,0.5)', 
    'rgba(255,168,187,0.5)', 
    'rgba(66,102,0,0.5)', 
    'rgba(255,0,16,0.5)', 
    'rgba(94,241,242,0.5)', 
    'rgba(0,153,143,0.5)', 
    'rgba(224,255,102,0.5)', 
    'rgba(116,10,255,0.5)', 
    'rgba(153,0,0,0.5)', 
    'rgba(255,255,128,0.5)', 
    'rgba(255,255,0,0.5)', 
    'rgba(255,80,5,0.5)'
];
const _labelColors = [
    "#BCBEC0", // light gray
    "#58595b" // medium gray
]

// Default line plot
// Default line plot
function getDefaultLineOptions(yIsPrice, plotXunit) {
    return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                type: "time",
                ticks: {
                    fontSize: 12,
                    fontFamily: "Arial",
                    fontColor: _labelColors[1]
                },
                time: {
                    unit: plotXunit
                },
                position: 'bottom'
            }],
            yAxes: [{
                ticks: {
                    fontSize: 12,
                    fontFamily: "Arial",
                    fontColor: _labelColors[1],
                    beginAtZero: true,
                    min: 0,
                    callback: function(value, index, values) {
                        return value.toLocaleString();
                    }
                },
                scaleLabel: {
                    display: true,
                    labelString: "People",
                    fontSize: 13,
                    fontFamily: "Arial",
                    fontColor: _labelColors[1]
                }
            }]
        },
        legend: {
            display: true,
            position: 'top',
            onClick: null,
            labels: {
                fontSize: 13,
                fontFamily: "Arial",
                fontColor: _labelColors[1]
            }
        },
        tooltips: {
            callbacks: {
                title: function (tooltipItem, data) {
                    // format x coordinate on tooltip
                    let rawDate = tooltipItem[0].xLabel || '';
                    let newDate = moment(rawDate, "YYYY-MM-DD HH:mm:ss").format('MM/DD/YYYY');

                    return newDate;
                },
                label: function (tooltipItem, data) {
                    // format y coordinate on tooltip
                    let label = data.datasets[tooltipItem.datasetIndex].label || '';

                    if (label) {
                        label += ': ' + tooltipItem.yLabel.toLocaleString();
                    }
                
                    return label;
                }
            }
        }
    };
}

function graphPlot(plotPoints, plot, chartCanvas, yIsPrice, plotXunit, iColor) {

    let lineData = [];

    for (var device in plotPoints) {
        let xyVals = [];
        for(let i=0; i<plotPoints[device]['x'].length; i++) {
            let x = moment(plotPoints[device]['x'][i] / 1000000).format();
            
            let y = plotPoints[device]['y'][i];
            if(y < 0) {
                y = null;
            }
            xyVals.push({ x: x, y: y })
        }

        lineData.push({
            label: device,
            // lineTension: 0,
            // showLine: true,
            // spanGaps: true,
            // fill: false,
            backgroundColor: _translucentColors[iColor],
            borderColor: _colorArr[iColor],
            borderWidth: 1.5,
            pointBackgroundColor: _colorArr[iColor],
            pointRadius: 1.8,
            data: xyVals
        });

        if (iColor >= _colorArr.length - 1) {
            iColor = 0;
        } else {
            iColor++;
        }
    }

    var lineOptions = getDefaultLineOptions(yIsPrice, plotXunit);

    // destroy existing plot
    if (plot != null) {
        plot.destroy();
    }

    var chartDiv = $(chartCanvas)[0].getContext('2d');
    return new Chart(chartDiv, { type: 'line', data: { datasets: lineData }, options: lineOptions });
}