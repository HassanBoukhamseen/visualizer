var i = 0;
function loadFileForLinePlot(o) {
    i += 1;
    var fr = new FileReader();
    fr.onload = function(e) {plotLine(e, o, i);};
    fr.readAsText(o.files[0]);
}
function plotLine(e, o, i) {
    var columnNumber = document.getElementById('line_plot_column').value;
    var uploadButton = document.getElementById('line_plot_uploader');
    uploadButton.value = ''
    var getCSVData = e.target.result;
    var rows = getCSVData.split("\n");
    var values = []
    rows.forEach((data, index) => { 
        var value = data.split(",");
        values.push(value);
    })
    if (columnNumber > values[0].length) {
        alert('invalid column number')
        return;
    }
    l = []
    s = []
    for (let i = 0; i < values.length; i++) {
        if (i == 0) {s.push(values[i][columnNumber])}
        else {s.push(parseInt(values[i][columnNumber]))}
        
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
            columns: [s]
        }, 
        axis: {
            x: {
                tick: {
                    culling: {
                        max: 10
                    }
                }
            },
            y: {
                tick: {
                    culling: {
                        max: 10
                    }
                }
            }
        },
        zoom: {
            enabled: true
        }
    });
}