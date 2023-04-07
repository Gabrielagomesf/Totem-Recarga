const btnRecarregar = document.getElementById('btnRecarregar')
const alertAviso = document.getElementById('alertAviso')
const alertSucesso = document.getElementById('alertSucesso')

btnRecarregar.addEventListener('click', async () => {

    const btnSelecionado = document.querySelector('.btn-primary')

    let tipo;

    if (inpBilhete.value == '') {
        alertAviso.textContent = 'Insira o código do bilhete antes de recarregar.'
        alertAviso.classList.remove('d-none')
    } else {
        if (btnSelecionado == null) {
            alertAviso.textContent = 'Você deve selecionar a modalidade antes de recarregar.'
            alertAviso.classList.remove('d-none')
        } else {
            alertAviso.classList.add('d-none')
            alertSucesso.classList.add('d-none')

            switch (btnSelecionado.innerHTML) {
                case 'Único':
                    tipo = 'unico'
                    break;
                case 'Duplo':
                    tipo = 'duplo'
                    break;
                case '7 Dias':
                    tipo = 'sete'
                    break;
                case '30 Dias':
                    tipo = 'trinta'
                    break;
            }

            let bancoDeDados = await fetch('http://localhost:3333/api/codigo/recarregar', {
                method: 'POST', 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    codigo: inpBilhete.value,
                    tipo: tipo
                })
            }).then(resposta => resposta.json())

            if (bancoDeDados.message == undefined) {
                alertSucesso.classList.remove('d-none')

                setTimeout(() => {
                    window.location.href = `/utilizacao?cod_bilhete=${qs[1]}`
                }, 3000)
            } else {
                alertAviso.textContent = bancoDeDados.message
                alertAviso.classList.remove('d-none')
            }
        }
    }
})
