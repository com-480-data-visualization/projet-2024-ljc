function whenDocumentLoaded(action) {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", action);
	} else {
		action();
	}
}

function drawTimeChart(dataset) {
    let ctx = document.getElementById('co2tshirt'); 
    
    let col = Object.keys(dataset[0]);
    let d = { 'year' : [], 'col1':[], 'col2':[], 'col2':[], 'col3':[], 'col4':[]}
    dataset.forEach((row) => {
        d['year'].push(row[col[0]])
        d['col1'].push(row[col[1]])
        d['col2'].push(row[col[2]])
        d['col3'].push(row[col[3]])
        d['col4'].push(row[col[4]])
    });
    new Chart(ctx, {
        type: "line",
        data: {
            labels : d.year,
            datasets : [{
                data : d.col1,
                fill : false,
                label : col[1],
                borderColor : 'red',
                yAxisID : 'y1',
            },{
                data : d.col2,
                label : col[2],
                yAxisID : 'y1',
                borderColor : 'blue',
                fill : false,
            },{
                data : d.col3,
                label : col[3],
                fill : false,
                borderColor : 'green',
                yAxisID : 'y1',
            },{
                data : d.col4,
                label : col[4],
                fill : false,
                borderColor : 'yellow',
                yAxisID : 'y2',
            }]
        },
        options: {
            layout: {
                padding: 60
            },
            scales : {
                yAxes: [{
                    id: 'y1',
                    type:'linear',
                    position:'left',
                    scaleLabel : {
                        display:true,
                        labelString:'Water, CO2, Land',
                    },
                    ticks : {
                        min: 2,
                        max : 5,
                        stepSize: 0.5,
                    }
                },{
                    id: 'y2',
                    type:'linear',
                    position:'right',
                    scaleLabel : {
                        display:true,
                        labelString:'Energy',
                    },
                    ticks : {
                        min: 12,
                        max: 21,
                        stepSize: 1.5,
                    }
                }
                ]
            }
        }
      });
}

whenDocumentLoaded(() => {
    d3.csv('data/final_short.csv').then((data) => {
        drawTimeChart(data)
    })
});