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

let timeChartInstance = null;

function drawTimeChart(dataset, startYear = 1965, endYear = 2014) {
    let ctx = document.getElementById('timeChart'); 
    
    //let's make the data usable
    // Filter dataset based on selected years
    
    if (timeChartInstance) {
        timeChartInstance.destroy();
    }
    

    let dataset_ = dataset.filter(function(row)  {
        return row.Year >= startYear && row.Year <= endYear;
    }); 

    
    let col = Object.keys(dataset_[0]);
    let d = { 'year' : [], 'col1':[], 'col2':[], 'col2':[], 'col3':[], 'col4':[]}
    dataset_.forEach((row) => {
        d['year'].push(row[col[0]])
        d['col1'].push(row[col[1]])
        d['col2'].push(row[col[2]])
        d['col3'].push(row[col[3]])
        d['col4'].push(row[col[4]])
    });
    console.log('just before chart new')
    timeChartInstance = new Chart(ctx, {
        type: "line",
        data: {
            labels : d.year,
            datasets : [{
                data : d.col1,
                fill : false,
                label : col[1],
                borderColor : getComputedStyle(document.documentElement).getPropertyValue('--blue-color').trim(),
                yAxisID : 'y1',
                xAxisID : 'x1'
            },{
                data : d.col2,
                label : col[2],
                yAxisID : 'y1',
                borderColor : getComputedStyle(document.documentElement).getPropertyValue('--green-color').trim(),
                fill : false,
                xAxisID : 'x1'
            },{
                data : d.col3,
                label : col[3],
                fill : false,
                borderColor : getComputedStyle(document.documentElement).getPropertyValue('--orange-color').trim(),
                yAxisID : 'y1',
                xAxisID : 'x1'
            },{
                data : d.col4,
                label : col[4],
                fill : false,
                borderColor : getComputedStyle(document.documentElement).getPropertyValue('--purple-color').trim(),
                yAxisID : 'y2',
                xAxisID : 'x1'
            }]
        },
        options: {
            layout: {
                padding: 60
            },
            scales : {
                y1: {
                    //id: 'y1',
                    type:'linear',
                    position:'left',
                    title : {
                        display:true,
                        text:'Water, CO2, Land',
                    },
                    min: 2,
                    max : 5,
                    ticks : {
                        stepSize: 0.5,
                    },
                    grid: {
                        display:true
                    }
                },
                y2: {
                    //id: 'y2',
                    type:'linear',
                    position:'right',
                    title : {
                        display:true,
                        text:'Energy',
                    },
                    min: 12,
                    max: 21,
                    ticks : {
                        stepSize: 1.5,
                    },
                    grid: {
                        display:true
                    }
                },
                x1: {
                    grid:{
                        display:false,
                    },
                    title:{
                        display:true,
                        text:'Year',
                    },
                    ticks : {
                        stepSize:1,
                    }
                }
                
                }    
            
        }
      });
}

//for the slider

window.onload = function(){
    slideOne();
    slideTwo();
}

let sliderOne = document.getElementById("slider-1");
let sliderTwo = document.getElementById("slider-2");
let displayValOne = document.getElementById("range1");
let displayValTwo = document.getElementById("range2");
let minGap = 0;
let sliderTrack = document.querySelector(".slider-track");
let sliderMaxValue = document.getElementById("slider-1").max;
let sliderMinValue = document.getElementById("slider-1").min;
let sliderRange = document.getElementById('slider-1').max - document.getElementById('slider-1').min;

function slideOne(){
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap){
        sliderOne.value = parseInt(sliderTwo.value) - minGap;
    }
    displayValOne.textContent = sliderOne.value;
    fillColor();
}
function slideTwo(){
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap){
        sliderTwo.value = parseInt(sliderOne.value) + minGap;
    }
    displayValTwo.textContent = sliderTwo.value;
    fillColor();
}
function fillColor(){
    percent1 = ((sliderOne.value - sliderMinValue)/ sliderRange) * 100;
    percent2 = ((sliderTwo.value - sliderMinValue) / sliderRange) * 100;
    sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #81b2b7 ${percent1}% , #81b2b7 ${percent2}%, #dadae5 ${percent2}%)`;
}

sliderOne.addEventListener('input', slideOne);
sliderTwo.addEventListener('input', slideTwo);

whenDocumentLoaded(() => {
    console.log('louise')
    slideOne()
    slideTwo()
    sliderOne.addEventListener('input', slideOne);
    sliderTwo.addEventListener('input', slideTwo);
    console.log('before d3')

    d3.csv('data/final_short.csv').then((data) => {
        console.log('what is going on')
        drawTimeChart(data, sliderOne.value, sliderTwo.value)
            document.getElementById('slider-1').addEventListener('input', () => {
            canvas = document.getElementById('canvas');
            drawTimeChart(data, sliderOne.value, sliderTwo.value);
            sliderOne.addEventListener('input', slideOne);

            sliderTwo.addEventListener('input', slideTwo);
        }) 
        document.getElementById('slider-2').addEventListener('input', () => {
            canvas = document.getElementById('canvas');
            drawTimeChart(data, sliderOne.value, sliderTwo.value);
            sliderOne.addEventListener('input', slideOne);
            sliderTwo.addEventListener('input', slideTwo);
        }) 
    })
})
