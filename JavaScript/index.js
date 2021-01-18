const Home = document.getElementById('Home');
const Visualize = document.getElementById('Visualize');
const Analyze = document.getElementById('Analyze');
const SC = document.getElementById('SC');
const HomeContainer = document.getElementById('Home_container');
const VisualizeContainer = document.getElementById('Visualize_container');
const AnalyzeContainer = document.getElementById('Analyze_container');
const SCContainer = document.getElementById('SC_container');
const card = document.getElementById("card");
const TableData = document.getElementById("Table");
const Scatter = document.getElementById("Scatter");
const Pie = document.getElementById("Pie");
const Bar = document.getElementById("Bar");
const Line = document.getElementById("Line");
const regression = document.getElementById("regression");
Home.addEventListener('click', ()=> {
    HomeContainer.style.display = 'flex';
    document.getElementById('workArea').style.display = 'none';
    document.getElementById('documentation').style.display = 'inline-block';
    VisualizeContainer.style.display = 'none';
    AnalyzeContainer.style.display = 'none';
    SCContainer.style.display = 'none';
})
Visualize.addEventListener('click', ()=> {
    document.getElementById('workArea').style.display = 'inline-block';
    document.getElementById('documentation').style.display = 'none';
    HomeContainer.style.display = 'none';
    VisualizeContainer.style.display = 'flex';
    AnalyzeContainer.style.display = 'none';
    SCContainer.style.display = 'none';
})
Analyze.addEventListener('click', ()=> {
    document.getElementById('workArea').style.display = 'inline-block';
    document.getElementById('documentation').style.display = 'none';
    HomeContainer.style.display = 'none';
    VisualizeContainer.style.display = 'none';
    AnalyzeContainer.style.display = 'flex';
    SCContainer.style.display = 'none';
})
SC.addEventListener('click', ()=> {
    document.getElementById('workArea').style.display = 'inline-block';
    document.getElementById('documentation').style.display = 'none';
    HomeContainer.style.display = 'none';
    VisualizeContainer.style.display = 'none';
    AnalyzeContainer.style.display = 'none';
    SCContainer.style.display = 'flex';
})

card.addEventListener('click', function(event) {
    var newCard = document.createElement('div');
    newCard.className = 'c';
    newCard.style.width = '90%';
    newCard.style.borderRadius = '10px';
    newCard.style.height = '50%';
    newCard.style.marginLeft = 'auto';
    newCard.style.marginRight = 'auto';
    newCard.style.marginTop = '3.5vh';
    newCard.style.marginBottom = '3.5vh'
    newCard.style.display = 'block';
    newCard.style.cursor = 'pointer';
    newCard.style.background = 'rgba(151, 86, 56, 0.583)';
    newCard.addEventListener('dblclick', function(e) {
        newCard.remove();
    })
    newCard.addEventListener('click', function(e) {
        if (newCard.style.border == '2px solid orange') {
            newCard.style.border = 'none'
            return
        }
        newCard.style.border = '2px solid orange';
        newCard.id = "active";
    })
    card.before(newCard);
})
TableData.addEventListener('click', function(e) {
    document.getElementById("TableTools").style.display = 'block';
    document.getElementById("LineTools").style.display = 'none';
    document.getElementById("PieTools").style.display = 'none';
    document.getElementById("BarTools").style.display = 'none';
    document.getElementById("ScatterTools").style.display = 'none';
    document.getElementById("regressionTools").style.display = 'none';
})
Line.addEventListener('click', function(e) {
    document.getElementById("LineTools").style.display = 'block';
    document.getElementById("TableTools").style.display = 'none';
    document.getElementById("PieTools").style.display = 'none';
    document.getElementById("BarTools").style.display = 'none';
    document.getElementById("ScatterTools").style.display = 'none';
    document.getElementById("regressionTools").style.display = 'none';
})
Pie.addEventListener('click', function(e) {
    document.getElementById("PieTools").style.display = 'block';
    document.getElementById("LineTools").style.display = 'none';
    document.getElementById("TableTools").style.display = 'none';
    document.getElementById("BarTools").style.display = 'none';
    document.getElementById("ScatterTools").style.display = 'none';
    document.getElementById("regressionTools").style.display = 'none';
})
Bar.addEventListener('click', function(e) {
    document.getElementById("BarTools").style.display = 'block';
    document.getElementById("LineTools").style.display = 'none';
    document.getElementById("PieTools").style.display = 'none';
    document.getElementById("TableTools").style.display = 'none';
    document.getElementById("ScatterTools").style.display = 'none';
    document.getElementById("regressionTools").style.display = 'none';
})
Scatter.addEventListener('click', function(e) {
    document.getElementById("ScatterTools").style.display = 'block';
    document.getElementById("LineTools").style.display = 'none';
    document.getElementById("PieTools").style.display = 'none';
    document.getElementById("BarTools").style.display = 'none';
    document.getElementById("TableTools").style.display = 'none';
    document.getElementById("regressionTools").style.display = 'none';
})
regression.addEventListener('click', ()=> {
    document.getElementById("regressionTools").style.display = 'block';
    document.getElementById("ScatterTools").style.display = 'none';
    document.getElementById("LineTools").style.display = 'none';
    document.getElementById("PieTools").style.display = 'none';
    document.getElementById("BarTools").style.display = 'none';
    document.getElementById("TableTools").style.display = 'none';
})
function loadFile(o) {
    var fr = new FileReader();
    fr.onload = function(e) {showDataFile(e,o)}
    fr.readAsText(o.files[0])
}
function showDataFile(e, o) {
    var getCSVData = e.target.result;
    var rows = getCSVData.split('\n');
    var html = '<table>'
    rows.forEach((data, index) => {
        html += '<tr>'
        var value = data.split(',')
        for (let i = 0; i < value.length; i++) {
            if (index > 0) {
                html += "<td class = blud>" + value[i] + "</td>"
            } else {
                html += "<td>" + value[i] + "</td>"
            }
        }
        html += "</tr>"
    })
    html += "</table>"
    let table = document.createElement('table')
    table.innerHTML = html.trim();
    table.className = 'table_data'
    act = document.getElementById('active')
    act.before(table);
    act.remove();
}

