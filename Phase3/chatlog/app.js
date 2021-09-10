let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let url = "mongodb://localhost:27017/tcsmean";
let app = express();
let http = require("http").Server(app);
let io = require("socket.io")(http);

app.use(bodyParser.urlencoded({extended:true}));

let chatSchema = mongoose.Schema({
    _id:Number,
    name:String,
    message:String
});

app.get("/", (request,response)=> {
    response.sendFile(__dirname+"\\indexPage.html");
});

io.on("connection", (socket)=> {
    console.log("Socket connected");

    socket.on("messageObj", (Obj)=> {
        let UserID = 1;

        mongoose.pluralize(null);
        mongoose.connect(url).then(res=>{}).catch(err=>console.log(err));

        let db = mongoose.connection;

        db.once("open", ()=> {
            let messageModel = mongoose.model("MessageLog", chatSchema);
            messageModel.find({}, (err,doc)=> {
                if (!err) {
                    doc.forEach(rec=> {
                        UserID = rec._id+1;
                    });
                }
                let msg = new messageModel({_id:UserID, name:Obj.username, message:Obj.messageIn});
                messageModel.insertMany([msg], (err,result)=> {
                    if (!err) {
                        const date = new Date().toLocaleTimeString();
                        console.log("("+date+") "+msg.name+": "+msg.message);
                    }
                    else {
                        console.log(err);
                    }
                    mongoose.disconnect();
                });
            });
        });
    });
});

http.listen(9090, ()=>console.log("Server running on port 9090"));
