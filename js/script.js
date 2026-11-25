
/*
PROJETO: Adote um Amigo

ENTRADA:
Dados dos animais, pesquisa, filtro e informações digitadas pelo usuário.

PROCESSAMENTO:
Calcular pontuação, classificar os animais e contar os resultados.

SAÍDA:
Mostrar os animais na página e apresentar os resultados no console.

PSEUDOCÓDIGO:
1. Criar um array com os animais.
2. Percorrer os animais e calcular suas pontuações.
3. Classificar cada animal em uma faixa de espera.
4. Mostrar os animais na página.
5. Permitir pesquisar, adotar, remover e cadastrar animais.
6. Atualizar o resumo sempre que os dados mudarem.
*/


// ARRAY PRINCIPAL COM OS ANIMAIS
const animais = [
    {
        id: 1,
        nome: "Rex",
        especie: "Cachorro",
        idade: 3,
        dias: 10,
        disponivel: true
    },
    {
        id: 2,
        nome: "Mel",
        especie: "Gato",
        idade: 2,
        dias: 25,
        disponivel: true
    },
    {
        id: 3,
        nome: "Bob",
        especie: "Cachorro",
        idade: 5,
        dias: 40,
        disponivel: true
    },
    {
        id: 4,
        nome: "Luna",
        especie: "Gato",
        idade: 1,
        dias: 5,
        disponivel: true
    },
    {
        id: 5,
        nome: "Thor",
        especie: "Cachorro",
        idade: 4,
        dias: 60,
        disponivel: true
    }
];

let proximoId = 6;
let somenteDisponiveis = false;


// ELEMENTOS DO HTML
const lista = document.querySelector("#lista");
const busca = document.querySelector("#busca");
const resumo = document.querySelector("#resumo");
const filtroDisponiveis = document.querySelector("#filtroDisponiveis");

const formAnimal = document.querySelector("#formAnimal");
const formAdocao = document.querySelector("#formAdocao");

const botaoMenu = document.querySelector(".menu-hamburguer");
const menu = document.querySelector(".menu");


// AULA 10 - FUNÇÃO QUE CALCULA A PONTUAÇÃO
function calcularPontuacao(dias, bonus = 0) {
    return dias + bonus;
}


// AULA 10 - FUNÇÃO QUE CLASSIFICA A PONTUAÇÃO
function classificarEspera(pontuacao) {
    if (pontuacao <= 10) {
        return "Baixa espera";
    } else if (pontuacao <= 30) {
        return "Média espera";
    } else {
        return "Alta espera";
    }
}


// AULA 09 - SWITCH PARA CLASSIFICAR A ESPÉCIE
function classificarEspecie(especie) {
    let resultado;

    switch (especie.toLowerCase()) {
        case "cachorro":
            resultado = "Cachorro";
            break;

        case "gato":
            resultado = "Gato";
            break;

        default:
            resultado = "Outro animal";
            break;
    }

    return resultado;
}


// AULA 09 - ANÁLISE DOS ANIMAIS COM FOR...OF
function analisarAnimais(limiteDias) {
    const resultados = [];

    for (const animal of animais) {
        const pontuacao = calcularPontuacao(animal.dias);
        const faixa = classificarEspera(pontuacao);

        resultados.push({
            nome: animal.nome,
            especie: classificarEspecie(animal.especie),
            dias: animal.dias,
            pontuacao: pontuacao,
            faixa: faixa,
            acimaDoLimite: animal.dias >= limiteDias
        });
    }

    return resultados;
}


// AULA 09 - CONTADOR, ACUMULADOR, MAIOR VALOR E MÉDIA
function calcularEstatisticas() {
    let quantidade = 0;
    let totalDias = 0;
    let maiorEspera = 0;

    for (const animal of animais) {
        quantidade++;
        totalDias += animal.dias;

        if (animal.dias > maiorEspera) {
            maiorEspera = animal.dias;
        }
    }

    let media = 0;

    if (quantidade > 0) {
        media = totalDias / quantidade;
    }

    return {
        quantidade: quantidade,
        totalDias: totalDias,
        maiorEspera: maiorEspera,
        media: media
    };
}


// AULA 10 E 11 - PROCESSA OS ANIMAIS USANDO MAP
function processarAnimais() {
    return animais.map(function(animal) {
        const pontuacao = calcularPontuacao(animal.dias);

        return {
            ...animal,
            pontuacao: pontuacao,
            faixa: classificarEspera(pontuacao),
            especieFormatada: classificarEspecie(animal.especie)
        };
    });
}


