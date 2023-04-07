require('./db_controller')

const gerarBilhete = async (req, res) => {
    let bilhete = Math.random().toString(36).slice(2,9)

    let estaNoBanco = await runQuery("SELECT * FROM bilhete WHERE cod_bilhete = :cod", [bilhete])

    while (estaNoBanco.rows[0] !== undefined) {
        bilhete = Math.random().toString(36).slice(2,9)

        estaNoBanco = await runQuery("SELECT * FROM bilhete WHERE cod_bilhete = :cod", [bilhete])
    }

    await runQuery("INSERT INTO bilhete (cod_bilhete) VALUES (:cod)", [bilhete])

    const resposta = await runQuery("SELECT * FROM bilhete WHERE cod_bilhete = :cod", [bilhete])

    res.send(resposta.rows[0])
}

module.exports = {
    gerarBilhete
}