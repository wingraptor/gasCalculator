let graph1 = document.getElementById("gas-prices");
let graph2 = document.getElementById("diesel-prices");

document.addEventListener("DOMContentLoaded", function(event) {
  if (graph1 || graph2) {
    Plotly.newPlot("gas-prices", data, layout1);
    Plotly.newPlot("diesel-prices", data2, layout2);
  }
});

// Gas Prices
var trace1 = {
  x: ["Jul'17", "Aug'17", "Sept'17", "Oct'17", "Nov'17", "Dec'17", "Jan'18", "Feb'18", "Mar'18", "Apr'18",
    "May'18", "Jun'18", "Jul'18"],
  y: [2.94, 3.16, 3.25, 3.38, 3.19, 3.27, 3.35, 3.29, 3.44, 3.31,
    3.40, 3.60, 3.96
  ],
  type: 'scatter'
};

var layout1 = {
  title: "Historical Gas Prices",
  autosize: true,
  xaxis: {
    title: ''
  },
  yaxis: {
    title: "Bds $/litre"
  },
  annotations: [
    {
      x: "Jul'17",
      y: 2.94,
      xref: 'x',
      yref: 'y',
      text: '$2.94',
      showarrow: true,
      arrowhead: 5,
      ax: 0,
      ay: -40
    },
    {
      x: "Jan'18",
      y: 3.35,
      xref: 'x',
      yref: 'y',
      text: '$3.35',
      showarrow: true,
      arrowhead: 5,
      ax: 0,
      ay: -40
    },
    {
      x: "Jul'18",
      y: 3.96,
      xref: 'x',
      yref: 'y',
      text: '$3.96',
      showarrow: true,
      arrowhead: 5,
      ax: 0,
      ay: -40
    },
  ]
};

var data = [trace1];

//  Diesel Prices
var trace2 = {
  x: ["Jul'17", "Aug'17", "Sept'17", "Oct'17", "Nov'17", "Dec'17", "Jan'18", "Feb'18", "Mar'18",
    "Apr'18", "May'18", "Jun'18", "Jul'18"],
  y: [2.13, 2.37, 2.35, 2.46, 2.37, 2.52, 2.58, 2.63, 2.60, 2.60,
    2.61, 2.80, 3.21],
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
  },
  annotations: [
    {
      x: "Jul'17",
      y: 2.15,
      xref: 'x',
      yref: 'y',
      text: '$2.15',
      showarrow: true,
      arrowhead: 5,
      ax: 0,
      ay: -40
    },
    {
      x: "Jan'18",
      y: 2.58,
      xref: 'x',
      yref: 'y',
      text: '$2.58',
      showarrow: true,
      arrowhead: 5,
      ax: 0,
      ay: -40
    },
    {
      x: "Jul'18",
      y: 3.21,
      xref: 'x',
      yref: 'y',
      text: '$3.21',
      showarrow: true,
      arrowhead: 5,
      ax: 0,
      ay: -40
    },
  ]
};
var data2 = [trace2];

// update the layout to expand to the available size
// when the window is resized
window.onresize = function () {
  Plotly.relayout("diesel-prices", {
    "xaxis.autorange": true,
    "yaxis.autorange": true
  });
  Plotly.relayout("gas-prices", {
    "xaxis.autorange": true,
    "yaxis.autorange": true
  });
};