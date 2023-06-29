import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
//directly upload to dtabase
const storage = new GridFsStorage({
    url: "mongodb+srv://anuragkomrewar1:ngUsYNlBlIkOmv7B@blogapp.kh0w3ek.mongodb.net/",
    options: { useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        if(match.indexOf(file.memeType) === -1) 
            return`${Date.now()}-blog-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});

export default multer({storage}); 
//to upload image directly: multer
//DB_URL :"mongodb+srv://anuragkomrewar1:ngUsYNlBlIkOmv7B@blogapp.kh0w3ek.mongodb.net/",