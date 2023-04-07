require('./db_controller')

const recarregar = async (req, res) => {
    const { codigo, tipo } = req.body;

    const ativacoes = tipo == 'duplo' ? 2 : 1

    try {
        const existeBilhete = await runQuery('SELECT * FROM bilhete WHERE cod_bilhete = :codigo', [codigo])

        if (existeBilhete.rows[0] !== undefined) {
            const possuiRecarga = await runQuery('SELECT * FROM recarga WHERE fk_bilhete_cod_bilhete = :codigo', [codigo])
    
            if (!possuiRecarga.rows[0]){
                const respostabd = await runQuery(`INSERT INTO recarga (fk_bilhete_cod_bilhete, modalidade, maximo_ativacoes) VALUES (:codigo, :modalidade, :ativacoes)`, [codigo, tipo, ativacoes]);
        
                var recarga = await runQuery(`SELECT * FROM recarga WHERE rowid = '${respostabd.lastRowid}'`, []);
    
                res.status(201).send(recarga.rows[0]);
            } else {
                res.status(400).send({ message: 'Bilhete já possui recarga!'})
            }
        } else {
            res.status(400).send({ message: 'Bilhete inválido!'})
        }
    } catch (error) {
        res.status(400).send()
    }
}

module.exports = {
    recarregar
}