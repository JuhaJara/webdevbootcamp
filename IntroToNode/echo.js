function average(array)
{
    var sum = 0;
    
    array.forEach(function(one){
        sum += one;
    })
    
    var av = sum / array.length;
    return av;
}

var scores = [90, 98, 100, 100, 86, 94]
var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];

var av1 = average(scores);
var av2 = average(scores2);

console.log("Average 1: " + av1);
console.log("Average 2: " + av2);