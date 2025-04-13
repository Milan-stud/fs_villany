


var checkedForBoth = false;


function buttonClocked(){
    alert("vmi")
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
