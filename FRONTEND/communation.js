


var checkedForBoth = false;
const apiUrl = "http://127.0.0.1:5197/Consuption?price="
var responseData;
function buttonClicked() {
    const textarea = document.getElementById("limitedTextarea");
    const price = document.getElementById("kell");
    var text = textarea.value.replace(/\n/g, "-")
    text = apiUrl + kell.value + "&input=" + text;
    fetch(text, {
        method: "GET",
        mode: "cors",
        headers: {
            "accept": "text/plain"
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error on response")
            }
            return response.json();
        })
        .then(data => {
            responseData = data;
        })
        .then(() => {
            viewResponse();
        })
        .catch(error => {
            console.error("Error on fetching:", error);
        })

}

function viewResponseOld() {
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
const months = {
    0:"January",
    1:"February",
    2:"March",
    3:"April",
    4:"May",
    5:"June",
    6:"July",
    7:"August",
    8:"September",
    9:"October",
    10:"November",
    11:"December"
}
function viewResponse() {
    const table = document.getElementById("table-content")
    table.innerHTML = "";
    const thead = document.createElement("thead");
    const thM = document.createElement("th");
    thM.innerHTML = "Months";
    thead.appendChild(thM);
    Object.keys(responseData[0].costPerYear).forEach(year => {
        const th = document.createElement("th")
        th.textContent = year;
        th.classList.add("text-center")
        thead.appendChild(th)
    })
    const tbody = document.createElement("tbody");
    for (let j = 0; j < 12; j++) {
        const tr = document.createElement("tr");
        const tdM = document.createElement("td");
        tdM.innerHTML = months[j];
        tr.appendChild(tdM);
        Object.keys(responseData[0].costPerYear).forEach(year => {
            const td = document.createElement("td");
            td.textContent = responseData[0].cost[year][j]+ "Ft";
            td.classList.add("text-center");
            if (responseData[0].hasReduction[year]){
                td.classList.add("bg-success","text-white")
            }
            tr.appendChild(td);
        })

        tbody.appendChild(tr);
    }
    const trB = document.createElement("tr");
    tbody.appendChild(trB);
    const tdy = document.createElement("td");
    tdy.innerHTML = "Per Year:";
    trB.appendChild(tdy);
    Object.keys(responseData[0].costPerYear).forEach(year => {
        const tdcy = document.createElement("td");
        tdcy.classList.add("text-center");
        tdcy.innerHTML = responseData[0].costPerYear[year] + "Ft";
        trB.appendChild(tdcy);
        if (responseData[0].hasReduction[year]){
            tdcy.classList.add("bg-success","text-white")
        }
    })
    tbody.appendChild(trB);
    table.appendChild(thead);
    table.appendChild(tbody);
}




function limitPrice(text) {
    const button = document.getElementById("submitButton");

    if (text.value == "" || text.value == null) {
        checkedForBoth = false;
        button.setAttribute("disabled", "true");
    }
    else {
        button.removeAttribute("disabled");
        if (!checkedForBoth) {
            checkedForBoth = true;
            limitRows(document.getElementById("limitedTextarea"), 13);
        }
    }
}

function limitRows(textarea, maxRows) {
    const lines = textarea.value.split('\n');
    if (lines.length > maxRows) {
        textarea.value = lines.slice(0, maxRows).join('\n');
    }
    const button = document.getElementById("submitButton");

    if (lines.length >= maxRows && checkRows(lines[0].split(",").length, textarea.value)) {
        button.removeAttribute("disabled")
        if (!checkedForBoth) {
            checkedForBoth = true;
            limitPrice(document.getElementById("kell"))
        }
    }
    else {
        button.setAttribute("disabled", "true");
        checkedForBoth = false;
    }
}

function checkRow(number, line) {
    if (line.split(',').length == number) {
        return true;
    }
    return false;
}

function checkRows(number, lines) {
    var res = true;
    lines.split('\n').forEach(element => {
        if (!checkRow(number, element)) {
            res = false;
        }
    });
    return res;
}
