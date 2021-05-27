/**
 * This utility file contains pre-determined areas of files where you wanted to upload to.
 * However, you need to understand that using Multer module, it doesn't help you do clean up
 * in the event that your form validation is wrong. So do remember to delete the uploaded file
 * if an error occurred or bad request.
**/
import Multer  from 'multer';
import FileSys from 'fs';
import Path    from 'path';

/**
 * File filter used to accept image files only
 * @param type   {string} The type of file to accept usually "image" "audio" "video" "text"
 * @param req    {Express.Request} Express request handle
 * @param file   {Express.Multer.File} Multer File
 * @param result {Multer.FileFilterCallback} Multer file callback handle
 */
function FilterFile(type, req, file, result) {
	//	File mimetype must be defined and includes the defined type
	if (file.mimetype != undefined && file.mimetype.includes(type)) {
		return result(null, true);
	}
	else {
		console.warn(`The file received is not of accepted mimetype ${file.mimetype}`);
		return result(new Error("Invalid file type received"), false);
	}
}

/** Where the files are going to be located */
export const Path = `dynamic`;
/** Multer handler for uploading arbitrary files */
export const UploadFile         = Multer({ dest:   `${Path}/file` });
/** Multer handler for uploading profile images */
export const UploadProfileImage = Multer({ dest:   `${Path}/profile`, fileFilter: FilterFile.bind(this, "image") });
/** Multer handler for uploading product images */
export const UploadProductImage = Multer({ dest:   `${Path}/product`, fileFilter: FilterFile.bind(this, "image") });

/**
 * Function to delete a uploaded file
 * @param files {...Express.Multer.File}
**/
export async function DeleteFile(...files) {
	for (let file of files) {
		if (FileSys.existsSync(file.destination))
			return FileSys.unlinkSync(file.destination);
		else
			console.warn(`Attempting to delete non-existing file(s) ${file}`);
	}
}