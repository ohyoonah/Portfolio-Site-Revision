import multer from "multer";
import * as path from "path";
import * as fs from "fs";
const dir = path.join(__dirname, '../..', '/public/images/');

const storage = multer.diskStorage({
  destination : function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename : function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, req.params.id + ext);
  }
})

export const uploader = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    const ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      return callback(new Error('PNG, JPG만 업로드하세요'))
    }
    const url1 = path.join(dir, `${req.params.id}.png`);
    const url2 = path.join(dir, `${req.params.id}.jpg`);
    const url3 = path.join(dir, `${req.params.id}.jpeg`);

    if(fs.existsSync(url1)){
      fs.unlinkSync(url1);
    }
    if(fs.existsSync(url2)){
      fs.unlinkSync(url2);
    }
    if(fs.existsSync(url3)){
      fs.unlinkSync(url3);
    }

    callback(null, true);
  },
  limits:{
    fileSize: 1024 * 1024 * 10
  }
});