function addColumn() {
    var form = document.getElementById('bar_form');
    document.getElementById('add_column').remove();
    document.getElementById('remove_column').remove();
    var newHTML =
    `
    <p class="form_items bar_subscript">Choose Column Number (Count starts from 0)</p><input type="number" class="form_items inputs bar_items" id="scatter_xaxis"> <br class="bar_br">
    <button type="button" id="add_column" onclick="return addColumn()">Add Column</button>
    <button type="button" id="remove_column" onclick="return removeColumn()">Remove Column</button>

    `
    form.innerHTML += newHTML;
    return false;
}
function removeColumn() {
    var barItems = document.getElementsByClassName('bar_items')
    var subscript = document.getElementsByClassName('bar_subscript')
    var br = document.getElementsByClassName('bar_br')
    if (barItems.length <= 1) {
        alert('You should have at least one column')
        return false
    }
    subscript[subscript.length - 1].remove()
    barItems[barItems.length - 1].remove()
    br[br.length - 1].remove()
    return false;
}
function addCategory() {
    var form = document.getElementById('pie_form');
    document.getElementById('add_category').remove();
    document.getElementById('remove_category').remove();
    document.getElementById('create_pie').remove();
    var newHTML =
    `
    <p class="form_items subscript">Enter Category </p><input type="text" class="form_items inputs pie_items"> <br class="br">
    <p class="form_items subscript">Enter its quantity </p><input type="number" class="form_items inputs pie_items"> <br class="br">
    <button type="button" id="add_category" onclick="return addCategory()">Add Category</button>
    <button type="button" id="remove_category" onclick="return removeCategory()">Remove Category</button>
    <button type="button" id="create_pie" onclick="return createPie()">Create Pie Chart</button>

    `
    form.innerHTML += newHTML;
    return false;
}

function removeCategory() {
    var pieItems = document.getElementsByClassName('pie_items')
    var subscript = document.getElementsByClassName('subscript')
    var br = document.getElementsByClassName('br')
    if (pieItems.length <= 2) {
        alert('You should have at least one category')
        return false
    }
    subscript[subscript.length - 1].remove()
    subscript[subscript.length - 1].remove()
    pieItems[pieItems.length - 1].remove()
    pieItems[pieItems.length - 1].remove()
    br[br.length - 1].remove()
    br[br.length - 1].remove()
    return false;
}