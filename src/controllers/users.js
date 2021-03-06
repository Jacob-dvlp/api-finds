const kenx = require("../data/connection");
const encryptarsenha = require("../configs/crypto");
const jwt = require("jsonwebtoken");
const auth = require("../configs/Token/chave");
module.exports = {
  async creat(req, res, next) {
    try {
      const { filename } = req.file;
      const {
        nome,
        provinci,
        municipio,
        bairro,
        rua,
        senha,
        email,
        numero,
        foto,
      } = req.body;
      const password = encryptarsenha(senha);
      const verficaremail = await kenx("users").where("email", email).first();
      const verficarnumero = await kenx("users")
        .where("numero", numero)
        .first();
      if (verficarnumero || verficaremail) {
        return res
          .status(404)
          .json({ message: "Este número ou email está sendo usado" });
      } else {
        const user = await kenx("users").insert({
          nome,
          provinci,
          municipio,
          bairro,
          rua,
          senha: password,
          email,
          numero,
          foto: filename,
        });

        const token = jwt.sign({ userId: user.id_user }, auth.chave, {
          expiresIn: "7d",
        });
        return res
          .status(201)
          .send({ message: "Conta criada com Sucesso! Faça o login", token: token });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  async indexUsers(req, res, next) {
    try {
      const result = await kenx("users").then();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};
