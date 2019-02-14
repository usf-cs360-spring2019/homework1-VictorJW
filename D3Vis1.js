// This file counts the total number of incidents of every police district

var countFrequency = function(){
  var count = d3.map();
  d3.csv("processed_Data.csv").then(function(data)
  {
    for (let i = 0; i < data.length; i++)
    {
      var policeDis = data[i].PoliceDist;
      if (count.has(policeDis))
      {
        count.set(policeDis, count.get(policeDis) + 1);
      }
      else
      {
        count.set(policeDis, 1);
      }
    }
    let svg = d3.select("body").select('#vis1');

    let countMin = 0;
    let countMax = d3.max(count.values());

    let margin = {
    top:    15,
    right:  35, // leave space for y-axis
    bottom: 30, // leave space for x-axis
    left:   10
    };

    let bounds = svg.node().getBoundingClientRect();
    let plotWidth = bounds.width - margin.right - margin.left;
    let plotHeight = bounds.height - margin.top - margin.bottom;

    var countScale = d3.scaleLinear()
      .domain([countMin, countMax])
      .range([plotHeight, 0])
      .nice(); // rounds the domain a bit for nicer output

    var policeScale = d3.scaleBand()
      .domain(count.keys()) // all letters (not using the count here)
      .rangeRound([0, plotWidth])
      .paddingInner(0.1); // space between bars


    let plot = svg.select("g#plot");

    if (plot.size() < 1) {
      plot = svg.append("g").attr("id", "plot");
      plot.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    };
    let xAxis = d3.axisBottom(policeScale);
    let xGroup = plot.append("g").attr("id", "x-axis");
    xGroup.call(xAxis);
    xGroup.attr("transform", "translate(0," + plotHeight + ")");
    let yAxis = d3.axisRight(countScale);
    let yGroup = plot.append("g").attr("id", "y-axis");
    yGroup.call(yAxis);
    yGroup.attr("transform", "translate(" + plotWidth + ",0)");

    let bars = plot.selectAll("rect")
      .data(count.entries());

    bars.enter().append("rect")
      .attr("class", "bar")
      .attr("width", policeScale.bandwidth())
      .attr("x", function(d) {
        return policeScale(d.key);
      })
      .attr("y", function(d) {
        return countScale(d.value);
      })
      .attr("height", function(d) {
        return plotHeight - countScale(d.value);
      })
      .each(function(d, i, nodes) {
        console.log("Added bar for:", d.key);
      });
  });
};
