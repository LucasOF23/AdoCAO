import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import multer from 'multer'
import multerS3 from 'multer-s3'
import { v4 as uuidv4 } from 'uuid';

function _eraseFile(s3, key) {
	s3.send(new DeleteObjectCommand({
		Bucket: process.env.S3_BUCKET,
		Key: key 
	}));
}

function _eraseRequestFiles(s3, req) {
	if(req.file) _eraseFile(s3, req.file.key);
	if(req.files) {
		for(const file of req.files) {
			if(file) {
				_eraseFile(s3, file.key);
			}
		}
	}
}

const s3 = new S3Client({
	endpoint: process.env.S3_URL,
	credentials: {
		accessKeyId: process.env.S3_ACCESS_KEY,
		secretAccessKey: process.env.S3_SECRET_KEY
	},
	sslEnabled: false,
	s3ForcePathStyle: true,
	region: 'us-east-1'
});

const storage = multerS3({
	s3: s3,
	bucket: process.env.S3_BUCKET,
	acl: 'public-read',
	key: function(req, file, cb) {
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


export default {
	upload: upload,
	s3: s3,
	eraseRequestFiles: function(req) {
		_eraseRequestFiles(s3, req);
	},
	eraseFile: function(key) {
		_eraseFile(s3, key);
	}
}
