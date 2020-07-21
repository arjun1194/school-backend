
const AWS =require('aws-sdk')


const s3=new AWS.S3({
    accessKeyId:process.env.S3_ACCESS_ID,
    secretAccessKey:process.env.S3_ACCESS_ID
})

module.exports =  s3;
