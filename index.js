let userInputs = [];
let isFaded = false;
const newTaxRate = 0.40;
const conversionMultiplier = 0.425144; //value to conver from mpg to kpl
let outputSpans = document.getElementsByClassName("span__output");

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




// Allows specific Modal to be loaded to page on click of specific event
function modalManager(){
  $(".icon").on("click", function () {
    if ($(this).attr("id") === "taxes-info") {
      modalOpener("#taxes-info-modal");
      modalCloser("#taxes-info-modal");
    }
    else if ($(this).attr("id") === "expenses-info") {
      modalOpener("#expenses-info-modal");
      modalCloser("#expenses-info-modal");
    }
    else if ($(this).attr("id") === "fuel-info") {
      modalOpener("#fuel-info-modal");
      modalCloser("#fuel-info-modal");
    }
  });
}
// Adds the class that allows the modal to load to page
function modalOpener(ID){
  $(ID).addClass("is-active");
}

// Removes the modal from the page by removing the is-active class
function modalCloser(ID){
  $(ID + " .modal-background").on("click", function(){
    $(ID).removeClass("is-active");
  });
  $(ID + " .modal-card .modal-card-head .delete").on("click", function() {
    $(ID).removeClass("is-active");
  });
  $(ID + " .modal-background").on("click", function () {
    $(ID).removeClass("is-active");
  });
}

// Adds Calculated Outputs to Page
function outputInserter() {
  for (var i = 0; i < outputSpans.length; i++) {
    switch (outputSpans[i].getAttribute("id")) {
      case "taxes-yearly":
        outputSpans[i].textContent = "$" + yearlyFuelTaxes();
        break;
      case "taxes-monthly":
        outputSpans[i].textContent = "$" + monthlyFuelTaxes();
        break;
      case "taxes-perKm":
        outputSpans[i].textContent = "$" + taxesPerKm();
        break;
      case "spend-total":
        outputSpans[i].textContent = "$" + totalFuelCosts();
        break;
      case "spend-yearly":
        outputSpans[i].textContent = "$" + yearlyFuelCosts();
        break;
      case "spend-monthly":
        outputSpans[i].textContent = "$" + monthlyFuelCosts();
        break;
      case "fuel-total":
        outputSpans[i].textContent = totalFuelUsed();
        break;
      case "yearly-total":
        outputSpans[i].textContent = yearlyFuelUsage();
        break;
      case "monthly-total":
        outputSpans[i].textContent = monthlyFuelUsage();
        break;
    }
  }
}

//Fades out Input Fields on Click of Calculate button -- This also calls functions that returns data to page
function elementsFadeOut() {
  $(".form__inputs").fadeOut(function() {
    if (!isFaded) {
      $(".section__cards").fadeIn();
      scrollTop();
      getInputs();
      outputInserter();
      recalculate();
      modalManager();
      isFaded = !isFaded;
    }
  });
}

// When recalculate button is clicked; remove output cards from page and fade in inputs
function recalculate(){
  $(".button__recalculate").on("click", function () {
    // This removes event binder from recalc button after it is bound; this is important because each call of recalculate() adds a new binder
    // to button and therefore after multiple calls(x number of calls), if recalc button is clicked then the callback function is called x times on subsequent clicks
    $(".button__recalculate").unbind("click"); 
    $(".section__cards").fadeOut(function () {
      scrollTop();
      $(".form__inputs").fadeIn();
      isFaded = !isFaded;
    });
  });
}


// Gets user inputs and pushes them to an array
function getInputs() {
  let odometerReadingKm = $("#odometer").val();
  let vehicleAge = $("#age").val();
  let fuelType = $("#fuel-type").val();
  let fuelEfficiencyMpg = $("#fuel-efficiency").val();
  userInputs[0] = Number(fuelEfficiencyMpg);
  userInputs[1] = Number(odometerReadingKm);
  userInputs[2] = Number(vehicleAge);
  userInputs[3] = fuelType;
}


