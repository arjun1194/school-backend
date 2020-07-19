
const AWS =require('aws-sdk')


const s3=new AWS.S3({
    accessKeyId:'AKIAR4SXEUQJIEE4JPBT',
    secretAccessKey:'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'
})

module.exports =  s3;
