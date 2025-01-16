const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Ensure the 'uploads' directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configure storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Files will be stored in the 'uploads' directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
});

// Initialize multer with the storage configuration
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only .jpg, .png, and .gif files are allowed!'), false);
        }
    },
});

// Routes
app.get('/', (req, res) => {
    res.send('Hello! Welcome to the file upload server.');
});

app.post('/api/upload', upload.single('file'), (req, res) => {
    console.log('File:', req.file);
    if (req.file) {
        res.send(`File uploaded successfully! Filename: ${req.file.filename}`);
    } else {
        res.status(400).send('No file uploaded.');
    }
});

// Global error handler for multer errors
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).send(`Multer Error: ${err.message}`);
    }
    if (err) {
        return res.status(500).send(`Error: ${err.message}`);
    }
    next();
});

// Start server
const PORT = 4001;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
});
