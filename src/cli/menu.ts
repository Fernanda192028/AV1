import readlineSync from "readline-sync";
import { Aeronave } from "../models/Aeronave";
import { TipoAeronave } from "../enums/TipoAeronave";
import { TipoPeca } from "../enums/TipoPeca";
import { StatusPeca } from "../enums/StatusPeca";
import { StatusEtapa } from "../enums/StatusEtapa";
import { TipoTeste } from "../enums/TipoTeste";
import { ResultadoTeste } from "../enums/ ResultadoTeste";
import { Peca } from "../models/Peca";
import { Etapa } from "../models/Etapa";
import { Teste } from "../models/Teste";
import { Relatorio } from "../models/Relatorio";
import { FileService } from "../services/FileService";

let aeronaves: Aeronave[] = FileService.carregar("data/aeronaves.txt");

export function menu() {
  while (true) {
    console.log("\n=== AEROCODE ===");
    console.log("1 - Cadastrar aeronave");
    console.log("2 - Listar aeronaves");
    console.log("3 - Adicionar peça");
    console.log("4 - Atualizar status da peça");
    console.log("5 - Adicionar etapa");
    console.log("6 - Iniciar etapa");
    console.log("7 - Finalizar etapa");
    console.log("8 - Registrar teste");
    console.log("9 - Gerar relatório");
    console.log("0 - Sair");

    const op = readlineSync.question("Escolha uma opção: ");

    switch (op) {
      case "1": cadastrarAeronave(); break;
      case "2": listarAeronaves(); break;
      case "3": adicionarPeca(); break;
      case "4": atualizarStatusPeca(); break;
      case "5": adicionarEtapa(); break;
      case "6": iniciarEtapa(); break;
      case "7": finalizarEtapa(); break;
      case "8": registrarTeste(); break;
      case "9": gerarRelatorio(); break;
      case "0":
        console.log("👋 Até logo!");
        return;
      default:
        console.log("❌ Opção inválida!");
    }
  }
}

function cadastrarAeronave() {
  const codigo = readlineSync.question("Código: ");

  if (aeronaves.find(a => a.codigo === codigo)) {
    console.log("❌ Código já existe!");
    return;
  }

  const modelo = readlineSync.question("Modelo: ");

  const tipoInput = readlineSync.question(
    "Tipo (1-COMERCIAL | 2-MILITAR): "
  );

  const tipo =
    tipoInput === "2"
      ? TipoAeronave.MILITAR
      : TipoAeronave.COMERCIAL;

  const nova = new Aeronave(codigo, modelo, tipo, 100, 1000);

  aeronaves.push(nova);
  FileService.salvar("data/aeronaves.txt", aeronaves);

  console.log("✅ Aeronave cadastrada!");
}

function listarAeronaves() {
  if (aeronaves.length === 0) {
    console.log("⚠️ Nenhuma aeronave cadastrada.");
    return;
  }

  aeronaves.forEach(a => {
    console.log("-------------------");
    a.exibirDetalhes();
  });
}

function adicionarPeca() {
  const codigo = readlineSync.question("Código da aeronave: ");
  const aeronave = aeronaves.find(a => a.codigo === codigo);

  if (!aeronave) return console.log("❌ Não encontrada!");

  const nome = readlineSync.question("Nome da peça: ");
  const tipoInput = readlineSync.question("1-NACIONAL | 2-IMPORTADA: ");

  const tipo =
    tipoInput === "2"
      ? TipoPeca.IMPORTADA
      : TipoPeca.NACIONAL;

  const fornecedor = readlineSync.question("Fornecedor: ");

  aeronave.pecas.push(
    new Peca(nome, tipo, fornecedor, StatusPeca.EM_PRODUCAO)
  );

  FileService.salvar("data/aeronaves.txt", aeronaves);
  console.log("✅ Peça adicionada!");
}

function atualizarStatusPeca() {
  const codigo = readlineSync.question("Código da aeronave: ");
  const aeronave = aeronaves.find(a => a.codigo === codigo);

  if (!aeronave) return;

  const nome = readlineSync.question("Nome da peça: ");
  const peca = aeronave.pecas.find(p => p.nome === nome);

  if (!peca) return console.log("❌ Peça não encontrada!");

  const statusInput = readlineSync.question(
    "1-PRODUÇÃO | 2-TRANSPORTE | 3-PRONTA: "
  );

  const status =
    statusInput === "2"
      ? StatusPeca.EM_TRANSPORTE
      : statusInput === "3"
      ? StatusPeca.PRONTA
      : StatusPeca.EM_PRODUCAO;

  peca.atualizarStatus(status);

  FileService.salvar("data/aeronaves.txt", aeronaves);
  console.log("✅ Status atualizado!");
}

function adicionarEtapa() {
  const codigo = readlineSync.question("Código: ");
  const aeronave = aeronaves.find(a => a.codigo === codigo);

  if (!aeronave) return;

  const nome = readlineSync.question("Nome da etapa: ");
  const prazo = readlineSync.question("Prazo: ");

  aeronave.etapas.push(new Etapa(nome, prazo));

  FileService.salvar("data/aeronaves.txt", aeronaves);
  console.log("✅ Etapa adicionada!");
}

function iniciarEtapa() {
  const codigo = readlineSync.question("Código: ");
  const aeronave = aeronaves.find(a => a.codigo === codigo);

  if (!aeronave) return;

  const nome = readlineSync.question("Nome da etapa: ");
  const index = aeronave.etapas.findIndex(e => e.nome === nome);

  if (index === -1) return;

  if (
    index > 0 &&
    aeronave.etapas[index - 1].status !== StatusEtapa.CONCLUIDA
  ) {
    console.log("❌ Finalize a anterior primeiro!");
    return;
  }

  aeronave.etapas[index].iniciar();

  FileService.salvar("data/aeronaves.txt", aeronaves);
}

function finalizarEtapa() {
  const codigo = readlineSync.question("Código: ");
  const aeronave = aeronaves.find(a => a.codigo === codigo);

  if (!aeronave) return;

  const nome = readlineSync.question("Nome da etapa: ");
  const etapa = aeronave.etapas.find(e => e.nome === nome);

  if (!etapa) return;

  etapa.finalizar();

  FileService.salvar("data/aeronaves.txt", aeronaves);
}

function registrarTeste() {
  const codigo = readlineSync.question("Código: ");
  const aeronave = aeronaves.find(a => a.codigo === codigo);

  if (!aeronave) return;

  const tipoInput = readlineSync.question(
    "1-ELETRICO | 2-HIDRAULICO | 3-AERODINAMICO: "
  );

  const tipo =
    tipoInput === "2"
      ? TipoTeste.HIDRAULICO
      : tipoInput === "3"
      ? TipoTeste.AERODINAMICO
      : TipoTeste.ELETRICO;

  const resultadoInput = readlineSync.question(
    "1-APROVADO | 2-REPROVADO: "
  );

  const resultado =
    resultadoInput === "2"
      ? ResultadoTeste.REPROVADO
      : ResultadoTeste.APROVADO;

  aeronave.testes.push(new Teste(tipo, resultado));

  FileService.salvar("data/aeronaves.txt", aeronaves);
  console.log("✅ Teste registrado!");
}

function gerarRelatorio() {
  const codigo = readlineSync.question("Código: ");
  const aeronave = aeronaves.find(a => a.codigo === codigo);

  if (!aeronave) return;

  const texto = new Relatorio().gerar(aeronave);

  require("fs").writeFileSync("data/relatorio.txt", texto);

  console.log("✅ Relatório gerado!");
}