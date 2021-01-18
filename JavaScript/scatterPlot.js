var i = 0;
function loadFileForScatterPlot(o) {
    console.log(o.files[0].name)
    i += 1;
    var fr = new FileReader();
    fr.onload = function(e) {plotScatter(e, o, i);};
    fr.readAsText(o.files[0]);
}
function plotScatter(e, o, i) {
    var xcolumn = document.getElementById('scatter_xaxis').value;
    var ycolumn = document.getElementById('scatter_yaxis').value;
    var uploadButton = document.getElementById('scatter_plot_uploader');
    uploadButton.value = ''
    var getCSVData = e.target.result;
    var rows = getCSVData.split("\n");
    var values = []
    rows.forEach((data, index) => { 
        var value = data.split(",");
        values.push(value);
    })
    if (xcolumn > values[0].length || ycolumn > values[0].length) {
        alert('invalid column number  for x or y')
        return;
    }
    xaxis = ['X']
    yaxis = ['Data']
    for (let i = 0; i < values.length; i++) {
        if (i > 0) {
            xaxis.push(parseInt(values[i][xcolumn]))
            yaxis.push(parseInt(values[i][ycolumn]))
        }   
    }
    var chartContainer = document.createElement('div');
    chartContainer.className = 'chart-container'
    chartContainer.innerHTML += "<br><br>"
    var chartPlot = document.createElement('div')
    chartPlot.id = `chart${i}`;
    chartPlot.className = `charts`;
    chartContainer.appendChild(chartPlot);
    act = document.getElementById('active')
    act.before(chartContainer);
    act.remove();
    var chart = c3.generate({
        bindto: `#chart${i}`,
        data: {
            xs: {
                Data: "X", 
            },
            columns: [xaxis,yaxis],
            type: 'scatter'
        },
        axis: {
            x: {
                tick: {
                    fit: false
                }
            },
        }
    });
}