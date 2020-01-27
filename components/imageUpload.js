const fs = require('fs');
const express = require('express');
const multer  = require('multer')
const multerUpload = multer({ dest: 'uploads/' })
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Only POST method accepted with multipart file");
})

router.post('/', multerUpload.single('testFile'), (req, res) => {    
    console.log(req.file);

    fs.rename(req.file.path, './uploads/' + req.file.originalname, function (err) {
        if (err) throw err;
        console.log('renamed complete');
        res.send("Test");
      });    
});

module.exports = router;