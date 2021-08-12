var counter : number =0;
let temp = [];
function addData(product:string, price:number)
{
   let btnId =  document.getElementById("value") as HTMLElement;
    btnId.innerHTML =  "" + counter;
    var x = {product:null,price:null};
    if(product != null){
        x = {
            'product': product,
            'price': price
        }
    }

    var cart = sessionStorage.getItem("cart");  
    if(cart) {
        temp = JSON.parse(cart);         
    }
    if(x.product!=null){
        temp.push(x);
    }
   
    sessionStorage.setItem("cart",JSON.stringify(temp));
   btnId.innerHTML = "" + temp.length;
}


function displayData(){
    const cart = sessionStorage.getItem("cart");
    const dataJson = JSON.parse(cart);    
    
    var startTable = "<table border = 1,text-align:Center><tr> <th>Product</th> <th>Price</th></tr>"  
    let tableContent = "";
    var row = document.createElement("tr")
    var total = 0;
    for  (var i in dataJson){
       tableContent += "<tr><td>"+dataJson[i].product +"</td>" + "<td>$"+dataJson[i].price +"</td><tr/>";
        total = total+dataJson[i].price;
    }
    
    var endTable = "</table>"
    tableContent = startTable+tableContent+endTable;
    tableContent = tableContent+"<br/>Total : $"+total.toString()
    document.getElementById("main").innerHTML=tableContent;
}


