let myGraph = document.getElementById("myGraph");
let myGraph2 = document.getElementById("myGraph2");
let myGraph3 = document.getElementById("myGraph3");

console.log(visa_data);

let trace1 = {};
trace1.type = "scatter";
trace1.mode = "lines+markers";
trace1.name = "人數總和"

trace1.x = [];
trace1.y = [];

for(let i = 0; i < visa_data.length; i++){
    trace1.x[i] = visa_data[i]["年度"];
    trace1.y[i] = visa_data[i]["總和"];
}

console.log("trace1.x: ", trace1.x);
console.log("trace1.y: ", trace1.y);

let data = [];
data.push(trace1);

let layout = {
    margin: {
        t: 50
    },
    title:"歷年我國學生赴主要留學國家留學簽證人數變化折線圖",
    xaxis:{
        title: "年度",
        dtick: 1,
        showline:true
    },
    yaxis:{
        title: "人數",
        dtick: 5000,
        showline:true
    }
};

let trace2 = {};
trace2.type = "pie";
trace2.labels = [];
trace2.values = [];

let excludedLabels = ["年度", "總和"];
trace2.labels = Object.keys(visa_data[9]).filter(label => !excludedLabels.includes(label));
trace2.values = Object.values(visa_data[9]).filter((value, index) => !excludedLabels.includes(Object.keys(visa_data[9])[index]));

console.log("trace2.labels: ", trace2.labels);
console.log("trace2.values: ", trace2.values);

let data2 = [];
data2.push(trace2);

let layout2 = {
    margin:{
        t:50,
        l:10,
    },
    title:"2022年度我國學生赴主要留學國家留學簽證人數比例圖"
};

let trace3 = {};
trace3.type = "bar";
trace3.x = [];
trace3.y = [];

for(let x = 0; x < visa_data.length; x++){
    trace3.x[x] = visa_data[x]["年度"];
    trace3.y[x] = visa_data[x]["美國"];
}

console.log("trace3.x: ", trace3.x);
console.log("trace3.y: ", trace3.y);

let data3 = [];
data3.push(trace3);

let layout3 = {
    margin:{
        t:40
    },
    title:"歷年我國學生赴美國留學簽證人數變化直條圖",
    xaxis:{
        title: "年度",
        dtick: 1,
        showline:true
    },
    yaxis:{
        title: "人數",
        dtick: 5000,
        showline:true
    }
};

Plotly.newPlot(myGraph, data, layout);
Plotly.newPlot(myGraph2, data2, layout2);
Plotly.newPlot(myGraph3, data3, layout3);