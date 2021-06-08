const express = require("express")
const cores = require("cors")
const rotas = require("./src/routers/routes")

const App = express()

App.use(express.json())
App.use(rotas)
App.use(cores)

App.use((error, res, next) => {
    
    res.status(error.status || 500)
    res.json({ error: error.messagem })
})

App.listen(3000, () => console.log("Server is running"))