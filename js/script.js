
/* Lista principal de animais */
const animais = [
    { id: 1, nome: "Rex", especie: "Cachorro", idade: 3, disponivel: true },
    { id: 2, nome: "Mel", especie: "Gato", idade: 2, disponivel: true },
    { id: 3, nome: "Bob", especie: "Cachorro", idade: 4, disponivel: false },
    { id: 4, nome: "Luna", especie: "Gato", idade: 1, disponivel: true },
    { id: 5, nome: "Thor", especie: "Cachorro", idade: 5, disponivel: false }
];

let proximoId = 6;
let somenteDisponiveis = false;

/* Procura os elementos do HTML */
const lista = document.querySelector("#lista");
const busca = document.querySelector("#busca");
const resumo = document.querySelector("#resumo");
const filtroDisponiveis = document.querySelector("#filtroDisponiveis");
const formAnimal = document.querySelector("#formAnimal");

/* Cria um item da lista */
function criarItem(animal) {
    const item = document.createElement("li");
    const nome = document.createElement("span");
    const botaoStatus = document.createElement("button");
    const botaoRemover = document.createElement("button");

    nome.textContent = animal.nome + " - " + animal.especie +
        " - " + animal.idade + " anos";

    if (animal.disponivel) {
        nome.textContent += " - Disponível";
        botaoStatus.textContent = "Marcar como adotado";
    } else {
        nome.textContent += " - Adotado";
        botaoStatus.textContent = "Marcar como disponível";
    }

    botaoStatus.type = "button";
    botaoStatus.dataset.acao = "status";
    botaoStatus.dataset.id = animal.id;

    botaoRemover.type = "button";
    botaoRemover.textContent = "Remover";
    botaoRemover.dataset.acao = "remover";
    botaoRemover.dataset.id = animal.id;

    item.append(nome, botaoStatus, botaoRemover);

    return item;
}

/* Calcula o resumo da lista */
function calcularResumo(listaFiltrada) {
    const total = listaFiltrada.length;

    const disponiveis = listaFiltrada.filter(function(animal) {
        return animal.disponivel;
    }).length;

    return {
        total: total,
        disponiveis: disponiveis
    };
}

/* Escreve o resumo na página */
function atualizarResumo(listaFiltrada) {
    const dados = calcularResumo(listaFiltrada);

    resumo.textContent =
        "Animais exibidos: " + dados.total +
        " | Disponíveis: " + dados.disponiveis;
}

/* Desenha a lista na página */
function desenhar() {
    const textoBusca = busca.value.toLowerCase();

    const animaisFiltrados = animais.filter(function(animal) {
        const nomeOuEspecie =
            animal.nome.toLowerCase().includes(textoBusca) ||
            animal.especie.toLowerCase().includes(textoBusca);

        const disponibilidade =
            !somenteDisponiveis || animal.disponivel;

        return nomeOuEspecie && disponibilidade;
    });

    lista.replaceChildren();

    animaisFiltrados.forEach(function(animal) {
        const item = criarItem(animal);
        lista.append(item);
    });

    atualizarResumo(animaisFiltrados);
}

/* Trata os cliques nos botões dos animais */
function tratarCliqueLista(evento) {
    const botao = evento.target.closest("button[data-acao]");

    if (botao === null || !lista.contains(botao)) {
        return;
    }

    const id = Number(botao.dataset.id);
    const acao = botao.dataset.acao;

    const animal = animais.find(function(item) {
        return item.id === id;
    });

    if (animal === undefined) {
        return;
    }

    if (acao === "status") {
        animal.disponivel = !animal.disponivel;
    }

    if (acao === "remover") {
        const indice = animais.findIndex(function(item) {
            return item.id === id;
        });

        animais.splice(indice, 1);
    }

    desenhar();
}

/* Ativa o filtro de disponibilidade */
function alternarFiltro() {
    somenteDisponiveis = !somenteDisponiveis;

    filtroDisponiveis.setAttribute(
        "aria-pressed",
        String(somenteDisponiveis)
    );

    desenhar();
}

/* Atualiza a lista quando digitar na busca */
function buscarAnimal() {
    desenhar();
}

/* Adiciona um novo animal */
function adicionarAnimal(evento) {
    evento.preventDefault();

    const nome = document.querySelector("#nomeAnimal").value;
    const especie = document.querySelector("#especieAnimal").value;
    const idade = Number(document.querySelector("#idadeAnimal").value);

    const novoAnimal = {
        id: proximoId,
        nome: nome,
        especie: especie,
        idade: idade,
        disponivel: true
    };

    proximoId++;

    animais.push(novoAnimal);

    formAnimal.reset();

    desenhar();
}

/* Inicia os eventos da lista */
function iniciarLista() {
    lista.addEventListener("click", tratarCliqueLista);
}

/* Inicia o filtro de disponibilidade */
function iniciarFiltro() {
    filtroDisponiveis.addEventListener("click", alternarFiltro);
}

/* Inicia a busca */
function iniciarBusca() {
    busca.addEventListener("input", buscarAnimal);
}

/* Inicia o formulário */
function iniciarFormulario() {
    formAnimal.addEventListener("submit", adicionarAnimal);
}

/* Inicia o projeto */
function iniciar() {
    iniciarLista();
    iniciarFiltro();
    iniciarBusca();
    iniciarFormulario();

    desenhar();
}

iniciar();
