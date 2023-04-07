const bilheteController = require('./controllers/bilhete_controller')
const recargaController = require('./controllers/recarga_controller')
const utilizacaoController = require('./controllers/utilizacao_controller')
const relatorioController = require('./controllers/relatorio_controller')

const router = require('express').Router()

router.get('/', (req, res) => {
    res.sendFile(__dirname + '\\pages\\home.html')
})

router.get('/bilhete', (req, res) => {
    res.sendFile(__dirname + '\\pages\\bilhete.html')
})

router.get('/recarga', (req, res) => {
    res.sendFile(__dirname + '\\pages\\recarga.html')
})

router.get('/utilizacao', (req, res) => {
    res.sendFile(__dirname + '\\pages\\utilizacao.html')
})

router.get('/relatorio', (req, res) => {
    res.sendFile(__dirname + '\\pages\\relatorio.html')
})

router.post('/api/codigo/criar', bilheteController.gerarBilhete)

router.post('/api/codigo/recarregar', recargaController.recarregar)

router.post('/api/codigo/utilizar', utilizacaoController.utilizar)

router.get('/api/codigo/relatorio/:codigo', relatorioController.relatorio)

module.exports = router;