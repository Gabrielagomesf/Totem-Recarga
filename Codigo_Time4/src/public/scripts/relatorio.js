const inpBilhete = document.getElementById('inpBilhete')
const btnProcurar = document.getElementById('btnProcurar')
const alertAviso = document.getElementById('alertAviso')
const dadosRecarga = document.getElementById('dadosRecarga')
const dadosUtilizacao = document.getElementById('dadosUtilizacao')
const theadUtilizacao = document.getElementById('theadUtilizacao')
const table = document.getElementById('table')

let relatorios = 0

btnProcurar.addEventListener('click', async () => {
    if (relatorios === 0) {
        alertAviso.classList.add('d-none')
        if (inpBilhete.value != '') {
            const bancoDeDados = await fetch(`http://localhost:3333/api/codigo/relatorio/${inpBilhete.value}`, {
                method: 'GET', 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(resposta => resposta.json())
    
            if (bancoDeDados.status == 'sucesso') {
                relatorios += 1

                table.classList.remove('d-none')
                console.log(bancoDeDados.relatorio.DATA_RECARGA)
                const dataRecarga = new Date(bancoDeDados.relatorio.DATA_RECARGA)
                console.log(dataRecarga)
                const thCodigoRecarga = document.createElement('th')
                thCodigoRecarga.innerHTML = bancoDeDados.relatorio.COD_RECARGA
                const thModaliadeRecarga = document.createElement('th')
                thModaliadeRecarga.innerHTML = bancoDeDados.relatorio.MODALIDADE.toUpperCase()
                const thDataRecarga = document.createElement('th')
                thDataRecarga.innerHTML = `${dataRecarga}`
    
                dadosRecarga.appendChild(thCodigoRecarga)
                dadosRecarga.appendChild(thModaliadeRecarga)
                dadosRecarga.appendChild(thDataRecarga)
    
                if (bancoDeDados.relatorio.UTILIZACAO.length > 0) {
                    dadosUtilizacao.classList.remove('d-none')
                    theadUtilizacao.classList.remove('d-none')

                    bancoDeDados.relatorio.UTILIZACAO.forEach(uso => {
                        const dataUtilizacao = new Date(uso.DATA_UTILIZACAO)
    
                        const thCodigoUtilizacao = document.createElement('th')
                        thCodigoUtilizacao.innerHTML = uso.COD_UTILIZACAO
                        const thDataUtilizacao = document.createElement('th')
                        thDataUtilizacao.innerHTML = `${dataUtilizacao.getDay() < 10 ? '0'+dataUtilizacao.getDay() : dataUtilizacao.getDay() }/${dataUtilizacao.getMonth() < 10 ? '0'+dataUtilizacao.getMonth() : dataUtilizacao.getMonth() }/${dataUtilizacao.getFullYear()}`
                        const thHoraUtilizacao = document.createElement('th')
                        thHoraUtilizacao.innerHTML = `${dataUtilizacao.getHours() < 10 ? '0'+dataUtilizacao.getHours() : dataUtilizacao.getHours()}:${dataUtilizacao.getMinutes() < 10 ? '0'+dataUtilizacao.getMinutes() : dataUtilizacao.getMinutes() }:${dataUtilizacao.getSeconds() < 10 ? '0'+dataUtilizacao.getSeconds() : dataUtilizacao.getSeconds() }`
    
                        const trUtilizacao = document.createElement('tr')
    
                        trUtilizacao.appendChild(thCodigoUtilizacao)
                        trUtilizacao.appendChild(thDataUtilizacao)
                        trUtilizacao.appendChild(thHoraUtilizacao)
    
                        dadosUtilizacao.appendChild(trUtilizacao)
                    });
                }
            } else {
                alertAviso.innerHTML = bancoDeDados.message
                alertAviso.classList.remove('d-none')
            }    
        } else {
            alertAviso.innerHTML = 'Você deve inserir o código do bilhete para gerar relatório.'
            alertAviso.classList.remove('d-none')
        }
    } else {
        alertAviso.innerHTML = 'Reinicie a página para gerar um novo relatório!'
        alertAviso.classList.remove('d-none')
    }

})