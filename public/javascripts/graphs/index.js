$(document).ready(function() {
    
    let _plots = {};
    let _plotPoints = {};

    let _resizeTimer = null;

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

        getJson("https://test-covid-data.s3.us-east-2.amazonaws.com/todaysData2.json");

        // drawMap();
    }

    function getJson(url) {
        $.ajax({
            type: "GET",
            url: url,
            dataType: "text",
            success: function(data) {
                let response = JSON.parse(data);
                console.log('graph data response: ', response);

                _plotPoints = response;
                
                if(_plotPoints) {
                    addNavButtons();
                    displayPlot();
                }
            },
            error: function(error) {
                console.log('error: ', error)
            }
        });
    }

    $("#menu-toggle").click(function(e) {
        redrawCharts();
    });

    $(window).resize(function() {
        redrawCharts();
    });

    function redrawCharts() {    
        $("#charts-container").empty();
        $("#redrawing").show();

        // ensure resized only once
        if(_resizeTimer) {
            clearTimeout(_resizeTimer);
        } 

        _resizeTimer = setTimeout(function() {
            console.log('redrawing...')
    
            if(_plotPoints) {
                displayPlot();
            }

            _resizeTimer = null;
        }, 4000);

    }

    function addNavButtons() {
        for(let key in _plotPoints) {
            let headerBtn = `<button type="button" class="list-group-item list-group-item-action bg-light graph-button" id="linkto-chart-${key}">${key}</button>`;
            $("#sidebar-wrapper .list-group").append(headerBtn);
        }
    }

    function displayPlot() {
        for(let key in _plotPoints) {
            // create section
            let div = `<div class="row" id="chart-${key}">
                <div class="col-12">
                    <h2>${key}</h2>
                    <div>
                        <canvas class="chart-canvas" width="400" height="400"></canvas>
                    </div>
                </div>
            </div>`
            $("#charts-container").append(div);

            // graph plot:
            _plots[key] = null;
            _plot = graphPlot(_plotPoints[key], _plots[key], `#chart-${key} .chart-canvas`, false, false, 1);
        }

        $("#loading").hide();
        $("#redrawing").hide();
    }

    $(document).on("click", ".graph-button", function() {
        let id= $(this).attr('id');
        let splitAt = id.indexOf("-");
        let sectionId = id.slice(splitAt + 1);

        console.log('sectionId = ', sectionId)

        $('html, body').animate({
            scrollTop: $(`#${sectionId.trim()}`).offset().top - 80
        }, 500);        
    })

})