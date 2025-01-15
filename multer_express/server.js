//yt.james Q Quick
const express = require('express');
const multer = require('multer');
const app = express();

// Multer configuration
const upload = multer({
    dest: 'uploads/',
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg') {
            cb(null, true);
        } else {
            cb(new Error('Only .jpg files are allowed!'), false);
        }
    },
});

// Routes
app.get('/', (req, res) => {
    res.send('Hello!');
});

app.post('/api/upload', upload.single('file'), (req, res) => {
    console.log('File:', req.file);
    if (req.file) {
        res.send('File uploaded successfully!');
    } else {
        res.status(400).send('No file uploaded.');
    }
});

// Start server
app.listen(4000, () => {
    console.log('Listening on port 4000.');
});
