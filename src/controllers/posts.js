const knex = require("../data/connection");

module.exports = {
  async creatPost(req, res, next) {
    try {
      const { filename } = req.file;
      const { title, imagem } = req.body;
      const id_key_user = req.headers.authorization;
      if (id_key_user) {
        const posts = await knex("posts").insert({
          title,
          image_item: filename,
          id_key_user,
          ativo: "true",
        });
        console.log(posts);
        return res
          .status(202)
          .send({ message: "Publicação criado com Sucesso" });
      } else {
        return res.status(202).send({ message: "Erro ao criar pubicação" });
      }
    } catch (error) {
      next(error);
    }
  },

  async listMypost(req, res, next) {
    try {
      const id_key_user = req.headers.authorization;
      if (id_key_user) {
        const myPost = await knex("posts")
          .where("id_key_user", id_key_user)
          .select(
            "posts.title",
            "posts.image_item",
            "posts.createdAt",
            "users.nome",
            "users.provinci",
            "users.municipio",
            "users.bairro",
            "users.rua"
          )
          .join("users", "users.id_user", "=", "posts.id_key_user")
          .first();
        return res.status(202).send(myPost);
      } else {
        return res.status(401).send({ message: "Não tem permissão " });
      }
    } catch (error) {
      next(error);
    }
  },

  async indexPosts(req, res, next) {
    try {
      const ListarPosts = await knex("posts")
        .where({ ativo: "true" })
        .select(
          "posts.title",
          "posts.image_item",
          "posts.createdAt",
          "users.nome",
          "users.provinci",
          "users.municipio",
          "users.bairro",
          "users.rua"
        )
        .join("users", "users.id_user", "=", "posts.id_key_user")
        .first();
      return res.status(202).send(ListarPosts);
    } catch (error) {
      next(error);
    }
  },

  async deletePosts(req, res, next) {
    try {
      const { id } = req.params;
      const id_key_user = req.headers.authorization;
      if (id_key_user) {
        const post = await knex("posts").delete().where("id_post", id);
        return res
          .status(200)
          .send({ message: "Publicação excluida com sucesso" });
      } else {
        return res
          .status(404)
          .send({ message: "Não tem permissão pra eliminar " });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  async updatePost(req, res, next) {
    try {
      const { filename } = req.file;
      const { title, imagem } = req.body;
      const { id } = req.params;
      const id_key_user = req.headers.authorization;
      const updatePost = await knex("posts")
        .update({ title, image_item: filename })
        .where("id_post", id);

      return res
        .status(202)
        .send({ message: "Publicação atualizado com sucesso" });
    } catch (error) {
      return next(error);
    }
  },

  async removeList(req, res, next) {
    try {
      const { id } = req.params;
      const id_key_user = req.headers.authorization;
      const remove = await knex("posts")
        .update({ ativo: "false" })
        .where({ id });
      return res.status(202).send({ message: "Concluido" });
    } catch (error) {
      return next(error);
    }
  },
};
