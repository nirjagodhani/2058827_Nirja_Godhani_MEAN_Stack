let http = require("http");
let url = require("url");
let fs = require("fs");
let HomePage = 
`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AddTask</title>

</head>
<body>
    <h2>Task Planner</h2>
    <br/>
    <a href="AddTask" role="button">Add Task</a>
    <a href="DeleteTask" role="button">Delete Task</a>
    <a href="ListTask" role="button">List Task</a>

</body>
</html>
`
let addTaskPage = 
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AddTask</title>

</head>
<body>
    <h2>Add Task</h2>
    <form action="addTaskData">
        <label>Emp Id:</label>
        <input type="text" name="empId" id="eid" required/><br/>
        <label >Task Id:</label>
        <input type="text" name="taskId" id="tid" required/><br/>
        <label >Task:</label>
        <input type="text" name="taskName" id="tname" required/><br/>
        <label >Deadline:</label>
        <input type="date" name="date" id="date" required/><br/>
        <input type="submit" value="Add Task">
        <a href="Home">Home </a>
    </form>
    
</body>
</html>`

let deleteTaskPage =
`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Delete Task</title>
</head>
<body>
    <h2>Delete Task</h2>
    <form action="deleteTaskData">
        <label>Task Id:</label>
        <input type="text" name="dtask" id="dtask"><br/>
        <input type="submit" value="Delete Task">
        <a href="Home">Home </a>
    </form>
</body>
</html>
`

let listTaskPage=
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>List Task</title>
</head>
<body>
    <h2>List Task</h2>

    <table border="1">
    <tr>
        <th>Emplooyee Id</th>
        <th>Task Id</th>
        <th>Task Name</th>
        <th>Date</th>
    </tr>
    
    <a href="Home">Home </a>
</body>
</html>`


let server = http.createServer((request,response)=>{
    let urlInfo = url.parse(request.url,true);

    if(urlInfo.path != "/favicon.ico"){
        if(urlInfo.path == "/AddTask"){
            response.write(addTaskPage);
        }else if(urlInfo.pathname == "/addTaskData"){
            let taskVar = urlInfo.query;
            let taskData = JSON.parse(fs.readFileSync("Data.json").toString());
            taskData.push(taskVar); 
            fs.writeFileSync("Data.json",JSON.stringify(taskData));

            response.writeHead(200,{"content-type":"text/html"});
            response.write(addTaskPage);
            response.write("Task Stored Successfully");       
        }
        else if(urlInfo.path == "/DeleteTask"){
            response.write(deleteTaskPage);
        }
        else if(urlInfo.pathname == "/deleteTaskData"){
            let taskVar = urlInfo.query;
            let taskData = JSON.parse(fs.readFileSync("Data.json").toString());
           
            let index = taskData.findIndex(cVar =>cVar.taskId == taskVar.dtask);
            response.writeHead(200,{"content-type":"text/html"});
            if (index != -1){
                taskData.splice(index,1);   
                fs.writeFileSync("Data.json",JSON.stringify(taskData));
                response.write(deleteTaskPage);
                response.write("Task Deleted successfully.");
            }else{
                response.write("Task Id is does not exist");
                response.write(deleteTaskPage);
            }
        }
        else if(urlInfo.path == "/ListTask"){
            response.write(listTaskPage);
          //get jason array data
            let taskData = JSON.parse(fs.readFileSync("Data.json").toString());
            taskData.find(l=>{
                response.write('<tr>');
                response.write('<td>');
                response.write(l.empId);
                response.write('</td>');
                response.write('<td>');
                response.write(l.taskId);
                response.write('</td>');
                response.write('<td>');
                response.write(l.taskName);
                response.write('</td>');
                response.write('<td>');
                response.write(l.date);
                response.write('</td>');
                response.write('</tr>');
               
            });
            response.write('</table>');

        }else if(urlInfo.path == "/Home"){
            response.write(HomePage);
        }
        else{
            response.write(HomePage);
        }
    }
    response.end();
     
});

server.listen(9090, ()=>console.log("server is running on port number 9090"));