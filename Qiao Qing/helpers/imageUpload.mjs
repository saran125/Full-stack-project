import multer, { diskStorage } from 'multer';
import { extname as _extname } from 'path';

// Init Upload
const upload = multer({
	limits: {
		fileSize: 1000000
	},
	fileFilter: (req, file, callback) => {
		checkFileType(file, callback);
	}
}).single('posterUpload');

// Check File Type
function checkFileType(file, callback) {
	// Allowed file extensions
	const filetypes = /jpeg|jpg|png|gif/;
	// Check ext
	const extname = filetypes.test(_extname(file.originalname).toLowerCase());
	// Check mime
	const mimetype = filetypes.test(file.mimetype);

	if (mimetype && extname) {
		return callback(null, true);
	} else {
		callback({message: 'Images Only'});
	}
}

export default upload;