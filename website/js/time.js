// just to check i'm entering the correct folder
console.log('iiii')
console.log("I'm in the time.js file :) new");


function whenDocumentLoaded(action) {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", action);
	} else {
		// `DOMContentLoaded` already fired
		action();
	}
}

d3.csv('../data/final.csv').then(data => {
    drawTimeChart(data)
})

const labels = [1900, 1910, 1940, 1950];
const values1 = [1,2,4,5];
const values2 = [3,5,3,7];

function drawTimeChart() {
    console.log('drawTimeChart')
    let ctx = document.getElementById('timeChart'); 
    
    new Chart(ctx, {
        type: "line",
        data: {
            labels : labels,
            datasets : [{
                data : values1
            },{
                data : values2
            }]
        },
        options: {}
      });
}

whenDocumentLoaded(() => {
    console.log('loaded')
    drawTimeChart();
});