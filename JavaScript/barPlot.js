var i = 0;
function loadFileForBarPlot(o) {
    i += 1;
    var fr = new FileReader();
    fr.onload = function(e) {plotBar(e, o, i);};
    fr.readAsText(o.files[0]);
}
function plotBar(e, o, i) {
    var elements = []
    var form = document.getElementById('bar_form').elements;
    var uploadButton = document.getElementById('bar_plot_uploader');
    uploadButton.value = ''
    for (let i = 0; i < form.length - 1; i++) {
        elements.push(parseInt(form[i].value))
    }
    console.log("elements", elements);
    var getCSVData = e.target.result;
    var rows = getCSVData.split("\n");
    var values = []
    let bars = [];
    rows.forEach((data, index) => { 
        value = data.split(",");
        values.push(value);
    })

    elements.forEach((e, index)=>{
        console.log("current", e)
        console.log("index", index)
        bars.push([])
        for (let j = 0; j < values.length; j++) {
            bars[index].push(values[j][e]);
        }
    })
    console.log("bars", bars);
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
            columns: bars,
            type: 'bar'
        },
        bar: {
            width: {
                ratio: 0.5 
            }
        }
    });
}