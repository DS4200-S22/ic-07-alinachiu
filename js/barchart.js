/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 


// Set dimensions and margins for plots
const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 


// This code selects the div associated with the id hard-coded-bar
// and appends an svg to it with the given width, height, and viewBox attributes
const svg1 = d3
  .select("#hard-coded-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

/*

  Axes

*/ 

// This code determines the maximum y value is for the y-axis
let maxY1 = d3.max(data1, function(d) { return d.score; });

// This code sets the y-axis scale from 0 to the previously determined
// maximum y value and the range based on pre-set margin values 
let yScale1 = d3.scaleLinear()
            .domain([0,maxY1])
            .range([height-margin.bottom,margin.top]); 

// This code sets the x-axis scale for the barchart which is based on the names
// from the hardcoded data set (levels: A-G)
let xScale1 = d3.scaleBand()
            .domain(d3.range(data1.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

// Appends a g element to the SVG that is used to group svg shapes together
// more specifically, it appends the y axis to svg1
svg1.append("g")
   .attr("transform", `translate(${margin.left}, 0)`) 
   .call(d3.axisLeft(yScale1)) 
   .attr("font-size", '20px'); 

// Appends a g element to the SVG that is used to group svg shapes together
// more specifically, it appends the x axis to svg1
svg1.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale1) 
            .tickFormat(i => data1[i].name))  
    .attr("font-size", '20px'); 

/* 

  Tooltip Set-up  

*/

// This code selects the div associated with the id hard-coded-bar
// and appends a new div with the id tooltip1 that has a class tooltip
// ad currenly has opacity 0 (can't be seen).
const tooltip1 = d3.select("#hard-coded-bar") 
                .append("div") 
                .attr('id', "tooltip1") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

// This creates a constant that represents a function that
// allows for the tooltip to display information when the mouse is
// over the object
const mouseover1 = function(event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

// This creates a constant that represents a function that
// allows for the tooltip to follow the mouse while it is moving
// on the object
const mousemove1 = function(event, d) {
  tooltip1.style("left", (event.pageX)+"px") 
          .style("top", (event.pageY + yTooltipOffset) +"px"); 
}

// This creates a constant that represents a function that
// sets the tooltip opacity back to 0 (invisible) after the mouse
// leaves the object
const mouseleave1 = function(event, d) { 
  tooltip1.style("opacity", 0); 
}

/* 

  Bars 

*/

// This appends the rectangles associated with the bras in the barchart
// from the data1 hardcoded data set
svg1.selectAll(".bar") 
   .data(data1) 
   .enter()  
   .append("rect") 
     .attr("class", "bar") 
     .attr("x", (d,i) => xScale1(i)) 
     .attr("y", (d) => yScale1(d.score)) 
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) 
     .attr("width", xScale1.bandwidth()) 
     .on("mouseover", mouseover1) 
     .on("mousemove", mousemove1)
     .on("mouseleave", mouseleave1);



// This code selects the div associated with the id csv-bar
// and appends an svg to it with the given width, height, and viewBox attributes
const svg2 = d3
  .select("#csv-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);


// Build your scatterplot in this file 
d3.csv("data/scatter.csv").then((data) => {
  
  // We will need scales for all of the following charts to be global
  let x1, y1, x2, y2, x3, y3;  

  // We will need keys to be global
  let xKey1, yKey1, xKey2, yKey2, xKey3, yKey3;

  // Scatterplot1
  {
    // Find max x
    let maxX1 = d3.max(data, (d) => { return d[xKey1]; });

    // Create X scale
    let x1 = d3.scaleLinear()
                .domain([0,maxX1])
                .range([margin.left, width-margin.right]); 
    
    // Add x axis 
    svg2.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`) 
        .call(d3.axisBottom(x1))   
        .attr("font-size", '20px')
        .call((g) => g.append("text")
                      .attr("x", width - margin.right)
                      .attr("y", margin.bottom - 4)
                      .attr("fill", "black")
                      .attr("text-anchor", "end")
                      .text(xKey1)
      );

    // Finx max y 
    let maxY1 = d3.max(data, (d) => { return d[yKey1]; });

    // Create Y scale
    let y1 = d3.scaleLinear()
                .domain([0, maxY1])
                .range([height - margin.bottom, margin.top]); 

    // Add y axis 
    svg2.append("g")
        .attr("transform", `translate(${margin.left}, 0)`) 
        .call(d3.axisLeft(y1)) 
        .attr("font-size", '20px') 
        .call((g) => g.append("text")
                      .attr("x", 0)
                      .attr("y", margin.top)
                      .attr("fill", "black")
                      .attr("text-anchor", "end")
                      .text(yKey1)
      );

    // Add points
    svg2.append("g")
    .attr("transform", `translate(${margin.left}, 0)`) 
    .call(d3.axisLeft(yScale1)) 
    .attr("font-size", '20px'); 
 
    // Appends a g element to the SVG that is used to group svg shapes together
    // more specifically, it appends the x axis to svg1
    svg2.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`) 
        .call(d3.axisBottom(xScale1) 
             .tickFormat(i => data1[i].name))  
     .attr("font-size", '20px'); 

    //TODO: Define a brush (call it brush1)
    // let brush1;

    //TODO: Add brush1 to svg1
    
  }
});

