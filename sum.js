function sum(num1,num2) { 
    return num1 + num2;
}

function hiName(name) {
    let greeting = "Hello " + name
    return greeting;
}

//console.log(hiName("Vance"));

module.exports = {sum, hiName}; 