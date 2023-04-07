const express = require('express')
const cors = require('cors')

const app = express()

const routes = require('./routes')

app.use(cors())
app.use(express.json())
app.use(routes)
app.use(express.static(__dirname + '\\public')) // sem essa linha não é possivel acessar arquivos no html

app.listen(3333, () => console.log(`app rodando em http://localhost:3333/`))