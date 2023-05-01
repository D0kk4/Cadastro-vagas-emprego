//pega o horário da maquina utilizada.
var dataAtual = new Date();
var horaAtual = dataAtual.getHours();
let comprimentar;

//verifica o horario, para dar bom dia, boa tarde ou boa noite.
if (horaAtual > 5 && horaAtual < 12) {
  comprimentar = "Bom dia!";
} else if (horaAtual > 12 && horaAtual < 18) {
  comprimentar = "Boa tarde!";
} else {
  comprimentar = "Boa noite!";
}

const vagasDeEmprego = [];
const Candidatos = [];

//Mostra as vagas o nome das vagas existentes e a quantidade de candidatos total.
function vagas() {
  for (let i = 0; i < vagasDeEmprego.length; i++) {
    alert(`
        vaga ${i + 1} candidatos: ${Candidatos.length}: 
        Nome da vaga: ${vagasDeEmprego[i].nomeVaga}`);
  }
}

//Cadastra novas vagas de emprego com nome, descrição e uma data limite de incrição.
function CadastrarVaga() {
  vaga = {};

  vaga.nomeVaga = prompt("Qual o nome da vaga? ");
  vaga.Descricao = prompt("Coloque uma breve descrição da vaga: ");
  vaga.tempoLimite = prompt("Qual a data limite para incricão? ");

  confirmation = confirm(`
         Deseja salvar as infomrmações (sim/não)?
         Nome da vaga: ${vaga.nomeVaga}
         Descrição: ${vaga.Descricao}
         Data limite: ${vaga.tempoLimite}`);

  //confirmação se o usuario quer cadastrar a vaga.
  if (confirmation) {
    vagasDeEmprego.push(vaga);
    alert("Nova vaga salva.");
  } else {
    alert("As informações foram descartadas.");
  }
}

/*solicita ao usuario o indice da vaga que deseja ver, mostrando as infomrações da vaga,
a quitidade de candidatos e o nome de cada candidato.*/
function verVaga() {
  let vagaEscolhida = Number(prompt("Digite o índice da vaga desejada: "));
  const vagaSelecionada = vagasDeEmprego.filter(function (vaga, indice) {
    return indice === vagaEscolhida - 1;
  })[0];

  let listaDeCandidatos = "";

  // mostra a lista de candidatos cadastrados na funcção candidatarSe().
  for (let i = 0; i < Candidatos.length; i++) {
    if (Candidatos[i].nomeVaga === vagaSelecionada.nomeVaga) {
      listaDeCandidatos += `${Candidatos[i].nomeCandidato}, `;
    }
  }

  alert(
    `Nome da Vaga: ${vagaSelecionada.nomeVaga}
  Descrição da vaga: ${vagaSelecionada.Descricao}
  Tempo limite: ${vagaSelecionada.tempoLimite}
  Nome dos candidatos: ${listaDeCandidatos}`
  );
}

/*função para cadastrar um novo candidato a um determinado indice, 
que é onde se encontra a vaga desejada*/
function candidatarSe() {
  candidato = {};

  candidato.nomeCandidato = prompt("Qual o nome do candidato? ");
  const vagaDoCandidato = Number(
    prompt("Qual o indice da vaga que deseja candidatar-se?")
  );

  /*Verifica a o indice que o candidato selecionou, 
  filtrando e pegando apenas o indice selecionado*/
  const vagaSelecionada = vagasDeEmprego.filter(function (vaga, indice) {
    return indice === vagaDoCandidato - 1;
  })[0];

  //mostra a vaga para o candidato para que ele possa verificar se está certo e se canditar ou cancelar
  let confirmation = confirm(`
  Nome da Vaga: ${vagaSelecionada.nomeVaga} 
  Descrição da vaga: ${vagaSelecionada.Descricao}
  Tempo limite: ${vagaSelecionada.tempoLimite}
  Confirmar candidatura à vaga? (Sim/Não)`);

  /*verifica se ele quer ou não se candidatar. Se ele quiser a condiçãi da um splice no indice
   incluindo o novo objeto nele, mas sem excluir os elementos já existentes. Também da um push adicionando 
   o candidato no array candidatos.*/
  if (confirmation) {
    vagasDeEmprego.splice(vagaSelecionada, 0, candidato.nomeCandidato);
    Candidatos.push(candidato);
    alert(`Candidato cadastrado na vaga: ${vagaSelecionada.nomeVaga}.`);
  } else {
    alert("Candidatura removida.");
  }
}

/*Exclui o indice selecionado pelo usuario utilizando um splice no indice selecionado.*/
function excluirVaga() {
  const indice = Number(prompt("digite o indice que deseja excluir: "));
  const vagas = vagasDeEmprego[indice];

  const confirmation = confirm(`
  Confirmar a exclusão da vaga?
  Nome da Vaga: ${vagasDeEmprego.nomeVaga} 
  Descrição da vaga: ${vagasDeEmprego.Descricao}
  Tempo limite: ${vagasDeEmprego.tempoLimite}
  Confirmar candidatura à vaga? (Sim/Não)`);

  if (confirmation) {
    vagas.splice(indice, 1);
    alert("Vaga excluida");
  } else {
    alert("Você cancelou a exclusão da vaga.");
  }
}

let option = "";
do {
  option = prompt(`
      ${comprimentar} Por favor, escolha uma das opções: 
      1- Listar todas as vagas disponiveis.
      2- Criar nova vaga.
      3- Visualizar vagas.
      4- increver um candidato em uma vaga.
      5- Excluir uma vaga.
      6- Sair.`);

  switch (option) {
    case "1":
      vagas();
      break;
    case "2":
      CadastrarVaga();
      break;
    case "3":
      verVaga();
      break;
    case "4":
      candidatarSe();
      break;
    case "5":
      excluirVaga();
      break;
    case "6":
      alert("Saindo.");
      break;
    default:
      alert("Opção invalida.");
  }
} while (option != "6");
