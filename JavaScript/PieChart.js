var i=0;
function createPie() {
    i++;
    var form = document.getElementById('pie_form').elements;
    var elements = []
    var piePieces = [];
    for (let i = 0; i < form.length - 2; i++) {
        if (i % 2 == 0) {elements.push(form[i].value)}
        else {elements.push(parseInt(form[i].value))}
    }
    var index1 = 0;
    var index2 = 0;
    elements.forEach((e)=>{
        console.log("current", e)
        console.log("index1", index1)
        console.log("index2", index2)
        if (index2 % 2 == 0) {
            piePieces.push([])
        }
        piePieces[index2].push(e)
        if (index1 % 2 == 1) {
            index2++;
        }
        index1++;

    })
    console.log(elements)
    console.log(piePieces)
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
            // iris data from R
            columns: piePieces,
            type : 'pie',
        }
    });
    return false;
}