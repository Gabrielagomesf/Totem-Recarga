const btnGerar = document.getElementById('btnGerar')
const inpBilhete = document.getElementById('inpBilhete')
const divBilhete = document.getElementById('divBilhete')
const alertSucesso = document.getElementById('alertSucesso')

btnGerar.addEventListener('click', async () => {
    let bancoDeDados = await fetch('http://localhost:3333/api/codigo/criar', {method: "post"})
    .then(resposta => resposta.json())

    if (!bancoDeDados.ok) {
        if (divBilhete.classList.contains('d-none')) {
            divBilhete.classList.remove('d-none')
        }
        inpBilhete.value = bancoDeDados.COD_BILHETE

        navigator.clipboard.writeText(bancoDeDados.COD_BILHETE)

        alertSucesso.classList.remove('d-none')

        setTimeout(() => {
            window.location.href = `/recarga?cod_bilhete=${bancoDeDados.COD_BILHETE}`
        }, 3000)
    }
})