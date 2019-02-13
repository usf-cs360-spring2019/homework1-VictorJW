// This file counts the total number of incidents of every police district

var countFrequency = function(data){
  let count = d3.map();
  for (let i = 0; i < data.length; i++) {
    var tempArray = data[i]
    var policeDis = tempArray[23]

    if (count.has(policeDis)) {
      count.set(policeDis, count.get(policeDis) + 1);

    }
    else {
      count.set(policeDis, 1)
    }
  }

  return count;
}
