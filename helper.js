let graph1 = document.getElementById("gas-prices");
let graph2 = document.getElementById("diesel-prices");

// Gas Prices
var trace1 = {
  x: ["Jul'17", "Aug'17", "Sept'17", "Oct'17", "Nov'17", "Dec'17", "Jan'18", "Feb'18", "Mar'18", "Apr'18",
    "May'18", "Jun'18", "July'18"],
  y: [2.94, 3.16, 3.25, 3.38, 3.19, 3.27, 3.35, 3.29, 3.44, 3.31,
    3.40, 3.60, 3.96
  ],
  type: 'scatter'
};
var layout1 = {
  title: "Historical Gas Prices",
  autosize: true,
  xaxis: {
    title: ""
  },
  yaxis: {
    title: "Bds $/litre"
  }
};

var data = [trace1];

window.onresize = function() {
  Plotly.relayout("gas-prices", {
    "xaxis.autorange": true,
    "yaxis.autorange": true
  });
};

//  Diesel Prices
var trace2 = {
  x: ["Jul'17", "Aug'17", "Sept'17", "Oct'17", "Nov'17", "Dec'17", "Jan'18", "Feb'18", "Mar'18",
    "Apr'18", "May'18", "Jun'18", "July'18"],
  y: [2.37, 2.35, 2.46, 2.37, 2.52, 2.58, 2.63, 2.60, 2.60,
    2.61, 2.80],
  type: 'scatter'
};

var layout2 = {
  title: "Historical Diesel Prices",
  autosize: true,
  xaxis: {
    title: ''
  },
  yaxis: {
    title: 'Bds $/litre'
  }
};
var data2 = [trace2];

// update the layout to expand to the available size
// when the window is resized
window.onresize = function () {
  Plotly.relayout("diesel-prices", {
    "xaxis.autorange": true,
    "yaxis.autorange": true
  });
};

document.addEventListener("DOMContentLoaded", function (event) {
  if (graph1 || graph2) {
    Plotly.newPlot("gas-prices", data, layout1);
    Plotly.newPlot("diesel-prices", data2, layout2);
  }
});

/* Particles.js */

particlesJS("particles-js", {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#ff0909" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 5 },
      image: { src: "img/github.svg", width: 100, height: 100 }
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
    },
    size: {
      value: 3,
      random: true,
      anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#000000",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 6,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
      resize: true
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 1 } },
      bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
      repulse: { distance: 200, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 }
    }
  },
  retina_detect: true
});