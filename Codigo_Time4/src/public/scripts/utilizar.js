const btnUtilizar = document.getElementById('btnUtilizar')
const alertAviso = document.getElementById('alertAviso')
const alertSucesso = document.getElementById('alertSucesso')


btnUtilizar.addEventListener('click', async () => {
    if (inpBilhete.value == '') {
        inpBilhete.focus()
        alertAviso.innerHTML = 'Você deve inserir o bilhete'
        alertAviso.classList.remove('d-none')
    } else {
        alertAviso.classList.add('d-none')
        alertSucesso.classList.add('d-none')

        let bancoDeDados = await fetch('http://localhost:3333/api/codigo/utilizar', {
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                codigo: inpBilhete.value
            })
        }).then(resposta => resposta.json())

        if (bancoDeDados.status == 'sucesso') {
            alertSucesso.innerHTML = bancoDeDados.message
            alertSucesso.classList.remove('d-none')
        } else {
            alertAviso.innerHTML = bancoDeDados.message
            alertAviso.classList.remove('d-none')
        }
    }
})