require('./db_controller')

const relatorio = async (req, res) => {
    const { codigo } = req.params;

    const bilhete = await runQuery('SELECT * FROM bilhete WHERE cod_bilhete = :cod', [codigo])

    if (bilhete.rows[0] !== undefined) {
        const recarga = await runQuery('SELECT * FROM recarga WHERE fk_bilhete_cod_bilhete = :cod', [codigo])

        if (recarga.rows[0] !== undefined) {
            const utilizacao = await runQuery('SELECT * FROM utilizacao WHERE fk_bilhete_cod_bilhete = :cod', [codigo])

            if (utilizacao.rows[0] !== undefined) {
                const resposta = { // ... operador spread, ele tira todos os elementos e coloca no novo obj
                    ...recarga.rows[0],
                    UTILIZACAO: [
                        ...utilizacao.rows
                    ]
                }
                res.send({status: 'sucesso', relatorio: resposta})
            } else {
                const resposta = { // ... operador spread, ele tira todos os elementos e coloca no novo obj
                    ...recarga.rows[0],
                    UTILIZACAO: []
                }

                res.send({ status: 'sucesso', relatorio: resposta })
            }
        } else {
            res.status(400).send({ status: 'erro', message: 'Seu bilhete não possui recarga.' })
        }
    } else {
        res.status(400).send({ status: 'erro', message: 'Bilhete inválido.' })
    }

}

module.exports = {
    relatorio
}