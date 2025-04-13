function buttonClocked(){
    alert("vmi")
}


function limitRows(textarea, maxRows) {
    const lines = textarea.value.split('\n');
    if (lines.length > maxRows) {
        textarea.value = lines.slice(0, maxRows).join('\n');
    }
    const button = document.getElementById("submitButton");

    if (lines.length == maxRows && checkRows(lines[0].split(",").length,textarea.value)) {
        button.removeAttribute("disabled")
    }
    else {
        button.setAttribute("disabled","true");
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
