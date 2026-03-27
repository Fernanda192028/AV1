import { StatusEtapa } from "../enums/StatusEtapa";
import { Funcionario } from "./Funcionario";

export class Etapa {
  public funcionarios: Funcionario[] = [];

  constructor(
    public nome: string,
    public prazo: string,
    public status: StatusEtapa = StatusEtapa.PENDENTE
  ) {}

  iniciar(): void {
    if (this.status === StatusEtapa.PENDENTE) {
      this.status = StatusEtapa.ANDAMENTO;
    }
  }

  finalizar(): void {
    if (this.status === StatusEtapa.ANDAMENTO) {
      this.status = StatusEtapa.CONCLUIDA;
    }
  }

  adicionarFuncionario(funcionario: Funcionario): void {
    const existe = this.funcionarios.find(f => f.id === funcionario.id);
    if (!existe) {
      this.funcionarios.push(funcionario);
    }
  }

  listarFuncionarios(): void {
    this.funcionarios.forEach(f => {
      console.log(`${f.nome} (${f.nivelPermissao})`);
    });
  }
}