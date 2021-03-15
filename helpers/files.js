const AWS_ID = 'AKIAV4J47RKQEIV3253S';
const AWS_SECRET = '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';
const BUCKET_NAME =  'chats-bigat';
const AWS = require("aws-sdk");
const fs = require('fs');
const s3 = new AWS.S3({
    accessKeyId: AWS_ID,
    secretAccessKey: AWS_SECRET
});
 const storeData = (data, path) => {
    try {
        fs.writeFileSync(path, JSON.stringify(data))
        console.log('File Written');
        uploadFile(path);
    } catch (err) {
        console.error(err)
    }
}
 const uploadFile = (fileName) => {
    // Read content from the file
    const fileContent = fs.readFileSync(fileName);

    // Setting up S3 upload parameters
    const params = {
        Bucket: BUCKET_NAME,
        Key: fileName, // File name you want to save as in S3
        Body: fileContent
    };
    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};
 const   readFile=   async (filekey)=>{
    return new Promise(((resolve, reject) => {
        var params = {Bucket: BUCKET_NAME, Key: filekey}
        s3.getObject(params, function(err, data) {
            if (err)
                reject(console.log(err, err.stack));
            // an error occurred
            else {
                //console.log(data.Body.toString('utf-8'));
                resolve( data.Body.toString('utf-8'));
            }
            // successful response
        });
    }))

}
 const updateFile=  async  (filekey, data)=>{
   return  await readFile(filekey).then(async res=>{
        let allChatData = JSON.parse(res);
       // let updatedData = [...currData, ...data];
       let currentMessages = allChatData.chats;
       let updatedChats= [ ...currentMessages, data];
allChatData.chats = updatedChats;
       storeData(allChatData, filekey);

    })
}
const FileExistsOnS3 = async (filename)=>{
    const params = {
        Bucket: BUCKET_NAME,
        Key: filename //if any sub folder-> path/of/the/folder.ext
    }
    try {
        await s3.headObject(params).promise()
        console.log("File Found in S3")
        return true;
    } catch (err) {
        console.log("File not Found ERROR : " + err.code)
        return false;
    }
}

module.exports = {storeData, uploadFile,readFile,updateFile,s3,FileExistsOnS3};