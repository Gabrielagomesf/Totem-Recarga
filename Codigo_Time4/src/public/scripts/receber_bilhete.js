const query = window.location.search.substring(1)
const qs = query.split('=')

const inpBilhete = document.getElementById('inpBilhete')
const btnLerBilhete = document.getElementById('btnLerBilhete')

if (qs[0] == 'cod_bilhete') {
    inpBilhete.readOnly = true;
    inpBilhete.value = qs[1]
} else {
    btnLerBilhete.classList.remove('d-none')
}