// AULA 11 - CRIA UM CARD PARA CADA ANIMAL
function criarItem(animal) {
    const card = document.createElement("article");
    card.classList.add("animal-card");

    const titulo = document.createElement("h3");
    titulo.textContent = animal.nome;

    const especie = document.createElement("p");
    especie.textContent = `Espécie: ${animal.especieFormatada}`;

    const idade = document.createElement("p");
    idade.textContent = `Idade: ${animal.idade} anos`;

    const dias = document.createElement("p");
    dias.textContent = `Na espera há ${animal.dias} dias`;

    const faixa = document.createElement("p");
    faixa.textContent = animal.faixa;

    if (animal.faixa === "Baixa espera") {
        faixa.classList.add("faixa-baixa");
    } else if (animal.faixa === "Média espera") {
        faixa.classList.add("faixa-media");
    } else {
        faixa.classList.add("faixa-alta");
    }

    const botaoAdotar = document.createElement("button");
    botaoAdotar.type = "button";
    botaoAdotar.textContent = animal.disponivel
        ? "Quero adotar"
        : "Indisponível";

    botaoAdotar.dataset.acao = "adotar";
    botaoAdotar.dataset.id = animal.id;
    botaoAdotar.disabled = !animal.disponivel;

    const botaoRemover = document.createElement("button");
    botaoRemover.type = "button";
    botaoRemover.textContent = "Remover animal";
    botaoRemover.dataset.acao = "remover";
    botaoRemover.dataset.id = animal.id;

    card.append(
        titulo,
        especie,
        idade,
        dias,
        faixa,
        botaoAdotar,
        botaoRemover
    );

    return card;
}


// AULA 11 - CALCULA O RESUMO USANDO REDUCE
function calcularResumo() {
    return animais.reduce(function(total, animal) {
        total.quantidade++;

        if (animal.disponivel) {
            total.disponiveis++;
        }

        return total;
    }, {
        quantidade: 0,
        disponiveis: 0
    });
}


// AULA 11 - MOSTRA O RESUMO NA PÁGINA
function atualizarResumo() {
    if (!resumo) {
        return;
    }

    const dados = calcularResumo();

    resumo.textContent =
        `Total de animais: ${dados.quantidade}. ` +
        `Disponíveis para adoção: ${dados.disponiveis}.`;
}


// AULA 11 E 12 - DESENHA A LISTA NA PÁGINA
function desenhar() {
    if (!lista) {
        return;
    }

    const textoBusca = busca
        ? busca.value.toLowerCase().trim()
        : "";

    let animaisProcessados = processarAnimais();

    // FILTRO POR NOME, ESPÉCIE E DISPONIBILIDADE
    animaisProcessados = animaisProcessados.filter(function(animal) {

        // VERIFICA SE O TEXTO ESTÁ NO NOME
        const nomeCombina = animal.nome
            .toLowerCase()
            .includes(textoBusca);

        // VERIFICA SE O TEXTO ESTÁ NA ESPÉCIE
        const especieCombina = animal.especie
            .toLowerCase()
            .includes(textoBusca);

        // VERIFICA SE O ANIMAL ESTÁ DISPONÍVEL
        const disponibilidadeCombina =
            !somenteDisponiveis || animal.disponivel;

        // ACEITA O NOME OU A ESPÉCIE
        return (
            (nomeCombina || especieCombina) &&
            disponibilidadeCombina
        );
    });

    // LIMPA A LISTA ANTES DE DESENHAR NOVAMENTE
    lista.replaceChildren();

    animaisProcessados.forEach(function(animal) {
        const card = criarItem(animal);
        lista.append(card);
    });

    atualizarResumo();
}


// AULA 12 - DELEGAÇÃO DE EVENTOS
function tratarCliqueLista(evento) {
    const alvo = evento.target;

    if (!(alvo instanceof Element)) {
        return;
    }

    const botao = alvo.closest("button[data-acao]");

    if (!botao) {
        return;
    }

    const id = Number(botao.dataset.id);
    const acao = botao.dataset.acao;

    const animal = animais.find(function(item) {
        return item.id === id;
    });

    if (!animal) {
        return;
    }

    if (acao === "adotar") {
        animal.disponivel = false;

        alert(`Você demonstrou interesse em adotar ${animal.nome}!`);

    } else if (acao === "remover") {
        const indice = animais.findIndex(function(item) {
            return item.id === id;
        });

        if (indice !== -1) {
            animais.splice(indice, 1);
        }
    }

    desenhar();
}


