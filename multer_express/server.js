const express = require('express');
const app = express();

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


app.get('/',(req,res)=>{
    res.send("Hello world!");
});

app.post('/api/upload',upload.single('file'),(req,res)=>{
    res.json(req.file);  //more information about the file that was created
    // res.send("uploaded successfully!");
})

app.listen(4000,()=>{
    console.dir(`Listening on port 4000`);
})