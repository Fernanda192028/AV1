import { TipoAeronave } from "../enums/TipoAeronave";
import { Peca } from "./Peca";
import { Etapa } from "./Etapa";
import { Teste } from "./Teste";

export class Aeronave {
  constructor(
    public codigo: string,
    public modelo: string,
    public tipo: TipoAeronave,
    public capacidade: number,
    public alcance: number,
    public pecas: Peca[] = [],
    public etapas: Etapa[] = [],
    public testes: Teste[] = []
  ) {}

  exibirDetalhes(): void {
    console.log(`Código: ${this.codigo}`);
    console.log(`Modelo: ${this.modelo}`);
    console.log(`Tipo: ${this.tipo}`);
    console.log(`Capacidade: ${this.capacidade}`);
    console.log(`Alcance: ${this.alcance}`);
  }
}