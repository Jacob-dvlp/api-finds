const knex = require("../data/connection");

module.exports = {
    async creatPost(req, res, next) {
        try {
            const { filename } = req.file;
            const { title, imagem } = req.body;
            const id_key_user = req.headers.authorization;
            const posts = await knex("posts").insert({
                title,
                image_item: filename,
                id_key_user
            })
            console.log(posts)
            return res.status(202).send({ message: "Publicação criado com Sucesso" })
        } catch (error) {
            next(error);
        }
    },

    async listMypost(req, res, next) {
        try {
            const id_key_user = req.headers.authorization;
            const myPost = await knex("posts").select('*').where("id_key_user", id_key_user).first();
            return res.status(202).send(myPost);
        } catch (error) {
            next(error);
        }
    },

    async indexPosts(req, res, next) {
        try {
            const ListarPosts = await knex('posts').select("*").first();
            return res.status(202).send(ListarPosts);
        } catch (error) {
            next(error);
        }
    },

    async deletePosts(req, res, next) {
        try {
            const {id} = req.params;
            const id_key_user = req.headers.authorization;
            if (id_key_user) {
                const post = await knex("posts").delete().where("id_post", id)
                return res.status(200).send({ message: "Publicação excluida com sucesso" })
            } else {
                return res.status(404).send({ message: "Não tem permissão pra eliminar " })
            }
        } catch (error) {
            console.log(error)
            next(error)
        }

    }


}