const express=require('express');
const app=express();
const pass=require("./password");
const PORT=process.env.PORT || 8090;
app.get('/',(req,res)=>{
    console.log(pass.user)
})
app.listen(PORT,(req,res)=>{
    console.log(`App Listening on PORT ${PORT}`);
})
