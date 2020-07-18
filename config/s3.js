
const AWS =require('aws-sdk')


const s3=new AWS.S3({
    accessKeyId:'AKIAI47CJYJRBCNGBWMQ',
    secretAccessKey:'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'
})

module.exports =  s3;
