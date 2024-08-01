const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "application/pdf": "pdf",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (file.mimetype.startsWith("image/")) {
      folder = "images";
    } else if (file.mimetype === "application/pdf") {
      folder = "files";
    }
    callback(null, folder);
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG, PNG, and PDF are allowed!'), false);
  }
};

module.exports = multer({
  storage: storage,
  fileFilter: fileFilter,
}).fields([
  { name: "image", maxCount: 1 },
  { name: "file", maxCount: 1 },
]);
