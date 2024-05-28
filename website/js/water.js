var tooltip = d3.select("body").append("div")
  .attr("class", "tooltip")
  .attr("id", "tooltip")
  .style("opacity", 0);

const data = [
    { name: 'Cup of tea', water: 0.1, reelwater: 34 },
    { name: 'Cup of coffee', water: 0.3, reelwater: 140 },
    { name: 'Direct household water usage (UK)', water: 0.3, reelwater: 150 },
    { name: 'Polyester t-shirt', water: 0.7, reelwater: 350 },
    { name: 'Disposable diaper', water: 1.1, reelwater: 545 },
    { name: 'Kilo of wheat', water: 2.8, reelwater: 21400 },
    { name: 'Burger (with 350g patty)', water: 5.0, reelwater: 2500 },
    { name: 'Cotton t-shirt', water: 5.4, reelwater: 2700 },
    { name: 'Kilo of paper', water: 6.0, reelwater: 3000 },
    { name: 'Kilo of beef', water: 30.8, reelwater: 15400 },
];

const bottlePaths = {
    container: "M -3.4286 -11.1429 L -3.4286 -12.8571 C -3.4286 -12.8571 -3.4286 -14.5714 -1.7143 -14.5714 L 1.7143 -14.5714 C 3.4286 -14.5714 3.4286 -12.8571 3.4286 -12.8571 L 3.4286 -11.1429 Z M -2.5714 -11.1429 L -2.5714 -9.4286 C -3 -6 -7.7143 -7.7143 -7.7143 0 L -7.7143 24 C -7.7143 25.7143 -6 25.7143 -6 25.7143 L 6 25.7143 C 6 25.7143 7.7143 25.7143 7.7143 24 L 7.7143 0 C 7.7143 -7.7143 3 -6 2.5714 -9.4286 L 2.5714 -11.1429 Z",
    full: "M -6 22.2857 C -6 24 -4.2857 24 -4.2857 24 L 4.2857 24 C 4.2857 24 6 24 6 22.2857 L 6 0 C 6 -2.5714 5.1429 -4.2857 2.5714 -6 C -2 -6 -1.7143 -6 -2.5714 -6 C -5.1429 -4.2857 -6 -2.5714 -6 0 Z",
    eighty: "M -6 22.2857 C -6 24 -4.2857 24 -4.2857 24 L 4.2857 24 C 4.2857 24 6 24 6 22.2857 L 6 -1 C 6 0 6 0 3 0 L -5 0 C -6 0 -6 0 -6 -1 Z",
    seventy: "M -6 22.2857 C -6 24 -4.2857 24 -4.2857 24 L 4.2857 24 C 4.2857 24 6 24 6 22.2857 L 6 2 C 6 3 6 3 3 3 L -3 3 C -6 3 -6 3 -6 2 Z",
    forty: "M -6 22.2857 C -6 24 -4.2857 24 -4.2857 24 L 4.2857 24 C 4.2857 24 6 24 6 22.2857 L 6 11 C 6 12 6 12 3 12 L -3 12 C -6 12 -6 12 -6 11 Z",
    thirty: "M -6 22.2857 C -6 24 -4.2857 24 -4.2857 24 L 4.2857 24 C 4.2857 24 6 24 6 22.2857 L 6 14 C 6 15 6 15 3 15 L -3 15 C -6 15 -6 15 -6 14 Z",
    ten: "M -6 22.2857 C -6 24 -4.2857 24 -4.2857 24 L 4.2857 24 C 4.2857 24 6 24 6 22.2857 L 6 20 C 6 21 6 21 3 21 L -3 21 C -6 21 -6 21 -6 20 Z"
};

const container = d3.select('#water-usage-comparison');

data.forEach(item => {
    const itemElement = container.append('div').attr('class', 'item');
    
    itemElement.append('div')
        .attr('class', 'item-name')
        .text(item.name);

    const totalBottles = Math.ceil(item.water);
    const rows = 2;
    var columns;
    if (totalBottles <= 3) { 
        columns = totalBottles; 
    } else { 
        columns = Math.ceil(totalBottles / rows); 
    }        
    const containerWidth = columns * 20;
    const bottles = Math.floor(item.water);
    const remainder = item.water % 1; 

    const bottleContainer = itemElement.append('div')
        .attr('class', 'bottle-container')
        .style('grid-template-columns', `repeat(${columns}, 1fr)`)
        .style('width', `${containerWidth}px`)
        .attr("data-name", item.name)
        .attr("data-reelwater", item.reelwater)
        .on("mousemove", function (d) {
            var liters = this.getAttribute('data-reelwater');
            tooltip.style("opacity", .9);
            tooltip.style("text-align", "left");
            tooltip.html(
                "<b>" + liters + " liters </b>")
              .style("left", d3.event.pageX + 10 + "px")
              .style("top", d3.event.pageY - 28 + "px");
        })
        .on("mouseout", function (d) {
            tooltip.style("opacity", 0);
        });


    for (let i = 0; i < bottles; i++) {
        const bottle = bottleContainer.append('svg')
            .attr('viewBox', '-8 -15 16 41')
            .attr('class', 'bottle')
            .attr('width', '15')
            .attr('height', '37.5');

        bottle.append('path')
            .attr("id", "bottleContainer")
            .attr('d', bottlePaths.container)

        bottle.append('path')
            .attr("id", "bottleContent")
            .attr('d', bottlePaths.full)
    }

    if (remainder > 0) {
        const bottle = bottleContainer.append('svg')
            .attr('viewBox', '-8 -15 16 41')
            .attr('class', 'bottle')
            .attr('width', '15')
            .attr('height', '37.5');

        bottle.append('path')
            .attr("id", "bottleContainer")
            .attr('d', bottlePaths.container)

        let path;
        if (remainder >= 0.8) {
            path = bottlePaths.eighty;
        } else if (remainder >= 0.7) {
            path = bottlePaths.seventy;
        } else if (remainder >= 0.4) {
            path = bottlePaths.forty;
        } else if (remainder >= 0.3) {
            path = bottlePaths.thirty;
        } else {
            path = bottlePaths.ten;
        }

        bottle.append('path')
            .attr("id", "bottleContent")
            .attr('d', path);
    }
});