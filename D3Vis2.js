// This is a function to draw bar chart
var resolution = function(){
  var countArrest = d3.map();
  var countOpen = d3.map()
  var countOther = d3.map();
  d3.csv("processed_Data.csv").then(function(data){
    for (let i = 0; i < data.length; i++)
    {
      var date = data[i].Incident_Date;
      if (countArrest.has(date))
      {
        if (data[i].New_Resolution == "Cite or Arrest") {
          countArrest.set(date, countArrest.get(date) + 1);
        }

      }
      else
      {
        if (data[i].New_Resolution == "Cite or Arrest") {
          countArrest.set(date, 1);
        }
      }
    }
    for (let j = 0; j < data.length; j++)
    {
      var date = data[j].Incident_Date;
      if (countOpen.has(date))
      {
        if (data[j].New_Resolution == "Open or Active") {
          countOpen.set(date, countOpen.get(date) + 1);
        }

      }
      else
      {
        if (data[j].New_Resolution == "Open or Active") {
          countOpen.set(date, 1);
        }
      }
    }
    for (let k = 0; k < data.length; k++)
    {
      var date = data[k].Incident_Date;
      if (countOther.has(date))
      {
        if (data[k].New_Resolution == "Others") {
          countOther.set(date, countOther.get(date) + 1);
        }

      }
      else
      {
        if (data[k].New_Resolution == "Others") {
          countOther.set(date, 1);
        }
      }
    }
    console.log(countOpen.entries());
    console.log(countArrest.entries());
    console.log(countOther.entries());

    //Get each data point first
    let pointOpen = [];
    let dateArray = [];
    for (let i = 0; i < countOpen.size(); i++){
      pointOpen.push({"x": i, "y": countOpen.values()[i]});
      dateArray.push(i);
    };
    console.log(countOpen.size());
    console.log(pointOpen);

    let svg = d3.select("body").select("#vis2");

    let countMin = 0;
    let countMax = d3.max(countOpen.values());

    let margin = {
    top:    70,
    right:  40, // leave space for y-axis
    bottom: 30, // leave space for x-axis
    left:   60
    };

    let bounds = svg.node().getBoundingClientRect();
    let plotWidth = bounds.width - margin.right - margin.left;
    let plotHeight = bounds.height - margin.top - margin.bottom;

    var countScale = d3.scaleLinear()
      .domain([countMin, countMax])
      .range([plotHeight, 0])
      .nice(); // rounds the domain a bit for nicer output

    var monthScale = d3.scaleBand()
      .domain(dateArray) // all letters (not using the count here)
      .rangeRound([0, plotWidth])
      .paddingInner(0.1); // space between bars


    let plot = svg.select("g#plot");

    if (plot.size() < 1) {
      plot = svg.append("g").attr("id", "plot");
      plot.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    };
    let xAxis = d3.axisBottom(monthScale);
    let xGroup = plot.append("g").attr("id", "x-axis");
    xGroup.call(xAxis);
    xGroup.attr("transform", "translate(0," + plotHeight + ")");
    let yAxis = d3.axisLeft(countScale);
    let yGroup = plot.append("g").attr("id", "y-axis");
    yGroup.call(yAxis);
    yGroup.attr("transform", "translate(0,0)");

    var plotLine = d3.line()
      .x(function(d){
        return monthScale(d.x);
      })
      .y(function(d){
        return countScale(d.y);
      });

    var drawGraph = plot.append("path")
      .attr("d", plotLine(pointOpen))
      .attr("stroke", "#4751A5")
      .attr("stroke-width", 2)
      .attr("fill", "none");

    svg.append("text")
      .style("font-size", "22")
      .attr("y", margin.top/2)
      .attr("x", 10)
      .style("text-anchor", "start")
      .text("Open or Active Incidents Among Dec");

    plot.append("text")
      .style("font-size", "12")
      .attr("transform",
        "translate(" + (plotWidth/2) + " ,"
        + "-10)")
      .style("text-anchor", "middle")
      .text("Date of Month");

    plot.append("text")
      .style("font-size", "12")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 8)
      .attr("x", -(plotHeight/2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Number of Incidents");
  });
}
