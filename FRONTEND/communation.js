


var checkedForBoth = false;
const apiUrl = "http://localhost:5197/Consuption?price="
var responseData;
function buttonClicked(){
    const textarea = document.getElementById("limitedTextarea");
    const price = document.getElementById("kell");
    var text = textarea.value.replace(/\n/g,"-")
    text = apiUrl + kell.value + "&input=" + text;
    fetch(text,{
        method: "GET",
        headers: {
            "accept": "text/plain"
        }
    })
    .then(response => {
        if (!response.ok){
            throw new Error("Error on response")
        }
        return response.json();
    })
    .then(data=>{
        responseData = data;
    })
    .then(()=>{
        viewResponse();
    })
    .catch(error => {
        console.error("Error on fetching:",error);
    })
    
}

function viewResponseOld(){
    const tbody = document.getElementById("table-content");
    tbody.innerHTML = "";

// Create rows for costPerYear
Object.keys(responseData[0].costPerYear).forEach(year => {
  const row = document.createElement("tr");

  // Apply green background if hasReduction is true for the year
  if (responseData[0].hasReduction[year]) {
    row.classList.add("table-success");
  }

  const yearCell = document.createElement("td");
  yearCell.textContent = year;

  row.appendChild(yearCell);

  const costCell = document.createElement("td");
  costCell.textContent = responseData[0].costPerYear[year];
  row.appendChild(costCell);

  tbody.appendChild(row);
});
}

function viewResponse(){
    const table = document.getElementById("table-content")
    table.innerHTML = "";
    const thead = document.createElement("thead");
    Object.keys(responseData[0].costPerYear).forEach(year=>{
        const th = document.createElement("th")
        th.textContent = year;
        thead.appendChild(th)
    })
    table.appendChild(thead);
}




function limitPrice(text){
    const button = document.getElementById("submitButton");

    if (text.value == "" || text.value == null) {
        checkedForBoth = false;
        button.setAttribute("disabled","true");
    }
    else {
        button.removeAttribute("disabled");
        if(!checkedForBoth) {
            checkedForBoth = true;
            limitRows(document.getElementById("limitedTextarea"),13);
        }
    }
}

function limitRows(textarea, maxRows) {
    const lines = textarea.value.split('\n');
    if (lines.length > maxRows) {
        textarea.value = lines.slice(0, maxRows).join('\n');
    }
    const button = document.getElementById("submitButton");

    if (lines.length >= maxRows && checkRows(lines[0].split(",").length,textarea.value)) {
        button.removeAttribute("disabled")
        if(!checkedForBoth) {
            checkedForBoth = true;
            limitPrice(document.getElementById("kell"))
    }
    }
    else {
        button.setAttribute("disabled","true");
        checkedForBoth = false;
    }
}

function checkRow(number,line){
    if (line.split(',').length==number) {
        return true;
    }
    return false;
}

function checkRows(number,lines){
    var res = true;
    lines.split('\n').forEach(element => {
        if (!checkRow(number,element)){
            res = false;
        }
    });
    return res;
}
