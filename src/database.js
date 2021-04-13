import mongoose from "mongoose";
import config from "./config";

mongoose.connect(config.mongodbURL, {useUnifiedTopology: true, useNewUrlParser:true, useFindAndModify:false} )
.then((db)=>{console.log("base datos conectado", db.connection.name)})
.catch((err)=>{console.log(err)})


export default mongoose;