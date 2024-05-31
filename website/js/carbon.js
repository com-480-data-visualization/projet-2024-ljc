//////////////////////////////////////////////////////////////////////////////
/* Title animation by @DotOnion (https://codepen.io/alvarotrigo/pen/eYEqPZa)*/
//////////////////////////////////////////////////////////////////////////////
const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2")
};

const texts = [
    "Greenhouse",
    "Gas",
    "Emissions",
];

const morphTime = 1;
const cooldownTime = 0.25;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
    }

    setMorph(fraction);
}

function setMorph(fraction) {
    elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
    morph = 0;

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
}

function animate() {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
        if (shouldIncrementIndex) {
            textIndex++;
        }

        doMorph();
    } else {
        doCooldown();
    }
}

animate();
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////


var body = d3.select("body");

// Add a tooltip to allows the display of data on mouse hover
var tooltip = body.append("div")
  .attr("class", "tooltip")
  .attr("id", "tooltip")
  .style("opacity", 0);

// Data on greenhouse gaz emissions: ['field', 'svg path', 'x position of text', 'colorIndex', 'co2eq value', 'co2eq percent value']
const parts_co2 = [
    ["Fabric", "M 16 -9 L -16 -9 L -16 -10 L -16 -9 L -31 -9 L -16 -24 L -8 -24 C -8 -16 8 -16 8 -24 L 16 -24 L 31 -9 L 16 -9 L 16 -10 Z", -13, 8, 2.74, 31],
    ["Spinning", "M 16 -9 L -16 -9 L -16 -5 L 16 -5 Z " +
    "M -16 -9 L -31 -9 L -32 -8 L -29 -5 L -17.35 -5 L -16 -6 Z " +
    "M 16 -9 L 31 -9 L 32 -8 L 29 -5 L 17.35 -5 L 16 -6 Z", -7, 7, 0.72, 8],
    ["Knitting", "M 16 -1 L -16 -1 L -16 -5 L 16 -5 Z " +
    "M -25 -1 L -29 -5 L -17.35 -5 L -22.67 -1 Z " +
    "M 25 -1 L 29 -5 L 17.35 -5 L 22.67 -1 Z", -3, 6, 0.76, 9],
    ["Ennoblement", "M 16 12 L 16 -1 L -16 -1 L -16 12 Z " +
    "M 25 -1 L 24 0 L 22.67 -1 Z " +
    "M -25 -1 L -24 0 L -22.67 -1 Z", 5.5, 5, 2.5, 28],
    ["Manufacture", "M 16 12 L 16 16 L -16 16 L -16 12 Z", 14, 4, 0.78, 9],
    ["Transport", "M 16 20 L 16 16 L -16 16 L -16 20 Z", 18, 3, 0.69, 8],
    ["Use", "M 16 20 L 16 23 L -16 23 L -16 20 Z", 21.5, 2, 0.53, 6],
    ["End of life", "M 16 24 L 16 23 L -16 23 L -16 24 Z", 23.5, 1, 0.2, 2],
]

//For each field, add their part of the t-shirt
var i;
for (i=7; i>=0; --i) {    
    var p = d3.select(".t-shirt").append("g")
        .attr("class", "part")
        .attr("id", "part" + (i+1))
        .attr("data-index", i)
        .on("mousemove", function (d) { //Add the display of the value on mouse hover
            var index = Number(this.getAttribute('data-index'))
            var clr2 = "var(--orange" + (Number(index)+1) + ")"
            var clr1 = "var(--orange" + parts_co2[index][3] + ")"

            tooltip.style("opacity", 1);
            tooltip.style("color", clr1);
            tooltip.style("text-align", "left");
            tooltip.html(
                    parts_co2[index][4] + " kg of CO<sub>2</sub>eq (" + parts_co2[index][5] +"%)" )
                .style("left", d3.event.pageX + 10 + "px")
                .style("top", d3.event.pageY - 28 + "px")
                .style("background-color", clr2)
                .style("font-size", "20px");
            d3.select("#part"+(index+1)).style("fill-opacity", 0.7);
          })
          .on("mouseout", function (d) {
            tooltip.style("opacity", 0);
            var index = Number(this.getAttribute('data-index'))
            d3.select("#part"+(index+1)).style("fill-opacity", 1);
          });
          
    //Add the svg path
    p.append("path")
        .attr("d", parts_co2[i][1])
        .attr("fill", "var(--orange" + (i+1) + ")")

    //Add the name of the field on each part
    var fontsize;
    if (i == 7) { fontsize = 1; } else { fontsize = 2; }

    p.append("text")
        .attr("x", "0")
        .attr("y", parts_co2[i][2])
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("font-size", fontsize)
        .attr("fill", "var(--orange" + parts_co2[i][3] + ")") 
        .text(parts_co2[i][0])
    
}