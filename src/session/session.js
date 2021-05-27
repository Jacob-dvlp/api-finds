const bcrypt = require("bcrypt")
const Knex = require('../data/connection');

module.exports = {
    
    async LoginUser(req, res, next) {
        try {
            const { email, senha } = req.body
            const user = await Knex('users').where("email", email).select('*').first();
            if (!user) {
                return res.status(404).send({ message: "Este usuario não exite" });
            }

            if (!(await bcrypt.compare(senha, user.senha))) {
                return res.status(401).send({ message: "Não tem permissão pra fazer login" });
            }
            user.senha = undefined;
            return res.status(201).send({ message: "Seja bem vindo" });
        } catch (error) {
            console.log(error);
            next(error); 
        }
    }
}