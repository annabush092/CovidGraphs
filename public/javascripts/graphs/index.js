$(document).ready(function() {
    
    let _plot = null;
    let _plotPoints = {};
    let _period = {};

    loadPage();

    // Init view 

    function loadPage() {
        let minDate = "03/01/2020";
        let todayStr = moment().format("MM/DD/YYYY");

        let startDate = moment().add(-7, 'days').startOf('day').format("MM/DD/YYYY");
        if (moment(startDate, "MM/DD/YYYY").isBefore(moment(minDate, "MM/DD/YYYY"))) {
            startDate = minDate;
        }

        // $('.input-daterange').each(function () {
        //     $(this).datepicker({
        //         format: 'mm/dd/yyyy',
        //         startDate: minDate, // minDate
        //         endDate: todayStr // maxDate
        //     });

        //     $(this).data("datepicker").pickers[0].setDate(startDate);
        //     $(this).data("datepicker").pickers[1].setDate(todayStr);
        // })

        _period = {
            startDate: moment(startDate, "MM/DD/YYYY").format(),
            endDate: moment().format()
        };

        displayPlot();
        // getCsv("https://test-covid-data.s3.us-east-2.amazonaws.com/test1.csv");
        // getJson("https://test-covid-data.s3.us-east-2.amazonaws.com/todaysData.json");

        drawMap();
    }

    function displayPlot() {
        setDummySolarPlotPoints();

        // if time period is > 2 days, force x-axis to display dates instead of hours
        let plotXunit = false;
        if (moment(_period.startDate).isBefore(moment(_period.endDate).subtract(2, "days"))) {
            plotXunit = "day";
        }

        _plot = graphPlot(_solarPlotPoints, _plot, '#myChart', "Cases", plotXunit, 1);
    }

    function setDummySolarPlotPoints() {
        _solarPlotPoints = {};
        
        _solarPlotPoints['Number of Cases'] = [];;// {x: 'date string', y: '#'}

        let date = _period.startDate;
        do {
            let randomNumber = Math.floor((Math.random() * 10) + 10);
           
            _solarPlotPoints['Number of Cases'].push({ x: date, y: randomNumber });

            date = moment(date).add(1, 'day').format();
        } while (moment(date).isBefore(moment(_period.endDate)))
    }
})