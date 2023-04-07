const btnTipo = document.querySelectorAll('.btn-tipo')
const inpValor = document.getElementById('inpValor')

btnTipo.forEach(btn => {
    btn.addEventListener('click', () => {
        btnTipo.forEach(btnreset => {
            btnreset.classList.replace('btn-primary', 'btn-outline-primary')
        })
        btn.classList.replace('btn-outline-primary', 'btn-primary')

        switch (btn.textContent) {
            case 'Único':
                inpValor.value = 'R$ 3,28'
                break;
            case 'Duplo':
                inpValor.value = 'R$ 6,21'
                break;
            case '7 Dias':
                inpValor.value = 'R$ 53,73'
                break;
            case '30 Dias':
                inpValor.value = 'R$ 212,47'
                break;
        }
    })
})