
/* Lista de animais disponíveis para adoção */
const animaisAdocao = [
    {
        nome: "Rex",
        especie: "Cachorro",
        idade: 3,
        diasEsperando: 70
    },
    {
        nome: "Mel",
        especie: "Gato",
        idade: 2,
        diasEsperando: 20
    },
    {
        nome: "Bob",
        especie: "Cachorro",
        idade: 4,
        diasEsperando: 45
    },
    {
        nome: "Luna",
        especie: "Gato",
        idade: 1,
        diasEsperando: 80
    },
    {
        nome: "Thor",
        especie: "Cachorro",
        idade: 5,
        diasEsperando: 15
    }
];

/* Calcula a pontuação de espera do animal */
function calcularPontuacao(diasEsperando, bonus = 0) {
    return diasEsperando + bonus;
}

/* Classifica o tempo de espera */
function classificarEspera(pontuacao) {
    if (pontuacao >= 60) {
        return "alta";
    } else if (pontuacao >= 30) {
        return "media";
    } else {
        return "baixa";
    }
}

/* Testes das funções */
console.log(calcularPontuacao(40));
console.log(calcularPontuacao(40, 10));

console.log(classificarEspera(15));
console.log(classificarEspera(45));
console.log(classificarEspera(75));

/* Usa map para calcular e classificar cada animal */
const animaisProcessados = animaisAdocao.map(function(animal) {
    const pontuacao = calcularPontuacao(animal.diasEsperando);

    return {
        ...animal,
        pontuacao: pontuacao,
        faixa: classificarEspera(pontuacao)
    };
});

/* Usa filter para separar os animais com maior espera */
const animaisPrioritarios = animaisProcessados.filter(function(animal) {
    return animal.faixa === "alta";
});

/* Usa reduce para calcular o total e a soma dos dias */
const resumo = animaisProcessados.reduce(function(total, animal) {
    total.dias = total.dias + animal.diasEsperando;
    total.quantidade = total.quantidade + 1;

    return total;
}, {
    dias: 0,
    quantidade: 0
});

/* Cria o card de cada animal */
function criarCardAnimal(animal) {
    const card = document.createElement("div");
    const titulo = document.createElement("h3");
    const especie = document.createElement("p");
    const idade = document.createElement("p");
    const espera = document.createElement("p");

    titulo.textContent = animal.nome;
    especie.textContent = "Espécie: " + animal.especie;
    idade.textContent = "Idade: " + animal.idade + " anos";
    espera.textContent = "Dias esperando: " + animal.diasEsperando;

    card.classList.add("animal-card");
    card.classList.add("faixa-" + animal.faixa);

    card.append(titulo, especie, idade, espera);

    return card;
}

/* Mostra os animais na página */
function mostrarAnimais() {
    const resultado = document.querySelector("#resultado");

    /* Confere se a seção existe */
    if (resultado === null) {
        console.error("A seção resultado não foi encontrada.");
    } else {
        const media = resumo.dias / resumo.quantidade;

        const textoResumo = document.createElement("p");

        textoResumo.textContent =
            "Total de animais: " + resumo.quantidade +
            " | Média de dias esperando: " + media.toFixed(1) +
            " | Animais com prioridade alta: " + animaisPrioritarios.length;

        resultado.append(textoResumo);

        /* Coloca um card para cada animal */
        animaisProcessados.forEach(function(animal) {
            const card = criarCardAnimal(animal);
            resultado.append(card);
        });
    }
}

/* Executa a função para mostrar os animais */
mostrarAnimais();