//Scroll Page to Top of Page on Function Call

function scrollTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// Calculates average rates of petrol from June 2016 to June 2018
function avgPetrolFuelRates(fuelRate) {
  let sum = fuelRate[0];
  for (var i = 1; i < fuelRate.length; i++) {
    sum += fuelRate[i];
  }
  return sum / fuelRate.length;
}

// Calculates average rates of diesel from June 2016 to June 2018
function avgDieselFuelRates(fuelRate) {
  let sum = fuelRate[0];
  for (var i = 1; i < fuelRate.length; i++) {
    sum += fuelRate[i];
  }
  return sum / fuelRate.length;
}

// Calculates total fuel costs from June 2016 to June 2018
function totalFuelCosts() {
  if (userInputs[3] === "Gas") {
    return (totalFuelUsed() * avgPetrolFuelRates(petrolFuelRate)).toFixed(2);
  } else {
    return (totalFuelUsed() * avgDieselFuelRates(dieselFuelRate)).toFixed(2);
  }
}

// Calculates yearly fuel costs from June 2016 to June 2018
function yearlyFuelCosts() {
  if (userInputs[3] === "Gas") {
    return (yearlyFuelUsage() * avgPetrolFuelRates(petrolFuelRate)).toFixed(2);
  } else {
    return (yearlyFuelUsage() * avgDieselFuelRates(dieselFuelRate)).toFixed(2);
  }
}

// Calculates monthly fuel costs from June 2016 to June 2018
function monthlyFuelCosts() {
  if (userInputs[3] === "Gas") {
    return (monthlyFuelUsage() * avgPetrolFuelRates(petrolFuelRate)).toFixed(2);
  } else {
    return (monthlyFuelUsage() * avgDieselFuelRates(dieselFuelRate)).toFixed(2);
  }
}

//Converts mpg to km/l
function mileageConverter() {
  return userInputs[0] * conversionMultiplier;
}

// Calculates Total Amount of Fuel Used by Vehicle
function totalFuelUsed() {
  let kmPerLitre = mileageConverter();
  return (userInputs[1] / kmPerLitre).toFixed();
}

// Calculates Average Fuel Used Per Year
function yearlyFuelUsage() {
  return (totalFuelUsed() / userInputs[2]).toFixed();
}

// Calculates Average Fuel Used Per Month
function monthlyFuelUsage() {
  return (totalFuelUsed() / (userInputs[2] * 12)).toFixed();
}

// Calculates yearly taxes associated with new Fuel Tax

function yearlyFuelTaxes() {
  return (yearlyFuelUsage() * newTaxRate).toFixed(2);
}

// Calculates monthly taxes associated with new Fuel Tax
function monthlyFuelTaxes() {
  return (monthlyFuelUsage() * newTaxRate).toFixed(2);
}

function taxesPerKm(){
  return (newTaxRate / mileageConverter() * 100).toFixed(2);
}

particlesJS("particles-js", { "particles": { "number": { "value": 80, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#ff0909" }, "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 5 }, "image": { "src": "img/github.svg", "width": 100, "height": 100 } }, "opacity": { "value": 0.5, "random": false, "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false } }, "size": { "value": 3, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } }, "line_linked": { "enable": true, "distance": 150, "color": "#000000", "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 6, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true }, "modes": { "grab": { "distance": 400, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 }, "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } } }, "retina_detect": true }); var count_particles, stats, update; stats = new Stats; stats.setMode(0); stats.domElement.style.position = 'absolute'; stats.domElement.style.left = '0px'; stats.domElement.style.top = '0px'; document.body.appendChild(stats.domElement); count_particles = document.querySelector('.js-count-particles'); update = function () { stats.begin(); stats.end(); if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) { count_particles.innerText = window.pJSDom[0].pJS.particles.array.length; } requestAnimationFrame(update); }; requestAnimationFrame(update);;