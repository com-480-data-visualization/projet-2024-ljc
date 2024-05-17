var body = d3.select("body");

var tooltip = body.append("div")
  .attr("class", "tooltip")
  .attr("id", "tooltip")
  .style("opacity", 0);

var svg = d3.select("#swiss-carbonfootprint"),
  width = +svg.attr("width"),
  height = +svg.attr("height");

var treemap = d3.treemap()
  .size([width, height])
  .paddingInner(1);

var color = d3.scaleOrdinal()
  .domain(["Goods and Services", "Food", "Transport", "Housing"])
  .range(["#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"]); //#264653

d3.json('data/swiss-carbon-footprint.json').then(data => {
  var root = d3.hierarchy(data)
    .eachBefore(function (d) {
      d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name;
    })
    .sum(sumBySize)
    .sort(function (a, b) {
      return b.height - a.height || b.value - a.value;
    });

  treemap(root);

  var cell = svg.selectAll("g")
    .data(root.leaves())
    .enter().append("g")
    .attr("class", "group")
    .attr("transform", function (d) {
      return "translate(" + d.x0 + "," + d.y0 + ")";
    });

  var tile = cell.append("rect")
    .attr("id", function (d) {
      return d.data.id;
    })
    .attr("class", "tile")
    .attr("width", function (d) {
      return d.x1 - d.x0;
    })
    .attr("height", function (d) {
      return d.y1 - d.y0;
    })
    .attr("rx", 5)
    .attr("ry", 5)
    .attr("stroke", "#264653")
    .attr("stroke-width", 5)
    .attr("stroke-opacity", 1)
    .attr("data-name", function (d) {
      return d.data.name;
    })
    .attr("data-category", function (d) {
      return d.data.category;
    })
    .attr("data-value", function (d) {
      return d.data.value;
    })
    .attr("fill", function (d) {
      return color(d.data.category);
    })
    .on("mousemove", function (d) {
      var clr = color(d.data.category)
      tooltip.style("opacity", .9);
      tooltip.style("color", clr);
      tooltip.style("text-align", "left");
      tooltip.html(
          "<div><b>" + d.data.name + "</b></div>" +
          '<br>Category: ' + d.data.category +
          '<br>Consumption: ' + d.data.value + "kg eq. CO2")
        .attr("data-value", d.data.value)
        .style("left", d3.event.pageX + 10 + "px")
        .style("top", d3.event.pageY - 28 + "px");
      d3.select(this).style("fill", "color-mix(in srgb, " + clr + ", #264653)");
    })
    .on("mouseout", function (d) {
      tooltip.style("opacity", 0);
      d3.select(this).style("fill", color(d.data.category));
    });

  cell.append("text")
    .attr('class', 'tile-text')
    .selectAll("tspan")
    .data(function (d) {
      return d.data.name.split(/(?=[A-Z][^A-Z])/g);
    })
    .enter().append("tspan")
    .attr("x", 10)
    .attr("y", function (d, i) {
      return 20 + i * 10;
    })
    .text(function (d) {
      return d;
    });

  var categories = root.leaves().map(function (nodes) {
    return nodes.data.category;
  });
  categories = categories.filter(function (category, index, self) {
    return self.indexOf(category) === index;
  });
  var legend = d3.select("#scfp-legend");
  const LEGEND_OFFSET = 10;
  const LEGEND_RECT_SIZE = 20;
  const LEGEND_TEXT_X_OFFSET = 3;
  const LEGEND_TEXT_Y_OFFSET = 15;
  const LEGEND_H_SPACING = 20; // Space between legend items

  console.log(+legend.attr("width"))

  var legendElem = legend.append("g")
    .attr("transform", "translate(" + LEGEND_OFFSET + ", " + LEGEND_OFFSET + ")")
    .selectAll("g")
    .data(categories)
    .enter().append("g")
    .attr("transform", function (d, i) {
      var xOffset = LEGEND_OFFSET;
      for (var j = 0; j < i; j++) {
        var textLength = categories[j].length * 12;
        
        xOffset += LEGEND_RECT_SIZE + textLength + LEGEND_H_SPACING + LEGEND_TEXT_X_OFFSET;
      }
      return 'translate(' + xOffset + ', 0)';
    })
    .attr('fill', function (d) {
      return color(d);
    });

  legendElem.append("rect")
    .attr('width', LEGEND_RECT_SIZE)
    .attr('height', LEGEND_RECT_SIZE)
    .attr('class', 'legend-item')
    .attr('fill', function (d) {
      return color(d);
    });

  legendElem.append("text")
    .attr('x', LEGEND_RECT_SIZE + LEGEND_TEXT_X_OFFSET)
    .attr('y', LEGEND_TEXT_Y_OFFSET)
    .text(function (d) {
      return d;
    });
});

function sumBySize(d) {
  return d.value;
}
