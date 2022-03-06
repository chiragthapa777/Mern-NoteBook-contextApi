// mongodb+srv://chirag:<password>@cluster0.62pbo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const mongoose = require("mongoose");
const mongoURI="mongodb+srv://chirag:chiragthapa@cluster0.62pbo.mongodb.net/notebookDB?retryWrites=true&w=majority"
// const mongoURI="mongodb://localhost:27017/notebookDB";


const connectToMongo=()=>{
    mongoose.connect(mongoURI,{
        //in mongo 6 they are default
        // useNewUrlParser:true,
        // useCreateIndex:true,
        // useUnifiedTopology:true
    })
    .then(()=>{
        console.log("mongoDB connection established");
    })
    .catch((error)=>{
        console.error("mongoDB connection failed:",error);
    })
}

module.exports=connectToMongo;