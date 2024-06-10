import multer from 'multer'
import { v4 as uuidv4 } from 'uuid';
import { unlink } from 'fs';
import path from 'path';

function eraseRequestFiles(req) {
	if(req.file) unlink(req.file.path, (_) => {});
	if(req.files) {
		for(const file of req.files) {
			if(file) {
				unlink(file.path, (_) => {});
			}
		}
	}
}

async function eraseFile(filepath, isFullPath=false) {
	if(!isFullPath)
		filepath = path.join(process.env.IMAGE_PATH, filepath);
	
	return unlink(filepath, (_) => {});
}

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, process.env.IMAGE_PATH);
	},
	filename: function(req, file, cb) {
		const ext = file.mimetype.substring(file.mimetype.lastIndexOf('/') + 1, file.mimetype.length);
		cb(null, uuidv4() + '.' + ext);
	}
});

const upload = multer({
	storage: storage,
	fileFilter: function(req, file, cb) {
		cb(null, file.mimetype === 'image/png' || file.mimetype === 'image/jpeg');
	}
});


export {
	upload as imageUploader,
	eraseRequestFiles,
	eraseFile
}
