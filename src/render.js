const btnDinero = document.getElementById('inputSendMoney');

let paragraph = document.getElementById('infoParagraph');

btnDinero.addEventListener('click', (e) => {
    e.preventDefault();
    const money = document.getElementById('inputMoney');
    const dinero = money.value;
    window.electronAPI.ejecutarScriptDinero(dinero)
        .then(resultado => {
            console.log(resultado),
            paragraph.style.color = 'rgb(24, 227, 17)',
            paragraph.textContent = 'Dinero agregado a su juego!'
        })
        .catch(error => { 
            console.error(error),
            paragraph.style.color = 'red',
            paragraph.textContent = 'Ocurrio un error :('
        });
    money.value = '';
})

