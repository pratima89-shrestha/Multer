const express = require('express');
const app = express();
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')  //changes here
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)  //changes here 
    }
  })

const upload = multer({ storage}) //changes here

app.get('/',(req,res)=>{
    res.send("Hello world!");
});

app.post('/api/upload',upload.single('file'),(req,res)=>{
    res.json(req.file);  //more information about the file that was created
    res.send("uploaded successfully!");
})

app.listen(4000,()=>{
    console.dir(`Listening on port 4000`);
})