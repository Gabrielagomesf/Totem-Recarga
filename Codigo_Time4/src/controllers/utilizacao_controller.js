require('./db_controller')

const minutosPorModalidade = tipo => {
    switch (tipo) {
        case 'unico':
            return minutosModalidade = 40
        case 'duplo':
            return minutosModalidade = 40
        case 'sete':
            return minutosModalidade = 10080
        case 'trinta':
            return minutosModalidade = 43200
    }
}


const utilizar = async (req, res) => {
    const { codigo } = req.body;

    const bilhete = await runQuery('SELECT * FROM bilhete WHERE cod_bilhete = :cod', [codigo])

    if (bilhete.rows[0] !== undefined) {
        const recarga = await runQuery('SELECT * FROM recarga WHERE fk_bilhete_cod_bilhete = :cod', [codigo])

        if (recarga.rows[0] !== undefined) {

            if (bilhete.rows[0].DATA_ATIVACAO !== null) { //ele já foi ativado
    
                let minutosModalidade = minutosPorModalidade(recarga.rows[0].MODALIDADE)
    
                const agora = new Date();
                let data_expiracao = new Date(bilhete.rows[0].DATA_ATIVACAO);
                data_expiracao.setMinutes(data_expiracao.getMinutes() + minutosModalidade);
                data_expiracao = new Date(data_expiracao);
    
                if (agora > data_expiracao) { //ele expirou, tem que verificar se n é duplo
    
                    if (recarga.rows[0].MODALIDADE == 'duplo' && bilhete.rows[0].ATIVACOES < 2) {
    
                        await runQuery('UPDATE bilhete SET ativacoes = ativacoes + 1, data_ativacao = localtimestamp WHERE cod_bilhete = :cod', [codigo])
    
                        await runQuery('INSERT INTO utilizacao (fk_bilhete_cod_bilhete) VALUES (:cod)', [codigo])
    
                        res.status(201).send({status: 'sucesso', message: 'Seu bilhete foi utilizado com sucesso!' })
                    } else {
                        res.status(400).send({status: 'erro', message: 'Seu bilhete está expirado, gere um novo!' })
                    }
                } else {
                    await runQuery('INSERT INTO utilizacao (fk_bilhete_cod_bilhete) VALUES (:cod)', [codigo])
    
                    res.status(201).send({ status: 'sucesso', message: 'Seu bilhete foi utilizado com sucesso!' })
                }
            } else {
    
                await runQuery('UPDATE bilhete SET ativacoes = ativacoes + 1, data_ativacao = localtimestamp WHERE cod_bilhete = :cod', [codigo])
    
                await runQuery('INSERT INTO utilizacao (fk_bilhete_cod_bilhete) VALUES (:cod)', [codigo])
    
                res.status(201).send({ status: 'sucesso', message: 'Seu bilhete foi ativado e utilizado com sucesso!' })
            }
        } else {
            res.status(400).send({ status: 'erro', message: 'Bilhete não possui recarga' })
        }

    } else {
        res.status(400).send({ status: 'erro', message: 'Bilhete inválido' })
    }

}

module.exports = {
    utilizar
}