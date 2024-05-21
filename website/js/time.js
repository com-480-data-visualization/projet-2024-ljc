// just to check i'm entering the correct folder
console.log("I'm in the time.js file :)");


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

function drawTimeChart(object) {
    console.log('drawTimeChart')
    const ctx = document.getElementById('timeChart');

    
}

const labels = [1900, 1910, 1940, 1950];
const values1 = [1,2,4,5];
const values2 = [3,5,3,7];

const myChart = new Chart("myChart", {
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