const express = require('express');
const multerfileuser = require('../configs/files_user');
const multerpost = require('../configs/file_posts');
const multer = require('multer');
const users = require('../controllers/users');
const posts = require('../controllers/posts');
const routas = express.Router();
const session = require('../session/session');
const user = multer(multerfileuser);
const postfile = multer(multerpost);

//Routes user
routas.get("/index",users.indexUsers);
routas.post("/create",user.single("foto"),users.create);
routas.post("/login_user",session.LoginUser);

//Routers posts
routas.post("/crete_post",postfile.single("imagem"),posts.creatPost);
routas.get("/index_posts",posts.indexPosts);
routas.get("/mypost",posts.listMypost);
routas.delete("/delete/:id",posts.deletePosts);
routas.put("/update_post/:id",postfile.single("imagem"),posts.updatePost);
routas.get("/total_post", posts.allPost);
routas.get("/total_post_remove",posts.totalPostremove);

module.exports = routas