// AULA 12 - FILTRO DE DISPONIBILIDADE
function alternarFiltro() {
    somenteDisponiveis = !somenteDisponiveis;

    if (filtroDisponiveis) {
        filtroDisponiveis.setAttribute(
            "aria-pressed",
            String(somenteDisponiveis)
        );

        filtroDisponiveis.textContent = somenteDisponiveis
            ? "Mostrar todos"
            : "Mostrar disponíveis";
    }

    desenhar();
}


// AULA 12 - BUSCA DE ANIMAIS
function buscarAnimal() {
    desenhar();
}


// AULA 12 - CADASTRO DE UM NOVO ANIMAL
function adicionarAnimal(evento) {
    evento.preventDefault();

    const campoNome = document.querySelector("#nomeAnimal");
    const campoEspecie = document.querySelector("#especieAnimal");
    const campoIdade = document.querySelector("#idadeAnimal");

    if (!campoNome || !campoEspecie || !campoIdade) {
        return;
    }

    const nome = campoNome.value.trim();
    const especie = campoEspecie.value;
    const idadeTexto = campoIdade.value.trim();
    const idade = Number(idadeTexto);

    if (nome === "" || especie === "") {
        alert("Preencha todos os campos.");
        return;
    }

    if (
        idadeTexto === "" ||
        Number.isNaN(idade) ||
        idade < 0 ||
        idade > 30
    ) {
        alert("Digite uma idade entre 0 e 30 anos.");
        return;
    }

    const novoAnimal = {
        id: proximoId,
        nome: nome,
        especie: especie,
        idade: idade,
        dias: 0,
        disponivel: true
    };

    animais.push(novoAnimal);
    proximoId++;

    formAnimal.reset();

    desenhar();

    alert("Animal cadastrado com sucesso!");
}


// FORMULÁRIO DE INTERESSE NA ADOÇÃO
function enviarFormularioAdocao(evento) {
    evento.preventDefault();

    const nome = document.querySelector("#nomeAdotante");
    const animal = document.querySelector("#animalDesejado");

    if (!nome || !animal) {
        return;
    }

    if (nome.value.trim() === "" || animal.value === "") {
        alert("Preencha os campos do formulário.");
        return;
    }

    alert(
        `Obrigado, ${nome.value.trim()}! ` +
        `Seu interesse em adotar ${animal.value} foi registrado nesta página.`
    );

    formAdocao.reset();
}


// AULA 12 - ABRE E FECHA O MENU
function alternarMenu() {
    if (!botaoMenu || !menu) {
        return;
    }

    const menuAberto = menu.classList.toggle("menu-aberto");

    botaoMenu.setAttribute("aria-expanded", String(menuAberto));
}


// AULA 12 - FECHA O MENU COM ESCAPE
function fecharMenu(evento) {
    if (
        evento.key === "Escape" &&
        menu &&
        botaoMenu &&
        menu.classList.contains("menu-aberto")
    ) {
        menu.classList.remove("menu-aberto");
        botaoMenu.setAttribute("aria-expanded", "false");
        botaoMenu.focus();
    }
}


// FECHA O MENU QUANDO UM LINK É CLICADO
function selecionarLinkMenu(evento) {
    const alvo = evento.target;

    if (!(alvo instanceof Element)) {
        return;
    }

    if (
        alvo.closest("a") &&
        menu &&
        botaoMenu
    ) {
        menu.classList.remove("menu-aberto");
        botaoMenu.setAttribute("aria-expanded", "false");
    }
}


