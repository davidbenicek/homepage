const S3 = require('./s3');

const getVocab = () => S3.getObject('benicek', 'kanhanzi/vocab.txt');

module.exports = {
    getVocab,
};