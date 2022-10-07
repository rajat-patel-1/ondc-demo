const crypto = require("crypto");

const getKeyPairs = (requestId) => {
  const { privateKey, publicKey } = crypto.generateKeyPairSync("ed25519",{
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      }
  });
  const request_id = Buffer.from(requestId);
  const res = crypto.sign(null, request_id, privateKey);
  console.log(publicKey);
//   console.log(publicKey)
  return { publicKey, privateKey, request_id: res.toString("base64") };
};
module.exports = { getKeyPairs };
