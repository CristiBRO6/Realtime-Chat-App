const crypto = require('crypto');

const fileToBase64 = (file) => {
    return file.buffer.toString('base64');
}

function calculateHash(file) {
    return crypto.createHash('sha256').update(file.buffer).digest('hex');
}

module.exports = { fileToBase64, calculateHash};