// AULA 09 - PROMPT COM VALIDAÇÃO E ANÁLISE
function executarAtividadeLogica() {
    const entrada = prompt(
        "Digite um limite de dias entre 0 e 365 para analisar os animais:"
    );

    if (entrada === null) {
        alert("Análise cancelada.");
        return;
    }

    const texto = entrada.trim();

    if (texto === "") {
        alert("O campo não pode ficar vazio.");
        return;
    }

    const limiteDias = Number(texto);

    if (Number.isNaN(limiteDias)) {
        alert("Digite somente números.");
        return;
    }

    if (limiteDias < 0 || limiteDias > 365) {
        alert("Digite um número entre 0 e 365.");
        return;
    }

    const resultado = analisarAnimais(limiteDias);

    console.log(`Análise dos animais com limite de ${limiteDias} dias:`);
    console.table(resultado);

    const acimaDoLimite = resultado.filter(function(animal) {
        return animal.acimaDoLimite;
    });

    console.log(
        `Quantidade de animais com ${limiteDias} dias ou mais: ` +
        `${acimaDoLimite.length}`
    );

    // AULA 09 - WHILE ATÉ DIGITAR SAIR
    const valores = [];

    let comando = prompt(
        'Digite números de 0 a 100. Digite "sair" para terminar:'
    );

    while (
        comando !== null &&
        comando.trim().toLowerCase() !== "sair"
    ) {
        const valorTexto = comando.trim();

        if (valorTexto === "") {
            alert("O campo não pode ficar vazio.");
        } else {
            const valor = Number(valorTexto);

            if (Number.isNaN(valor)) {
                alert('Digite um número ou escreva "sair".');
            } else if (valor < 0 || valor > 100) {
                alert("Digite um número entre 0 e 100.");
            } else {
                valores.push(valor);
            }
        }

        comando = prompt(
            'Digite outro número ou "sair" para terminar:'
        );
    }

    console.log("Valores digitados:");
    console.table(valores);

    alert(`Você registrou ${valores.length} número(s).`);
}


// CRIA O BOTÃO DA ATIVIDADE DE JAVASCRIPT
function criarBotaoAtividade() {
    const resultado = document.querySelector("#resultado");

    if (!resultado || document.querySelector("#botaoAtividade")) {
        return;
    }

    const botao = document.createElement("button");

    botao.type = "button";
    botao.id = "botaoAtividade";
    botao.classList.add("botao");
    botao.textContent = "Executar atividade de JavaScript";

    botao.addEventListener("click", executarAtividadeLogica);

    resultado.append(botao);
}


// AULA 09 E 10 - TESTES DAS FUNÇÕES
function testarFuncoes() {
    console.log("TESTES DE PONTUAÇÃO:");

    console.log(calcularPontuacao(10));
    console.log(calcularPontuacao(20, 5));
    console.log(calcularPontuacao(30, 10));

    console.log("TESTES DE CLASSIFICAÇÃO:");

    console.log(classificarEspera(5));
    console.log(classificarEspera(20));
    console.log(classificarEspera(50));

    console.log("TESTES DE ESPÉCIE:");

    console.log(classificarEspecie("Cachorro"));
    console.log(classificarEspecie("Gato"));
    console.log(classificarEspecie("Coelho"));
}


// AULA 09 - TESTE DE MESA
/*
| Iteração | Animal | Dias | Classificação |
|----------|--------|------|---------------|
| 1        | Rex    | 10   | Baixa espera  |
| 2        | Mel    | 25   | Média espera  |
| 3        | Bob    | 40   | Alta espera   |
*/


// FUNÇÃO PRINCIPAL DO PROJETO
function iniciarProjeto() {

    if (lista) {
        lista.addEventListener("click", tratarCliqueLista);
    }

    if (busca) {
        busca.addEventListener("input", buscarAnimal);
    }

    if (filtroDisponiveis) {
        filtroDisponiveis.addEventListener("click", alternarFiltro);
    }

    if (formAnimal) {
        formAnimal.addEventListener("submit", adicionarAnimal);
    }

    if (formAdocao) {
        formAdocao.addEventListener("submit", enviarFormularioAdocao);
    }

    if (botaoMenu) {
        botaoMenu.addEventListener("click", alternarMenu);
    }

    if (menu) {
        menu.addEventListener("click", selecionarLinkMenu);
    }

    document.addEventListener("keydown", fecharMenu);

    criarBotaoAtividade();

    desenhar();

    const estatisticas = calcularEstatisticas();

    console.log(`Quantidade de animais: ${estatisticas.quantidade}`);
    console.log(`Total de dias de espera: ${estatisticas.totalDias}`);
    console.log(`Maior tempo de espera: ${estatisticas.maiorEspera}`);
    console.log(`Média de dias de espera: ${estatisticas.media}`);

    console.table(animais);
}


// EXECUTA OS TESTES E INICIA O PROJETO
testarFuncoes();
iniciarProjeto();
