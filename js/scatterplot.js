/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

const svg3 = d3
  .select("#csv-scatter")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Build your scatterplot in this file 
d3.csv("data/scatter.csv").then((data) => {
  
    // Scatterplot1
    {
      let xKey1 = "x";
      let yKey1 = "y";
  
      // Find max x
      let maxX1 = d3.max(data, (d) => { return d[xKey1]; });
  
      // Create X scale
      let x1 = d3.scaleLinear()
                  .domain([0,maxX1])
                  .range([margin.left, width-margin.right]); 
      
      // Add x axis 
      svg3.append("g")
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
      svg3.append("g")
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
      const myCircles1 = svg3.selectAll("circle")
                              .data(data)
                              .enter()
                                .append("circle")
                                .attr("id", (d) => d.id)
                                .attr("cx", (d) => x1(d[xKey1]))
                                .attr("cy", (d) => y1(d[yKey1]))
                                .attr("r", 8)
                                .style("fill", (d) => color(d.Species))
                                .style("opacity", 0.5);
  
      //TODO: Define a brush (call it brush1)
      // let brush1;
  
      //TODO: Add brush1 to svg1
      
    }
});