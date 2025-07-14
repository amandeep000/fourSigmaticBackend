import * as fs from "node:fs";
import * as path from "node:path";
import multer from "multer";

const tempDir = path.resolve("public", "temp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("public/temp"));
  },
  filename: function (req, file, cb) {
    const filename = path.parse(file.originalname).name;
    const extname = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${filename}-${uniqueSuffix}${extname}`);
  },
});

export const upload = multer({ storage: storage });
