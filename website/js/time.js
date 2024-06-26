function whenDocumentLoaded(action) {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", action);
	} else {
		action();
	}
}

d3.csv('data/final_short.csv').then((data) => {

    // create an instance to update when move the slider
    let timeChartInstance = null;

    function drawTimeChart(dataset, startYear = 1965, endYear = 2014) {
      
        let ctx = document.getElementById('timeChart'); 
        
        // if graph already exists, destory to make a new one
        if (timeChartInstance) {
            timeChartInstance.destroy();
        }
        
        // filter by the dates chosen by slider to select what to plot
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

        //create new chart
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
                    borderColor : getComputedStyle(document.documentElement).getPropertyValue('--yellow-color').trim(),
                    yAxisID : 'y2',
                    xAxisID : 'x1'
                }]
            },
            options: {
                layout: {
                    padding: {
                        left: 60,
                        right: 60,
                        top: 20,
                        bottom: 20
                    }
                },
                scales : {
                    y1: {
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

    const sliderContainer = document.querySelector('.slider-container');

    // initialize all elements for the slider
    const progressBar = document.querySelector('.slider-container .progress');
    const thumb1 = document.querySelector('.slider-container .thumb-1');
    const thumb2 = document.querySelector('.slider-container .thumb-2');
    const thumbIndicator1 = document.querySelector('.slider-container .thumb-indicator-1');
    const thumbIndicator2 = document.querySelector('.slider-container .thumb-indicator-2');
    const sliderContainerWidth = sliderContainer.offsetWidth;
    const sliderContainerLeft = sliderContainer.offsetLeft;

    const displayValue1 = document.querySelector('.slider-values .value-1');
    const displayValue2 = document.querySelector('.slider-values .value-2');

    var minValue = 1965; 
    var maxValue = 2014;
    var valueRange = maxValue - minValue;
    var value1 = minValue;
    var value2 = maxValue;
    var dragging1 = false;
    var dragging2 = false;
    var translate;

    // functions for the slider
    function setPosition1() {
        let position = (value1-minValue)/valueRange * sliderContainerWidth;
        thumb1.style.transform = 'translate(-50%)  translateX('+ position  +'px)';
        displayValues();
        setRangeBar();
    }

    function setPosition2() {
        let position = (value2-minValue)/valueRange * sliderContainerWidth;
        thumb2.style.transform = 'translate(-50%)  translateX('+ position  +'px)';
        displayValues();
        setRangeBar();
    }

    function setRangeBar(){
        progressBar.style.transform  = ' translateX('+ (value1-minValue)/valueRange * sliderContainerWidth  +'px) scaleX('+ (value2 - value1)/valueRange +')';
    }

    function displayValues() {
        if (value1 > value2){
            var maxRange = value1;
            var minRange = value2;
        } else {
            var maxRange = value2;
            var minRange = value1;
        }
    
        displayValue1.innerHTML = Math.round(minRange);
        displayValue2.innerHTML = Math.round(maxRange);
    }

    displayValues();
    setPosition1();
    setPosition2();
    drawTimeChart(data, value1, value2);

    
    document.addEventListener('mousemove', function(e) {
        
    // adapt the plot if slider moved by user and take into account range of dates
    if (dragging1) {
        if (e.clientX < sliderContainerLeft ) {
        value1 = minValue ;
        } else if (e.clientX > sliderContainerWidth + sliderContainerLeft )      {
            value1 = maxValue;
        } else {
        translate = e.clientX - sliderContainerLeft;
        value1 =  Math.round(translate / sliderContainerWidth* valueRange + minValue);
        }
        setPosition1();
    }
    if (dragging2) {
        if (e.clientX < sliderContainerLeft ) {
        value2 = minValue ;
        } else if (e.clientX > sliderContainerWidth + sliderContainerLeft )      {
            value2 = maxValue;
        } else {
        translate = e.clientX - sliderContainerLeft;
        value2 =  Math.round(translate / sliderContainerWidth* valueRange + minValue);
        }
        setPosition2();
    }
    });

    thumb1.addEventListener('mousedown', function(e) {
        dragging1 = true;
        thumbIndicator1.classList.add('focus');
    });

    thumb2.addEventListener('mousedown', function(e) {
        dragging2 = true;
        thumbIndicator2.classList.add('focus');
    });


    document.addEventListener('mouseup', function(e) {
        dragging1 = false;
        dragging2 = false;
        thumbIndicator1.classList.remove('focus');
        thumbIndicator2.classList.remove('focus');
    });

    const targetNode1 = document.querySelector('.value-1');
    const targetNode2 = document.querySelector('.value-2');

    const config = { childList: true, subtree: true };

    const callback = (mutationsList, observer) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                drawTimeChart(data, Math.min(value1, value2), Math.max(value1, value2));
            }
        }
    };

    const observer = new MutationObserver(callback);

    observer.observe(targetNode1, config);
    observer.observe(targetNode2, config);

});
