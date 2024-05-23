// just to check i'm entering the correct folder
/*
console.log("I'm in the time.js file :)");

function whenDocumentLoaded(action) {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", action);
	} else {
		// `DOMContentLoaded` already fired
		action();
	}
}

const labels = [1900, 1910, 1940, 1950];
const values1 = [1,2,4,5];
const values2 = [3,5,3,7];

function drawTimeChart(dataset) {
    console.log('drawTimeChart')
    let ctx = document.getElementById('timeChart'); 
    
    //let's make the data usable
    //let = datasets [];
    
    let col = Object.keys(dataset[0]);
    let d = { 'year' : [], 'col1':[], 'col2':[], 'col2':[], 'col3':[], 'col4':[]}
    dataset.forEach((row) => {
        d['year'].push(row[col[0]])
        d['col1'].push(row[col[1]])
        d['col2'].push(row[col[2]])
        d['col3'].push(row[col[3]])
        d['col4'].push(row[col[4]])
    });
    console.log('just before chart')
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
    console.log('loaded hey')

    d3.csv('data/final_short.csv').then((data) => {
        drawTimeChart(data)
    })
});
*/

console.log("I'm in the time.js file :)");

function whenDocumentLoaded(action) {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", action);
    } else {
        // `DOMContentLoaded` already fired
        action();
    }
}

function drawTimeChart(dataset, startYear, endYear) {
    console.log('drawTimeChart');
    let ctx = document.getElementById('timeChart').getContext('2d');

    // Filter dataset based on selected years
    console.log(dataset)
    let filteredData = dataset.filter(function(row)  {
        return row.Year >= startYear && row.Year <= endYear;
    }); 


    console.log(filteredData)
    let col = Object.keys(dataset[0]);
    let d = { 'year': [], 'col1': [], 'col2': [], 'col3': [], 'col4': [] };
    filteredData.forEach((row) => {
        d['year'].push(row[col[0]]);
        d['col1'].push(row[col[1]]);
        d['col2'].push(row[col[2]]);
        d['col3'].push(row[col[3]]);
        d['col4'].push(row[col[4]]);
    });

    console.log('just before chart');
    console.log(d.year)
    new Chart(ctx, {
        type: "line",
        data: {
            labels: d.year,
            datasets: [{
                data: d.col1,
                fill: false,
                label: col[1],
                borderColor: 'red',
                yAxisID: 'y1',
            }, {
                data: d.col2,
                label: col[2],
                yAxisID: 'y1',
                borderColor: 'blue',
                fill: false,
            }, {
                data: d.col3,
                label: col[3],
                fill: false,
                borderColor: 'green',
                yAxisID: 'y1',
            }, {
                data: d.col4,
                label: col[4],
                fill: false,
                borderColor: 'yellow',
                yAxisID: 'y2',
            }]
        },
        options: {
            layout: {
                padding: 20
            },
            scales: {
                x: {
                    stacked: false
                },
                yAxes: [{
                    id: 'y1',
                    type: 'linear',
                    position: 'left',
                    scaleLabel: {
                        display: true,
                        labelString: 'Water, CO2, Land',
                    },
                    ticks: {
                        min: 2,
                        max: 5,
                        stepSize: 0.5,
                    }
                }, {
                    id: 'y2',
                    type: 'linear',
                    position: 'right',
                    scaleLabel: {
                        display: true,
                        labelString: 'Energy',
                    },
                    ticks: {
                        min: 12,
                        max: 21,
                        stepSize: 1.5,
                    }
                }]
            }
        }
    });
}

whenDocumentLoaded(() => {
    console.log('loaded hey');

    d3.csv('data/final_short.csv').then((data) => {
        // Convert year strings to numbers
        data.forEach(d => {
            d.year = +d.year;
        });

        // Initial draw of the chart
        drawTimeChart(data, 1965, 2014);

        var slider = document.getElementById('slider');

        noUiSlider.create(slider, {
            start: [2500, 8500], // Initial values
            connect: true,
            step : 1,
            range: {    
                'min': 0,
                'max': 10000
            }
        }
    );


    });
});
