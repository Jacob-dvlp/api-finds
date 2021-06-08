const express = require('express');
const multerfileuser = require('../configs/files_user');
const multerpost = require('../configs/file_posts');
const multer = require('multer');
const users = require('../controllers/users');
const posts = require('../controllers/posts');
const routas = express.Router();
const session = require('../session/session')
const user = multer(multerfileuser)
const postfile = multer(multerpost)
const token = require('../configs/Token/token');

//Routes user
routas.get("/index",token,users.indexUsers)
routas.post("/creat",user.single("foto"),users.creat)
routas.post("/login_user",session.LoginUser)

//Routers posts
routas.post("/creat_post",token,postfile.single("imagem"),posts.creatPost)
routas.get("/index_posts",token,posts.indexPosts)
routas.get("/mypost",token,posts.listMypost)
routas.delete("/delete/:id",token,posts.deletePosts);
routas.put("/update_post/:id",token,postfile.single("imagem"),posts.updatePost)
routas.get("/total_post",token,posts.allPost)
routas.get("/total_post_remove",token,posts.totalPostremove)

module.exports = routas