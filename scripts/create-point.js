
function populateUFs() {
    /* busca, cria um json e executa uma função para adicionar as UFs no HTML  */
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then((res) => { return res.json() })
        .then(states => {

            for (const state of states) {
                /*para cada estado adiciona um options de UF no Html*/
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option> `
            }
        })
}

populateUFs()


function getCities(event) {
    /* função recebe um evento como parâmetro */
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    console.log(event.target.value)
    const ufValue = event.target.value

    //recupera o index do uf selecionada
    const indexOfSelectedState = event.target.selectedIndex
    
    //recupera o nome da Uf a partir do index selecionado
    stateInput.value = event.target.options[indexOfSelectedState].text





    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    fetch(url).then((res) => { return res.json() })
    .then( cities => {
        for (const city of cities) {
            /*para cada estado adiciona um options de cidade no Html*/
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option> `
        }

        //habilita o campo select de cidade após ser populado
        citySelect.disabled = false
    })

}
document.querySelector("select[name=uf]")
    .addEventListener("change", getCities)
/* passando getCities por referencia.
Faz: após o evento 'mudança' execute getCities*/