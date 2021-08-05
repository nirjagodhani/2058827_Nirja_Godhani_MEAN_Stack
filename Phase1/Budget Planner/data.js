function StoreData(){
if(sessionStorage.getItem("Key")==undefined){
    var tempArray = [];
    var tempArrayString = JSON.stringify(tempArray);
    sessionStorage.setItem("Key",tempArrayString);
}
    let a = document.getElementById("ClientName").value;
    let b = document.getElementById("ProjectName").value;
    let c = document.getElementById("Budget").value;
    let newBudget = {ClientName:a,ProjectName:b,Budget:c};
    
    tempArrayString = sessionStorage.getItem("Key");
    tempArray = JSON.parse(tempArrayString);
    tempArray.push(newBudget);

    tempArrayString = JSON.stringify(tempArray);
    sessionStorage.setItem("Key",tempArrayString);
}

function displayBudgets(){
    tempArrayString = sessionStorage.getItem("Key");
    tempArray = JSON.parse(tempArrayString);
    let totalBudget = 0;
    let tableContents="";
    let startTable ="<table border=1><tr><th>Client Name</th><th>Project Name</th><th>Budget</th></tr>";
    let endTable="</table>";
    for (let i=0;i<tempArray.length; i++){
        tableContents+="<tr><td>"+tempArray[i].ClientName+"</td><td>"+tempArray[i].ProjectName+"</td><td>$"+tempArray[i].Budget+"</td></tr>"

        totalBudget+=parseFloat(tempArray[i].Budget)
    }

    tableContents =startTable+tableContents+endTable;
    tableContents = tableContents+"<br/>Total Budget: $"+totalBudget.toString()
    document.getElementById("table").innerHTML=tableContents;
}