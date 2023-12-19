let myGraph = document.getElementById('myGraph');
let myGraph2 = document.getElementById('myGraph2');
let myGraph3 = document.getElementById('myGraph3');

setInterval(function(){
    d3.json(dataURL).then(getJSON_data);
},2000);

function unpack(rows, key){
    return rows.map(function(row){
        return parseFloat(row[key]);
    });
}

function getJSON_data(rows){
    console.log(rows);

    //本次輸入成績雷達圖
    let trace1 = {};
    let i =  unpack(rows,"id").length -1;
    trace1.type = "scatterpolar";
    trace1.r = [unpack(rows,"Chinese")[i], 
                unpack(rows,"English")[i], 
                unpack(rows,"Math")[i], 
                unpack(rows,"Science")[i],
                unpack(rows,"Society")[i],
                unpack(rows,"Chinese")[i]];
    trace1.theta = ['Chinese','English','Math','Science','Society','Chinese'];
    trace1.fill = 'toself';
    trace1.name = "本次成績總覽";

    let data = [];
    data.push(trace1);

    let layout ={
        margin:{
            t:50
        },
        title:"本次成績總覽",
        polar:{
            radialaxis:{
                visible:true,
                range:[0,100]
            }
        }
    }
    Plotly.newPlot(myGraph,data,layout)

    //歷次各科成績平均雷達圖
    let trace2 = {};

    function getAverage(array) {
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
          sum += array[i];
        }
        return sum/array.length;
    }

    trace2.type = "scatterpolar";
    trace2.r = [getAverage(unpack(rows,"Chinese")), 
                getAverage(unpack(rows,"English")), 
                getAverage(unpack(rows,"Math")), 
                getAverage(unpack(rows,"Science")),
                getAverage(unpack(rows,"Society")),
                getAverage(unpack(rows,"Chinese"))];
    trace2.theta = ['Chinese','English','Math','Science','Society','Chinese'];
    trace2.fill = 'toself';
    trace2.name = "歷次成績平均";

    let data2 = [];
    data2.push(trace2);

    let layout2={
        margin:{
            t:50
        },
        title:"歷次成績平均",
        polar:{
            radialaxis:{
                visible:true,
                range:[0,100]
            }
        }
    }
    Plotly.newPlot(myGraph2,data2,layout2)

    //各科成績變遷折線圖
    let trace3 = {};
    trace3.mode = "lines+markers";
    trace3.type = "scatter";
    trace3.name = "Chinese";
    trace3.marker = {
        size:10,
    }
    trace3.x=unpack(rows,"id");
    trace3.y=unpack(rows,"Chinese");


    let trace4 = {};
    trace4.mode = "lines+markers";
    trace4.type = "scatter";
    trace4.name = "English";
    trace4.marker = {
        size:10,
    }
    trace4.x=unpack(rows,"id");
    trace4.y=unpack(rows,"English");

    let trace5 = {};
    trace5.mode = "lines+markers";
    trace5.type = "scatter";
    trace5.name = "Math";
    trace5.marker = {
        size:10,
    }
    trace5.x=unpack(rows,"id");
    trace5.y=unpack(rows,"Math");

    let trace6 = {};
    trace6.mode = "lines+markers";
    trace6.type = "scatter";
    trace6.name = "Science";
    trace6.marker = {
        size:10,
    }
    trace6.x=unpack(rows,"id");
    trace6.y=unpack(rows,"Science");

    let trace7 = {};
    trace7.mode = "lines+markers";
    trace7.type = "scatter";
    trace7.name = "Society";
    trace7.marker = {
        size:10,
    }
    trace7.x=unpack(rows,"id");
    trace7.y=unpack(rows,"Society");
    
    let data3 = [];
    data3.push(trace3);
    data3.push(trace4);
    data3.push(trace5);
    data3.push(trace6);
    data3.push(trace7);
    let layout3 = {
        margin:{
            t:50
        },
        title:"歷次各科成績比較",
        xaxis: {
            title: '考試編號',
            dtick: 1
          },
          yaxis: {
            title: '分數',
            dtick: 10
          },
    };
    Plotly.newPlot(myGraph3, data3, layout3);



    let pre_data = [
        unpack(rows,"Chinese")[i-1], 
        unpack(rows,"English")[i-1], 
        unpack(rows,"Math")[i-1], 
        unpack(rows,"Science")[i-1],
        unpack(rows,"Society")[i-1],
    ];

    let cur_data = [
        unpack(rows,"Chinese")[i], 
        unpack(rows,"English")[i], 
        unpack(rows,"Math")[i], 
        unpack(rows,"Science")[i],
        unpack(rows,"Society")[i],
    ];

    let pre_average = getAverage(pre_data);
    let cur_average = getAverage(cur_data);

    if (cur_average > pre_average) {
        //若輸入成績總和大於上一筆資料，顯示做得真好圖;若小於，則顯示繼續加油圖。
        document.getElementById("imageGreater").style.display = "block"; 
        document.getElementById("imageSmaller").style.display = "none";        
    }
    else {
        document.getElementById("imageGreater").style.display = "none"; 
        document.getElementById("imageSmaller").style.display = "block";
    }
}