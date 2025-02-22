import multer from "multer";
import path from "path";
import fs from "fs";
const uploadDir = path.join(process.cwd(), "uploads");

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const filename = Date.now() + path.extname(file.originalname);
    console.log("Saving file:", filename); // Debugging
    cb(null, filename);
  }
});

// File filter to allow only PDFs
const fileFilter = (req, file, cb) => {
  console.log("Received file:", file.mimetype); // Debugging
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"), false);
  }
};

// Multer initialization with limits
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }  
});

export default upload;
