const btnAceitar = document.querySelector('.btn-success')
const btnNegar = document.querySelector('.btn-danger')

const termo = document.querySelector('.termo-aceite')
const geracao = document.querySelector('.geracao')

btnAceitar.addEventListener('click', () => {
    if (termo.classList.contains('d-none') == false) {
        termo.classList.add('d-none')
        geracao.classList.remove('d-none')
    }
})

btnNegar.addEventListener('click', () => {
    window.location.href = '/'
})