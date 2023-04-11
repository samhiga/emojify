/***
* This was inspired by Python https://numpy.org/doc/stable/reference/random/generated/numpy.random.choice.html 
* Example usage choice([1, 5, 2], 2) <- Gives 1,5 and 2 same chance of occurance i.e. 1/3
* Example usage choice([1, 5, 2], 2, [0.05, 0.8, 0.15]) <-- gives 1 5% chance, 5 80% chance and 2 15% chance to show up
*/
function choice(events, size, probability) {
    if(probability != null) {
      const pSum = probability.reduce((sum, v) => sum + v);
      if(pSum < 1 - Number.EPSILON || pSum > 1 + Number.EPSILON) {
        throw Error("Overall probability has to be 1.");
      }
      if(probability.find((p) => p < 0) != undefined) {
        throw Error("Probability can not contain negative values");
      }
      if(events.length != probability.length) {
        throw Error("Events have to be same length as probability");
      }
    } else {
      probability = new Array(events.length).fill(1/events.length);
    }

    var probabilityRanges = probability.reduce((ranges, v, i) => {
      var start = i > 0 ? ranges[i-1][1] : 0 - Number.EPSILON;
      ranges.push([start, v + start + Number.EPSILON]);
      return ranges;
    }, []);

    var choices = new Array();
    for(var i = 0; i < size; i++) {
      var random = Math.random();
      var rangeIndex = probabilityRanges.findIndex((v, i) => random > v[0] && random <= v[1]);
      choices.push(events[rangeIndex]);
    }
    return choices;
}