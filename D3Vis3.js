// This is a javascript code for the stacked bar chart prototype

var drawPie = function(){
  var count = d3.map();
  d3.csv("data10.csv").then(function(data)
  {
    for (let i = 0; i < data.length; i++)
    {
      var hour = data[i].DayofWeek;
      if (count.has(hour))
      {
        count.set(hour, count.get(hour) + 1);
      }
      else
      {
        count.set(hour, 1);
      }
    }
    console.log(count);
    let svg = d3.select("body").select('#vis1');
    var percentage = d3.map();

    var countSize = function(){
      let total = 0;
      for (let i = 0; i < count.size(); i++)
      {
        total = total + count.values()[i];
      }
      console.log(total);
      return total;
    }
    var countPercentage = function(){
      let total = countSize();
      var percentage = d3.map();
      for (let j = 0; j < count.size(); j++)
      {
        percentage.set(count.keys()[j], count.values()[j]/total);
      }
      return percentage;
    }

    console.log(countPercentage().entries());
    var finalData = {
      size: 600,
      sectors: [
        {
          percentage: countPercentage().values()[0],
          label: countPercentage().keys()[0]
        },
        {
          percentage: countPercentage().values()[1],
          label: countPercentage().keys()[1]
        },
        {
          percentage: countPercentage().values()[2],
          label: countPercentage().keys()[2]
        },
        {
          percentage: countPercentage().values()[3],
          label: countPercentage().keys()[3]
        },
        {
          percentage: countPercentage().values()[4],
          label: countPercentage().keys()[4]
        },
        {
          percentage: countPercentage().values()[5],
          label: countPercentage().keys()[5]
        },
        {
          percentage: countPercentage().values()[6],
          label: countPercentage().keys()[6]
        }
      ]
    }

    function calculateSectors(finalData) {
      var sectors = [];
      var colors = ["#61C0BF", "#DA507A", "#BB3D49", "#DB4547", "#9ed900", "#00bc12", "#fff143"];

      var l = finalData.size / 2
      var a = 0 // Angle
      var aRad = 0 // Angle in Rad
      var z = 0 // Size z
      var x = 0 // Side x
      var y = 0 // Side y
      var X = 0 // SVG X coordinate
      var Y = 0 // SVG Y coordinate
      var R = 0 // Rotation

      finalData.sectors.map(function(item, key) {
        a = 360 * item.percentage;
        aCalc = ( a > 180 ) ? 360 - a : a;
        aRad = aCalc * Math.PI / 180;
        z = Math.sqrt( 2*l*l - ( 2*l*l*Math.cos(aRad) ) );
        if( aCalc <= 90 ) {
            x = l*Math.sin(aRad);
        }
        else {
            x = l*Math.sin((180 - aCalc) * Math.PI/180 );
        }

        y = Math.sqrt( z*z - x*x );
        Y = y;

        if( a <= 180 ) {
            X = l + x;
            arcSweep = 0;
        }
        else {
            X = l - x;
            arcSweep = 1;
        }

        sectors.push({
            percentage: item.percentage,
            label: item.label,
            color: colors[key],
            arcSweep: arcSweep,
            L: l,
            X: X,
            Y: Y,
            R: R
        });

        R = R + a;
    })
    return sectors
    }

    sectors = calculateSectors(finalData);
    var newSVG = document.createElementNS( "http://www.w3.org/2000/svg","svg" );
    newSVG.setAttributeNS(null, 'style', "width: "+finalData.size+"px; height: " + finalData.size+ "px");
    document.getElementsByTagName("svg")[2].appendChild(newSVG)


    sectors.map( function(sector) {

      var newSector = document.createElementNS( "http://www.w3.org/2000/svg","path" );
      newSector.setAttributeNS(null, 'fill', sector.color);
      newSector.setAttributeNS(null, 'd', 'M' + sector.L + ',' + sector.L + ' L' + sector.L + ',0 A' + sector.L + ',' + sector.L + ' 1 0,1 ' + sector.X + ', ' + sector.Y + ' z');
      newSector.setAttributeNS(null, 'transform', 'rotate(' + sector.R + ', '+ sector.L+', '+ sector.L+')');

      newSVG.appendChild(newSector);
    })

    let svg1 = d3.select("body").select("#vis3");
    svg1.append("text")
      .style("font-size", "16")
      .style("text-anchor", "start")
      .style("font-weight", "bold")
      .attr("transform", "translate(800 40)")
      .text("Incident Day of Week");

    var colors = ["#61C0BF", "#DA507A", "#BB3D49", "#DB4547", "#9ed900", "#00bc12", "#fff143"]
    let legend = svg1.selectAll(".legend")
      .data(colors)
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(30," + i * 13 + ")"; });


    legend.append("rect")
      .attr("x", 800)
      .attr("width", 10)
      .attr("height", 10)
      .attr("transform", "translate(-30,60)")
      .style("fill", function(d, i) {return colors.slice()[i];});

    legend.append("text")
      .style("font-size", "10")
      .style("text-anchor", "start")
      .attr("x", 400 + 5)
      .attr("y", 9)
      .attr("transform", "translate(380,60)")
      .text(function(d, i) {
        switch (i) {
          case 0: return "Sunday";
          case 1: return "Monday";
          case 2: return "Tuesday";
          case 3: return "Wednesday";
          case 4: return "Thursday";
          case 5: return "Friday";
          case 6: return "Saturday";

        }
      });

  });
}
