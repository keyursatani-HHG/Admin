var express = require('express');
var router = express.Router();
const multer = require('multer');
var BannerController = require('../contro/bencontro');

var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './upload/image/')
    },
    filename: (req, file, callBack) => {
        callBack(null, Date.now() + '-' + file.originalname)
    }
})

var upload = multer({
    storage: storage
});

router.get('/', function (req, res, next) {
  res.render('benner', { title: 'Wel come to Node in Benner Js server' });
});
router.get('/finddata',BannerController.find_data);
router.get('/finddata/:id',BannerController.find_data_Id);
router.post('/InsertBanner', upload.single('image'), BannerController.insert_data);
router.post('/UpdateBanner', upload.single('image'), BannerController.Update_data);
router.delete('/DeleteBanner/:id', upload.single('image'), BannerController.Delete_data);


module.exports = router;