const crypto = require('bcrypt');
const  salt = 8;
function encryptarsenha(password)
{
     return  crypto.hashSync(password,salt);
}
module.exports = encryptarsenha;