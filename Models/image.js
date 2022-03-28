const mongoose = require ("mongoose");

const hel = new mongoose.Schema({
    main:{
        type:String
    },
    subtit:{
        type:String
    },
    image_user:
    {
        type:String
    }
   
})
const hello = new mongoose.model("table",hel);
module.exports = hello;
console.log("table create");
