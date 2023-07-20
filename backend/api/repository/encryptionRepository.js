const { base64url, EncryptJWT, jwtDecrypt } = require("jose");
const { JWT_SECRET, JWT_EXPIRE } = require("../../config/keys");

function encryptionRepository() {
  
  async function getTokenAndEncryptionThePayload(user) {
    const secret = base64url.decode(JWT_SECRET);
    const jwt = await new EncryptJWT(user)
      .setProtectedHeader({ alg: "dir", enc: "A128CBC-HS256" })
      .setIssuedAt()
      .setIssuer("urn:devconnector:issuer")
      .setAudience("urn:devconnector:audience")
      .setExpirationTime(JWT_EXPIRE)
      .encrypt(secret);
    console.log(jwt)
    return jwt;
  }
  async function decryptTokenAndGetUser(jwt) {
    const secret = base64url.decode(JWT_SECRET);
    const { payload } = await jwtDecrypt(jwt, secret, {
      issuer: "urn:devconnector:issuer",
      audience: "urn:devconnector:audience",
    });
    return payload;
  }
  return Object.freeze({
    getTokenAndEncryptionThePayload,
    decryptTokenAndGetUser,
  });
}

module.exports = encryptionRepository;
