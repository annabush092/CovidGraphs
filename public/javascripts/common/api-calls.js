function getCsv(url) {
    $.ajax({
        type: "GET",
        url: url,
        dataType: "text",
        success: function(data) {
            console.log("response: ", data);

            let rows = data.split("\n");
            console.log("rows: ", rows)
            
            for(let i=0; i<rows.length; i++) {
                let cells = rows[i].split(",");
                console.log("cells: ", cells)
            }
        },
        error: function(error) {
            console.log('error: ', error)
        }
     });
}

function getJson(url) {
    $.ajax({
        type: "GET",
        url: url,
        dataType: "text",
        success: function(data) {
            let response = JSON.parse(data);

            console.log('parsed response: ', response)
            
        },
        error: function(error) {
            console.log('error: ', error)
        }
     });
}
