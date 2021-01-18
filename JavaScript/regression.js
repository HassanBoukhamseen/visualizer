const {PythonShell} = require('python-shell');
function lf(o) {
  var fr = new FileReader();
  fr.onload = function(e) {python_regression(o);};
  fr.readAsText(o.files[0]);
}
var i = 0;
function python_regression(o) {
    i++;
    let options = {
        mode: 'text',
        pythonOptions: ['-u'], 
        scriptPath: './regression_scripts/',
        args: [o.files[0].path]
      };
      
      results = PythonShell.run('./decision_tree_regression.py', options, function (err, results) {
        if (err) throw err;
        let [output, feature_results] = foo(results);
        toTable(output, feature_results)
        accuracyBar(feature_results[1], output);
        o.value = '';
      });
}

function foo(results) {
  table_results = results.slice(0, results.length-4)
  feature_results = results.slice(results.length-4, results.length)
  var output = []
  table_results.forEach((row, index) => {
    if (index == 0) {
      row = row.replace("[[", "")
      row = row.replace("]", "")
    } else if (index == table_results.length - 1) {
      row = row.replace("[", "")
      row = row.replace("]]", "")
    } else {
      row = row.replace("[", "")
      row = row.replace("]", "")
    }
    row = row.trim()
    row = row.split(" ")
    row = row.filter((n) => {return n != ''});
    row.forEach((r, i)=> {
      row[i] = parseFloat(r);
    })
    output.push(Array.from(row))
  })
  return [output, feature_results]
}

function toTable(output, feature_results, per) {
    var html = '<table>';
    html += "<tr>";
    html += "<td>Predicted Value</td>"
    html += "<td>True Value</td>"
    html += "</tr>";
    true_val = ['True Value']
    pred_val = ['Predicted Value']
    output.splice(0,20).forEach((row, index) => {
        html += "<tr>";
        for (let i = 0; i < row.length; i++) {
            html += "<td>" + row[i] + "</td>";  
        }
        html += "</tr>";
        pred_val.push(row[0])
        true_val.push(row[1])
    });
    html += '</table>';
    let table = document.createElement('table')
    table.innerHTML = html.trim();
    table.className = "model_values"
    var chartContainer = document.createElement('div');
    chartContainer.className = 'model'
    chartContainer.innerHTML += "<br><br>"
    chartContainer.style.display = 'flex';
    let features = document.createElement('div');
    features.id="features_container"
    features.innerHTML += 
    `
    <li class=list_items><div class=features> ${feature_results[0]} <div></li>
    <li class=list_items><div class=features> ${feature_results[1]} <div></li>
    <li class=list_items><div class=features> ${feature_results[2]}  <div></li>
    <li class=list_items><div class=features> ${feature_results[3]} <div></li>
    `
    var chartPlot = document.createElement('div')
    chartPlot.id = `chart${i}`;
    chartPlot.className = `charts`;
    chartContainer.appendChild(chartPlot);
    chartContainer.appendChild(features)
    var act = document.getElementById('active')
    var compFigureContainer = document.createElement('div')
    compFigureContainer.innerHTML += '<br><br>'
    compFigureContainer.style.width = '700px'
    compFigureContainer.style.marginTop = '25px'
    compFigureContainer.style.marginLeft = 'auto'
    compFigureContainer.style.marginRight = 'auto'
    compFigureContainer.style.display = 'block'
    compFigureContainer.style.background = 'white'
    compFigureContainer.style.borderRadius = '20px'
    compFigureContainer.style.padding = '20px'
    var compFigure = document.createElement('div')
    compFigure.id = `chart${i*100}`;
    compFigure.style.marginLeft = 'auto'
    compFigure.style.marginRight = 'auto'
    compFigure.style.display = 'block'
    compFigureContainer.appendChild(compFigure)
    act.before(chartContainer);
    act.before(compFigureContainer);
    act.before(table);
    act.remove();
    var x = i*100
    var chart2 = c3.generate({
        bindto: `#chart${x}`,
        data: {
            columns: [pred_val.splice(0,30), true_val.splice(0, 30)]
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
function accuracyBar(percentage, output) {
    var chart = c3.generate({
        bindto: `#chart${i}`,
        data: {
            columns: [
                ['R-Value', parseFloat(percentage.substring(percentage.indexOf('=') + 1, percentage.length))],
            ],
            type: 'gauge',
        },
        color: {
            pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
            threshold: {
                values: [30, 60, 90, 100]
            }
        },
        size: {
        width: 200,
        }
    });
}