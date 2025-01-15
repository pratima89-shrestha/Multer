//creating an application
//This is the endpoint setting
const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send("Hello");
})

app.post('api/upload',(req,res)=>{
    res.send("uploaded successfully.");
});

app.listen(4000,()=>{
    console.log(`Listening on port 4000.`);
})

