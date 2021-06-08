const jwt = require("jsonwebtoken");
const secrit = require("../Token/chave");

function Token(req, res, next) {
  var token = req.headers.authorization;
  jwt.verify(token, secrit.chave, (error, decoded) => {
    if (error) {
      console.log(error);
      return res.status(401).send({ error: "Não autolizado" });
    } else {
      req.userId = decoded.userId;
      return next();
    }
  });
}

module.exports = Token;
