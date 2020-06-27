const _colorArr = [
    'rgba(0, 188, 241, 1)', // Southern Light Blue
    'rgba(178, 210, 53, 1)', // Southern Light Green
    'rgba(11, 59, 93, 1)', // Southern Dark Blue

    'rgba(0, 181, 175, 1)', // Southern Teal
    'rgba(0, 125, 185, 1)', // Southern Blue
    'rgba(0, 116, 109, 1)', // Southern Medium Teal
    'rgba(82, 151, 54, 1)', // Southern Medium Green
];
const _translucentColors = [
    'rgba(0, 188, 241, 0.5)', // Southern Light Blue
    'rgba(178, 210, 53, 0.5)', // Southern Light Green
    'rgba(11, 59, 93, 0.5)', // Southern Dark Blue

    'rgba(0, 181, 175, 0.5)', // Southern Teal
    'rgba(0, 125, 185, 0.5)', // Southern Blue
    'rgba(0, 116, 109, 0.5)', // Southern Medium Teal
    'rgba(82, 151, 54, 0.5)', // Southern Medium Green
];
const _labelColors = [
    "#BCBEC0", // light gray
    "#58595b" // medium gray
]

// Default line plot
function getDefaultLineOptions(yLabel, plotXunit) {
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
                    min: 0
                },
                scaleLabel: {
                    display: true,
                    labelString: yLabel,
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
                    let newDate = moment(rawDate, "YYYY-MM-DD HH:mm:ss").format('MMM DD, YYYY');

                    return newDate;
                },
                // label: function (tooltipItem, data) {
                //     // format y coordinate on tooltip
                //     let label = data.datasets[tooltipItem.datasetIndex].label || '';

                //     if (label) {
                //         label += ': ';
                //     }

                //     if (yIsPrice) {
                //         label += "$" + tooltipItem.yLabel;
                //     } else {
                //         label += tooltipItem.yLabel + ' W';
                //     }

                //     return label;
                // }
            }
        }
    };
}

function graphPlot(plotPoints, plot, chartCanvas, yLabel, plotXunit, iColor) {

    let lineData = [];

    for (var device in plotPoints) {
        lineData.push({
            label: device,
            lineTension: 0,
            backgroundColor: _translucentColors[iColor],
            borderColor: _colorArr[iColor],
            borderWidth: "1px",
            pointBackgroundColor: _colorArr[iColor],
            pointRadius: 1.5,
            data: plotPoints[device]
        });

        if (iColor >= _colorArr.length - 1) {
            iColor = 0;
        } else {
            iColor++;
        }
    }

    var lineOptions = getDefaultLineOptions(yLabel, plotXunit);

    // destroy existing plot
    if (plot != null) {
        plot.destroy();
    }

    var chartDiv = $(chartCanvas)[0].getContext('2d');
    return new Chart(chartDiv, { type: 'line', data: { datasets: lineData }, options: lineOptions });
}