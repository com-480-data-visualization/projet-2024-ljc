function whenDocumentLoaded(action) {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", action);
	} else {
		// `DOMContentLoaded` already fired
		action();
	}
}

function radarChart(row_fabric) {
    // get the id from the index.html
    let ctx = document.getElementById('radarChart');

    // Prepare data needed for the plot
    let datasets = [];

    row_fabric.forEach((row) => {
        dataset = {
            label: row.fabric,
            data: [row[lab_[0]], row[lab_[1]], row[lab_[2]]],
            backgroundColor: getColorWithOpacity(row.color, 0.2),
            borderColor: getColorWithOpacity(row.color, 1), 
            borderWidth: 1
        };
        datasets.push(dataset);
    });

    // Radar chart.js
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ["Water use [%]", "CO2 emissions [%]", "Energy consumption [%]" ],
            datasets: datasets
        },
        options: {
            scale: {
                ticks: {
                    beginAtZero: true,
                    min: 0, 
                    max: 100,
                    stepSize: 10, 
                    autoSkip: false
                }
            },
            animation: {
                duration: 700, 
                easing: 'easeInOutQuad',
            }
        }
    });
}

function createDiagonalPattern(type, color = 'black') {
    if (type == 'synthetic') {

        let shape = document.createElement('canvas')
        shape.width = 10
        shape.height = 10
        let c = shape.getContext('2d')

        // Draw 1st line of the shape 
        c.strokeStyle = color
        c.beginPath()
        c.moveTo(2, 0)
        c.lineTo(10, 8)
        c.stroke()

        // Draw 2nd line of the shape 
        c.beginPath()
        c.moveTo(0, 8)
        c.lineTo(2, 10)
        c.stroke()

        // Create the pattern from the shape
        return c.createPattern(shape, 'repeat')
    } else if(type == 'natural'){
        return getColorWithOpacity(color, 0.2)
    } else {
        console.log('Unknown type of fabric')
    };
        
}

function barChart(row_fabric, dataLabel, first = false) {
    // Get the canvas element
    let canvas = document.getElementById('comparisonFabric');
    // Get the 2D context of the canvas
    let ctxBar = canvas.getContext('2d');

    // Prepare data needed for the plot
    let datasets = [];
    row_fabric.forEach((row) => {
        let dataset = {
            label: row.fabric,
            data: [row[dataLabel]],
            backgroundColor: createDiagonalPattern(row.type, row.color), 
            borderColor: getColorWithOpacity(row.color, 1), 
            borderWidth: 1
        };
        datasets.push(dataset);
    });

    // Sorts the datasets by data values
    datasets = datasets.sort((a, b) => b.data - a.data);
    
    // When the chart already exsits, we need to update it instead of creating a new one 
    if (first) {
        // Initialize the bar chart
        myChart = new Chart(ctxBar, {
                                type: 'bar',
                                data: {
                                    labels: [dataLabel], 
                                    datasets: datasets 
                                },
                                options: {
                                    animation: {
                                        duration: 700, 
                                        easing: 'easeInOutQuad'
                                    },
                                    plugins: { 
                                        legend: {
                                            display: true,
                                            position: 'top', 
                                        }
                                    },
                                    layout: {
                                        padding: {
                                            top: 20, 
                                            bottom: 20
                                        }
                                    }
                                }
                    });
    } 
    // Update the existing chart
    else if (myChart) {
        myChart.data.labels = [dataLabel];
        myChart.data.datasets = datasets
        myChart.update();
    };
};
    

function getColorWithOpacity(color, opacity) {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
}


const lab_ = ["Water use [kg for 1 kg Fiber]", "CO2 emissions [kg for 1 kg Fiber]", "Energy consumption [kW/h for 1 kg Fiber]" ];

// Execute when document is loaded
whenDocumentLoaded(() => {
    d3.csv('data/fabrics-comparison.csv').then((textiles) => {

       const colorScale = [
        getComputedStyle(document.documentElement).getPropertyValue('--orange-color').trim(),
        getComputedStyle(document.documentElement).getPropertyValue('--pink-color').trim(),
        getComputedStyle(document.documentElement).getPropertyValue('--green-color').trim(),
        getComputedStyle(document.documentElement).getPropertyValue('--blue-color').trim(),
        getComputedStyle(document.documentElement).getPropertyValue('--purple-color').trim(),
        getComputedStyle(document.documentElement).getPropertyValue('--yellow-color').trim(),
        getComputedStyle(document.documentElement).getPropertyValue('--blue2-color').trim(),
        getComputedStyle(document.documentElement).getPropertyValue('--pink2-color').trim()]

        textiles.forEach((textile, index) => {
            // Assign color from the color scale
            textile.color = d3.rgb(colorScale[index]);
        });

        // Bar plots
        barChart(textiles, lab_[0], true);
        // Add event listeners to buttons
        document.getElementById('waterButton').addEventListener('click', () => {
            barChart(textiles, lab_[0]);
        });
    
        document.getElementById('co2Button').addEventListener('click', () => {
            barChart(textiles, lab_[1]);
        });
    
        document.getElementById('energyButton').addEventListener('click', () => {
            barChart(textiles, lab_[2]);
        });

        // Copy textile in a way it is not modified
        let textiles_percentage = JSON.parse(JSON.stringify(textiles))

        // Calculate percentages
        for (let i = 0; i < lab_.length; i++) {
            const max_lab = Math.max(...Object.values(textiles_percentage).map(item => item[lab_[i]]).filter(val => !isNaN(val)));
            textiles_percentage.forEach((row) => {
                row[lab_[i]] =row[lab_[i]]*100/max_lab;
                row[lab_[i]] = row[lab_[i]].toFixed(2)
            })

          }
        // radar Chart
        radarChart(textiles_percentage);
    });
});
