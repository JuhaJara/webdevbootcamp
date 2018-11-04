var sep = "======================";
var faker = require("faker");

function printProducts(num)
{
    for (var i = 0; i < num; ++i)
    {
        console.log(faker.commerce.productName() + " - $" + faker.commerce.price());
    }
}

console.log(sep + "\nWELCOME TO MY SHOP\n" + sep);
printProducts(10);