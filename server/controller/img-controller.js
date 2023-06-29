import mongoose from 'mongoose';
import grid from 'gridfs-stream';


// import dotenv from 'dotenv';

// dotenv.config();


const conn=mongoose.connection;
let gfs,gridfsBucket;
conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
});  //checks if the connections is open

const URL='http://localhost:8000';
//using a middlewhere {utils}-->multer-gridfs
export const uploadImage=(request,response)=>{
    if(!request.file){
        return response.status(404).json({msg:"File not found"});
    }
    //middleware must have uploaded the file 
    const imgUrl=`${URL}/file/${request.file.filename}`;
    return response.status(200).json(imgUrl);
}

export const getImage=async (request,response)=>{
    try {   
        const file = await gfs.files.findOne({ filename: request.params.filename });
        // const readStream = gfs.createReadStream(file.filename);
        // readStream.pipe(response);
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(response);
    } catch (error) {
        response.status(500).json({ msg: error.message });
    }
}