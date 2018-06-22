let userInputs = [];
let isFaded = false;
const newTaxRate = 0.40;
const conversionMultiplier = 0.425144; //value to conver from mpg to kpl

//Fuel Rates From June 2016 Until June 2018
const petrolFuelRate = [
  2.85, 2.93, 2.85, 2.82, 2.91, 2.84, 2.91, 2.78, 2.98, 2.96, 2.97, 
  3, 3.18, 2.94, 3.16, 3.25, 3.38, 3.19, 3.27, 3.35, 3.29, 3.44, 3.31,
  3.40, 3.60
]
const dieselFuelRate = [
  1.99, 2.07, 2.04, 1.95, 2.09, 2.07, 2.12, 2.15, 2.17, 2.21, 2.28, 
  2.15, 2.13, 2.37, 2.35, 2.46, 2.37, 2.52, 2.58, 2.63, 2.60, 2.60,
  2.61, 2.80
]



function elementsFadeOut(){
  $(".form__inputs").fadeOut(function(){
    if(!isFaded){
      $(".section__cards").fadeIn();
      getInputs();
      isFaded = !isFaded;
    }
 });
}

$(".button__recalculate").on("click", function(){
  $(".section__cards").fadeOut(function(){
    $(".form__inputs").fadeIn();
  });
});

// Gets user inputs and pushes them to an array
function getInputs(){
  let odometerReadingKm = $("#odometer").val();
  let vehicleAge = $("#age").val();
  let fuelType = $("#fuel-type").val();
  let fuelEfficiencyMpg = $("#fuel-efficiency").val();
  userInputs.push(Number(fuelEfficiencyMpg));
  userInputs.push(Number(odometerReadingKm));
  userInputs.push(Number(vehicleAge));
  userInputs.push(fuelType);
}



// Calculates average rates of petrol from June 2016 to June 2018
function avgPetrolFuelRates(fuelRate){
  let sum = fuelRate[0];
  for(var i = 1; i < fuelRate.length; i++){
    sum += fuelRate[i];
  }
  return sum / fuelRate.length;
}

// Calculates average rates of diesel from June 2016 to June 2018
function avgDieselFuelRates(fuelRate){
  let sum = fuelRate[0];
  for(var i = 1; i < fuelRate.length; i++){
    sum += fuelRate[i];
  }
  return sum / fuelRate.length;
}

// Calculates total fuel costs from June 2016 to June 2018
function totalfuelCosts(){
  if (userInputs[3] === "Gas") {
    return totalFuelUsed() * avgPetrolFuelRates(petrolFuelRate);
  } else {
    return totalFuelUsed() * avgDieselFuelRates(dieselFuelRate);
  }
}

// Calculates yearly fuel costs from June 2016 to June 2018
function yearlyfuelCosts(){
  if (userInputs[3] === "Gas") {
    return yearlyFuelUsage() * avgPetrolFuelRates(petrolFuelRate);
  } else {
    return yearlyFuelUsage() * avgDieselFuelRates(dieselFuelRate);
  }
} 

// Calculates monthly fuel costs from June 2016 to June 2018
function monthlyFuelCosts(){
  if (userInputs[3] === "Gas") {
    return monthlyFuelUsage() * avgPetrolFuelRates(petrolFuelRate);
  } else {
    return monthlyFuelUsage() * avgDieselFuelRates(dieselFuelRate);
  }
} 

//Converts mpg to km/l
function mileageConverter(){
    return userInputs[0] * conversionMultiplier;
  }

// Calculates Total Amount of Fuel Used by Vehicle
function totalFuelUsed(){
  let kmPerLitre = mileageConverter();
  return userInputs[1] * kmPerLitre;
}

// Calculates Average Fuel Used Per Year
function yearlyFuelUsage(){
  return totalFuelUsed() / userInputs[2];
}

// Calculates Average Fuel Used Per Month
function monthlyFuelUsage(){
  return totalFuelUsed() / (userInputs[2] * 12);
}

// Calculates yearly taxes associated with new Fuel Tax

function yearlyFuelTaxes(){
    return yearlyFuelUsage() * newTaxRate;
}

// Calculates monthly taxes associated with new Fuel Tax
function monthlyFuelTaxes(){
  return monthlyFuelCosts() * newTaxRate;
}
