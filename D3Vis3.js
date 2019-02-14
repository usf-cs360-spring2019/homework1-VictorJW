// This is a javascript code for the stacked bar chart prototype

var timeStats = function(){
  var count = d3.map();
  d3.csv("Data10.csv").then(function(data)
  {
    for (let i = 0; i < data.length; i++)
    {
      var hour = data[i].Incident_Time;
      if (count.has(hour))
      {
        count.set(hour, count.get(hour) + 1);
      }
      else
      {
        count.set(hour, 1);
      }
    }
    let svg = d3.select("body").select('#vis1');
    console.log(count);
  });
}
