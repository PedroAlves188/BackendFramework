document.addEventListener("DOMContentLoaded", () =>{
    const apiUrl = "https://67b7894d2bddacfb270f470a.mockapi.io/Funcionarios";
    const divConteudo = document.getElementById("conteudo");

    function consultarDados(){
        divConteudo.innerHTML = "";
        fetch(apiUrl)
            .then(resposta => resposta.json())
            .then(dados => {
                dados.forEach(item => {
                    console.log(item.id)
                    divConteudo.innerHTML += `
                    <div class="pessoas">
                        ID: ${item.id} <br/>
                        Nome: ${item.nome_funcionario} <br/>
                        Cargo: ${item.cargo} <br/>
                        Filial: ${item.cod_filial} <br/> 
                    </div>`;
                });
            }).catch(error => alert("Falha ao consultar Api: \n \n" + error));
    };

    consultarDados();

    function cadastrar() {
        const nomeDigitado = document.getElementById("caixaNome").value.trim();
        const cargoDigitado = document.getElementById("caixaCargo").value.trim();

        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome_funcionario: nomeDigitado,
                cargo: cargoDigitado,
            })
        })
        .then(resposta => resposta.json())
        .then(() => {
            alert("Cadastro realizado com Sucesso!");
            consultarDados();
        }).catch(error => alert("Falha ao Cadastrar \n \n" + error));
    }
    
    const btnCadastrar = document.getElementById("btnCadastrar");
    btnCadastrar.addEventListener("click", cadastrar)
});