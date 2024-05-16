
console.log("I'm in the textil.js file :)");


function whenDocumentLoaded(action) {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", action);
	} else {
		// `DOMContentLoaded` already fired
		action();
	}
}


function drawRadarChart(object) {
    console.log('drawRadarChart');
    const ctx = document.getElementById('radarChart');
    // Prepare datasets array
    const datasets = [];

    // Iterate over fabrics
    for (let i = 0; i < object.fabrics.length; i++) {
        let dataset = {
            label: object.fabrics[i],
            data: object.consumption[i],
            backgroundColor: getColorWithOpacity(object.color[i], 0.2), // Semi-transparent background
            borderColor: getColorWithOpacity(object.color[i], 1), // Opaque border
            borderWidth: 1
        };

        datasets.push(dataset);
    }

    // Radar chart
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: object.labels,
            datasets: datasets
        },
        options: {
            scale: {
                ticks: {
                    beginAtZero: true
                }
            }
        }
    });
}



function drawBarChart(object, dataLabel, first = false) {
    console.log('drawBarChart');

    // Get the canvas element
    let canvas = document.getElementById('comparisonFabric');
    // Get the 2D context of the canvas
    let ctxBar = canvas.getContext('2d');

    // Retrieve the existing chart instance
    let existingChart = Chart.getChart(ctxBar);

    // Check if there's an existing chart
    if (existingChart) {
        // Destroy the existing chart
        existingChart.destroy();
    }
    
    // Prepare datasets array
    const datasets = [];

    // Find index of the data label
    const labelIndex = object.labels.indexOf(dataLabel);
    
    // Iterate over fabrics
    for (let i = 0; i < object.fabrics.length; i++) {
        let dataset = {
            label: object.fabrics[i],
            data: [object.consumption[i][labelIndex]],
            backgroundColor: getColorWithOpacity(object.color[i], 0.2), // Semi-transparent background
            borderColor: getColorWithOpacity(object.color[i], 1), // Opaque border
            borderWidth: 1
        };

        datasets.push(dataset);
    }
    

    
    // Bar chart
    new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: [dataLabel], // Labels for X-axis
            datasets: datasets // Actual data
        }
    });
    
}

function getColorWithOpacity(color, opacity) {
    const rgbaColor = color.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
    return rgbaColor;
}

function getColorWithOpacity(color, opacity) {
    const rgbaColor = color.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
    return rgbaColor;
}




// Execute when document is loaded
whenDocumentLoaded(() => {
    // Need to find a way to download the data
    const textiles = { fabrics : ['Nylon', 'Acrylic'],
                       type : ['synthetic', 'synthetic'],
                       labels : ['Water use', 'Energy consumption', 'CO2 emissions'],
                       consumption: [[37, 69, 465], [26, 49, 210]], 
                       color : ['rgb(255, 99, 132)', 'rgb(99, 250, 132)']
    }

    drawRadarChart(textiles);

    drawBarChart(textiles, 'Water use', true)
    // Add event listeners to buttons
    document.getElementById('waterButton').addEventListener('click', () => {
        drawBarChart(textiles, 'Water use');
    });
    
    document.getElementById('co2Button').addEventListener('click', () => {
        drawBarChart(textiles, 'CO2 emissions');
    });
    
    document.getElementById('energyButton').addEventListener('click', () => {
        drawBarChart(textiles, 'Energy consumption');
    });

});




